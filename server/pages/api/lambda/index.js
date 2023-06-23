
import { connectDb, queries, users } from '../../../utils/database';


export default async function handler(req, res){
    const conn = await connectDb();
    if (req.method === 'PUT') {
        const mission_action = req.body.mission;

    if(mission_action.action === 'success') {
        await conn.query(queries.deactivateMission(id))
        await conn.end();
        res.status(200).json("스트리머 성공!!");
    } 
    else if(mission_action.action === 'fail') {
        await conn.query(queries.deactivateMission(id))
        await conn.end();
        res.status(200).json("스트리머 실패!!");
    } 
    else if (mission_action.action === 'bet') {
        const [result] = await conn.query(queries.getMission());
    
        const id = mission_action.missionid;
        const amount = mission_action.amount;
        const increaseamount = amount || 0;
        let missionExists = false;
    
      for (let i = 0; i < result.length; i++) {
        if (id === result[i].id) {
          console.log(result[i].id);
          const mission_reward = result[i].mission_reward;
    
          await conn.query(queries.increasebet(id, increaseamount));

          res.status(200).json({ message: `mission_reward 증가 완료: ${mission_reward + increaseamount}`});
          missionExists = true;
          break; // 원하는 미션을 찾았으므로 루프를 종료합니다.
        }
      }
    
      if (!missionExists) {
        return res.status(400).json({ message: "미션 없음" });
      }

      await conn.end();
    } 
  }         
}