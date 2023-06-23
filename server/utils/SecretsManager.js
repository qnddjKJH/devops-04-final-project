export default class SecretsManager {
  constructor(secrets) {
    this._secrets = secrets;
  }

  async getJwtSecret() {
    return await this._secrets.getSecret("jwt-token");
  }

  async getDbSecret() {
    return await this._secrets.getSecret("fianldb");
  }

  async getSecret(name) {
    return await this._secrets.getSecret(name);
  }
}
