import { expect, test, vi, beforeAll } from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen } from '@testing-library/react'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test(async () => {
  // Тест с пустым массивом
  render(Widget([]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с массивом, содержащим пустые объекты
  render(Widget([{}]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с массивом, содержащим объекты с минимальными полями
  render(Widget([{ id: 'test', messages: [], buttons: [] }]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с массивом, содержащим объекты с некорректными типами полей
  render(Widget([{ id: 'test', messages: 'not array', buttons: [] }]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с массивом, содержащим объекты с частично корректными данными
  render(Widget([{ id: 'test', messages: [], buttons: 'not array' }]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})
