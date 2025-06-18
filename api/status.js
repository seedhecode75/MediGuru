import fetch from 'node-fetch';

export default async function handler(req, res) {
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
        prompt: "status check",
        max_length: 10
      }),
      timeout: 5000
    });

    return res.status(response.ok ? 200 : 500).json({
      status: response.ok ? "active" : "inactive"
    });
  } catch (error) {
    return res.status(500).json({ status: "inactive" });
  }
}