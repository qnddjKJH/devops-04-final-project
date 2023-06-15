import { generateToken } from '../../../utils/jwt';
import { connectDb, queries } from '../../../utils/database';// 데이터베이스 쿼리 함수 예시

export default async function handler(req, res) {
  const { userid, password } = req.body;
  const conn = await connectDb();
  
  if (req.method === 'POST') {
  try {
    // 데이터베이스에서 사용자 정보 쿼리
    const [result] = await conn.query(queries.verify(userid, password));
    await conn.end();

    if (result.length > 0) {
      // 인증 성공: JWT 토큰 생성
      const token = generateToken({ userid }, 'supersecret', '1d');
      res.status(200).json({ token });
    } else {
      // 인증 실패
      res.status(401).json({ message: '유효하지 않은 자격 증명' });
    }
  } catch (error) {
    // 데이터베이스 오류
    console.error(error);
    res.status(500).json({ message: '데이터베이스 오류' });
  }
 }
}