module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'prettier', 'prettier/@typescript-eslint'],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', 'avoid-escape'],
    eqeqeq: ['error', 'smart'],
    'comma-dangle': ['error', 'always-multiline'],
    'prefer-const': 2,
    'require-await': 'off',
    'prefer-arrow-callback': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['return', 'if', 'switch', 'try', 'do', 'for', 'while', 'class'] },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

