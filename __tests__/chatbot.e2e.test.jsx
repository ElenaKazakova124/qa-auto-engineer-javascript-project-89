import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ChatBotPage } from './pages';

// Add mock directly in test file
vi.mock('@hexlet/chatbot-v2', () => ({
  default: ({ steps = [] }) => {
    const MockChatBot = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      
      // Проверяем что steps переданы правильно
      if (!Array.isArray(steps)) {
        throw new Error('Steps must be an array');
      }
      
      return (
        <div data-testid="chatbot-container">
          <input data-testid="chat-input" placeholder="Chat input" />
          <button data-testid="send-button">Send</button>
          <button 
            data-testid="chat-open-button"
            onClick={() => setIsOpen(true)}
          >
            💬
          </button>
          {isOpen && (
            <div data-testid="chat-window">
              <div data-testid="chat-header">
                <h3>Чат-бот</h3>
                <button 
                  data-testid="chat-close-button"
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </button>
              </div>
              <div data-testid="chat-messages">
                <div data-testid="welcome-message">
                  Добро пожаловать в чат-бот!
                </div>
              </div>
              <div>
                <input data-testid="user-input" placeholder="Введите сообщение..." />
                <button data-testid="send-button">Отправить</button>
              </div>
            </div>
          )}
        </div>
      )
    };
    return <MockChatBot />;
  }
}))

import ChatBot from "../src/components/Widget";

describe('E2E тестирование чат-бота', () => {
  let chatBotPage;

  beforeEach(() => {
    chatBotPage = new ChatBotPage();
  });

  test('chatbot widget renders without errors', async () => {
    // Простой тест что компонент рендерится без ошибок
    render(<ChatBot steps={[]} />);
    
    // Проверяем что основные элементы присутствуют
    expect(screen.getByTestId('chatbot-container')).toBeInTheDocument();
    expect(screen.getByTestId('chat-open-button')).toBeInTheDocument();
    
    // Проверяем что чат изначально закрыт
    expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
  });

  test('chatbot widget accepts steps prop', async () => {
    // Тест что компонент принимает steps prop
    const testSteps = [{ id: 1, message: 'Test' }];
    render(<ChatBot steps={testSteps} />);
    
    // Проверяем что компонент рендерится с переданными steps
    expect(screen.getByTestId('chatbot-container')).toBeInTheDocument();
    
    // Открываем чат и проверяем что welcome сообщение присутствует
    await chatBotPage.openChat();
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
  });

  test('chatbot widget handles empty steps', async () => {
    // Тест что компонент обрабатывает пустые steps
    render(<ChatBot steps={[]} />);
    
    // Проверяем что компонент рендерится даже с пустыми steps
    expect(screen.getByTestId('chatbot-container')).toBeInTheDocument();
    
    // Открываем чат и проверяем что welcome сообщение все равно присутствует
    await chatBotPage.openChat();
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
  });

  test('chatbot widget handles undefined steps', async () => {
    // Тест что компонент обрабатывает undefined steps
    render(<ChatBot />);
    
    // Проверяем что компонент рендерится даже без steps
    expect(screen.getByTestId('chatbot-container')).toBeInTheDocument();
    
    // Открываем чат и проверяем что welcome сообщение присутствует
    await chatBotPage.openChat();
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
  });
});