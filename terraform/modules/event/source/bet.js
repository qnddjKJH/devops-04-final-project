'use strict';
const axios = require("axios");

module.exports.handler = async (event) => {

  console.log(event)

  const missionId = event.detail.missionid

  const data = {
    user_id : event.detail.userid,
    amount : event.detail.amount,
  }

  console.log(data)

  try {
    await axios.put(`http://wngud9646.click/api/missions/${missionId}/bet`,mission)
  }catch(error) {
    console.error(error.stack);
    throw new Error(`axios fail 'PUT /api/missions/${missionId}/bet'`);
  };
}
