module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/resources/js'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/resources/js/__mocks__/fileMock.js',
    '^axios$': 'axios/dist/node/axios.cjs'
  },
  setupFilesAfterEnv: ['<rootDir>/resources/js/setupTests.ts'],
  collectCoverageFrom: [
    'resources/js/**/*.{ts,tsx}',
    '!resources/js/**/*.d.ts',
    '!resources/js/__tests__/**',
    '!resources/js/index.tsx'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(axios|fast-check)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/vendor/']
};
