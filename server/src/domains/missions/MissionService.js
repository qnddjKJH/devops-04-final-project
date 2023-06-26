const MissionRepository = require('./MissionRepository');

class MissionService {
  constructor(missionRepository, userRepository) {
    this._missionRepository = missionRepository;
    this._userRepository = userRepository;
  }

  async getAllMissions() {
    try {
      const missions = await this.missionRepository.getAllMissions();
      return missions;
    } catch (error) {
      throw new Error('Failed to get missions');
    }
  }

  async getMissionById(id) {
    try {
      const mission = await this.missionRepository.getMissionById(id);
      return mission;
    } catch (error) {
      throw new Error('Failed to get mission');
    }
  }

  async createMission(mission) {
    try {
      const createdMissionId = await this.missionRepository.createMission(mission);
      return createdMissionId;
    } catch (error) {
      throw new Error('Failed to create mission');
    }
  }

  async updateMission(id, mission) {
    try {
      await this.missionRepository.updateMission(id, mission);
    } catch (error) {
      throw new Error('Failed to update mission');
    }
  }

  async deleteMission(id) {
    try {
      await this.missionRepository.deleteMission(id);
    } catch (error) {
      throw new Error('Failed to delete mission');
    }
  }

  async deactivateMission(id) {
    try {
      const mission = this.getMissionById(id);

      mission.deactivateMission();

      this.updateMission(id, mission)
    } catch (error) {
      throw new Error('Failed to deactived mission');
    }
  }
}

module.exports = MissionService;