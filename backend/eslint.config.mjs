import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    extends: [
      js.recommended,
      'plugin:@typescript-eslint/recommended', // just a string
      'prettier'
    ],
    parser: '@typescript-eslint/parser', // needed for TS
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
]);
