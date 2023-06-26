<<<<<<< HEAD
<<<<<<< HEAD
import { connectDb, queries } from '../../../../utils/database';
=======
import { verifyToken } from '../../../../utils/jwt';
import { missionresultParams } from '../../../../utils/params';
import { sendEvent } from '../../../../utils/eventBridgeClient';
import { connectDb, queries } from '../../../../utils/database';
import AWS from 'aws-sdk';
import {
  createSubscription,
  publishtoTopic,
} from '../../../../utils/snsClient';
>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)

export default async function handler(req, res){

<<<<<<< HEAD
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
=======
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});
=======
import AWS from 'aws-sdk';
import { connectDb, queries } from '../../../../utils/database';

export default async function handler(req, res){
  const missionId = req.body.mission_id
  if(req.method === 'PUT'){   
      const items = req.body;
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

      console.log(items)

<<<<<<< HEAD
  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);
  const missionId = parseInt(req.query.missionId);

  if (decoded) {
    if (req.method === 'POST') {
      const event = missionresultParams(
        missionId,
        req.body.transactionId,
        'fail',
      );

      createSubscription(missionId, 'fail');
      sendEvent(event);

      res.status(200).json({ message: '미션 실패 요청 전송 완료' });

      if(resultdynamo.length !== 0) {
        var params = {
          TableName: "mission_link_dynamodb_table",
          Item: {
            "id": req.body.transactionId,
            "mission_id": missionId,
            "user_id": req.body.user_id,
            "streamer" : req.body.streamer_name,
            "action": 'fail',
            "amount": 0,
          }
        }
      }

      console.log(params);

    docClient.put(params).promise()
      .then(data => {
        res.status(200).json({message: '미션 실패'});
      })
      .catch(err => {
        res.status(400).json({message: 'mission is undifiend'});
      });
    }
>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)
  } else {
    res.status(400).json({ message: 'Invalid request method' });
=======
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
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
  }
}