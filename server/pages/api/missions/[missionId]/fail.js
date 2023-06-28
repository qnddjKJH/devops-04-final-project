import DynamoItem from '../../../../src/dto/DynamoItem';
import { TYPES, container } from '../../../../utils/container';


export default async function handler(req, res){
  const METHOD = req.method;

  switch(METHOD) {
    case 'PUT':
      await handlePut(req, res);
      break;
  }
}

export const handlePut = async (req, res) => {
  const { missionId } = req.query;

  const items = req.body.map(itemData => {
    return new DynamoItem(
      itemData.id,
      itemData.action,
      itemData.amount,
      itemData.mission_id,
      itemData.user_id
    )
  })

  try {
    const missionService = container.get(TYPES.MissionService);
    
    await missionService.failOnMission(missionId, items);

    const data = {
      message: 'fail mission process success',
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error.stack);
    const errorMessage = 'error fail on mission';
    return res.status(500).json({ error: errorMessage });
  }
}
