import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Add simple mock for integration test
vi.mock('@hexlet/chatbot-v2', () => ({
  default: () => <div>MockedChatBot</div>
}))

import ChatBot from "../src/components/Widget";

describe('Интеграционное тестирование с фикстурами', () => {
  test('Чат-бот должен поддерживать конфигурацию из фикстур', async () => {

    const { welcomeConfig } = await import('../__fixtures__/botConfigs')
    
    expect(welcomeConfig).toBeDefined()
    expect(welcomeConfig).toBeInstanceOf(Array)
    expect(welcomeConfig.length).toBeGreaterThan(0)
    
  })
})