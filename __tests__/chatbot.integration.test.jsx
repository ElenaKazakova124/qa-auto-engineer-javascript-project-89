// __tests__/chatbot.integration.test.jsx
import { welcomeConfig } from '../__fixtures__/botConfigs'; // Используйте ES6 import

describe('Интеграционное тестирование с фикстурами', () => {
  test('Чат-бот должен поддерживать конфигурацию из фикстур', () => {
    expect(welcomeConfig).toBeDefined();
    expect(welcomeConfig.steps).toBeInstanceOf(Array);
    expect(welcomeConfig.steps.length).toBeGreaterThan(0);
    
    // Проверяем структуру steps
    const firstStep = welcomeConfig.steps[0];
    expect(firstStep).toHaveProperty('id');
    expect(firstStep).toHaveProperty('message');
    expect(firstStep).toHaveProperty('trigger');
  });
});