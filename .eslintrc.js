module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'prettier'
    ],
    plugins: ['eslint-plugin-tsdoc'],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    rules: {
        camelcase: 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/array-type': ['warn', { default: 'generic', readonly: 'generic' }],
        '@typescript-eslint/ban-ts-comment': 'off',
        indent: 'off', //prettier take it in charge
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        'tsdoc/syntax': 'warn',
        '@typescript-eslint/no-empty-function': 'off'
    }
};
