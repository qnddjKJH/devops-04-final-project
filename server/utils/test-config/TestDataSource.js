import mysql from 'mysql2/promise';

export default class TestDataSource {

    async createConnection() {
        const host = 'localhost'
        const database = 'testdb'
        const user = 'root'
        const password = 'root'

        try {
            return await mysql.createConnection({ host, user, password, database });
        } catch (e) {
            console.log(e);
            throw new Error('데이터베이스 연결 오류');
        }
    }
}