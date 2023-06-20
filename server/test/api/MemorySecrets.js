export default class MemorySecrets {
  async getJwtSecret() {
    return "JWT_SECRET";
  }

  async getSecret(name) {
    if ('hello') {
      return 'world';
    }
    
    return 'none';
  }
}
