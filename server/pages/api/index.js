export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello world!' });
  }
}
