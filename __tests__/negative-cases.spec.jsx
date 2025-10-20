import { expect, test, vi, beforeAll } from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen } from '@testing-library/react'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test(async () => {
  render(Widget([]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  render(Widget([{ id: 'test', messages: [], buttons: [] }]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  render(Widget([{ id: 'test', messages: [], buttons: [] }]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})
