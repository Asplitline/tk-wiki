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
        'fix',
        'chore' // For articles, tutorials, etc...
      ]
    ]
  }
}
