import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Widget from '@hexlet/chatbot-v2'
import steps from '@hexlet/chatbot-v2/example-steps'

describe('Тестирование отображения компонентов', () => {
  test('Все основные элементы интерфейса присутствуют', () => {
    const ChatBotComponent = Widget(steps)
    render(<ChatBotComponent />)
    
    expect(screen.getByTestId('chatbot-container')).toBeInTheDocument()
    expect(screen.getByTestId('chat-open-button')).toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('chat-open-button'))
    
    expect(screen.getByTestId('chat-window')).toBeInTheDocument()
    expect(screen.getByTestId('chat-header')).toBeInTheDocument()
    expect(screen.getByTestId('chat-messages')).toBeInTheDocument()
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument()
    expect(screen.getByTestId('user-input')).toBeInTheDocument()
    expect(screen.getByTestId('send-button')).toBeInTheDocument()
  })
})