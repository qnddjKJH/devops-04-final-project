<<<<<<< HEAD
<<<<<<< HEAD
const { default: Mission } = require("./MissionEntity");
=======
const MissionRepository = require('./MissionRepository');
>>>>>>> develop
=======
const { default: Mission } = require("./MissionEntity");
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

class MissionService {
  constructor(missionRepository, userRepository) {
    this._missionRepository = missionRepository;
    this._userRepository = userRepository;
  }

  async getAllMissions() {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const missions = await this._missionRepository.getAllMissions();
=======
      const missions = await this.missionRepository.getAllMissions();
>>>>>>> develop
=======
      const missions = await this._missionRepository.getAllMissions();
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
      return missions;
    } catch (error) {
      throw new Error('Failed to get missions');
    }
  }

  async getMissionById(id) {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const mission = await this._missionRepository.getMissionById(id);
=======
      const mission = await this.missionRepository.getMissionById(id);
>>>>>>> develop
=======
      const mission = await this._missionRepository.getMissionById(id);
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
      return mission;
    } catch (error) {
      throw new Error('Failed to get mission');
    }
  }

  async createMission(mission) {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const createdMissionId = await this._missionRepository.createMission(mission);
=======
      const createdMissionId = await this.missionRepository.createMission(mission);
>>>>>>> develop
=======
      const createdMissionId = await this._missionRepository.createMission(mission);
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
      return createdMissionId;
    } catch (error) {
      throw new Error('Failed to create mission');
    }
  }

  async updateMission(id, mission) {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      await this._missionRepository.updateMission(id, mission);
=======
      await this.missionRepository.updateMission(id, mission);
>>>>>>> develop
=======
      await this._missionRepository.updateMission(id, mission);
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
    } catch (error) {
      throw new Error('Failed to update mission');
    }
  }

  async deleteMission(id) {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      await this._missionRepository.deleteMission(id);
=======
      await this.missionRepository.deleteMission(id);
>>>>>>> develop
=======
      await this._missionRepository.deleteMission(id);
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
    } catch (error) {
      throw new Error('Failed to delete mission');
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  async betOnMission(user_id, mission_id, amount) {
    try {
      const user = await this._userRepository.getUserById(user_id);
      const mission = await this._missionRepository.getMissionById(mission_id);

      user.decreaseCash(amount);
      mission.bet(amount);

      await this._userRepository.updateUser(user);
      await this._missionRepository.updateMission(mission);
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

  async deactiveMission(mission_id) {
    try {
      const mission = await this._missionRepository.getMissionById(mission_id);

      mission.setDeactive();

      await this._missionRepository.updateMission(mission)
    } catch (error) {
      console.error(error.stack);
=======
  async deactivateMission(id) {
=======
  async betOnMission(user_id, mission_id, amount) {
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
    try {
      const user = await this._userRepository.getUserById(user_id);
      const mission = await this._missionRepository.getMissionById(mission_id);

      user.decreaseCash(amount);
      mission.bet(amount);

      await this._userRepository.updateUser(user);
      await this._missionRepository.updateMission(mission);
    } catch (error) {
<<<<<<< HEAD
>>>>>>> develop
=======
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

  async deactiveMission(mission_id) {
    try {
      const mission = await this._missionRepository.getMissionById(mission_id);

      mission.setDeactive();

      await this._missionRepository.updateMission(mission)
    } catch (error) {
      console.error(error.stack);
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
      throw new Error('Failed to deactived mission');
    }
  }
}

module.exports = MissionService;