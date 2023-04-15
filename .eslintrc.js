module.exports = {
  env: {
    jest: true,
  },
  extends: [
    '@cylution/nodejs',
  ],
  overrides: [
    // typescript
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none',
            requireLast: false,
          },
          singleline: {
            delimiter: 'comma',
            requireLast: false,
          },
          // overrides: {
          //   interface: {
          //     multiline: {
          //       delimiter: 'none',
          //       requireLast: false
          //     }
          //   }
          // }
        }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/type-annotation-spacing': ['warn', {
          before: false,
          after: true,
        }],
      },
      overrides: [
        {
          files: ['*.d.ts'],
          rules: {
            'no-irregular-whitespace': 'off',
            'no-use-before-define': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            // '@typescript-eslint/ban-types': 'off',
            // '@typescript-eslint/adjacent-overload-signatures': 'off',
          },
        },
        {
          files: ['*.spec.[jt]s'],
          rules: {
            'dot-notation': 'off',
          },
        },
      ],
    },
  ],
  ignorePatterns: [
    'dist/**',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'object-shorthand': 'off',
  },
}
