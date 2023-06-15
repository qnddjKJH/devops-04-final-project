import { connectDb, queries } from '../../../utils/database';
import { verifyToken } from '../../../utils/jwt';

const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

export default async function handler(req, res) {
  const conn = await connectDb();
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    if (req.method === 'GET') {
      try {
        const [result] = await conn.query(queries.getUser());
        await conn.end();
        res.status(200).json(result[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
      }
    }

    if (req.method === 'POST') {
      const conn = await connectDb();
      const users = [];

      try {
        const [ result ] = await conn.query(queries.getUser());
        console.log(result);
        users.push(req.body);

        JSON.stringify({
          "id": "wngud9646",
          "password": "lee1234",
          "username": "이주형",
          "email": "wngud9646@gmail.com",
          "role": "streamer",
          "cash": 20000,
          "created_at": "23/06/14-09:53:52",
          "modified_at": "23/06/14-09:53:52"
        });

        await conn.end();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ error: 'post작성 오류' });
      }
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
