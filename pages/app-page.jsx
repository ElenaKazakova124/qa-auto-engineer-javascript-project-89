import { expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import App from '../src/App.jsx'

class AppPage {
  static renderApp() {
    render(<App />)
  }

  static get emailInput() {
    return screen.getByLabelText('Email')
  }

  static get passwordInput() {
    return screen.getByLabelText('Пароль')
  }

  static get addressInput() {
    return screen.getByLabelText('Адрес')
  }

  static get cityInput() {
    return screen.getByLabelText('Город')
  }

  static get countrySelect() {
    return screen.getByLabelText('Страна')
  }

  static get checkbox() {
    return screen.getByLabelText('Принять правила')
  }

  static get submitButton() {
    return screen.getByRole('button', { name: 'Зарегистрироваться' })
  }

  static get backButton() {
    return screen.getByRole('button', { name: 'Назад' })
  }

  static async inputEmailField(user, value) {
    await user.type(this.emailInput, value)
  }

  static async inputPassField(user, value) {
    await user.type(this.passwordInput, value)
  }

  static async inputAdressField(user, value) {
    await user.type(this.addressInput, value)
  }

  static async inputCityField(user, value) {
    await user.type(this.cityInput, value)
  }

  static async selectCountryField(user, value) {
    await user.selectOptions(this.countrySelect, value)
  }

  static async clickCheckbox(user) {
    await user.click(this.checkbox)
  }

  static async clickSubmitButton(user) {
    await user.click(this.submitButton)
  }

  static async clickBackButton(user) {
    await user.click(this.backButton)
  }

  static checkRegisterButton() {
    expect(this.submitButton).toBeInTheDocument()
  }

  static expectFormVisible() {
    expect(this.emailInput).toBeInTheDocument()
    expect(this.passwordInput).toBeInTheDocument()
    expect(this.addressInput).toBeInTheDocument()
    expect(this.cityInput).toBeInTheDocument()
    expect(this.countrySelect).toBeInTheDocument()
    expect(this.checkbox).toBeInTheDocument()
    expect(this.submitButton).toBeInTheDocument()
  }

  static expectResultVisible() {
    expect(this.backButton).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
  }
}

export default AppPage
