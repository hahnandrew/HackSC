// pages/api/save-language.js
import Redis from 'ioredis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { uid, language } = req.body;

    // Initialize Redis client
    const redis = new Redis(process.env.REDIS_URL);

    try {
      // Use the LPUSH command to push the language into the list for the UID
      // If the list does not exist, it will be created.
      await redis.lpush(uid, language);

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
      // It's important to close the Redis connection when done!
      redis.disconnect();
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
