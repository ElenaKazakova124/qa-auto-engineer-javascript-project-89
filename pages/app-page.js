import { expect } from 'vitest'
import textSet from '../__fixtures__/steps.js'
import '@testing-library/jest-dom/vitest'

export class AppPage {
  constructor(screen) {
    this.screen = screen
    this.inputEmail = this.screen.getByPlaceholderText('Email')
    this.inputPassword = this.screen.getByPlaceholderText('Пароль')
    this.inputAddress = this.screen.getByPlaceholderText('Мира, 22')
    this.inputCity = this.screen.getByLabelText('Город')
    this.selectCountry = this.screen.getByLabelText('Страна')
    this.checkbox = this.screen.getByRole('checkbox', {
      name: 'Принять правила',
    })
  }

  async inputEmailField(user, query) {
    await user.type(this.inputEmail, query)
  }

  async inputPassField(user, query) {
    await user.type(this.inputPassword, query)
  }

  async inputAdressField(user, query) {
    await user.type(this.inputAddress, query)
  }

  async inputCityField(user, query) {
    await user.type(this.inputCity, query)
  }

  async selectCountryField(user, query) {
    await user.selectOptions(this.selectCountry, query)
  }

  async selectCheckboxField(user) {
    await user.click(this.checkbox)
  }

  checkRegisterButton() {
    expect(
      this.screen.getByRole('button', { name: textSet.signUpButton }),
    )
  }

  async clickRegisterButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.signUpButton }),
    )
  }

  checkBackButton() {
    expect(this.screen.getByRole('button', { name: textSet.moveBackButtonApp }))
  }

  async clickBackButton(user) {
    await user.click(
      this.screen.getByRole('button', { name: textSet.moveBackButtonApp }),
    )
  }
}