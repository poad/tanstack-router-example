// @ts-check

import stylistic from '@stylistic/eslint-plugin';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// @ts-expect-error ignore errors
import importPlugin from 'eslint-plugin-import';
import flowtypePlugin from 'eslint-plugin-flowtype';
import pluginPromise from 'eslint-plugin-promise'
import pluginRouter from '@tanstack/eslint-plugin-router';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginPromise.configs['flat/recommended'],
  ...pluginRouter.configs['flat/recommended'],
  {
    ...importPlugin.flatConfigs.recommended,
    ...importPlugin.flatConfigs.typescript,
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs,
      '@stylistic/jsx': stylisticJsx,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11yPlugin,
      'flow-type': flowtypePlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/jsx/jsx-indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
)
