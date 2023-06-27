import { TYPES, container } from '../../../../utils/container';
import { verifyToken } from '../../../../utils/jwt';

export default async function handler(req, res) {
  const METHOD = req.method;

  const secretsManager = container.get(TYPES.SecretsManager)

  const secrets = await secretsManager.getJwtSecret();

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    switch(METHOD) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'PUT':
        await handlePut(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
    }
  }
}

export const handleGet = async (req, res) => {
  const { missionId } = req.query;

  try {
    const missionService = container.get(TYPES.MissionService);

    const mission = await missionService.getMissionById(missionId);

    const data = {
      message: 'Successful get mission',
      data: mission
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error.stack);
    const errorMessage = 'error API: get mission';
    return res.status(500).json({ error: errorMessage });
  }
}

export const handlePut = async (req, res) => {
  const { missionId } = req.query;

  const {
    mission, 
    timelimit,
  } = req.body

  try {
    const missionService = container.get(TYPES.MissionService);

    const update = {
      mission,
      timelimit
    }

    const updated = await missionService.updateMission(missionId, update);

    const data = {
      message: 'Successful update mission',
      data: updated
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error.stack);
    const errorMessage = 'error API: update mission';
    return res.status(500).json({ error: errorMessage });
  }
}

export const handleDelete = async (req, res) => {
  const { missionId } = req.query;

  try {
    const missionService = container.get(TYPES.MissionService);

    await missionService.deactiveMission(missionId);

    const data = {
      message: 'Successful deactivate Mission',
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error.stack);
    const errorMessage = 'error API: deactive mission';
    return res.status(500).json({ error: errorMessage });
  }
}