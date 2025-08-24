export default async function handler(req, res) {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  const tokenUrl = 'https://www.bungie.net/platform/app/oauth/token/';
  const clientId = process.env.BUNGIE_CLIENT_ID;
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
    return res.status(200).json(tokenData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}