import { fireEvent, cleanup } from '@testing-library/react'
import { it, vi, beforeEach, afterEach, describe, expect } from 'vitest'
import WidgetPage from './pages/Widget'
import AppPage from './pages/App'
import steps from '../__fixtures__/steps'

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
})

describe('Integration: App + Widget', () => {
  it('renders the App successfully and includes the Widget', () => {
    expect(() => AppPage.render()).not.toThrow()
    expect(WidgetPage.startButton).toBeVisible()
  })

  it('allows modal window to open and close smoothly', async () => {
    AppPage.render()
    AppPage.openWidget()
    AppPage.expectWidgetOpened()
    AppPage.closeWidget()
    await AppPage.expectWidgetClosed()
  })

  it('keeps form inputs responsive when widget is used', () => {
    AppPage.render()

    const emailField = AppPage.getFormInputLabel('email')
    fireEvent.change(emailField, { target: { value: 'user@example.com' } })
    expect(emailField.value).toBe('user@example.com')

    WidgetPage.clickStartButton()
    WidgetPage.clickConversationButton()
    WidgetPage.expectOptionsVisible()

    expect(emailField.value).toBe('user@example.com')

    AppPage.submitForm()
    AppPage.expectFormSubmission()
  })
})

describe('Widget isolated behaviour', () => {
  it('initially shows the Start button', () => {
    WidgetPage.render(steps)
    expect(WidgetPage.startButton).toBeVisible()
  })

  it('switches step correctly when conversation starts', () => {
    WidgetPage.render(steps)
    WidgetPage.clickStartButton()
    WidgetPage.clickConversationButton()
    WidgetPage.expectOptionsVisible()
  })

  it('scrolls automatically when a new message appears', () => {
    WidgetPage.render(steps)
    WidgetPage.clickStartButton()
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
  })
})
