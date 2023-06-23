import { connectDb, queries, users } from '../../../utils/database';
import { verifyToken } from '../../../utils/jwt';
import AWS from 'aws-sdk';

const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

export default async function handler(req, res){
  const conn = await connectDb();
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    if (req.method === 'GET') {
      const [result] = await conn.query(queries.getMission());
      await conn.end();
      res.status(200).json(result);
    } else if (req.method === 'POST') {
      if (req.body.user_id === undefined) {
        res.status(400).json('userid is undefined')
      }

      const { user_id: userId, mission, mission_reward, timelimit, is_active } = req.body;
      
      await conn.query(queries.postMission(userId, mission, mission_reward, timelimit, is_active));
      const [result] = await conn.query(queries.getPostedMission());
      await conn.end();

      var params = {
        TableName: "mission_link_dynamodb_table",
        Item: {
          "id" : req.body.transactionId,
          "user_id": req.body.user_id,
          "mission_id" : req.body.mission_id,
          "mission_reward": req.body.mission_reward,
          "timelimit": req.body.timelimit,
          "is_active": req.body.is_active
        }
      }
      console.log(params);

      docClient.put(params).promise()
      .then(data => {
        res.status(200).json(result[0]);
      })
      .catch(err => {
        res.status(400).json({message: 'mission is undifiend'});
      });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
