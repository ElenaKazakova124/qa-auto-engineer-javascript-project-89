import { expect, test, vi, beforeAll, afterEach } from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen, cleanup } from '@testing-library/react'
import steps from '../__fixtures__/steps'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
})

test('Пустые данные', () => {
  render(Widget([]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test('Быстрый клик', async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByText('Открыть Чат'))
  expect(screen.getByText('Начать разговор')).toBeInTheDocument()
})

test('Открытие и закрытие', async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByText('Открыть Чат'))
  await user.click(screen.getByLabelText('Close'))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})
