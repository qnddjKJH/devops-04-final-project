import { connectDb, queries } from '../../../../utils/database';
import { handlerbet } from '../../events/bet.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      
      handlerbet(req, res)

      const requserid = req.body.user_id;
      const conn = await connectDb();
      const [user] = await conn.query(queries.getUserByid(requserid));
      const userid = user[0].id;
      console.log(userid)
      
      const amount = req.body.amount;
      console.log(requserid);

      const cash = user[0].cash;
      console.log(cash)

      if (cash >= amount) {
        await conn.query(queries.decreaseUserCache(userid, amount));
        await conn.end();
        return res.status(200).json({ message: `배팅 성공!!, user cash 감소 완료: ${cash - amount}` });
      } else {
        return res.status(400).send("금액을 충전해 주세요");
      }
  }
   else if (req.method === 'PUT') { 
      const reqMissionid = req.body.missionid;
      const conn = await connectDb();
      const [mission] = await conn.query(queries.getMissionById(reqMissionid));
 
      const amount = req.body.amount;
      const increaseamount = amount;

      const missionid = mission[0].id
      const mission_reward = mission[0].mission_reward;
      console.log(mission_reward);
 
      await conn.query(queries.increasebet(missionid, increaseamount));
      await conn.end();

      return res.status(200).json({ message: `mission_reward 증가 완료: ${mission_reward + increaseamount}`});
    } else {
      return res.status(400).json({ message: "미션 없음" });
  }
}
