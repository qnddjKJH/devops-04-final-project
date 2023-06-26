'use strict';
const axios = require("axios");

module.exports.handler = async (event) => {

console.log(event);

const missionId = event.detail.missionid

  const mission = {
    missionid: missionId,
    amount : event.detail.amount
  }

  console.log(mission)

  try {
    await axios.put(`http://wngud9646.click/api/missions/${missionId}/success`,mission)
      console.log(data);
    }catch(error) {
      console.log(error);
    };
  }

