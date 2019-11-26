module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  plugins: ['vue', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  globals: {
    $: true
  },
  rules: {
    // eslint rules
    'one-var': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': 0,
    'no-console': 0,
    'semi': [1, 'never'],
    'no-extra-semi': 2,
    'space-before-function-paren': 0,
    'eqeqeq': 0,
    'spaced-comment': 0,
    'no-useless-escape': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'new-cap': 0,
    'camelcase': 0,
    'no-new': 0,
    'indent': 'off',
    'linebreak-style': [
      'error',
      'unix'
    ],
    // typescript-eslint rules
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0
  }
}
