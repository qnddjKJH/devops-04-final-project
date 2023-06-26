import { connectDb, queries } from '../../../../utils/database';
import { useRouter } from 'next/router'

export default async function handler(req, res){
  const conn = await connectDb();
  const router = useRouter()
  const { missionId } = router.query

  if(req.method === 'PUT'){
      const [mission] = await conn.query(queries.getMissionById(missionId))
      console.log(mission)

      const mission_reward = mission[0].mission_reward
      console.log(mission_reward);

      var streamer_id = mission[0].streamer_id
      console.log(streamer_id)

    
      await conn.query(queries.increaseStrimerCash(streamer_id, mission_reward))
      res.status(200).send("스트리머 성공!!, 스트리머에게 금액 정산 완료");

      await conn.query(queries.deactivateMission(missionId))
  
    } else {
        res.status(400).send('요청 에러');
    }
    await conn.end();
};

