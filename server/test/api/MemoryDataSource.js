export default class MemoryDataSource {

  async getUser() {
    return [
      {
        id: 39590,
        username: '김예성',
        email: 'ibocok0@gmail.com',
        role: 'student',
        cash: 0,
        created_at: 'Thu Jun 15 2023 23:35:11 GMT+0900 (대한민국 표준시)',
        modified_at: 'Thu Jun 15 2023 23:35:11 GMT+0900 (대한민국 표준시)',
      },
      {
        id: 48943,
        username: '김예건',
        email: 'wlfka1020@gmail.com',
        role: 'developer',
        cash: 9999999999,
        created_at: 'Thu Oct 11 1994 23:35:23 GMT+0900 (대한민국 표준시)',
        modified_at: 'Thu Jun 15 2023 23:35:23 GMT+0900 (대한민국 표준시)',
      },
    ];
  }

  async createUser(user) {
    return {
        id: 459068
      };
  }
}
