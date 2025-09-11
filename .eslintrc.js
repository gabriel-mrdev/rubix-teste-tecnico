module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 120 }],
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 'off',
  },
};
