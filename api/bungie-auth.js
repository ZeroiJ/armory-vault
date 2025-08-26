// File: api/bungie-auth.js

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // --- YOUR BUNGIE AUTH LOGIC GOES HERE ---
    // This is where you should process the request.
    // For example, get the authorization code from the request body
    // and then make a server-to-server request to Bungie's token endpoint.
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    const tokenUrl = 'https://www.bungie.net/platform/app/oauth/token/';
    const clientId = process.env.BUNGIE_CLIENT_ID;
    const clientSecret = process.env.BUNGIE_CLIENT_SECRET;

    try {
      // Example: const { authorizationCode } = req.body;
      // ... your logic to exchange the code for a token from Bungie ...
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
      // If successful, send back a success response
      res.status(200).json(tokenData);

    } catch (error) {
      // If something goes wrong, send back an error response
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
    
  } else {
    // If the request method is anything other than POST, send a 405 error
    res.setHeader('Allow', ['POST']); // Let the client know which method is allowed
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
