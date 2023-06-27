import { TYPES, container } from '../../../utils/container';

export default async function handleUsersWithUserId(req, res) {

  if (req.method === 'GET') {
    await handleGet(req, res);
  } else if (req.method === 'PUT') {
    await handlePost(req, res);
  } else if (req.method === 'DELETE') {
    await handleDelete(req, res);
  }
}

async function handleGet(req, res) {
  const { userId } = req.query;
  const repository = container.get(TYPES.Repository);

  const result = await repository.readUser(userId);
  res.status(200).json(result);
}

async function handlePut(req, res) {
  const { userId } = req.query;
  const repository = container.get(TYPES.Repository);

  res.status(200);
}

async function handleDelete(req, res) {
  const { userId } = req.query;
  const repository = container.get(TYPES.Repository);

  res.status(200);
}
