'use strict';
const axios = require("axios");

module.exports.handler = async (event) => {

  console.log(event)

  const missionId = event.detail.missionid

  const mission = {
    mission_id: missionId,
    user_id : event.detail.userid,
    amount : event.detail.amount,
  }

  console.log(mission)

  try {
    await axios.post(`http://wngud9646.click/api/missions/${missionId}/bet`,mission)
    await axios.put(`http://wngud9646.click/api/missions/${missionId}/bet`,mission)
      console.log(data);
    }catch(error) {
      console.log(error);
  };
}
