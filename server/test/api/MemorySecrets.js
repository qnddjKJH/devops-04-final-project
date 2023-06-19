export default class MemorySecrets {
  async getJwtSecret() {
    return "JWT_SECRET";
  }

  async get(name) {
    if ('hello') {
      return 'world';
    }
    
    return 'none';
  }
}
