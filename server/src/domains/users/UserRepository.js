import User from './UserEntity';

class UserRepository {
  constructor(datasource) {
    this._datasource = datasource;
  }

  async getAllUsers() {
    const connection = await this._datasource.createConnection();

    try {
      const [result] = await connection.query('SELECT * FROM users');

      const users = result.map(row => 
          new User(
            row.id, 
            row.user_id, 
            row.password, 
            row.username, 
            row.email, 
            row.role, 
            row.cash,
            row.created_at,
            row.modified_at
          )
        );

      return users;
    } catch (error) {
      console.error(error.stack);
      throw new Error('사용자 조회에 실패했습니다.');
    } finally {
      connection.end();
    }
  }
  
  async getUserById(id) {
    const connection = await this._datasource.createConnection();
    
    try {
      const [result] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);

      if (!result) {
        return null;
      }
  
      const { user_id, password, username, email, role, cash } = result[0];
      const user = new User(id, user_id, password, username, email, role, cash);
      return user;
    } catch (error) {
      console.error(error.stack);
      throw new Error('사용자 조회에 실패했습니다.');
    } finally {
      connection.end();
    }
  }
  
  async createUser(user) {
    const connection = await this._datasource.createConnection();
    
    try {
      const { userId, password, username, email, role, cash } = user;
      const result = await connection.query(
        'INSERT INTO users (user_id, password, username, email, role, cash) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, password, username, email, role, cash]
      );

      return result[0].insertId;
    } catch (error) {
      console.error(error.stack);
      throw new Error('사용자 생성에 실패했습니다.');
    } finally {
      connection.end();
    }
  }
  
  async updateUser(user) {
    const connection = await this._datasource.createConnection();
    
    try {
      const { id, userId, password, username, email, role, cash } = user;
      const result = await connection.query(
        'UPDATE users SET user_id = ?, password = ?, username = ?, email = ?, role = ?, cash = ? WHERE id = ?',
        [userId, password, username, email, role, cash, id]
      );

      if (result.affectedRows === 0) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error(error.stack);
      throw new Error('사용자 업데이트에 실패했습니다.');
    } finally {
      connection.end();
    }
  }
  
  // todo: soft delete 로 전환
  // async deleteUser(id) {
  //   const connection = await this._datasource.createConnection();
    
  //   try {
  //     const result = await connection.query('DELETE FROM users WHERE id = ?', [id]);
  //     if (result.affectedRows === 0) {
  //       throw new Error('사용자를 찾을 수 없습니다.');
  //     }
  //   } catch (error) {
  //     throw new Error('사용자 삭제에 실패했습니다.');
  //   } finally {
  //     connection.end();
  //   }
  // }
}

module.exports = UserRepository;
