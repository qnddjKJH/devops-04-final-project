const config = {
  collectCoverage: true,
  coverageReporters: ['text'],
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: 'coverage',
      outputName: 'junit.xml',
    }]
  ]
}

module.exports = config;