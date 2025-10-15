import { expect, test, vi, beforeAll } from 'vitest'
import Widget from '@hexlet/chatbot-v2'
import { render, screen } from '@testing-library/react'
import steps from '../__fixtures__/steps'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

test(async () => {
  const user = userEvent.setup()

  render(Widget(steps))
  expect(screen.getByText('Открыть Чат')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))

  expect(screen.getByRole('button', { name: 'Начать разговор' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Начать разговор' }))

  expect(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Попробовать себя в IT' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Я разработчик, хочу углубить свои знания' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
  await user.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }))

  expect(screen.getByRole('button', { name: 'Расскажи подробнее' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'А есть что-нибудь попроще' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
  await user.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }))

  expect(screen.getByRole('button', { name: 'Вернуться в начало' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
  await user.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }))

  expect(screen.getByRole('button', { name: 'Интересно' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'А что по поводу смены профессии?' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
  await user.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }))

  expect(screen.getByRole('button', { name: 'Вернуться назад' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Верни меня в начало' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Начать разговор' }))
  await user.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }))

  expect(screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))

  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  render(Widget(steps))

  await user.click(screen.getByRole('button', { name: 'Открыть Чат' }))
  await user.click(screen.getByRole('button', { name: 'Начать разговор' }))

  expect(screen.getByRole('button', { name: 'Я разработчик, хочу углубить свои знания' })).toBeInTheDocument()
})
