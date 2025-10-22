import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cssDir = path.join(__dirname, '../node_modules/@hexlet/chatbot-v2/dist')
const cssFile = path.join(cssDir, 'init.css')

if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true })
}

fs.writeFileSync(cssFile, '/* Empty CSS file for testing purposes */')

console.log('Created missing CSS file:', cssFile)
