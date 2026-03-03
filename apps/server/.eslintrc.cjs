module.exports = {
  root: true,
  extends: ['@repo/eslint-config/node.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  }
};
