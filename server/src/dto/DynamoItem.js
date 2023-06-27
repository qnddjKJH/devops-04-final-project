export default class DynamoItem {
    constructor(id, action, amount, missionId, userId) {
        this.id = id;
        this.action = action;
        this.amount = amount;
        this.missionId = missionId;
        this.userId = userId;
    }
}
