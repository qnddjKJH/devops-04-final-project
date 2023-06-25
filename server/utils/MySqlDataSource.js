import mysql from 'mysql2/promise';

export default class MySqlDataSource {
  constructor(secretsManager) {
    this._secretsManager = secretsManager;
  }

  async createUser(user) {
    const connection = await this.createConnection();
    // 2023.06.20 [@ibocok0] TODO 쿼리문 작성 부탁드립니다.
    const [result] = connection = await query(`
      INSERT INTO users (id, user_id, password, username, email, role, cash, created_at, modified_at)
      VALUES (${user.id}, '${user.user_id}', '${user.password}', '${user.username}', '${user.email}', '${user.role}', ${user.cash}, '${user.created_at}', '${user.modified_at}');
    `);
    connection.end();

    return result;
  }

  async readUsers() {
    const connection = await this.createConnection();
    const [result] = connection = await query(`
      SELECT *
      FROM users;
    `);
    connection.end();

   return result;
  }

  async readUser(userId) {
    const connection = await this.createConnection();
    const [result] = connection = await query(`
      SELECT *
      FROM users
      WHERE id = ${userId};
    `);
    connection.end();

   return result;
  }

  async updateUser(userId) {
    const connection = await this.createConnection();
    connection = await query(`

    `);
    connection.end();

   return null;
  }

  async deleteUser(userId) {
    const connection = await this.createConnection();
    connection = await query(`

    `);
    connection.end();

    return null;
  }

  async createConnection() {
    const secrets = await this._secretsManager.getDbSecret();

    const host = secrets.HOSTNAME;
    const database = secrets.DATABASE;
    const user = secrets.USERNAME;
    const password = secrets.PASSWORD;

    try {
      return await mysql.createConnection({ host, user, password, database });
    } catch (e) {
      console.log(e);
      throw new Error('데이터베이스 연결 오류');
    }
  }
}
