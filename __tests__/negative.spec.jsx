import { describe, test, expect, vi, beforeAll, afterEach } from 'vitest';
import Widget from '@hexlet/chatbot-v2';
import { render, screen, cleanup } from '@testing-library/react';
import steps from '../__fixtures__/steps';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
    cleanup();
});

describe('Widget negative', () => {
  test('Check interface with rapid clicks on same button', async () => {
    const user = userEvent.setup();
    render(Widget(steps));
    
    const openChatButton = screen.getByRole('button', { name: 'Открыть Чат' });
    await user.click(openChatButton);
    await user.click(openChatButton);
    await user.click(openChatButton);
    
    expect(screen.queryByText(/error|ошибка/i)).not.toBeInTheDocument();
  });

  test('Check interface with navigation through available buttons', async () => {
    const user = userEvent.setup();
    render(Widget(steps));
    
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }));
    
    const buttons = screen.getAllByRole('button');
    
    for (const button of buttons) {
      if (!button.textContent.includes('Открыть Чат') && !button.getAttribute('aria-label')?.includes('Close')) {
        await user.click(button);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    expect(screen.queryByText(/error|ошибка/i)).not.toBeInTheDocument();
  });

  test('Check interface with search for non-existent elements', async () => {
    const user = userEvent.setup();
    render(Widget(steps));
    
    const nonExistentButton = screen.queryByRole('button', { name: 'Несуществующая кнопка' });
    const nonExistentText = screen.queryByText('Несуществующий текст');
    
    expect(nonExistentButton).not.toBeInTheDocument();
    expect(nonExistentText).not.toBeInTheDocument();
    
    expect(screen.queryByText(/error|ошибка/i)).not.toBeInTheDocument();
  });

  test('Check interface stability after multiple interactions', async () => {
    const user = userEvent.setup();
    render(Widget(steps));
    
    for (let i = 0; i < 5; i++) {
      const buttons = screen.getAllByRole('button');
      if (buttons.length > 0) {
        const availableButtons = buttons.filter(btn => 
          !btn.getAttribute('aria-label')?.includes('Close')
        );
        
        if (availableButtons.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableButtons.length);
          await user.click(availableButtons[randomIndex]);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
    
    expect(screen.queryByText(/error|ошибка/i)).not.toBeInTheDocument();
  });

  test('Check interface with delayed interactions', async () => {
    const user = userEvent.setup();
    render(Widget(steps));
    
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }));
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const buttons = screen.getAllByRole('button');
    for (const button of buttons) {
      if (!button.textContent.includes('Открыть Чат') && !button.getAttribute('aria-label')?.includes('Close')) {
        await user.click(button);
        await new Promise(resolve => setTimeout(resolve, 200));
        break; 
      }
    }
    
    expect(screen.queryByText(/error|ошибка/i)).not.toBeInTheDocument();
  });
});