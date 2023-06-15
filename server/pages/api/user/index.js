import { connectDb, queries } from '../../../utils/database';
import { verifyToken } from '../../../utils/jwt';

const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

export default async function handler(req, res) {
  const conn = await connectDb();
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets)
  
  if(decoded){
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
 } else {
      res.status(401).json({ message: 'Unauthorized' });
 }
}
