export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  try {
    let retries = 0;
    let responseData;
    const MAX_RETRIES = 3;
    const INITIAL_DELAY = 2000;
    const HF_TIMEOUT = 15000;
    
    while (retries < MAX_RETRIES) {
      try {
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), HF_TIMEOUT);

        const hfResponse = await fetch(
          'https://api-inference.huggingface.co/models/gabbar427/mediguide',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              inputs: message,
              parameters: {
                max_length: 200,
                temperature: 0.7,
                repetition_penalty: 1.2,
                return_full_text: false
              }
            }),
            signal: controller.signal
          }
        );
        
        
        clearTimeout(timeoutId);
        
        if (!hfResponse.ok) {
          if (hfResponse.status === 503) {
            const errorData = await hfResponse.json();
            if (errorData.estimated_time) {
              const waitTime = Math.ceil(errorData.estimated_time * 1000) + 2000;
              console.log(`Model loading - waiting ${waitTime}ms`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              retries++;
              continue;
            }
          }
          
          const errorText = await hfResponse.text();
          throw new Error(`HuggingFace API error: ${hfResponse.status} - ${errorText}`);
        }

        responseData = await hfResponse.json();
        break;
        
      } catch (error) {
        retries++;
        
        if (retries >= MAX_RETRIES) {
          console.error(`API Error after ${MAX_RETRIES} attempts:`, error);
          
          if (error.name === 'AbortError') {
            return res.status(504).json({
              reply: "⚠️ Our medical assistant is taking longer than usual to respond. Please try again in a moment."
            });
          }
          
          throw error;
        }
        
        const delay = INITIAL_DELAY * Math.pow(2, retries);
        console.log(`Retry #${retries} in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (!Array.isArray(responseData) || responseData.length === 0) {
      throw new Error('Invalid response format from Hugging Face API');
    }
    
    const generatedText = responseData[0]?.generated_text || "I couldn't process that request.";
    const safeReply = sanitizeMedicalResponse(generatedText);
    
    return res.status(200).json({ reply: safeReply });
    
  } catch (error) {
    console.error('Final API Error:', error);
    
    return res.status(500).json({ 
      reply: "⚠️ Our medical assistant is currently unavailable. Please try again later."
    });
  }
}

function sanitizeMedicalResponse(text) {
  const MAX_LENGTH = 1000;
  let truncated = text.length > MAX_LENGTH 
    ? text.substring(0, MAX_LENGTH) + '... [response truncated]' 
    : text;

  const lastPeriod = truncated.lastIndexOf('.');
  if (lastPeriod > truncated.length / 2) {
    truncated = truncated.substring(0, lastPeriod + 1);
  }

  const disclaimer = "\n\n*Note: This information is for educational purposes only and not medical advice. Consult a healthcare professional for medical concerns.*";
  
  const blockedPatterns = [
    /take (?:your|my) life/gi,
    /kill (?:yourself|myself)/gi,
    /(?:suicide|self-harm)/gi,
    /illegal (?:drugs|substances)/gi
  ];
  
  const highRiskKeywords = [
    'diagnos', 'treat', 'cure', 'medication', 
    'dose', 'prescription', 'cancer', 'heart attack',
    'emergency', 'pregnant'
  ];
  
  if (blockedPatterns.some(pattern => pattern.test(truncated))) {
    return "I'm sorry, I can't provide information on this topic. Please consult a healthcare professional for assistance.";
  }
  
  if (highRiskKeywords.some(keyword => truncated.toLowerCase().includes(keyword))) {
    return truncated + disclaimer;
  }
  
  return truncated;
}
