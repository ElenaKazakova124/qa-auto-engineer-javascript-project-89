import { cleanup } from '@testing-library/react';
import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';
import { WidgetPage } from './pages/WidgetPage';
import steps from './fixtures/steps';

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
});

describe('Базовые тесты виджета', () => {
  test('Виджет рендерится с начальным состоянием', () => {
    WidgetPage.renderWidget(steps);
    expect(WidgetPage.startButton).toBeVisible();
  });

  test('Можно начать диалог', () => {
    WidgetPage.renderWidget(steps);
    WidgetPage.clickStartButton();
    expect(WidgetPage.conversationButton).toBeVisible();
  });

  test('Скролл срабатывает при новом сообщении', () => {
    WidgetPage.renderWidget(steps);
    WidgetPage.clickStartButton();
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});