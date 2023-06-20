export default class SecretsManager {
  constructor(secrets) {
    this._secrets = secrets;
  }

  async getJwtSecret() {
    return await this._secrets.getJwtSecret();
  }

  async getSecret(name) {
    return await this._secrets.getSecret(name);
  }
}
