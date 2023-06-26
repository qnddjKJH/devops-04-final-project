import { connectDb, queries } from '../../../../utils/database';
import { useRouter } from 'next/router'

export default async function handler(req, res){
  
  const router = useRouter()
  const { missionId } = router.query
  
  if(req.method === 'PUT'){   
      const items = req.body;

      console.log(items)

      for (let i = 0; i < items.length; i++) {
        let user_id = items[i].user_id;
        let amount = items[i].amount;
        
      
        const conn = await connectDb();
        let [user] = await conn.query(queries.getUserByid(user_id));
        console.log(user);
      
        if (user.length > 0) {
          let cash = user[0].cash;
          console.log(cash);
      
          if (isNaN(amount)) {
            amount = 0; // 유효하지 않은 값이면 0으로 설정
          }
      
          await conn.query(queries.increaseUserCash(user_id, amount));
        
          res.status(200).json({ message : `스트리머 실패!!, 시청자에게 금액 정산 완료`});
        
          await conn.query(queries.deactivateMission(missionId));
        } else {
          console.log(`User with ID ${user_id} not found.`);
        }
        
        await conn.end();
      }
  }
}