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

test(async () => {
  render(Widget([]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  const openButton = screen.getByText('Открыть Чат')
  await user.click(openButton)
  await user.click(openButton)
  await user.click(openButton)

  expect(screen.getByText('Начать разговор')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByText('Открыть Чат'))
  await user.click(screen.getByLabelText('Close'))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByText('Открыть Чат'))
  const closeButton = screen.getByLabelText('Close')
  await user.click(closeButton)
  await user.click(closeButton)
  await user.click(closeButton)

  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  for (let i = 0; i < 3; i++) {
    await user.click(screen.getByText('Открыть Чат'))
    await user.click(screen.getByLabelText('Close'))
  }

  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByText('Открыть Чат'))
  await user.click(screen.getByText('Открыть Чат'))
  await user.click(screen.getByText('Открыть Чат'))

  expect(screen.getByText('Начать разговор')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByText('Открыть Чат'))
  await user.click(screen.getByLabelText('Close'))
  await user.click(screen.getByText('Открыть Чат'))

  expect(screen.getByText('Начать разговор')).toBeInTheDocument()
})
