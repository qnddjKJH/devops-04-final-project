export default class Repository {
  constructor(dataSource) {
    this._dataSource = dataSource;
  }
  
  async createUser(user) {
    const result = await this._dataSource.createUser(user);
    return result;
  }
  
  async readUsers() {
    const result = await this._dataSource.readUsers();
    return result;
  }
  
  async readUser(userId) {
    const result = await this._dataSource.readUser(userId);
    return result;
  }

  async updateUser(userId) {
    const result = await this._dataSource.updateUser(userId);
    return result;
  }

  async deleteUser(userId) {
    const result = await this._dataSource.deleteUser(userId);
    return result;
  }
}
