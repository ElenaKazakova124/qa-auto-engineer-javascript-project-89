import { expect } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import getWidget from '@hexlet/chatbot-v2'

class WidgetPage {
  static renderWidget(steps) {
    render(getWidget(steps))
  }

  static get startButton() {
    return screen.getByText('Открыть Чат')
  }

  static clickStartButton() {
    fireEvent.click(this.startButton)
  }

  static get conversationButton() {
    return screen.getByText('Начать разговор')
  }

  static clickConversationButton() {
    fireEvent.click(this.conversationButton)
  }

  static expectOptionsVisible() {
    const optionTexts = [
      'Сменить профессию или трудоустроиться',
      'Попробовать себя в IT',
      'Я разработчик, хочу углубить свои знания',
    ]
    optionTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  }

  static expectScrollIntoViewCalled() {
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
  }
}

export default WidgetPage
