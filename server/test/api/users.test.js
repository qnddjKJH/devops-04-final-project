// 2023.06.17 [@ibocok0] https://jestjs.io/docs/getting-started
import { Container } from 'inversify';
import { TYPES, container } from '../../utils/container';
import { createMocks } from 'node-mocks-http';

import Repository from '../../utils/Repository';
import MemoryDataSource from './memoryDataSource';
import SecretsManager from '../../utils/SecretsManager';
import MemorySecrets from './MemorySecrets';

import handler from '../../pages/api/users';


describe('/api/users', () => {
  test('when get users', async () => {
    // given
    const container = new Container();
    container.bind(TYPES.Repository).to(Repository);
    container.bind(TYPES.SecretsManager).to(SecretsManager);
    container.bind(TYPES.DataSource).to(MemoryDataSource);
    container.bind(TYPES.Secrets).to(MemorySecrets);

    const { req, res } = createMocks({
      method: 'GET'
    });

    // when
    await handler(req, res);

    // then
    expect(res._getStatusCode()).toBe(200);
  });
});
