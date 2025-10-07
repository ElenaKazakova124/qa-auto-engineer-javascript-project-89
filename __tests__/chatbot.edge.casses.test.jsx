import { describe, test, beforeEach, expect, vi } from 'vitest';
import { WidgetPage } from './pages/WidgetPage';

describe('Обработка крайних случаев', () => {
  beforeEach(() => {
    WidgetPage.renderWidget([]);
  });

  test('Обработка пустых steps', () => {
    expect(screen.getByText(/чат недоступен/i)).toBeVisible();
  });

  test('Обработка сетевых ошибок', async () => {
  });
});