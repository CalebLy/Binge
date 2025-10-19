import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    plugins: { '@typescript-eslint': tsPlugin },
    extends: ['js/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    languageOptions: {
      globals: {
        // Node globals
        ...require('globals').node,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      // Example rules
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
]);
