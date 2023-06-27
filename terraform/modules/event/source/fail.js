'use strict';
const AWS = require('aws-sdk');
const axios = require("axios");

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
  endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
});

module.exports.handler = async (event) => {

  const missionId = event.detail.missionid

  console.log(event);

  var params = {
    TableName: "mission_link_dynamodb_table",
    FilterExpression: "mission_id = :mission_id",
    ExpressionAttributeValues: {
      ":mission_id": missionId
     }
  };

  console.log(params)

  try {
    const result = await docClient.scan(params).promise();

    console.log(result);

    const mission = result.Items.map(item => ({
      user_id: item.user_id,
      amount: item.amount
    }));
    
    console.log(JSON.stringify(mission));

    await axios.put(`http://wngud9646.click/api/missions/${missionId}/fail`, mission);

    res.status(200).json({ message: result });
    }  catch (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    }
  }
