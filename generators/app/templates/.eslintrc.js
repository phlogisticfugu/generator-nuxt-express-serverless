module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  rules: {
    'camelcase': 'off',
    'quotes': 'off',
    'no-template-curly-in-string': 'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': 4,
      'multiline': {
        'max': 4,
        'allowFirstLine': false
      }
    }],
    'vue/require-default-prop': 0,
    'vue/prop-name-casing': ['error', 'snake_case'],
    'vue/script-indent': ['error', {
      'baseIndent': 0
    }]
  },
  globals: {}
}
