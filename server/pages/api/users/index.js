import { TYPES, container } from '../../../utils/container';

export default async function handleUsers(req, res) {
  if (req.method === 'GET') {
    await handleGet(req, res);
  } else if (req.method === 'POST') {
    await handlePost(req, res);
  } else if (req.method === 'PATCH') {
    await handlePatch(req, res);
  } else if (req.method === 'DELETE') {
    await handleDelete(req, res);
  }
}

async function handleGet(req, res) {
  const repository = container.get(TYPES.Repository);

  const result = await repository.readUsers();
  res.status(200).json(result);
}

async function handlePost(req, res) {
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
}

async function handlePut(req, res) {
  res.status(200);
}

async function handleDelete(req, res) {
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