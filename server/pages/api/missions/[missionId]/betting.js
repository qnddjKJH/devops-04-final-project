const AWS = require('aws-sdk');
// import { connectDb, queries } from '../../../../utils/database';

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-2',
    endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

export default async function handler(req, res){

  const missionId = parseInt(req.query.missionId);

   const conn = await connectDb();
   const [result] = await conn.query(queries.getMissionById(missionId));
   await conn.end();

   if(result.length !== 0) {
    var params = {
      TableName: "mission_link_dynamodb_table",
      Item: {
        "id": req.body.id,
        "missionid": missionId,
        "action": req.body.action,
        "amount": req.body.amount,
        "result": req.body.result,
        "etransactionId": req.body.transactionId,
      }
    }
   }

  docClient.put(params).promise()
    .then(data => {
      res.status(200).json(params);
  })
    .catch(err => {
      res.status(400).json({message: 'mission is undifiend'});
  });
}
