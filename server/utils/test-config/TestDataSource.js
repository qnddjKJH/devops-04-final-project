import mysql from 'mysql2/promise';

export default class TestDataSource {

    async createConnection() {
        const host = process.env.TEST_MYSQL_HOST
        const database = process.env.TEST_MYSQL_DATABASE
        const user = process.env.TEST_MYSQL_ROOT
        const password = process.env.TEST_MYSQL_ROOT_PASSWORD

        try {
            return await mysql.createConnection({ host, user, password, database });
        } catch (e) {
            console.log(e);
            throw new Error('데이터베이스 연결 오류');
        }
    }
}