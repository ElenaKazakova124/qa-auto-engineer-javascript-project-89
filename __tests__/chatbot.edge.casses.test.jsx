import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { FormPage } from './pages';

vi.mock('../api/chatbot', () => ({
  sendMessage: vi.fn()
}));

describe('Edge Cases тестирование формы', () => {
  let formPage;

  beforeEach(() => {
    formPage = new FormPage();
  });

  test('Обработка слишком длинного адреса', async () => {
    render(<App />);
    
    const longAddress = 'a'.repeat(501);
    
    await formPage.fillForm({
      email: 'test@example.com',
      password: 'password123',
      address: longAddress,
      acceptRules: true
    });
    
    await formPage.submitForm();
    
    await waitFor(() => {
      const error = formPage.getAddressError();
      expect(error).toBeInTheDocument();
    });
  });

  test('Обработка некорректного email', async () => {
    render(<App />);
    
    // Заполним все поля кроме email с валидными значениями
    await formPage.fillForm({
      password: 'password123',  
      address: 'Test address',
      country: 'Россия',
      acceptRules: true
    });
    
    // Теперь добавим невалидный email
    // Используем формат который пройдет HTML5 валидацию, но не пройдет нашу
    await formPage.fillEmail('test@test');
    
    expect(formPage.emailInput).toHaveValue('test@test');
    
    await formPage.submitForm();
    
    // Ждем появления ошибки валидации
    await waitFor(() => {
      // Проверяем что форма не отправилась
      const successMessage = screen.queryByText(/форма успешно отправлена/i);
      expect(successMessage).not.toBeInTheDocument();
      
      // И проверяем ошибку
      const emailError = screen.queryByText(/некорректный email/i);
      expect(emailError).toBeInTheDocument();
    });
    
    expect(formPage.isFormVisible()).toBe(true);
    expect(formPage.isSuccessMessageVisible()).toBe(false);
  });

  test('Обработка пустых обязательных полей', async () => {
    render(<App />);
    
    await formPage.submitForm();
    
    await waitFor(() => {
      const emailError = formPage.getEmailError();
      const passwordError = formPage.getPasswordError();
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  test('Обработка непринятых правил', async () => {
    render(<App />);
    
    await formPage.fillForm({
      email: 'test@example.com',
      password: 'password123',
      acceptRules: false
    });
    
    await formPage.submitForm();
    
    await waitFor(() => {
      const error = formPage.getRulesError();
      expect(error).toBeInTheDocument();
    });
  });

  test('Валидация email при различных форматах', async () => {
    render(<App />);
    
    // Сначала заполним остальные обязательные поля
    await formPage.fillForm({
      password: 'password123',
      acceptRules: true
    });
    
    // Тест 1: Проверяем пустой email
    await formPage.clearEmail();
    await formPage.submitForm();
    
    await waitFor(() => {
      const error = screen.queryByText(/email обязателен/i);
      expect(error).toBeInTheDocument();
    });
    
    // Тест 2: Проверяем email без доменной зоны (test@test)
    // Этот формат пройдет HTML5 валидацию, но не пройдет нашу regex
    await formPage.clearEmail();
    await formPage.fillEmail('test@test');
    await formPage.submitForm();
    
    await waitFor(() => {
      const error = screen.queryByText(/некорректный email/i);
      expect(error).toBeInTheDocument();
    });
    
    // Тест 3: Проверяем успешную валидацию с корректным email
    await formPage.clearEmail();
    await formPage.fillEmail('test@example.com');
    
    // Не отправляем форму, просто проверяем что ошибка исчезла
    const noError = screen.queryByText(/некорректный email|email обязателен/i);
    expect(noError).not.toBeInTheDocument();
  });

  test('Успешная отправка формы с валидными данными', async () => {
    render(<App />);
    
    await formPage.fillForm({
      email: 'valid@example.com',
      password: 'securePassword123',
      address: 'Невский проспект, 12',
      city: 'Санкт-Петербург',
      country: 'Россия',
      acceptRules: true
    });
    
    await formPage.submitForm();
    
    await waitFor(() => {
      expect(formPage.isSuccessMessageVisible()).toBe(true);
      expect(formPage.isFormVisible()).toBe(false);
    });
  });
});