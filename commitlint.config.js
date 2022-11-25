module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'errata',
        'docs',
        'style',
        'refactor',
        'revert',
        'config',
        'content',
        'chore' // For articles, tutorials, etc...
      ]
    ]
  }
}
