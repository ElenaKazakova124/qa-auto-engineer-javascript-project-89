import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

class FormPage {
  constructor() {
    this.user = userEvent.setup();
  }

  // Селекторы
  get emailInput() {
    return screen.getByLabelText(/email/i);
  }

  get passwordInput() {
    return screen.getByLabelText(/пароль/i);
  }

  get addressInput() {
    return screen.getByLabelText(/адрес/i);
  }

  get cityInput() {
    return screen.getByLabelText(/город/i);
  }

  get countrySelect() {
    return screen.getByLabelText(/страна/i);
  }

  get rulesCheckbox() {
    return screen.getByLabelText(/принять правила/i);
  }

  get submitButton() {
    return screen.getByRole('button', { name: /зарегистрироваться/i });
  }

  get successMessage() {
    return screen.getByText(/форма успешно отправлена/i);
  }

  // Методы для получения ошибок
  getEmailError() {
    return screen.queryByText(/некорректный email|email обязателен/i);
  }

  getPasswordError() {
    return screen.queryByText(/пароль обязателен/i);
  }

  getAddressError() {
    return screen.queryByText(/слишком длинный адрес/i);
  }

  getRulesError() {
    return screen.queryByText(/необходимо принять правила/i);
  }

  // Действия
  async fillEmail(email) {
    await this.user.type(this.emailInput, email);
  }

  async fillPassword(password) {
    await this.user.type(this.passwordInput, password);
  }

  async fillAddress(address) {
    await this.user.type(this.addressInput, address);
  }

  async fillCity(city) {
    await this.user.type(this.cityInput, city);
  }

  async selectCountry(country) {
    await this.user.selectOptions(this.countrySelect, country);
  }

  async checkRules() {
    await this.user.click(this.rulesCheckbox);
  }

  async submitForm() {
    await this.user.click(this.submitButton);
  }

  async fillForm(data) {
    if (data.email) await this.fillEmail(data.email);
    if (data.password) await this.fillPassword(data.password);
    if (data.address) await this.fillAddress(data.address);
    if (data.city) await this.fillCity(data.city);
    if (data.country) await this.selectCountry(data.country);
    if (data.acceptRules) await this.checkRules();
  }

  async clearEmail() {
    await this.user.clear(this.emailInput);
  }

  async clearPassword() {
    await this.user.clear(this.passwordInput);
  }

  // Проверки
  isSuccessMessageVisible() {
    return screen.queryByText(/форма успешно отправлена/i) !== null;
  }

  isFormVisible() {
    return screen.queryByRole('button', { name: /зарегистрироваться/i }) !== null;
  }
}

export default FormPage;
