import { expect, test, vi, beforeAll } from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen } from '@testing-library/react'
import steps from '../__fixtures__/steps'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test(async () => {
  render(Widget([]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))

  expect(screen.getByRole('button', { name: 'Начать разговор' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Close' }))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Close' }))
  await user.click(screen.getByRole('button', { name: 'Close' }))
  await user.click(screen.getByRole('button', { name: 'Close' }))

  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  for (let i = 0; i < 3; i++) {
    await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))
  }

  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Close' }))
  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))

  expect(screen.getByRole('button', { name: 'Начать разговор' })).toBeInTheDocument()
})
