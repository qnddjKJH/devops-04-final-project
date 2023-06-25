
import { connectDb, queries, users } from '../../../utils/database';

export default async function handler(req, res){
    const conn = await connectDb();
    if (req.method === 'PATCH') {
       const [result] = await conn.query(queries.getMission());
    
      const missionid = req.body.missionid;
      const amount = req.body.amount;
      const increaseamount = amount;

      const foundmission = result.filter(item => missionid === item.id);
      console.log(foundmission);

      const mission_reward = foundmission[0].mission_reward;
      console.log(mission_reward);
    
      await conn.query(queries.increasebet(missionid, increaseamount));

      res.status(200).json({ message: `mission_reward 증가 완료: ${mission_reward + increaseamount}`});

      await conn.end();
    } else {
      return res.status(400).json({ message: "미션 없음" });
    }

  }