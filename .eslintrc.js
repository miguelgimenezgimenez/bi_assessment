module.exports = {
    'env': {
        'es2021': true,
        'node': true,
        'jest/globals': true

    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'semi': ['error', 'never'],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }]
    },
    'plugins': ['jest']

}
