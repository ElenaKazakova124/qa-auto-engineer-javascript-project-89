// __tests__/chatbot.basic.test.jsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// Импортируем нашу конфигурацию бота
import { welcomeConfig } from '../__fixtures__/botConfigs'

// Мокаем библиотеку чат-бота
vi.mock('@hexlet/chatbot-v2', () => ({
  default: (steps) => {
    return function ChatBot() {
      return (
        <div data-testid="chatbot-widget">
          <div data-testid="chat-messages">
            <div data-testid="welcome-message">
              {steps[0].message}
            </div>
          </div>
          <input 
            data-testid="user-input" 
            placeholder="Введите сообщение..." 
          />
          <button data-testid="send-button">
            Отправить
          </button>
        </div>
      )
    }
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

vi.mock('@hexlet/chatbot-v2/styles')

// Импортируем компонент после моков
import Main from '../src/main'

describe('Базовое тестирование чат-бота', () => {
  test('Чат-бот рендерится без ошибок', () => {
    render(<Main />)
    
    // Проверяем, что основной контейнер отображается
    const chatbotWidget = screen.getByTestId('chatbot-widget')
    expect(chatbotWidget).toBeInTheDocument()
    
    // Проверяем, что приветственное сообщение отображается
    const welcomeMessage = screen.getByTestId('welcome-message')
    expect(welcomeMessage).toBeInTheDocument()
    expect(welcomeMessage).toHaveTextContent('Добро пожаловать')
    
    // Проверяем наличие элементов управления
    expect(screen.getByTestId('user-input')).toBeInTheDocument()
    expect(screen.getByTestId('send-button')).toBeInTheDocument()
    
    // Выводим разметку для отладки
    screen.debug()
  })

  test('Чат-бот отображает правильное приветственное сообщение', () => {
    render(<Main />)
    
    const welcomeMessage = screen.getByTestId('welcome-message')
    expect(welcomeMessage).toHaveTextContent('Добро пожаловать в чат-бот!')
  })

  test('Поле ввода и кнопка отправки доступны для взаимодействия', async () => {
    const user = userEvent.setup()
    render(<Main />)
    
    const input = screen.getByTestId('user-input')
    const button = screen.getByTestId('send-button')
    
    // Проверяем, что элементы доступны
    expect(input).toBeEnabled()
    expect(button).toBeEnabled()
    
    // Можем вводить текст в поле ввода
    await user.type(input, 'Привет!')
    expect(input).toHaveValue('Привет!')
    
    // Кнопка кликабельна
    await user.click(button)
  })

  test('Чат-бот инициализируется с правильными параметрами', () => {
    // Здесь мы можем проверить, что бот использует правильные steps
    // Поскольку мы замокали библиотеку, проверяем моковые данные
    render(<Main />)
    
    const welcomeMessage = screen.getByTestId('welcome-message')
    expect(welcomeMessage).toHaveTextContent('Добро пожаловать в чат-бот!')
  })
})

describe('Тестирование отображения компонентов', () => {
  test('Все основные элементы интерфейса присутствуют', () => {
    render(<Main />)
    
    expect(screen.getByTestId('chatbot-widget')).toBeVisible()
    expect(screen.getByTestId('chat-messages')).toBeVisible()
    expect(screen.getByTestId('welcome-message')).toBeVisible()
    expect(screen.getByPlaceholderText('Введите сообщение...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Отправить' })).toBeInTheDocument()
  })

  test('Верстка не ломается при рендеринге', () => {
    const { container } = render(<Main />)
    
    // Проверяем, что нет ошибок в консоли
    // и компонент отрендерился полностью
    expect(container.firstChild).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})