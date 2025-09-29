import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import Widget from '@hexlet/chatbot-v2';
vi.mock('@hexlet/chatbot-v2');

describe('E2E тестирование чат-бота', () => {
  test('handles quick reply buttons', async () => {
    const user = userEvent.setup();
    
    const ChatBotComponent = Widget();
    
    render(<ChatBotComponent />);
    
    const openButton = screen.getByTestId('chat-open-button');
    expect(openButton).toBeInTheDocument();
    await user.click(openButton);
    
    const chatWindow = screen.getByTestId('chat-window');
    expect(chatWindow).toBeInTheDocument();
    
    const welcomeMessage = screen.getByTestId('welcome-message');
    expect(welcomeMessage).toBeInTheDocument();
    
    expect(screen.getByTestId('user-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-button')).toBeInTheDocument();
  });

  test('can close chat window', async () => {
    const user = userEvent.setup();
    
    const ChatBotComponent = Widget();
    
    render(<ChatBotComponent />);
    
    const openButton = screen.getByTestId('chat-open-button');
    await user.click(openButton);
    
    expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    
    const closeButton = screen.getByTestId('chat-close-button');
    await user.click(closeButton);
    
    expect(screen.queryByTestId('chat-window')).not.toBeInTheDocument();
  });
});