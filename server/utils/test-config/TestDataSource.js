import mysql from 'mysql2/promise';

export default class TestDataSource {

    async createConnection() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
        const host = process.env.TEST_MYSQL_HOST
        const database = process.env.TEST_MYSQL_DATABASE
        const user = process.env.TEST_MYSQL_ROOT
        const password = process.env.TEST_MYSQL_ROOT_PASSWORD
<<<<<<< HEAD
=======
        const host = 'localhost'
        const database = 'testdb'
        const user = 'root'
        const password = 'root'
>>>>>>> develop
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

        try {
            return await mysql.createConnection({ host, user, password, database });
        } catch (e) {
            console.log(e);
            throw new Error('데이터베이스 연결 오류');
        }
    }
}