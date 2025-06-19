//import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const COLAB_URL = process.env.COLAB_URL;
  const API_KEY = process.env.COLAB_API_KEY;

  try {
    const response = await fetch(COLAB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: `You are a medical AI assistant. Provide detailed, evidence-based information about: ${message}`,
        max_length: 512
      }),
      timeout: 90000
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      response: "⚠️ The medical AI is currently unavailable. Please try again later."
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};
