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
  FROM users;
`;

const getMission = () => `
  SELECT *
  FROM missions;
`;

const getMissionById = (id) => `
  SELECT *
  FROM missions
  WHERE id = ${id};
`;

const verify = (user_id, password) => `
  SELECT * 
  FROM users 
  WHERE user_id = "${user_id}" AND password = "${password}";
`;

const postMission = (user_id, mission, mission_reward, timelimit, is_active) => `
  INSERT INTO missions (user_id, mission, mission_reward, timelimit, is_active)
  VALUES ('${user_id}', '${mission}', ${mission_reward}, ${timelimit}, ${is_active});
`

const putMission = (id, mission) => `
  UPDATE missions
  SET mission= "${mission}"
  where id = ${id};
`

const getPostedMission = () => `
  SELECT *
  FROM missions
  WHERE id = LAST_INSERT_ID();
`

const deactivateMission = (id) => `
  UPDATE missions
  SET is_active = false
  where id = ${id};
`
const getEmail = (id) => `
  SELECT email
  FROM users
  where id = "${id}";
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
    deactivateMission,
    getEmail
  }
};

