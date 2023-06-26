import { verifyToken } from '../../../utils/jwt';
import { missionresultParams } from '../../../utils/params';
import { sendEvent } from '../../../utils/eventBridgeClient';
import { connectDb, queries } from '../../../utils/database';
import AWS from 'aws-sdk';
import {
  createSubscription,
  publishtoTopic,
} from '../../../utils/snsClient';

const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

export default async function handlerfail(req, res) {
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
        'fail',
      );

      createSubscription(missionId, 'fail');
      sendEvent(event);

      const conn = await connectDb();
      const [resultdynamo] = await conn.query(queries.getMissionById(missionId));
      await conn.end();

      if(resultdynamo.length !== 0) {
        var params = {
          TableName: "mission_link_dynamodb_table",
          Item: {
            "id": req.body.transactionId,
            "mission_id": missionId,
            "user_id": req.body.user_id,
            "streamer_id" : req.body.streamer_id,
            "action": 'fail',
            "amount": 0,
          }
        }
      }

      console.log(params);

    docClient.put(params).promise()
      .then(data => {
        return res.status(200).json({message: '미션 실패'});
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
  handlerfail
};
