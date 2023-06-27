export default class MemorySecrets {
  async getJwtSecret() {
    return "JWT_SECRET";
  }

  async getSecret(name) {
    if (name === 'jwt-token') {
      return 'dsiobt83ptkcd';
    } else if (name === 'database') {
      return {
        host: 'localhost',
        dbname: 'test',
        username: 'admin',
        password: 'p@ssw0rd'
      }
    }

    return null;
  }
}
