import {
  SNSClient,
  SubscribeCommand,
  PublishCommand,
  ListSubscriptionsByTopicCommand
} from '@aws-sdk/client-sns';
import { connectDb, queries, users } from './database';
// Set the AWS Region.
const REGION = 'ap-northeast-2'; //e.g. "us-east-1"
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION });

const existingSubscription = async (email, topicArn) => {
  const listSubscriptionsParams = {
    TopicArn: topicArn
  };

  const listSubscriptionsResponse = await snsClient.send(new ListSubscriptionsByTopicCommand(listSubscriptionsParams));
  const subscriptions = listSubscriptionsResponse.Subscriptions;

  const existingSubscription = subscriptions.find(sub => sub.Endpoint === email);

  return !!existingSubscription;
};

const createSubscription = async (id, result) => {
  const conn = await connectDb();

  const [userinfo] = await conn.query(queries.getEmail(id));
  await conn.end();
  const values = userinfo.map((obj) => Object.values(obj)[0]);
  const email = values.join(', ');

  let topicArn;
  if (result === 'success') {
    topicArn =
      'arn:aws:sns:ap-northeast-2:257840391579:mission_link_success_sns';
  } else if (result === 'fail') {
    topicArn = 'arn:aws:sns:ap-northeast-2:257840391579:mission_link_fail_sns';
  }

  const params = {
    Protocol: 'email' /* required */,
    TopicArn: topicArn, //TOPIC_ARN
    Endpoint: email, //EMAIL_ADDRESS
  };
  
  const verify = await existingSubscription(email, topicArn) // 중복된 구독 검사하는 비동기함수 완료 후 저장

  const subscription = async () => {
    let data;
    try {
      if (!verify) {
        data = await snsClient.send(new SubscribeCommand(params));
        console.log('Subscribe Success.');
        return data; // For unit tests.
      } else {
        return '중복되는 구독 존재';
      }
    } catch (err) {
      console.log('Error', err.stack);
    }
  };

  return subscription();
};

const publishtoTopic = (result) => {
  const successParams = {
    Message:
      '등록하신 미션이 성공되었습니다. Cash가 스트리머에게 지급 완료되었습니다.', // MESSAGE_TEXT
    TopicArn:
      'arn:aws:sns:ap-northeast-2:257840391579:mission_link_success_sns', //TOPIC_ARN
  };

  const failParams = {
    Message: '등록하신 미션이 실패하였습니다.', // MESSAGE_TEXT
    TopicArn:
      'arn:aws:sns:ap-northeast-2:257840391579:mission_link_success_sns', //TOPIC_ARN
  };

  const publish = async () => {
    try {
      let data;
      if (result === 'success') {
        data = await snsClient.send(new PublishCommand(successParams));
      } else if (result === 'fail') {
        data = await snsClient.send(new PublishCommand(failParams));
      }
      console.log('Success.', data);
      return data; // For unit tests.
    } catch (err) {
      console.log('Error', err.stack);
    }
  };

  return publish();
};

module.exports = {
  createSubscription,
  publishtoTopic,
};
