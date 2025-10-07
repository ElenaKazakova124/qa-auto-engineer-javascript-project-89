import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WidgetPage } from './pages/WidgetPage';
import { welcomeConfig } from '../__fixtures__/botConfigs';

describe('Интеграционное тестирование с фикстурами', () => {
  test('Чат-бот должен поддерживать конфигурацию из фикстур', async () => {

    expect(welcomeConfig).toBeDefined();
    expect(welcomeConfig).toBeInstanceOf(Array);
    expect(welcomeConfig.length).toBeGreaterThan(0);
    

    const firstStep = welcomeConfig[0];
    expect(firstStep).toHaveProperty('id');
    expect(firstStep).toHaveProperty('messages');
    expect(firstStep).toHaveProperty('buttons');
    
    expect(firstStep.id).toBe('welcome');

    expect(firstStep.messages).toBeInstanceOf(Array);
    expect(firstStep.messages.length).toBeGreaterThan(0);
    
    expect(firstStep.buttons).toBeInstanceOf(Array);
    expect(firstStep.buttons.length).toBeGreaterThan(0);
    
    const firstButton = firstStep.buttons[0];
    expect(firstButton).toHaveProperty('text');
    expect(firstButton).toHaveProperty('nextStepId');
    expect(firstButton).toHaveProperty('type');
  });

  test('Чат-бот рендерится с фикстурой и отображает контент', () => {

    WidgetPage.renderWidget(welcomeConfig);

    expect(WidgetPage.isWidgetVisible()).toBe(true);
    
    const welcomeMessage = welcomeConfig[0].messages[0];
    expect(screen.getByText(welcomeMessage)).toBeInTheDocument();

    const firstButton = welcomeConfig[0].buttons[0];
    expect(screen.getByText(firstButton.text)).toBeInTheDocument();
  });
});