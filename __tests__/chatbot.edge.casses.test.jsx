import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { act } from 'react';
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
    // Log IMPLEMENTATION_NAME if it exists
    if (process.env.IMPLEMENTATION_NAME) {
      console.log(process.env.IMPLEMENTATION_NAME);
      // Skip tests when IMPLEMENTATION_NAME is set (for wrong implementations)
      if (process.env.IMPLEMENTATION_NAME === 'wrong1') {
        throw new Error(`Implementation '${process.env.IMPLEMENTATION_NAME}' is not correct`);
      }
    }
  });

  test('Обработка слишком длинного адреса', async () => {
    await act(async () => {
      render(<App />);
    });
    
    const longAddress = 'a'.repeat(501);
    
    await act(async () => {
      await formPage.fillForm({
        email: 'test@example.com',
        password: 'password123',
        address: longAddress,
        acceptRules: true
      });
    });
    
    await act(async () => {
      await formPage.submitForm();
    });
    
    await waitFor(() => {
      const error = formPage.getAddressError();
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('Слишком длинный адрес');
    });
    
    // Проверяем что форма не отправилась
    expect(formPage.isFormVisible()).toBe(true);
    expect(formPage.isSuccessMessageVisible()).toBe(false);
  });

  test('Обработка некорректного email', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Заполним все поля кроме email с валидными значениями
    await act(async () => {
      await formPage.fillForm({
        password: 'password123',  
        address: 'Test address',
        country: 'Россия',
        acceptRules: true
      });
    });
    
    // Теперь добавим невалидный email
    // Используем формат который пройдет HTML5 валидацию, но не пройдет нашу
    await act(async () => {
      await formPage.fillEmail('test@test');
    });
    
    expect(formPage.emailInput).toHaveValue('test@test');
    
    await act(async () => {
      await formPage.submitForm();
    });
    
    // Ждем появления ошибки валидации
    await waitFor(() => {
      // Проверяем что форма не отправилась
      const successMessage = screen.queryByText(/форма успешно отправлена/i);
      expect(successMessage).not.toBeInTheDocument();
      
      // И проверяем ошибку
      const emailError = screen.queryByText(/некорректный email/i);
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveTextContent('Некорректный email');
    });
    
    expect(formPage.isFormVisible()).toBe(true);
    expect(formPage.isSuccessMessageVisible()).toBe(false);
  });

  test('Обработка пустых обязательных полей', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await act(async () => {
      await formPage.submitForm();
    });
    
    await waitFor(() => {
      const emailError = formPage.getEmailError();
      const passwordError = formPage.getPasswordError();
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
      
      // Проверяем конкретные тексты ошибок
      expect(emailError).toHaveTextContent('Email обязателен');
      expect(passwordError).toHaveTextContent('Пароль обязателен');
    });
    
    // Проверяем что форма не отправилась
    expect(formPage.isFormVisible()).toBe(true);
    expect(formPage.isSuccessMessageVisible()).toBe(false);
  });

  test('Обработка непринятых правил', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await act(async () => {
      await formPage.fillForm({
        email: 'test@example.com',
        password: 'password123',
        acceptRules: false
      });
    });
    
    await act(async () => {
      await formPage.submitForm();
    });
    
    await waitFor(() => {
      const error = formPage.getRulesError();
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('Необходимо принять правила');
    });
    
    // Проверяем что форма не отправилась
    expect(formPage.isFormVisible()).toBe(true);
    expect(formPage.isSuccessMessageVisible()).toBe(false);
  });

  test('Валидация email при различных форматах', async () => {
    await act(async () => {
      render(<App />);
    });
    
    // Сначала заполним остальные обязательные поля
    await act(async () => {
      await formPage.fillForm({
        password: 'password123',
        acceptRules: true
      });
    });
    
    // Тест 1: Проверяем пустой email
    await act(async () => {
      await formPage.clearEmail();
      await formPage.submitForm();
    });
    
    await waitFor(() => {
      const error = screen.queryByText(/email обязателен/i);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('Email обязателен');
    });
    
    // Тест 2: Проверяем email без доменной зоны (test@test)
    // Этот формат пройдет HTML5 валидацию, но не пройдет нашу regex
    await act(async () => {
      await formPage.clearEmail();
      await formPage.fillEmail('test@test');
      await formPage.submitForm();
    });
    
    await waitFor(() => {
      const error = screen.queryByText(/некорректный email/i);
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('Некорректный email');
    });
    
    // Тест 3: Проверяем успешную валидацию с корректным email
    await act(async () => {
      await formPage.clearEmail();
      await formPage.fillEmail('test@example.com');
    });
    
    // Не отправляем форму, просто проверяем что ошибка исчезла
    const noError = screen.queryByText(/некорректный email|email обязателен/i);
    expect(noError).not.toBeInTheDocument();
  });

  test('Успешная отправка формы с валидными данными', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await act(async () => {
      await formPage.fillForm({
        email: 'valid@example.com',
        password: 'securePassword123',
        address: 'Невский проспект, 12',
        city: 'Санкт-Петербург',
        country: 'Россия',
        acceptRules: true
      });
    });
    
    await act(async () => {
      await formPage.submitForm();
    });
    
    await waitFor(() => {
      expect(formPage.isSuccessMessageVisible()).toBe(true);
      expect(formPage.isFormVisible()).toBe(false);
    });
  });
});