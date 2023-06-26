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
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    if (req.method === 'GET') {
      const conn = await connectDb();
      const [result] = await conn.query(queries.getMission());
      await conn.end();
      res.status(200).json(result);
    } else if (req.method === 'POST') {
      if (req.body.user_id === undefined) {
        res.status(400).json('userid is undefined')
      }

      const { user_id: userId, streamer_id, mission, mission_reward, timelimit, is_active } = req.body;
      
      const conn = await connectDb();
      await conn.query(queries.postMission(userId, streamer_id, mission, mission_reward, timelimit, is_active));
      const [result] = await conn.query(queries.getPostedMission());

      const requserid = req.body.user_id;
      console.log(requserid)

      const [user] = await conn.query(queries.getUserByid(requserid));
      console.log(user)

      const userid = user[0].id;
      const amount = req.body.mission_reward;

      const cash = user[requserid-1].cash
      console.log(cash)

      console.log(userid);

      if (requserid === userid && cash >= amount) {
        await conn.query(queries.decreaseUserCache(userid, amount));
        res.status(200).json({ message: `미션 생성!!, user cash 감소 완료: ${cash - amount}` });
      } else {
        res.status(400).send("금액을 충전해 주세요");
      }
      await conn.end();
    } 
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
} 