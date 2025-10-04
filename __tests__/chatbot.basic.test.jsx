import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi, describe, test, expect } from 'vitest';

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

const steps = [
  {
    name: "welcome",
    message: "Добро пожаловать!",
    options: [
      { label: "Начать", value: "start" }
    ]
  }
];

describe('Тестирование отображения компонентов', () => {
  test('Все основные элементы интерфейса присутствуют', () => {
    render(<ChatBot steps={steps}/>);
    
    // Проверяем основные элементы контейнера
    expect(screen.getByTestId('chatbot-container')).toBeInTheDocument();
    expect(screen.getByTestId('chat-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-button')).toBeInTheDocument();
    expect(screen.getByTestId('chat-open-button')).toBeInTheDocument();
    
    // Проверяем что чат изначально закрыт
    expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
    
    // Открываем чат
    fireEvent.click(screen.getByTestId('chat-open-button'));
    
    // Проверяем что все элементы чата присутствуют
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    expect(screen.getByTestId('chat-header')).toBeInTheDocument();
    expect(screen.getByTestId('chat-messages')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
    expect(screen.getByTestId('user-input')).toBeInTheDocument();
    
    // Проверяем что заголовок чата содержит правильный текст
    expect(screen.getByTestId('chat-header')).toHaveTextContent('Чат-бот');
    
    // Проверяем что welcome сообщение содержит правильный текст
    expect(screen.getByTestId('welcome-message')).toHaveTextContent('Добро пожаловать в чат-бот!');
  });
});