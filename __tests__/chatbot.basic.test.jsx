import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi, describe, test, expect } from 'vitest';
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
    
    expect(screen.getByTestId('chatbot-container')).toBeInTheDocument();
    expect(screen.getByTestId('chat-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-button')).toBeInTheDocument();
    expect(screen.getByTestId('chat-open-button')).toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('chat-open-button'))
    
    expect(screen.getByTestId('chat-window')).toBeInTheDocument()
    expect(screen.getByTestId('chat-header')).toBeInTheDocument()
    expect(screen.getByTestId('chat-messages')).toBeInTheDocument()
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument()
    expect(screen.getByTestId('user-input')).toBeInTheDocument()
  })
});