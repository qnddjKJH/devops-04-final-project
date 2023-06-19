import { TYPES, container } from '../../../utils/container';
import { verifyToken } from '../../../utils/jwt';

export default async function handler(req, res) {
  const repository = container.get(TYPES.Repository);
  const secret = container.get(TYPES.SecretsManager);

  const jwt_secrets = await secret.getJwtSecret();
  const token = req.headers.authorization?.split(' ')[1];
  // const decoded = verifyToken(token, jwt_secrets);
  const decoded = true;

  if (decoded) {
    if (req.method === 'GET') {
      const result = await repository.getUser();
      res.status(200).json(result[0]);
    } else if (req.method === 'POST') {
    // 2023.06.15 [@ibocok0] req.body 검증
      if (req.body.id === undefined) {
        res.status(400).json('id');
      }

      const userId = req.body.id;
      const today = Date(Date.now()).toString();
      const user = {
        id: userId,
        username: '김예성',
        email: 'ibocok0@gmail.com',
        role: 'streamer',
        cash: 20000,
        created_at: today,
        modified_at: today,
      };
      users.push(user);

      res.status(200).json(user);
    } else if (req.method === 'PUT') {
      res.status(200).json('PUT user');
    } else if (req.method === 'PATCH') {
      res.status(200).json('PATCH user');
    } else if (req.method === 'DELETE') {
      if (req.body.id === undefined) {
        res.status(400).json('id');
      }

      let deletedUser = null;
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.body.id) {
          deletedUser = users[i];
          delete users[i];
        }
      }
    
      res.status(200).json(deletedUser);
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
