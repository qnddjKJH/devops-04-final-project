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

const getUserByid = (id) => `
  SELECT *
  FROM users
  WHERE id = ${id};
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

const postMission = (user_id, streamer_id, mission, mission_reward, timelimit, is_active) => `
  INSERT INTO missions (user_id, streamer_id, mission, mission_reward, timelimit, is_active)
  VALUES ('${user_id}', '${streamer_id}', '${mission}', ${mission_reward}, ${timelimit}, ${is_active});
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
  SET is_active = false, mission_reward = 0
  where id = ${id};
`
const getEmail = (id) => `
  SELECT email
  FROM users
  where id = "${id}";
`

const increasebet = (missionid, increaseamount) => `
  UPDATE missions SET mission_reward = mission_reward + ${increaseamount} WHERE id = ${missionid};
`

const increaseUserCash = (id, amount) => `
  UPDATE users SET cash = cash + ${amount} WHERE id = ${id};
`;

const increaseStrimerCash = (streamerid, mission_reward) => `
  UPDATE users SET cash = cash + ${mission_reward} WHERE id = '${streamerid}';
`;

const decreaseUserCache = (id, decreaseamount) => `
  UPDATE users SET cash = cash - ${decreaseamount} WHERE id = ${id};
`;

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
    getEmail,
    increasebet,
    increaseUserCash,
    increaseStrimerCash,
    decreaseUserCache,
    getUserByid
  },
};