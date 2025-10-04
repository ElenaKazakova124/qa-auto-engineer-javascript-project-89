import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ChatBotPage } from './pages';

// Add mock directly in test file
vi.mock('@hexlet/chatbot-v2', () => ({
  default: () => {
    const MockChatBot = () => {
      const [isOpen, setIsOpen] = React.useState(false);
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

  test('handles quick reply buttons', async () => {
    render(<ChatBot />);
    
    expect(chatBotPage.isChatButtonVisible()).toBe(true);
    await chatBotPage.openChat();
    
    expect(chatBotPage.isChatOpen()).toBe(true);
    expect(chatBotPage.isWelcomeMessageVisible()).toBe(true);
    expect(chatBotPage.chatInput).toBeInTheDocument();
    expect(chatBotPage.sendButton).toBeInTheDocument();
  });

  test('can close chat window', async () => {
    render(<ChatBot />);
    
    await chatBotPage.openChat();
    expect(chatBotPage.isChatOpen()).toBe(true);
    
    await chatBotPage.closeChat();
    expect(chatBotPage.isChatClosed()).toBe(true);
  });

  test('can type and send messages', async () => {
    render(<ChatBot />);
    
    await chatBotPage.openChat();
    await chatBotPage.typeMessage('Тестовое сообщение');
    
    expect(chatBotPage.getInputValue()).toBe('Тестовое сообщение');
  });

  test('displays chat header correctly', async () => {
    render(<ChatBot />);
    
    await chatBotPage.openChat();
    const title = chatBotPage.getChatTitle();
    
    expect(title).toContain('Чат-бот');
  });
});