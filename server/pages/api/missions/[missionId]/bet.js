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
  const missionId = parseInt(req.query.missionId);
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
  }
  
} 
