// __mocks__/@hexlet/chatbot-v2.js
import React from 'react';

const ChatBot = ({ steps }) => (
  <div data-testid="chatbot-container">
    <input 
      placeholder="введите сообщение" 
      data-testid="chat-input"
      onChange={() => {}}
    />
    <button data-testid="send-button" onClick={() => {}}>
      отправить
    </button>
    <div data-testid="messages-container">
      {steps?.map((step, index) => (
        <div key={index} data-testid={`message-${index}`}>
          {step.message || step.text}
        </div>
      ))}
    </div>
  </div>
);

export default ChatBot;