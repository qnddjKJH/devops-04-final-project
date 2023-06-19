import { connectDb, queries, users } from '../../../utils/database';
import { verifyToken } from '../../../utils/jwt';

const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

export default async function handler(req, res){
  const conn = await connectDb();
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    if (req.method === 'GET') {
      const [result] = await conn.query(queries.getMission());
      await conn.end();
      res.status(200).json(result);
    } else if (req.method === 'POST') {
      if (req.body.user_id === undefined) {
        res.status(400).json('userid is undefined');
      }
    
      const { user_id: userId, mission, mission_reward, timelimit, is_active } = req.body;
      
      await conn.query(queries.postMission(userId, mission, mission_reward, timelimit, is_active));
      const [result] = await conn.query(queries.getPostedMission());
      await conn.end();
    
      res.status(200).json(result[0]);
    } 
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
