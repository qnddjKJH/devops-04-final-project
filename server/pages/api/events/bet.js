<<<<<<< HEAD
import { verifyToken } from '../../../utils/jwt';
import { createBetParams } from '../../../utils/params';
import { sendEvent } from '../../../utils/eventBridgeClient';
import { connectDb, queries } from '../../../utils/database';
import AWS from 'aws-sdk';

const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

export default async function handlerbet(req, res) {
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);
  const missionId = parseInt(req.body.mission_id);
  const conn = await connectDb();

  if (decoded) {
    if (req.method === 'POST') {
      const event = createBetParams(
        missionId,
        req.body.amount,
        req.body.transactionId
      );
      console.log(event);

      const result = sendEvent(event)
      
      const [resultdynamo] = await conn.query(queries.getMissionById(missionId));
      await conn.end();
      
      if(resultdynamo.length !== 0) {
        var params = {
          TableName: "mission_link_dynamodb_table",
          Item: {
            "id": req.body.transactionId,
            "mission_id" : missionId,
            "user_id": req.body.user_id,
            "streamer_id" : req.body.streamer_id,
            "action": "bet",
            "amount": req.body.amount,
          }
        }
      }

    console.log(params);

    docClient.put(params).promise()
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      res.status(400).json({message: 'mission is undifiend'});
    });
  }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = {
  handlerbet
};
=======

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
>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)
