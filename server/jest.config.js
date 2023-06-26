const config = {
  maxConcurrency: 1,
  collectCoverage: true,
  coverageReporters: ['text'],
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: 'coverage',
      outputName: 'junit.xml',
    }]
  ],
  setupFilesAfterEnv: ['./utils/test-config/SetupTestDatabase.js'],
}

module.exports = config;