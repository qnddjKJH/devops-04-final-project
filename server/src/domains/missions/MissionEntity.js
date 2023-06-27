
export default class Mission {
  constructor(id, userId, streamerId, mission, missionReward, timelimit, isActive) {
    this.id = id;
    this.userId = userId;
    this.streamerId = streamerId
    this.mission = mission;
    this.missionReward = missionReward;
    this.timelimit = timelimit;
    this.isActive = isActive;
  }

  bet(amount) {
    if(amount < 1000) {
      throw new Error('최소 베팅 금액은 1000원 입니다.');
    }
    this.missionReward += amount;
  }

  update(update) {
    const {
      mission: newMission,
      timelimit: newTimelimit
    } = update;

    if(newMission) {
      this.mission = newMission;
    }

    if(newTimelimit > 0) {
      this.timelimit = newTimelimit
    } else {
      throw new Error('Invalid new timelimit : 제한시간은 0 또는 0 보다 작을 수 없습니다.');
    }
  }

  setDeactive() {
    this.isActive = false;
  }

  setMission(updateMission) {
    this.mission = updateMission;
  }
}
