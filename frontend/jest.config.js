module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    '^.+\\.css$': 'jest-css-modules-transform',
    // "^.+\\.[t|j]sx?$": "babel-jest",
    // '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testEnvironment: "jsdom",
};