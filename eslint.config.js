import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescript from '@typescript-eslint/eslint-plugin';
import { ParserOptions } from '@typescript-eslint/parser';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // TypeScript 파일 추가
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        // TypeScript 파서를 사용
        parser: '@typescript-eslint/parser',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescript, // TypeScript 플러그인 추가
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      // TypeScript 관련 규칙 추가
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수에서 타입을 명시하지 않아도 되는 규칙
      '@typescript-eslint/no-explicit-any': 'off', // any 사용을 허용하는 규칙
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off', // PropTypes 사용 안함 (TypeScript에서 타입 검사 사용)
      'prettier/prettier': 'error', // Prettier 오류 규칙
    },
  },
];
