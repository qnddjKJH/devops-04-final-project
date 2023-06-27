import { verifyToken } from '../../../../utils/jwt';
import AWS from 'aws-sdk';

const { getSecrets } = require('../../../../utils/secret');
const secretName = 'finaldb';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

export default async function handlercreate(req, res){
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

if (decoded) {
  if (req.method === 'POST') {
    const params = {
      TableName: "mission_link_dynamodb_table",
      Item: {
        "id" : req.body.transactionId,
        "user_id": req.body.userid,
        "mission_id" : req.body.missionid,
        "streamer_id" : req.body.streamer_id,
        "action": 'missionCreate',
        "amount": req.body.amount
      }
    }
  console.log(params);
  
  let rep;
  await docClient.put(params).promise()
  .then(async data => {
    res.status(200).json({ message: '미션 기록' });
    rep = data
  })
  .catch(err => {
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    res.status(500).json({ message: 'Internal Server Error' });
  });
  }
} else {
  return res.status(401).json({ message: 'Unauthorized' });
}
}