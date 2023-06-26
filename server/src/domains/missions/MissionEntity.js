class Mission {
    constructor(id, userId, streamerId, mission, missionReward, timeLimit, isActive) {
      this.id = id;
      this.userId = userId;
      this.streamerId = streamerId
      this.mission = mission;
      this.missionReward = missionReward;
      this.timeLimit = timeLimit;
      this.isActive = isActive;
    }

    deactiveMission() {
      this.isActive = false;
    }

    setMission(updateMission) {
      this.mission = updateMission;
    }
  }
  
  module.exports = Mission;