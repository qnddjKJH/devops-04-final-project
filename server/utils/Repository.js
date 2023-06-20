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
}
