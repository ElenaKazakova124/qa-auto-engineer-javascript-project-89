import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { test, expect, beforeEach, vi } from 'vitest'
import AppPage from '../pages/app-page.jsx'
import WidgetPage from '../pages/widget-page.jsx'
import steps from '../__fixtures__/steps'

beforeEach(() => {
  AppPage.renderApp()
})

test(() => {
  AppPage.checkRegisterButton()
})

test(async () => {
  const user = userEvent.setup()
  await AppPage.inputEmailField(user, 'emailtest@gmail.com')
  expect(AppPage.emailInput).toHaveValue('emailtest@gmail.com')
  await AppPage.inputPassField(user, 'Password12890<:?')
  expect(AppPage.passwordInput).toHaveValue('Password12890<:?')
  await AppPage.inputAdressField(user, 'Мира')
  expect(AppPage.addressInput).toHaveValue('Мира')
  await AppPage.inputCityField(user, 'Минск')
  expect(AppPage.cityInput).toHaveValue('Минск')
  await AppPage.selectCountryField(user, 'Россия')
  expect(AppPage.countrySelect).toHaveValue('Россия')
  expect(AppPage.checkbox).toBeInTheDocument()
})

test(async () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  WidgetPage.renderWidget(steps)
  WidgetPage.clickStartButton()
  WidgetPage.clickConversationButton()
  WidgetPage.expectOptionsVisible()
})
