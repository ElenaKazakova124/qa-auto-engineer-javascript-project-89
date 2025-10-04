import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.jsx', 
    css: true,
    deps: {
      inline: ['@hexlet/chatbot-v2']
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/setupTests.jsx',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
        '**/test-utils/**',
        '**/__mocks__/**',
        '**/__fixtures__/**',
        'scripts/**',
        'dist/**',
        'coverage/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})