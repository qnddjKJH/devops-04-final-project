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
  const missionId = req.query.missionId
  const conn = await connectDb();

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
=======
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

export default async function handler(req, res) {
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);
  const missionId = parseInt(req.query.missionId);

  if (decoded) {
    if (req.method === 'POST') {
      const event = missionresultParams(
        missionId,
        req.body.transactionId,
        'success',
      );

      // createSubscription(missionId, 'success');
      // sendEvent(event);

      // res.status(200).json({ message: '미션 성공 요청 전송 완료' });

      if(resultdynamo.length !== 0) {
        var params = {
          TableName: "mission_link_dynamodb_table",
          Item: {
            "id": req.body.transactionId,
            "mission_id" : missionId,
            "user_id": req.body.user_id,
            "streamer" : req.body.streamer_name,
            "action": 'success',
            "amount": 0,
          }
        }
      }

    console.log(params);

    docClient.put(params).promise()
      .then(data => {
        res.status(200).json({message: '미션 성공!'});
      })
      .catch(err => {
        res.status(400).json({message: 'mission is undifiend'});
      });
>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)
    }
    await conn.end();
};

