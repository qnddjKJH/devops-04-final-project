export default class SecretsManager {
  constructor(secrets) {
    this._secrets = secrets;
  }

  async getJwtSecret() {
    return await this._secrets.getJwtSecret();
  }

  async get(name) {
    return await this._secrets.get(name);
  }
}
