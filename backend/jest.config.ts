import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': ['<rootDir>/$1'],
    '^@Lib/(.*)$': ['<rootDir>/lib/$1'],
    '^@Models/(.*)$': ['<rootDir>/lib/Models/$1'],
    '^@Resolvers/(.*)$': ['<rootDir>/src/Resolvers/$1'],
  }
};
export default config;