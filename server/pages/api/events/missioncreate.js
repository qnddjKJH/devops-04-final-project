import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-2',
    endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
  })

export default async function handlercreate(req, res){
const params = {
    TableName: "mission_link_dynamodb_table",
    Item: {
      "id" : req.body.transactionId,
      "user_id": req.body.user_id,
      "mission_id" : req.body.mission_id,
      "streamer_id" : req.body.streamer_id,
      "action": 'missionCreate',
      "amount": req.body.mission_reward
    }
  }
  console.log(params);
  
  let rep;
await docClient.put(params).promise()
.then(async data => {
  rep = data
})
.catch(err => {
  console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
});

}
module.exports = {
    handlercreate
  };
