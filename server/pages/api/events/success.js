<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
import { verifyToken } from '../../../utils/jwt';
import { missionresultParams } from '../../../utils/params';
import { sendEvent } from '../../../utils/eventBridgeClient';
import { connectDb, queries } from '../../../utils/database';
import AWS from 'aws-sdk';
import {
  createSubscription,
  publishtoTopic,
} from '../../../utils/snsClient';
<<<<<<< HEAD
=======
import AWS from 'aws-sdk';
import { connectDb, queries } from '../../../utils/database';
import Cors from 'cors';

const cors = Cors({
    origin: '*',
    methods: ['PATCH'],
  });

>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

const docClient = new AWS.DynamoDB.DocumentClient({
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

export default async function handlersuccess(req, res) {
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);
  const missionId = parseInt(req.body.mission_id);

  if (decoded) {
    if (req.method === 'POST') {
      const event = missionresultParams(
        missionId,
        req.body.transactionId,
        'success',
      );

      createSubscription(missionId, 'success');
      sendEvent(event);

      const conn = await connectDb();
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
            "action": 'success',
            "amount": 0,
          }
        }
      }

    console.log(params);

    docClient.put(params).promise()
      .then(data => {
        return res.status(200).json({message: '미션 성공!'});
      })
      .catch(err => {
        return res.status(400).json({message: 'mission is undifiend'});
      });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = {
  handlersuccess
<<<<<<< HEAD
};
=======
    region: 'ap-northeast-2',
    endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
  });


export default async function handler(req, res){
  const secrets = await getSecrets(secretName);
  const missionId = req.body.missionid
  const conn = await connectDb();
    
  if(req.method === 'PATCH'){
      var params = {
        TableName: "mission_link_dynamodb_table",
        FilterExpression: "mission_id = :mission_id",
        ExpressionAttributeValues: {
          ":mission_id": missionId
         }
      };
    
      console.log(params)
    
      let result
      await docClient.scan(params).promise()
      .then(data => {
          console.log(data);
          result = data;
      })
      .catch(err => {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      });
    
      console.log(result)
      
      const [user] = await conn.query(queries.getUser())
      console.log(user);

      const [mission] = await conn.query(queries.getMission())

      const mission_reward = mission[missionId].mission_reward
      console.log(mission_reward);

      var dynamo_streamer = result.Items[0].streamer

      const foundStreamer = user.filter(user => user.username === dynamo_streamer && user.role === "streamer");
      const streamer = foundStreamer

      const user_streamer = streamer[0];

      const username = user_streamer.username;

      console.log(username)

      if(user_streamer){
        await conn.query(queries.increaseStrimerCash(username, mission_reward))
        res.status(200).send("스트리머 성공!!, 스트리머에게 금액 정산 완료");
        await conn.query(queries.deactivateMission(missionId))
        } else {
            res.status(404).send("스트리머를 찾을 수 없습니다.");
          }
        await conn.end();
    } else {
        res.status(400).send('요청 에러');
    }              
};
>>>>>>> 9eec436 (feat: 배팅 했을 때 미션 테이블 금액 증가, 유저 테이블 cash 감소, 미션 성공, 실패 시 금액 정산, 미션 생성 시 유저 테이블 cash 감소 기능 추가)
=======
};
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
