import { verifyToken } from '../../../../utils/jwt';
import { createBetParams } from '../../../../utils/params';
import { sendEvent } from '../../../../utils/eventBridgeClient';
import { connectDb, queries } from '../../../../utils/database';
import AWS from 'aws-sdk';

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

  if (decoded) {
    if (req.method === 'POST') {
      const event = createBetParams(
        req.body.id,
        req.body.amount,
        req.body.transactionId
      );
      console.log(event);

      const result = sendEvent(event)

      const missionId = parseInt(req.query.missionId);

      const conn = await connectDb();
      const [resultdynamo] = await conn.query(queries.getMissionById(missionId));
      await conn.end();

      if(resultdynamo.length !== 0) {
        var params = {
          TableName: "mission_link_dynamodb_table",
          Item: {
            "mission_id" : missionId,
            "user_id": req.body.userId,
            "action": req.body.action,
            "amount": req.body.amount,
            "id": req.body.transactionId
          }
        }
      }

    console.log(params);

    docClient.put(params).promise()
      .then(data => {
        res.status(200).json({message: '베팅 성공!'});
      })
      .catch(err => {
        res.status(400).json({message: 'mission is undifiend'});
      });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
