import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  })],
  test: {
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['@hexlet/chatbot-v2'],
      },
    },
    setupFiles: './vitest.setup.js',
  },
})
