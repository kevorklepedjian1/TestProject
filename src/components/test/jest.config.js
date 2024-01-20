module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  };
  