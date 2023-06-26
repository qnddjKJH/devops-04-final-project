import { connectDb, queries } from '../../../../utils/database';

export default async function handler(req, res){

  const missionId  = req.query.missionId

  const conn = await connectDb();
  
  if(req.method === 'PUT'){   
      const items = req.body;

      console.log(items)

      for (let i = 0; i < items.length; i++) {
        let user_id = items[i].user_id;
        console.log(user_id)
        let amount = items[i].amount;
        
        let [user] = await conn.query(queries.getUserByid(user_id));
        console.log(user);
      
        if (user.length > 0) {
          let cash = user[0].cash;
          console.log(cash);
      
          if (isNaN(amount)) {
            amount = 0; // 유효하지 않은 값이면 0으로 설정
          }
      
          await conn.query(queries.increaseUserCash(user_id, amount))

          await conn.query(queries.deactivateMission(missionId));
          await conn.end();
        
        }
        await conn.end();
      }
      res.status(200).json({ message : `스트리머 실패!!, 시청자에게 금액 정산 완료`});
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}