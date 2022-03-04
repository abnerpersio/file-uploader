import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.(spec).ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: [],
  modulePathIgnorePatterns: ['node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
