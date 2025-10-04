import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

class BasePage {
  constructor() {
    this.user = userEvent.setup();
  }

  // Общие методы для работы с элементами
  async click(element) {
    await this.user.click(element);
  }

  async type(element, text) {
    await this.user.type(element, text);
  }

  async clear(element) {
    await this.user.clear(element);
  }

  async selectOption(element, option) {
    await this.user.selectOptions(element, option);
  }

  async hover(element) {
    await this.user.hover(element);
  }

  async unhover(element) {
    await this.user.unhover(element);
  }

  // Методы для поиска элементов
  getByText(text) {
    return screen.getByText(text);
  }

  queryByText(text) {
    return screen.queryByText(text);
  }

  getByRole(role, options) {
    return screen.getByRole(role, options);
  }

  queryByRole(role, options) {
    return screen.queryByRole(role, options);
  }

  getByTestId(testId) {
    return screen.getByTestId(testId);
  }

  queryByTestId(testId) {
    return screen.queryByTestId(testId);
  }

  getByLabelText(text) {
    return screen.getByLabelText(text);
  }

  queryByLabelText(text) {
    return screen.queryByLabelText(text);
  }

  getByPlaceholderText(text) {
    return screen.getByPlaceholderText(text);
  }

  queryByPlaceholderText(text) {
    return screen.queryByPlaceholderText(text);
  }

  // Методы для ожидания
  async waitForElement(callback, options = {}) {
    return waitFor(callback, options);
  }

  async waitForElementToBeRemoved(callback, options = {}) {
    return waitFor(() => {
      expect(callback()).not.toBeInTheDocument();
    }, options);
  }

  // Утилиты
  isElementVisible(element) {
    return element !== null && element !== undefined;
  }

  getElementText(element) {
    return element ? element.textContent : null;
  }

  getElementValue(element) {
    return element ? element.value : null;
  }

  hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
  }

  getAttribute(element, attributeName) {
    return element ? element.getAttribute(attributeName) : null;
  }

  isDisabled(element) {
    return element ? element.disabled : false;
  }

  isChecked(element) {
    return element ? element.checked : false;
  }

  // Скриншоты и отладка
  debug(element = null) {
    if (element) {
      screen.debug(element);
    } else {
      screen.debug();
    }
  }

  logTestingPlaygroundURL(element = null) {
    if (element) {
      screen.logTestingPlaygroundURL(element);
    } else {
      screen.logTestingPlaygroundURL();
    }
  }
}

export default BasePage;
