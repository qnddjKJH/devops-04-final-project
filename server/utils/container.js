// 2023.06.20 [@ibocok0] IoC Container 생성
import dotenv from 'dotenv';
import { Container, injectable, decorate, inject } from 'inversify';
import 'reflect-metadata';

import Repository from './Repository';
import MySqlDataSource from './MySqlDataSource';
import MemoryDataSource from '../test/api/memoryDataSource';

import SecretsManager from './SecretsManager';
import AWSSecrets from './AWSSecrets';
import MemorySecrets from '../test/api/MemorySecrets';

export const TYPES = {
  Repository: 'Repository',
  DataSource: 'DataSource',
  SecretsManager: 'SecretsManager',
  Secrets: 'Secrets'
};

// 2023.06.20 [@ibocok0] Repository 구성
decorate(injectable(), MySqlDataSource);
decorate(injectable(), MemoryDataSource);
decorate(injectable(), Repository);
decorate(inject(TYPES.DataSource), Repository, 0);

// 2023.06.20 [@ibocok0] Secret 구성
decorate(injectable(), AWSSecrets);
decorate(injectable(), MemorySecrets);
decorate(injectable(), SecretsManager);
decorate(inject(TYPES.Secrets), SecretsManager, 0);

export const container = new Container();
container.bind(TYPES.Repository).to(Repository);
container.bind(TYPES.SecretsManager).to(SecretsManager);
if (process.env.NODE_ENV === 'test') {
  container.bind(TYPES.DataSource).to(MemoryDataSource);
  container.bind(TYPES.Secrets).to(MemorySecrets);
} else {
  container.bind(TYPES.DataSource).to(MySqlDataSource);
  container.bind(TYPES.Secrets).to(AWSSecrets);
}
