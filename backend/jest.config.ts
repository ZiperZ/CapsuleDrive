import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@Lib/(.*)$': ['<rootDir>/lib/$1'],
    '^@Models/(.*)$': ['<rootDir>/lib/Models/$1'],
  }
};
export default config;