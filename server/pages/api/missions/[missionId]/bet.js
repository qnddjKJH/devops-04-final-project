import { verifyToken } from '../../../../utils/jwt';
import { createBetParams } from '../../../../utils/params';
import { sendEvent } from '../../../../utils/eventBridgeClient';

const { getSecrets } = require('../../../../utils/secret');
const secretName = 'finaldb';

export default async function handler(req, res) {
  const secrets = await getSecrets(secretName);

  const token = req.headers.authorization?.split(' ')[1];
  const jwt_secrets = secrets.JWT_SECRET;
  const decoded = verifyToken(token, jwt_secrets);

  if (decoded) {
    if (req.method === 'POST') {
      const event = createBetParams(
        req.body.id,
        req.body.amount,
        req.body.transactionId
      );
      console.log(event);

      const result = sendEvent(event)

      res.status(200).json({ message: '베팅 성공!' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
