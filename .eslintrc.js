module.exports = {
  env: {
    es2021: true,
    'truffle/globals': true, // same as "truffle/truffle": true
    mocha: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  },
  plugins: [
    'truffle'
  ]
}
