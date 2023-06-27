import { TYPES, container } from '../../../../utils/container';

export default async function handler(req, res) {
  const METHOD = req.method;

  switch(METHOD) {
    case 'PUT':
      await handlePut(req, res);
      break;
  }
}

  export const handlePut = async (req, res) => {
    const { missionId } = req.query;

    const {
      user_id, 
      amount 
    } = req.body

    try {
      const missionService = container.get(TYPES.MissionService);

      const mission = await missionService.betOnMission(user_id, missionId, amount);

      const data = {
        message: 'Successful mission betting',
        data: mission
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error(error.stack);
      throw new Error('미션 베팅 실패');
    }
  }
  
    