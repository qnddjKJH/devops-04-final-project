import UserEntity from './UserEntity';

class UserRepository {
  constructor(datasource) {
    this._datasource = datasource;
  }
  
  async createUser(user) {
    try {
      const connection = await this._datasource.createConnection();

      const { user_id, password, username, email, role, cash } = user;
      const result = await connection.query(
        'INSERT INTO users (user_id, password, username, email, role, cash) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, password, username, email, role, cash]
      );
      connection.end();
      return result.insertId;
    } catch (error) {
      throw new Error('사용자 생성에 실패했습니다.');
    }
  }
  
  async getUserById(id) {
    try {
      const connection = await this._datasource.createConnection();
      
      const [result] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
      connection.end();
      if (!result) {
        return null;
      }
  
      const { user_id, password, username, email, role, cash } = result;
      const user = new UserEntity(id, user_id, password, username, email, role, cash);
      return user;
    } catch (error) {
      throw new Error('사용자 조회에 실패했습니다.');
    }
  }
  
  async updateUser(user) {
    try {
      const connection = await this._datasource.createConnection();
      const { id, user_id, password, username, email, role, cash } = user;
      const result = await connection.query(
        'UPDATE users SET user_id = ?, password = ?, username = ?, email = ?, role = ?, cash = ? WHERE id = ?',
        [user_id, password, username, email, role, cash, id]
      );
      connection.end();
      if (result.affectedRows === 0) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
    } catch (error) {
      throw new Error('사용자 업데이트에 실패했습니다.');
    }
  }
  
  async deleteUser(id) {
    try {
      const connection = await this._datasource.createConnection();
      const result = await connection.query('DELETE FROM users WHERE id = ?', [id]);
      connection.end();
      if (result.affectedRows === 0) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
    } catch (error) {
      throw new Error('사용자 삭제에 실패했습니다.');
    }
  }
}

module.exports = UserRepository;
