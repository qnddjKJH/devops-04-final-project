import TestDataSource from "./TestDataSource.js";

const testDataSource = new TestDataSource();

const CREATE_TBL_USERS = `
  CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    username VARCHAR(200) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(100) NOT NULL,
    cash INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE(user_id)
  );
`;

const CREATE_TBL_MISSIONS = `
  CREATE TABLE missions (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    streamer_id INT NOT NULL,
    mission VARCHAR(200) NOT NULL,
    mission_reward INT NOT NULL,
    timelimit INT NOT NULL,
    is_active BOOLEAN NOT NULL,
    PRIMARY KEY (id)
  );
`;

const ALTER_TBL_MISSIONS_FK_USER = `
  ALTER TABLE missions ADD CONSTRAINT fk_user_id
  FOREIGN KEY (user_id) REFERENCES users (id);
`;

const ALTER_TBL_MISSIONS_FK_STREAMER = `
  ALTER TABLE missions ADD CONSTRAINT fk_streamer_id
  FOREIGN KEY (streamer_id) REFERENCES users (id);
`;

// 초기 데이터 삽입 쿼리
const INSERT_USERS = `
  INSERT INTO users (user_id, password, username, email, role, cash)
  VALUES
    ('wngud9646', '1111', '이주형', 'wngud9646@gmail.com', 'ROLE_STREAMER', 1000),
    ('test1234', '1111', 'test', 'test@gmail.com', 'ROLE_USER', 10000)
`;

const INSERT_MISSIONS = `
  INSERT INTO missions (user_id, streamer_id, mission, mission_reward, timelimit, is_active)
  VALUES
    (2, 1, '2시간 안에 10킬', 1000, 60, true)
`;

// 테스트 시작 전 데이터베이스 초기화 및 데이터 생성
beforeEach(async () => {
  try {
    const connection = await testDataSource.createConnection();

    await connection.query('DROP TABLE IF EXISTS missions');
    await connection.query('DROP TABLE IF EXISTS users');

    await connection.query(CREATE_TBL_USERS);
    await connection.query(CREATE_TBL_MISSIONS);

    await connection.query(ALTER_TBL_MISSIONS_FK_USER);
    await connection.query(ALTER_TBL_MISSIONS_FK_STREAMER);

    await connection.query(INSERT_USERS);
    await connection.query(INSERT_MISSIONS);
    
    connection.end()
  } catch (error) {
    console.error(error.stack);
    throw new Error('데이터베이스 초기화에 실패했습니다.');
  }
});

// 테스트 종료 후 데이터베이스 정리
afterEach(async () => {
  try {
    const connection = await testDataSource.createConnection();

    await connection.query('DROP TABLE IF EXISTS missions');
    await connection.query('DROP TABLE IF EXISTS users');

    connection.end();
  } catch (error) {
    console.error(error.stack);
    throw new Error('데이터베이스 정리에 실패했습니다.');
  }
});