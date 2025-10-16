import { expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import App from '../../src/App.jsx'
import { formLabels, buttonTexts } from '../../utils/constants'

class AppPage {
  static renderApp() {
    render(<App />)
  }

  static get emailInput() {
    return screen.getByLabelText(formLabels.email)
  }

  static get passwordInput() {
    return screen.getByLabelText(formLabels.password)
  }

  static get addressInput() {
    return screen.getByLabelText(formLabels.address)
  }

  static get cityInput() {
    return screen.getByLabelText(formLabels.city)
  }

  static get countrySelect() {
    return screen.getByLabelText(formLabels.country)
  }

  static get checkbox() {
    return screen.getByLabelText(formLabels.acceptRules)
  }

  static get submitButton() {
    return screen.getByRole('button', { name: buttonTexts.submit })
  }

  static get backButton() {
    return screen.getByRole('button', { name: buttonTexts.back })
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
