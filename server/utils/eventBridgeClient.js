import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
// Set the AWS Region.
const REGION = "ap-northeast-2"; //e.g. "us-east-1"
// Create an Amazon EventBridge service client object.
const ebClient = new EventBridgeClient({ region: REGION });

export const sendEvent = async (params) => {
  try {
    const data = await ebClient.send(new PutEventsCommand(params));
    console.log("Success, event sent; requestID:", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};