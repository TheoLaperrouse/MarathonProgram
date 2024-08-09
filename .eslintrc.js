module.exports = {
    root: true,
    env: {
        node: true,
        'vitest/globals': true,
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': 'error',
        'no-debugger': 'error',
    },
};
