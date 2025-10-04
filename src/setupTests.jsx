import React from 'react';
import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))
vi.mock('*.sass', () => ({}))

vi.mock('@hexlet/chatbot-v2', () => ({
  default: function ChatBot() {
      const [isOpen, setIsOpen] = React.useState(false);
      
      return (
        <div data-testid="chatbot-container">
          {/* Поля ввода (всегда видимы для тестирования) */}
          <input data-testid="chat-input" placeholder="Chat input" />
          <button data-testid="send-button">Send</button>
          
          {/* Кнопка открытия чата - всегда видима */}
          <button 
            data-testid="chat-open-button"
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            💬
          </button>
          
          {/* Окно чата */}
          {isOpen && (
            <div data-testid="chat-window" style={{
              position: 'fixed',
              bottom: '90px',
              right: '20px',
              width: '350px',
              height: '500px',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Заголовок чата */}
              <div data-testid="chat-header" style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e9ecef',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ margin: 0 }}>Чат-бот</h3>
                <button 
                  data-testid="chat-close-button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
              
              {/* Сообщения */}
              <div data-testid="chat-messages" style={{
                flex: 1,
                padding: '15px',
                overflowY: 'auto'
              }}>
                <div data-testid="welcome-message">
                  Добро пожаловать в чат-бот!
                </div>
              </div>
              
              {/* Поле ввода */}
              <div style={{
                padding: '15px',
                borderTop: '1px solid #e9ecef'
              }}>
                <input 
                  data-testid="user-input" 
                  placeholder="Введите сообщение..." 
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                  }}
                />
                <button 
                  data-testid="send-button"
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Отправить
                </button>
              </div>
            </div>
          )}
        </div>
      )
  }
}))

vi.mock('@hexlet/chatbot-v2/example-steps', () => ({
  default: [
    {
      id: 'welcome',
      message: 'Добро пожаловать в чат-бот!'
    }
  ]
}))