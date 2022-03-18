const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['node_modules'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
