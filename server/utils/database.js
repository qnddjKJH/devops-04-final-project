const mysql = require('mysql2/promise');
require('dotenv').config();
const { getSecrets } = require('./secret');

const secretName = 'finaldb';

/* const {
  host: hostname,
      user: username,
      password: password,
      database: database
} = process.env; */

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

module.exports = {
  connectDb,
  queries: {
    getUser,
    getMission,
    verify,
  },
};
