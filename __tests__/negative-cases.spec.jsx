import { expect, test, vi, beforeAll } from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen } from '@testing-library/react'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test(async () => {
  // Тест с null данными
  render(Widget(null))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с undefined данными
  render(Widget(undefined))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с некорректными данными - строка вместо массива
  render(Widget('invalid data'))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с некорректными данными - объект вместо массива
  render(Widget({ invalid: 'data' }))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с пустым объектом
  render(Widget({}))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с массивом, содержащим некорректные элементы
  render(Widget([null, undefined, 'invalid', {}]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с массивом, содержащим элементы без обязательных полей
  render(Widget([{ id: 'test' }]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})

test(async () => {
  // Тест с массивом, содержащим элементы с некорректными типами
  render(Widget([{ id: 123, messages: 'not array', buttons: 'not array' }]))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()
})
