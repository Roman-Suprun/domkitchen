import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  {
    ignores: ['.next/**'],
  },
  {
    extends: [
      js.configs.recommended,
      ...compat.extends('airbnb'),
      ...compat.extends('@kesills/airbnb-typescript'),
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@next/next': pluginNext,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      'react-refresh/only-export-components': 'off',
      'react/react-in-jsx-scope': 0,
      'react/no-array-index-key': 0,
      'no-console': 1,
      'import/prefer-default-export': 0,
      'react/function-component-definition': 'off',
      'react/prop-types': 0,
      'react/jsx-props-no-spreading': 0,
      'react/require-default-props': 0,
      'no-param-reassign': 0,
      'react/jsx-no-constructed-context-values': 'off',
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['off'],

      'import/no-extraneous-dependencies': 'off',

      'prettier/prettier': 'warn',
    },
  },
  {
    rules: Object.fromEntries(
      Object.keys(stylisticPlugin.configs['all-flat'].rules ?? {}).map(key => [
        key,
        'off',
      ]),
    ),
  },
);
