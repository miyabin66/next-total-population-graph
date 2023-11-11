const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: './fixJsDomEnvironment.ts',
  globals: {
    fetch: global.fetch,
  },
};

module.exports = createJestConfig(customJestConfig);
