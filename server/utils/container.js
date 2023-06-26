// 2023.06.20 [@ibocok0] IoC Container 생성
import dotenv from 'dotenv';
import { Container, injectable, decorate, inject } from 'inversify';
import 'reflect-metadata';

import Repository from './Repository';
import MySqlDataSource from './MySqlDataSource';
import MemoryDataSource from '../test/api/MemoryDataSource';

import SecretsManager from './SecretsManager';
import AWSSecrets from './AWSSecrets';
import MemorySecrets from '../test/api/MemorySecrets';

import MissionRepository from '../src/domains/missions/MissionRepository';
import MissionService from '../src/domains/missions/MissionService';

import UserRepository from '../src/domains/users/UserRepository';
import TestDataSource from './test-config/TestDataSource';

export const TYPES = {
  Repository: 'Repository',
  DataSource: 'DataSource',
  SecretsManager: 'SecretsManager',
  Secrets: 'Secrets',
  UserRepository: 'UserRepository',
  MissionRepository: 'MissionRepository',
  MissionService: 'MissionService',
  TestDataSource: 'TestDataSource',
};

// --------------------------------------

// Test 환경
decorate(injectable(), TestDataSource);

// 2023.06.20 [@ibocok0] Secret 구성
decorate(injectable(), AWSSecrets);
decorate(injectable(), MemorySecrets);
decorate(injectable(), SecretsManager);
decorate(inject(TYPES.Secrets), SecretsManager, 0);

// 2023.06.20 [@ibocok0] Repository 구성
decorate(injectable(), MySqlDataSource);
decorate(inject(TYPES.SecretsManager), MySqlDataSource, 0);
decorate(injectable(), MemoryDataSource);
decorate(injectable(), Repository);
decorate(inject(TYPES.DataSource), Repository, 0);

// Mission 구성
decorate(injectable(), MissionRepository);
decorate(inject(TYPES.TestDataSource), MissionRepository, 0);
decorate(injectable(), MissionService);
decorate(inject(TYPES.MissionRepository), MissionService, 0);
decorate(inject(TYPES.UserRepository), MissionService, 1);

// User 구성
decorate(injectable(), UserRepository);
decorate(inject(TYPES.TestDataSource), UserRepository, 0);

// --------------------------------------

export const container = new Container();
container.bind(TYPES.SecretsManager).to(SecretsManager);
container.bind(TYPES.Repository).to(Repository);
container.bind(TYPES.UserRepository).to(UserRepository);
container.bind(TYPES.MissionRepository).to(MissionRepository);
container.bind(TYPES.MissionService).to(MissionService);


if (process.env.NODE_ENV === 'test') {
  container.bind(TYPES.DataSource).to(MemoryDataSource);
  container.bind(TYPES.Secrets).to(MemorySecrets);
  container.bind(TYPES.TestDataSource).to(TestDataSource);
} else {
  container.bind(TYPES.DataSource).to(MySqlDataSource);
  container.bind(TYPES.TestDataSource).to(MySqlDataSource);
  container.bind(TYPES.Secrets).to(AWSSecrets);
}
