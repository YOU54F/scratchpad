module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    eqeqeq: 'error',
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
};
