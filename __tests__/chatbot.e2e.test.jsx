import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { AppPage } from './pages/AppPage';
import { WidgetPage } from './pages/WidgetPage';

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe('E2E тестирование', () => {
  test('Открытие и закрытие виджета', async () => {
    AppPage.renderApp();
    AppPage.openWidget();
    expect(screen.getByText(/чат/i)).toBeVisible();
    
    AppPage.closeWidget();
    await AppPage.waitForModalToClose();
  });

  test('Обработка быстрых ответов', () => {
    WidgetPage.renderWidget(steps);
    WidgetPage.clickStartButton();
    const quickReply = WidgetPage.getOptionByText('Быстрый ответ');
    fireEvent.click(quickReply);
  });
});