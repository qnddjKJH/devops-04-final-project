import { TYPES, container } from '../../../utils/container';

export default async function handleUsers(req, res) {
  if (req.method === 'GET') {
    await handleGet(req, res);
  } else if (req.method === 'POST') {
    await handlePost(req, res);
  } else {
    res.status(500);
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
  } else if (req.body.user_id === undefined) {
    res.status(400).json('user_id');
  } else if (req.body.password === undefined) {
    res.status(400).json('password');
  } else if (req.body.username === undefined) {
    res.status(400).json('username');
  } else if (req.body.email === undefined) {
    res.status(400).json('email');
  } else if (req.body.role === undefined) {
    res.status(400).json('role');
  } else if (req.body.cash === undefined) {
    res.status(400).json('cash');
  }

  const today = Date(Date.now()).toString();
  const user = {
    id: req.body.id,
    user_id: req.body.user_id,
    password: req.body.password,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    cash: req.body.cash,
    created_at: today,
    modified_at: today,
  };

  const result = await repository.createUser(user);
  res.status(200).json(result);
}
