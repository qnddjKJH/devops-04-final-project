import { users } from '../../../utils/database';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'DELETE') {
    if (userId === undefined) {
      res.status(400).json('id');
    }

    let deletedUser = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        deletedUser = users[i];
        delete users[i];
      }
    }

    if (deletedUser !== null) {
      res.status(200).json(deletedUser);
    } else {
      res.status(200).json([]);
    }
  }
}
