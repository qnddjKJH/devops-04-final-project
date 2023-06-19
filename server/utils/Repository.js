export default class Repository {
  constructor(dataSource) {
    this._dataSource = dataSource;
  }

  async getUser() {
    const result = await this._dataSource.getUser();
    return result;
  }

  async createUser(user) {
    const result = await this._dataSource.createUser(user);
    return result;
  }
}
