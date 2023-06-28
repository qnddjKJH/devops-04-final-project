'use strict';
const axios = require("axios");

module.exports.handler = async (event) => {

  console.log(event);

  const missionId = event.detail.missionid

  try {
    await axios.put(`http://wngud9646.click/api/missions/${missionId}/success`)
  }catch(error) {
    console.error(error.stack);
    throw new Error(`axios fail 'PUT /api/missions/${missionId}/success'`);
  };
}

