import { connectDb, queries } from '../../../database';

const { getSecrets } = require('../../../secret');
const secretName = 'finaldb';

export default async function handler(req, res) {
  const conn = await connectDb();

  if (req.method === 'GET') {
    try{
      const [result] = await conn.query(queries.getUser());
      await conn.end();

      res.status(200).json(result[0]);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "서버 오류" })
    }
  }

  
  if (req.method === 'POST'){
    users.push(req.body)

    res.status(200).json(users);
  }
}
