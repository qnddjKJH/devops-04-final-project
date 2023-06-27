import Mission from './MissionEntity';

class MissionRepository {
  constructor(datasource) {
    this._datasource = datasource;
  }

  async getAllMissions() {
    const connection = await this._datasource.createConnection();
    
    try {
      const [result] = await connection.query('SELECT * FROM missions WHERE is_active = true');

      const missions = result.map(row => 
          new Mission(
            row.id, 
            row.user_id, 
            row.streamer_id, 
            row.mission, 
            row.mission_reward, 
            row.timelimit, 
            row.is_active
          )
        );

      return missions;
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to get missions');
    } finally {
      connection.end();
    }
  }

  async getMissionById(id) {
    const connection = await this._datasource.createConnection();

    try {
      const [result] = await connection.query(`SELECT * FROM missions WHERE id = ${id}`);
      if (result.length === 0) {
        throw new Error('Mission not found');
      }

      const mission = new Mission(
        result[0].id, 
        result[0].user_id, 
        result[0].streamer_id, 
        result[0].mission, 
        result[0].mission_reward, 
        result[0].timelimit, 
        result[0].is_active
      );

      return mission;
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to get mission');
    } finally {
      connection.end();
    }
  }

  async createMission(create) {
    const connection = await this._datasource.createConnection();
    const { userId, streamerId, mission, missionReward, timeLimit, isActive } = create;
    
    try {
      const [result] = await connection.query(
        `INSERT INTO missions (user_id, streamer_id, mission, mission_reward, timelimit, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, streamerId, mission, missionReward, timeLimit, isActive]
      );
      
      return result.insertId;
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to create mission');
    } finally {
      connection.end();
    }
  }

  async updateMission(update) {
    const connection = await this._datasource.createConnection();
    const { id, userId, streamerId, mission, missionReward, timeLimit, isActive } = update;

    try {

      const [result] = await connection.query(
        'UPDATE missions SET user_id = ?, streamer_id = ?, mission = ?, mission_reward = ?, timelimit = ?, is_active = ? WHERE id = ?',
        [userId, streamerId, mission, missionReward, timeLimit, isActive, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Mission not found');
      }
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to update mission');
    } finally {
      connection.end();
    }
  }

  async deleteMission(id) {
    const connection = await this._datasource.createConnection();
    
    try {
      const [result] = await connection.query('DELETE FROM missions WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        throw new Error('Mission not found');
      }
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to delete mission');
    } finally {
      connection.end();
    }
  }

  
}

module.exports = MissionRepository;
