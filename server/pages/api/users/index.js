import { users } from '../../../utils/database';
// import { verifyToken } from '../../../utils/jwt';

// const { getSecrets } = require('../../../utils/secret');
// const secretName = 'finaldb';

export default async function handler(req, res) {
  // const conn = await connectDb();
  // const secrets = await getSecrets(secretName);

  // const token = req.headers.authorization?.split(' ')[1];
  // const jwt_secrets = secrets.JWT_SECRET;
  // const decoded = verifyToken(token, jwt_secrets);

  // if (decoded) {
  //   if (req.method === 'GET') {
  //     try {
  //       const [result] = await conn.query(queries.getUser());
  //       await conn.end();
  //       res.status(200).json(result[0]);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ message: '서버 오류' });
  //     }
  //   }
  // } else {
  //   res.status(401).json({ message: 'Unauthorized' });
  // }

  if (req.method === 'GET') {
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    // 2023.06.15 [ibocok0] req.body 검증
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
}
