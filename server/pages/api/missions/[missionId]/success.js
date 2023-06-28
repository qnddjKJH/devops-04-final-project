import { TYPES, container } from '../../../../utils/container';

export default async function handler(req, res){
  const METHOD = req.method;

  switch(METHOD) {
    case 'PUT':
      await handlePut(req, res);
      break;
  }
};

export const handlePut = async (req, res) => {
  const { missionId } = req.query;

  try {
    const missionService = container.get(TYPES.MissionService);

    await missionService.successOnMission(missionId);

    const data = {
      message: 'Success mission, congraturation',
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error.stack);
    const errorMessage = 'error success on mission';
    return res.status(500).json({ error: errorMessage });
  }
}

  