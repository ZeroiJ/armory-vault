export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    const tokenUrl = 'https://www.bungie.net/platform/app/oauth/token/';
    const clientId = process.env.VITE_BUNGIE_CLIENT_ID;
    const clientSecret = process.env.BUNGIE_CLIENT_SECRET;

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'grant_type': 'authorization_code',
          'code': code,
          'client_id': clientId,
          'client_secret': clientSecret,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error_description || 'Token exchange failed' });
      }

      const tokenData = await response.json();
      res.status(200).json(tokenData);

    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
    
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
