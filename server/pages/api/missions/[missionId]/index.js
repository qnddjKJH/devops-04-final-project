import { connectDb, queries } from '../../../../utils/database';
import { verifyToken } from '../../../../utils/jwt';

const { getSecrets } = require('../../../../utils/secret');
const secretName = 'finaldb';

export default async function handler(req, res) {
  const missionId = parseInt(req.query.missionId);

  const conn = await connectDb();
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    if (req.method === 'GET') {
      const [result] = await conn.query(queries.getMissionById(missionId));
      await conn.end();

      res.status(200).json(result);
    } else if (req.method === 'PUT') {
      const { mission } = req.body;

      await conn.query(queries.putMission(missionId, mission));
      const [result] = await conn.query(queries.getMissionById(missionId));
      await conn.end();

      res.status(200).json(result[0]);
    } else if (req.method === 'DELETE') {
      await conn.query(queries.deactivateMission(missionId));
      await conn.end();

      res.status(200).json({ message: 'Mission Deactivated' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
