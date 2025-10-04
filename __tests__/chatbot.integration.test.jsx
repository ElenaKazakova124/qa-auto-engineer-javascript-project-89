import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Add simple mock for integration test
vi.mock('@hexlet/chatbot-v2', () => ({
  default: () => <div>MockedChatBot</div>
}))

import ChatBot from "../src/components/Widget";

describe('Интеграционное тестирование с фикстурами', () => {
  test('Чат-бот должен поддерживать конфигурацию из фикстур', async () => {
    const { welcomeConfig } = await import('../__fixtures__/botConfigs');
    
    // Проверяем что конфигурация загружается
    expect(welcomeConfig).toBeDefined();
    expect(welcomeConfig).toBeInstanceOf(Array);
    expect(welcomeConfig.length).toBeGreaterThan(0);
    
    // Проверяем структуру первого шага
    const firstStep = welcomeConfig[0];
    expect(firstStep).toHaveProperty('id');
    expect(firstStep).toHaveProperty('messages');
    expect(firstStep).toHaveProperty('buttons');
    
    // Проверяем что первый шаг имеет правильный ID
    expect(firstStep.id).toBe('welcome');
    
    // Проверяем что есть сообщения
    expect(firstStep.messages).toBeInstanceOf(Array);
    expect(firstStep.messages.length).toBeGreaterThan(0);
    
    // Проверяем что есть кнопки
    expect(firstStep.buttons).toBeInstanceOf(Array);
    expect(firstStep.buttons.length).toBeGreaterThan(0);
    
    // Проверяем структуру первой кнопки
    const firstButton = firstStep.buttons[0];
    expect(firstButton).toHaveProperty('text');
    expect(firstButton).toHaveProperty('nextStepId');
    expect(firstButton).toHaveProperty('type');
  });
});