'use strict';
const AWS = require('aws-sdk');
const axios = require("axios");

export default async function handler(req, res) {

  console.log(req.body)
if(req.method === 'PATCH'){
  const mission = {
    missionid: req.body.missionid,
    amount: req.body.amount
  }

  try {
    const response = await axios.patch("http://localhost:3000/api/events/fail", mission)
      console.log(response.data);
      res.send("Success");
    }catch(error) {
      console.log(error);
      res.send("ERROR");
 };
}
}