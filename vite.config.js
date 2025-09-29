import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/components/setupTests.jsx',
    css: true,
    deps: {
      inline: ['@hexlet/chatbot-v2']
    }
  },
  resolve: {
    alias: {
      '@hexlet/chatbot-v2/dist/init.css': resolve(__dirname, 'src/__mocks__/css/init.css'),
      '@hexlet/chatbot-v2/styles': resolve(__dirname, 'src/__mocks__/css/init.css'),
      '@': resolve(__dirname, './src') 
    }
  }
})