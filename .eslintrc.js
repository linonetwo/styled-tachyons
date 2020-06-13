module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: ['mocha', 'babel'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 'space'],
    'linebreak-style': ['error', 'unix'],
  },
};
