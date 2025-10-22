import { expect } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import getWidget from '@hexlet/chatbot-v2'
import { startButtonText, conversationButtonText, optionTexts } from '../utils/constants'

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
