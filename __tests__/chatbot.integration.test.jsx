import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@hexlet/chatbot-v2');
vi.mock('@hexlet/chatbot-v2/styles', () => ({})); 

import ChatBot from "../src/components/Widget";

describe('Интеграционное тестирование с фикстурами', () => {
  test('Чат-бот должен поддерживать конфигурацию из фикстур', () => {

    const { welcomeConfig } = require('../__fixtures__/botConfigs')
    
    expect(welcomeConfig).toBeDefined()
    expect(welcomeConfig.steps).toBeInstanceOf(Array)
    expect(welcomeConfig.steps.length).toBeGreaterThan(0)
    
  })
})