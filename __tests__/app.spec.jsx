import App from '../src/App.jsx'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, beforeEach, vi } from 'vitest'
import { AppPage } from '../pages/app-page.js'
import { WidgetPage } from '../pages/widget-page.js'

beforeEach(() => {
  render(<App />)
})

test(() => {
  const appPage = new App(screen)
  appPage.checkRegisterButton()
})

test(async () => {
  const user = userEvent.setup()
  const appPage = new AppPage(screen)
  await appPage.inputEmailField(user, 'emailtest@gmail.com')
  expect(appPage.inputEmail).toHaveValue('emailtest@gmail.com')
  await appPage.inputPassField(user, 'Password12890<:?')
  expect(appPage.inputPassword).toHaveValue('Password12890<:?')
  await appPage.inputAdressField(user, 'Мира')
  expect(appPage.inputAddress).toHaveValue('Мира')
  await appPage.inputCityField(user, 'Минск')
  expect(appPage.inputCity).toHaveValue('Минск')
  await appPage.selectCountryField(user, ['Беларусь'])
  expect(appPage.selectCountry).toHaveValue('Беларусь')
  expect(appPage.checkbox).toBeInTheDocument()
})

test(async () => {
  const user = userEvent.setup()
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  const widgetPage = new WidgetPage(screen)
  await widgetPage.clickOpenChatButton(user)
  await widgetPage.clickStartConversationButton(user)
  widgetPage.checkTextStartConversation()
  widgetPage.checkChangeProfessionButton()
  widgetPage.checkTryITButton()
  widgetPage.checkDeveloperButton()
  await widgetPage.clickCloseButton(user)
  widgetPage.checkOpenChatButton()
})
