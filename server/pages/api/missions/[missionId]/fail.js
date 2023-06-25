import AWS from 'aws-sdk';
import { connectDb, queries } from '../../../../utils/database';
import { handlerfail } from '../../events/fail.js';

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-2',
    endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
  });

export default async function handler(req, res){
  const missionId = req.body.mission_id

  if(req.method === 'POST') {
    handlerfail(req, res)
  }

  if(req.method === 'PUT'){   
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


      const items = result.Items.map(item => {
        return {
          user_id: item.user_id,
          amount: parseInt(item.amount, 10)
        };
      });

      console.log(items);
      
      for (let i = 0; i < items.length; i++) {
        let user_id = items[i].user_id;
        let amount = items[i].amount;
      
        const conn = await connectDb();
        let [user] = await conn.query(queries.getUserByid(user_id));
        console.log(user);
      
        if (user.length > 0) {
          let cash = user[0].cash;
          console.log(cash);
      
          if (isNaN(amount)) {
            amount = 0; // 유효하지 않은 값이면 0으로 설정
          }
      
          await conn.query(queries.increaseUserCash(user_id, amount));
        
          res.status(200).json({ message : `스트리머 실패!!, 시청자에게 금액 정산 완료`});
        
          await conn.query(queries.deactivateMission(missionId));
        } else {
          console.log(`User with ID ${user_id} not found.`);
        }
        
        await conn.end();
      }
  }
}