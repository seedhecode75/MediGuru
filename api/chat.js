import fetch from 'node-fetch';


const MAX_RETRIES = 3;
const INITIAL_DELAY = 2000; 
const HF_TIMEOUT = 15000; 

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
    
    while (retries < MAX_RETRIES) {
      try {
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Hugging Face API timeout')), HF_TIMEOUT)
        );

        const fetchPromise = fetch(
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
            })
          }
        );

        const hfResponse = await Promise.race([fetchPromise, timeoutPromise]);
        
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
          
          // Special handling for timeout errors
          if (error.message.includes('timeout')) {
            return res.status(504).json({
              reply: "⚠️ Our medical assistant is taking longer than usual to respond. Please try again in a moment."
            });
          }
          
          throw error; // Will be caught by outer catch
        }
        
        // Exponential backoff
        const delay = INITIAL_DELAY * Math.pow(2, retries);
        console.log(`Retry #${retries} in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Validate response structure
    if (!Array.isArray(responseData) || responseData.length === 0) {
      throw new Error('Invalid response format from Hugging Face API');
    }
    
    // Extract generated text
    const generatedText = responseData[0]?.generated_text || "I couldn't process that request.";
    
    // Clean and sanitize response
    const safeReply = sanitizeMedicalResponse(generatedText);
    
    return res.status(200).json({ reply: safeReply });
    
  } catch (error) {
    console.error('Final API Error:', error);
    
    // User-friendly error messages
    const errorMessage = error.message || 'Internal server error';
    
    return res.status(500).json({ 
      reply: "⚠️ Our medical assistant is currently unavailable. Please try again later. " +
             `(Error: ${errorMessage.substring(0, 100)})`
    });
  }
}

function sanitizeMedicalResponse(text) {
  // Truncate excessively long responses
  const MAX_LENGTH = 1000;
  let truncated = text.length > MAX_LENGTH 
    ? text.substring(0, MAX_LENGTH) + '... [response truncated]' 
    : text;

  // Remove any incomplete sentences at the end
  const lastPeriod = truncated.lastIndexOf('.');
  if (lastPeriod > truncated.length / 2) {
    truncated = truncated.substring(0, lastPeriod + 1);
  }

  // Safety disclaimer
  const disclaimer = "\n\n*Note: This information is for educational purposes only and not medical advice. Consult a healthcare professional for medical concerns.*";
  
  // Blocked content patterns
  const blockedPatterns = [
    /take (?:your|my) life/gi,
    /kill (?:yourself|myself)/gi,
    /(?:suicide|self-harm)/gi,
    /illegal (?:drugs|substances)/gi
  ];
  
  // High-risk medical keywords
  const highRiskKeywords = [
    'diagnos', 'treat', 'cure', 'medication', 
    'dose', 'prescription', 'cancer', 'heart attack',
    'emergency', 'pregnant'
  ];
  
  // Check for blocked content
  if (blockedPatterns.some(pattern => pattern.test(truncated))) {
    return "I'm sorry, I can't provide information on this topic. Please consult a healthcare professional for assistance.";
  }
  
  // Add disclaimer for high-risk content
  if (highRiskKeywords.some(keyword => truncated.toLowerCase().includes(keyword))) {
    return truncated + disclaimer;
  }
  
  return truncated;
}
