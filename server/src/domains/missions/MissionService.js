const { default: Mission } = require("./MissionEntity");

class MissionService {
  constructor(missionRepository, userRepository) {
    this._missionRepository = missionRepository;
    this._userRepository = userRepository;
  }

  async getAllMissions() {
    try {
      const missions = await this._missionRepository.getAllMissions();

      return missions;
    } catch (error) {
      throw new Error('Failed to get missions');
    }
  }

  async getMissionById(id) {
    try {
      const mission = await this._missionRepository.getMissionById(id);

      return mission;
    } catch (error) {
      throw new Error('Failed to get mission');
    }
  }

  async createMission(mission) {
    try {
      const createdMissionId = await this._missionRepository.createMission(mission);
      
      return createdMissionId;
    } catch (error) {
      throw new Error('Failed to create mission');
    }
  }

  async updateMission(id, mission) {
    try {
      await this._missionRepository.updateMission(id, mission);
    } catch (error) {
      throw new Error('Failed to update mission');
    }
  }

  async deleteMission(id) {
    try {
      await this._missionRepository.deleteMission(id);
    } catch (error) {
      throw new Error('Failed to delete mission');
    }
  }

  async betOnMission(user_id, mission_id, amount) {
    try {
      const user = await this._userRepository.getUserById(user_id);
      const mission = await this._missionRepository.getMissionById(mission_id);

      user.decreaseCash(amount);
      mission.bet(amount);

      await this._userRepository.updateUser(user);
      await this._missionRepository.updateMission(mission);

      return mission
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to bet on mission');
    }
  }

  async successOnMission(mission_id) {
    try {
      const mission = await this._missionRepository.getMissionById(mission_id)
      const streamer_id = mission.streamerId

      const streamer = await this._userRepository.getUserById(streamer_id);

      mission.setDeactive();
      streamer.increaseCash(mission.missionReward);

      await this._userRepository.updateUser(streamer);
      await this._missionRepository.updateMission(mission);
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to seccess on mission');
    }
  }

  async failOnMission(mission_id, items) {
    try {
      const mission = await this._missionRepository.getMissionById(mission_id);

      mission.setDeactive();
      this._missionRepository.updateMission(mission)

      for (const item of items) {
        const user = await this._userRepository.getUserById(item.userId);
        user.increaseCash(item.amount);
  
        await this._userRepository.updateUser(user);
      }
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to fail on mission');
    }
  }

  async deactiveMission(mission_id) {
    try {
      const mission = await this._missionRepository.getMissionById(mission_id);

      mission.setDeactive();

      await this._missionRepository.updateMission(mission)
    } catch (error) {
      console.error(error.stack);
      throw new Error('Failed to deactived mission');
    }
  }
}

module.exports = MissionService;