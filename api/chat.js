import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  try {
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
            repetition_penalty: 1.2
          }
        }),
        timeout: 10000
      }
    );

    if (!hfResponse.ok) {
      const errorData = await hfResponse.text();
      throw new Error(`HuggingFace API error: ${hfResponse.status} - ${errorData}`);
    }

    const data = await hfResponse.json();
    const reply = data[0]?.generated_text || "I couldn't process that request.";

    
    const safeReply = sanitizeMedicalResponse(reply);
    
    return res.status(200).json({ reply: safeReply });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      reply: "⚠️ Our medical assistant is currently unavailable. Please try again later." 
    });
  }
}


function sanitizeMedicalResponse(text) {
  const disclaimer = "\n\n*This information is for educational purposes only and not medical advice. Consult a healthcare professional for medical concerns.*";
  
  const blockedPatterns = [
    /take (?:your|my) life/gi,
    /kill (?:yourself|myself)/gi,
    /(?:suicide|self-harm)/gi,
    /illegal (?:drugs|substances)/gi
  ];
  
  if (blockedPatterns.some(pattern => pattern.test(text))) {
    return "I'm sorry, I can't provide information on this topic. Please consult a healthcare professional for assistance.";
  }
  
  const highRiskKeywords = [
    'diagnos', 'treat', 'cure', 'medication', 
    'dose', 'prescription', 'cancer', 'heart attack'
  ];
  
  if (highRiskKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
    return text + disclaimer;
  }
  
  return text;
}
