export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.(spec|test).ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: [],
  modulePathIgnorePatterns: ['node_modules'],
};
