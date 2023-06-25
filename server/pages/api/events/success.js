import AWS from 'aws-sdk';
import { connectDb, queries } from '../../../utils/database';
import Cors from 'cors';

const cors = Cors({
    origin: '*',
    methods: ['PATCH'],
  });


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
    
      console.log(result)
      
      const [user] = await conn.query(queries.getUser())
      console.log(user);

      const [mission] = await conn.query(queries.getMission())

      const mission_reward = mission[missionId].mission_reward
      console.log(mission_reward);

      var dynamo_streamer = result.Items[0].streamer

      const foundStreamer = user.filter(user => user.username === dynamo_streamer && user.role === "streamer");
      const streamer = foundStreamer

      const user_streamer = streamer[0];

      const username = user_streamer.username;

      console.log(username)

      if(user_streamer){
        await conn.query(queries.increaseStrimerCash(username, mission_reward))
        res.status(200).send("스트리머 성공!!, 스트리머에게 금액 정산 완료");
        await conn.query(queries.deactivateMission(missionId))
        } else {
            res.status(404).send("스트리머를 찾을 수 없습니다.");
          }
        await conn.end();
    } else {
        res.status(400).send('요청 에러');
    }              
};
