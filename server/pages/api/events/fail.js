import AWS from 'aws-sdk';
import { connectDb, queries } from '../../../utils/database';


const { getSecrets } = require('../../../utils/secret');
const secretName = 'finaldb';

const docClient = new AWS.DynamoDB.DocumentClient({
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
  
      const [user] = await conn.query(queries.getUser())

      const itemIds = result.Items.map(item => {
        return {
          user_id: item.user_id,
          amount: parseInt(item.amount, 10)
        };
      });

      console.log(itemIds);

      const foundUsers = itemIds.map(itemId => user.find(userItem => userItem.id === itemId.user_id)).filter(Boolean);

      console.log(foundUsers);


      
    for(let i = 0; i < foundUsers.length; i++) {
      let amount = itemIds[i].amount
      let dynamo_userid = itemIds[i].user_id
      console.log(dynamo_userid)

      for(let j = 0; j < foundUsers.length; j++){
          let userid = foundUsers[j].id
          if (isNaN(amount)) {
            amount = 0; // 유효하지 않은 값이면 0으로 설정
          }
            
          if(dynamo_userid === userid){
            await conn.query(queries.increaseUserCash(userid, amount))
          }
      } 
    } 
    res.status(200).send("스트리머 실패!!, 시청자에게 금액 정산 완료");

    await conn.query(queries.deactivateMission(missionId))
    await conn.end();
      
    } else {
      res.status(400).send('요청 에러');
  }     
}