module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
    },
    extends: ['plugin:vue/recommended'],
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    rules: {
     'no-console': 'off',
    },
};
