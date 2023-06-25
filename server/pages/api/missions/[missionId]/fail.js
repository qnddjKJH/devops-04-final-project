import { verifyToken } from '../../../../utils/jwt';
import { missionresultParams } from '../../../../utils/params';
import { sendEvent } from '../../../../utils/eventBridgeClient';
import { connectDb, queries } from '../../../../utils/database';
import AWS from 'aws-sdk';
import {
  createSubscription,
  publishtoTopic,
} from '../../../../utils/snsClient';

const { getSecrets } = require('../../../../utils/secret');
const secretName = 'finaldb';

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
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
