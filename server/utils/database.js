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
    console.log('데이터베이스 연결');
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

const verify = (user_id, password) => `
  SELECT * 
  FROM user 
  WHERE user_id = "${user_id}" AND password = "${password}"
`;

const postMission = (user_id, mission, mission_reward, timelimit, is_active) => `
  INSERT INTO mission (user_id, mission, mission_reward, timelimit, is_active)
  VALUES ('${user_id}', '${mission}', ${mission_reward}, ${timelimit}, ${is_active});
`

const getPostedMission = () => `
  SELECT *
  FROM mission
  WHERE id = LAST_INSERT_ID();
`

const users = [
  {
    id: 39590,
    username: '김예성',
    email: 'ibocok0@gmail.com',
    role: 'student',
    cash: 0,
    created_at: 'Thu Jun 15 2023 23:35:11 GMT+0900 (대한민국 표준시)',
    modified_at: 'Thu Jun 15 2023 23:35:11 GMT+0900 (대한민국 표준시)',
  },
  {
    id: 48943,
    username: '김예건',
    email: 'wlfka1020@gmail.com',
    role: 'developer',
    cash: 9999999999,
    created_at: 'Thu Oct 11 1994 23:35:23 GMT+0900 (대한민국 표준시)',
    modified_at: 'Thu Jun 15 2023 23:35:23 GMT+0900 (대한민국 표준시)',
  },
];

module.exports = {
  connectDb,
  queries: {
    getUser,
    getMission,
    verify,
    postMission,
    getPostedMission
  },
  users,
};

