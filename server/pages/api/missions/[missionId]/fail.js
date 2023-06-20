import { verifyToken } from '../../../../utils/jwt';
import { missionresultParams } from '../../../../utils/params';
import { sendEvent } from '../../../../utils/eventBridgeClient';
import {
  createSubscription,
  publishtoTopic,
} from '../../../../utils/snsClient';

const { getSecrets } = require('../../../../utils/secret');
const secretName = 'finaldb';

export default async function handler(req, res) {
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    if (req.method === 'POST') {
      const event = missionresultParams(
        req.body.id,
        req.body.transactionId,
        'fail',
      );

      createSubscription(req.body.id, 'fail');
      sendEvent(event);

      res.status(200).json({ message: '미션 실패 요청 전송 완료' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
