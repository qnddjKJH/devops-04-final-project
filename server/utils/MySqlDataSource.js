import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { getSecrets } from './Secret';

export default class MySqlDataSource {
  async createUser(user) {
    const connection = await this.createConnection();
    // 2023.06.20 [@ibocok0] TODO 쿼리문 작성 부탁드립니다.
    const [result] = connection.query(``);
    connection.end();

    return result;
  }

  async readUsers() {
    const connection = await this.createConnection();
    // 2023.06.20 [@ibocok0] TODO 쿼리문 작성 부탁드립니다.
    const [result] = connection.query(`
      SELECT *
      FROM user
    `);
    connection.end();

    return result;
  }

  async createConnection() {
    const secrets = await getSecrets('database');

    const host = secrets.host;
    const database = secrets.dbname;
    const user = secrets.username;
    const password = secrets.password;

    try {
      return await mysql.createConnection({ host, user, password, database });
    } catch (e) {
      console.log(e);
      throw new Error('데이터베이스 연결 오류');
    }
  }
}

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

const postMission = (
  user_id,
  mission,
  mission_reward,
  timelimit,
  is_active,
) => `
  INSERT INTO mission (user_id, mission, mission_reward, timelimit, is_active)
  VALUES ('${user_id}', '${mission}', ${mission_reward}, ${timelimit}, ${is_active});
`;

const putMission = (id, mission) => `
  UPDATE mission
  SET mission= "${mission}"
  where id = ${id}
`;

const getPostedMission = () => `
  SELECT *
  FROM mission
  WHERE id = LAST_INSERT_ID();
`;

const deactivateMission = (id) => `
  UPDATE mission
  SET is_active = false
  where id = ${id}
`;
