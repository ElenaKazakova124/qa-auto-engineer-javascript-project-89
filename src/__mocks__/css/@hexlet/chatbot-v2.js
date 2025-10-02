import React from 'react';

const MockChatBot = ({ steps }) => (
  <div data-testid="chatbot-container">
    <button data-testid="chat-open-button">Открыть чат</button>
    <div data-testid="chat-window">
      <div data-testid="chat-header">Заголовок чата</div>
      <div data-testid="chat-messages">
        {steps && steps.length > 0 && (
          <div data-testid="welcome-message">{steps[0].message}</div>
        )}
      </div>
      <input data-testid="chat-input" placeholder="Введите сообщение" />
      <button data-testid="send-button">Отправить</button>
      <div data-testid="quick-replies">
        <button data-testid="quick-reply-1">Быстрый ответ 1</button>
        <button data-testid="quick-reply-2">Быстрый ответ 2</button>
      </div>
    </div>
  </div>
);

export default MockChatBot;