const mysql = require('mysql2/promise');
require('dotenv').config();
const { getSecrets } = require('./secret');

const secretName = 'finaldb';

const connectDb = async () => {
  try {
    const secrets = await getSecrets(secretName);

    const host = secrets.HOSTNAME;
    const user = secrets.USERNAME;
    const password = secrets.PASSWORD;
    const database = secrets.DATABASE;

    const conn = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });
    return conn;
  } catch (e) {
    console.log(e);
    throw new Error('데이터베이스 연결 오류');
  }
};

const getUser = () => `
  SELECT *
  FROM user
`;

const getMission = () => `
  SELECT *
  FROM mission
`;

const getMissionById = (id) => `
  SELECT *
  FROM mission
  WHERE id = ${id}
`;

const verify = (user_id, password) => `
  SELECT * 
  FROM user 
  WHERE user_id = "${user_id}" AND password = "${password}"
`;

const postMission = (user_id, mission, mission_reward, timelimit, is_active) => `
  INSERT INTO mission (user_id, mission, mission_reward, timelimit, is_active)
  VALUES ('${user_id}', '${mission}', ${mission_reward}, ${timelimit}, ${is_active});
`

const putMission = (id, mission) => `
  UPDATE mission
  SET mission= "${mission}"
  where id = ${id}
`

const getPostedMission = () => `
  SELECT *
  FROM mission
  WHERE id = LAST_INSERT_ID();
`

const deactivateMission = (id) => `
  UPDATE mission
  SET is_active = false
  where id = ${id}
`

module.exports = {
  connectDb,
  queries: {
    getUser,
    getMission,
    getMissionById,
    verify,
    postMission,
    putMission,
    getPostedMission,
    deactivateMission
  }
};

