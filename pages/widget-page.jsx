import { expect } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import getWidget from '@hexlet/chatbot-v2'

const startButtonText = 'Открыть Чат'
const conversationButtonText = 'Начать разговор'
const optionTexts = [
  'Сменить профессию или трудоустроиться',
  'Попробовать себя в IT',
  'Я разработчик, хочу углубить свои знания',
]

class WidgetPage {
  static renderWidget(steps) {
    render(getWidget(steps))
  }

  static get startButton() {
    return screen.getByText(startButtonText)
  }

  static clickStartButton() {
    fireEvent.click(this.startButton)
  }

  static get conversationButton() {
    return screen.getByText(conversationButtonText)
  }

  static clickConversationButton() {
    fireEvent.click(this.conversationButton)
  }

  static expectOptionsVisible() {
    optionTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  }

  static expectScrollIntoViewCalled() {
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
  }
}

export default WidgetPage
