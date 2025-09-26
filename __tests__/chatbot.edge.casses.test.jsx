import { vi } from 'vitest';

vi.mock('../api/chatbot', () => ({
  sendMessage: vi.fn()
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import Widget from "../src/components/Widget.jsx";

test('Обработка слишком длинного адреса', async () => {
  render(<App />);
  
  const longAddress = 'a'.repeat(501);
  
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
    target: { value: 'password123' }
  });
  
  const addressField = screen.getByPlaceholderText(/невский проспект/i);
  fireEvent.change(addressField, {
    target: { value: longAddress }
  });
  
  fireEvent.click(screen.getByText(/зарегистрироваться/i));
  
  await waitFor(() => {
    expect(screen.getByText(/слишком длинный адрес/i)).toBeInTheDocument();
  });
});

test('Обработка некорректного email', async () => {
  const user = userEvent.setup();
  render(<App />);
  
  await user.type(screen.getByPlaceholderText(/пароль/i), 'password123');
  await user.type(screen.getByPlaceholderText(/невский проспект/i), 'Test address');
  await user.selectOptions(screen.getByLabelText(/страна/i), 'Россия');
  await user.click(screen.getByLabelText(/принять правила/i));
  
  const emailInput = screen.getByPlaceholderText(/email/i);
  await user.clear(emailInput);
  await user.type(emailInput, 'invalid-email');
  
  expect(emailInput).toHaveValue('invalid-email');
  
  const submitButton = screen.getByText(/зарегистрироваться/i);
  await user.click(submitButton);
  
  expect(screen.getByText(/зарегистрироваться/i)).toBeInTheDocument();
});

test('Обработка пустых обязательных полей', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByText(/зарегистрироваться/i));
  
  await waitFor(() => {
    expect(screen.getByText(/email обязателен/i)).toBeInTheDocument();
    expect(screen.getByText(/пароль обязателен/i)).toBeInTheDocument();
  });
});

test('Обработка непринятых правил', async () => {
  render(<App />);
  
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
    target: { value: 'password123' }
  });
  
  fireEvent.click(screen.getByText(/зарегистрироваться/i));
  
  await waitFor(() => {
    expect(screen.getByText(/необходимо принять правила/i)).toBeInTheDocument();
  });
});