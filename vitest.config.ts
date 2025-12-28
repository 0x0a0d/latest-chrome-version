import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // Prefer TS sources over compiled JS that sits next to them.
    extensions: ['.ts', '.tsx', '.mts', '.js', '.jsx', '.mjs', '.json'],
  },
  test: {
    globals: true,
    environment: 'node',
    pool: 'threads',
  },
})
