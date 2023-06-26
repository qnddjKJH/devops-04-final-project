// 2023.06.17 [@ibocok0] https://jestjs.io/docs/getting-started
import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/missions';

describe('/api/missions', () => {
  test('when get missions', async () => {
    // given
    const { req, res } = createMocks({
      method: 'GET'
    });

    // when
    await handler(req, res);

    // then
    expect(res._getStatusCode()).toBe(200);
  });
});
