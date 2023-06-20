// 2023.06.17 [@ibocok0] https://jestjs.io/docs/getting-started
import { Container } from 'inversify';
import { TYPES, container } from '../../utils/container';
import { createMocks } from 'node-mocks-http';

import Repository from '../../utils/Repository';
import MemoryDataSource from './memoryDataSource';
import SecretsManager from '../../utils/SecretsManager';
import MemorySecrets from './MemorySecrets';

import handleUsers from '../../pages/api/users';


describe('/api/users', () => {
  test('when get users', async () => {
    // given
    const { req, res } = createMocks({
      method: 'GET'
    });

    // when
    await handleUsers(req, res);

    // then
    expect(res._getStatusCode()).toBe(200);
  });
});
