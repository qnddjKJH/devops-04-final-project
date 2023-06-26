import TestDataSource from "../../utils/test-config/TestDataSource";

const testDataSource = new TestDataSource();

// 실제 테스트 코드
test('Test database setup', async () => {
  // MySQL 연결 생성
  const connection = await testDataSource.createConnection();
  connection.connect();

  // 테이블 데이터 조회
  const selectQuery = 'SELECT * FROM users';
  const [rows] = await connection.query(selectQuery);

  // 테스트 데이터 개수 확인
  expect(rows.length).toBe(2);

  // 연결 종료
  connection.end();
});