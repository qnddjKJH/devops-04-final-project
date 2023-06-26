<<<<<<< HEAD
export default class Mission {
  constructor(id, userId, streamerId, mission, missionReward, timeLimit, isActive) {
    this.id = id;
    this.userId = userId;
    this.streamerId = streamerId
    this.mission = mission;
    this.missionReward = missionReward;
    this.timeLimit = timeLimit;
    this.isActive = isActive;
  }

  bet(amount) {
    if(amount < 1000) {
      throw new Error('최소 베팅 금액은 1000원 입니다.');
    }
    this.missionReward += amount;
  }

  setDeactive() {
    this.isActive = false;
  }

  setMission(updateMission) {
    this.mission = updateMission;
  }
}
=======
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
>>>>>>> develop
