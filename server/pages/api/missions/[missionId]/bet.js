import { connectDb, queries } from '../../../../utils/database';

export default async function handler(req, res) {
<<<<<<< HEAD

<<<<<<< HEAD
  const missionId = req.query.missionId
  console.log(missionId)
=======
  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);
  const missionId = parseInt(req.query.missionId);
  const conn = await connectDb();
>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)

    if (req.method === 'POST') {
<<<<<<< HEAD
=======
    if (req.method === 'POST') {
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
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
<<<<<<< HEAD
      const conn = await connectDb();
      
      const mission_id = req.body.mission_id
      const [mission] = await conn.query(queries.getMissionById(mission_id));
=======
      const reqMissionid = req.body.missionid;
      const conn = await connectDb();
      const [mission] = await conn.query(queries.getMissionById(reqMissionid));
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
 
      const amount = req.body.amount;
      const increaseamount = amount;

      const missionid = mission[0].id
      const mission_reward = mission[0].mission_reward;
      console.log(mission_reward);
 
      await conn.query(queries.increasebet(missionid, increaseamount));
      await conn.end();
<<<<<<< HEAD

      return res.status(200).json({ message: `mission_reward 증가 완료: ${mission_reward + increaseamount}`});
    } else {
      return res.status(400).json({ message: "미션 없음" });
=======
      const event = createBetParams(
        missionId,
        req.body.amount,
        req.body.transactionId
      );
      console.log(event);

      const result = sendEvent(event)
      
      const [resultdynamo] = await conn.query(queries.getMissionById(missionId));

      if(resultdynamo.length !== 0) {
        var params = {
          TableName: "mission_link_dynamodb_table",
          Item: {
            "id": req.body.transactionId,
            "mission_id" : missionId,
            "user_id": req.body.user_id,
            "streamer" : req.body.streamer_name,
            "action": "bet",
            "amount": req.body.amount,
          }
        }
      }

    console.log(params);
     
    let data;
    docClient.put(params).promise()
    .then(data => {
        data = data
    })
    .catch(err => {
      res.status(400).json({message: 'mission is undifiend'});
    });

      const [user] = await conn.query(queries.getUser());
      const dynamouserid = req.body.user_id;
      const userid = user[dynamouserid-1].id;
      const amount = req.body.amount;
      console.log(dynamouserid);

      const cash = user[dynamouserid-1].cash
      console.log(cash)

      console.log(userid);

      if (dynamouserid === userid && cash >= amount) {
        console.log(userid);
        await conn.query(queries.decreaseUserCache(userid, amount));
        res.status(200).json({ message: `배팅 성공!!, user cache 감소 완료: ${cash - amount}` });
      } else {
        res.status(400).send("cash is zero, 금액을 충전해 주세요");
      }
      await conn.end();
  } 
} else {
  res.status(401).json({ message: 'Unauthorized' });
>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)
=======

      return res.status(200).json({ message: `mission_reward 증가 완료: ${mission_reward + increaseamount}`});
    } else {
      return res.status(400).json({ message: "미션 없음" });
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
  }
  
} 
