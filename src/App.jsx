import React, { useState } from 'react';
import Widget from './components/Widget';
import steps from '@hexlet/chatbot-v2/example-steps';
import '@hexlet/chatbot-v2/styles';

const App = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    address: '',
    city: '',
    country: '',
    acceptRules: false
  });
  const [submittingState, setSubmittingState] = useState('fillingForm');
  
  const [errors, setErrors] = useState({});

  const handleChangeField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    console.log('Validating form with email:', form.email);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = 'Email обязателен';
      console.log('Email is empty');
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Некорректный email';
      console.log('Email is invalid:', form.email);
    }
    
    if (!form.password) {
      newErrors.password = 'Пароль обязателен';
    }
    
    if (form.address.length > 500) {
      newErrors.address = 'Слишком длинный адрес';
    }
    
    if (!form.acceptRules) {
      newErrors.acceptRules = 'Необходимо принять правила';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    if (validateForm()) {
      console.log('Form is valid, submitting...');
      setSubmittingState('submitted');
    } else {
      console.log('Form has errors, not submitting');
    }
  };

  const renderForm = () => (
    <form className="m-3" onSubmit={handleSubmitForm} name="myForm">
     <div className="col-md-6 mb-3">
  <label htmlFor="email" className="col-form-label">
    Email
  </label>
  <input
    autoComplete="on"
    type="email"
    name="email"
    onChange={handleChangeField}
    value={form.email}
    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
    id="email"
    placeholder="Email"
  />
  {errors.email && (
    <div className="invalid-feedback">{errors.email}</div>
  )}
</div>
      <div className="col-md-6 mb-3">
  <label htmlFor="password" className="col-form-label">
    Пароль
  </label>
  <input
    autoComplete="on"
    type="password"
    onChange={handleChangeField}
    value={form.password}
    name="password"
    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
    id="password"
    placeholder="Пароль"
  />
  {errors.password && (
    <div className="invalid-feedback">{errors.password}</div>
  )}
</div>

      <div className="col-md-6 mb-3">
        <label htmlFor="address" className="col-form-label">
          Адрес
        </label>
        <textarea
          type="text"
          name="address"
          value={form.address}
          onChange={handleChangeField}
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          id="address"
          placeholder="Невский проспект, 12"
        />
        {errors.address && (
          <div className="invalid-feedback">{errors.address}</div>
        )}
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="city" className="col-form-label">
          Город
        </label>
        <input
          autoComplete="on"
          type="text"
          name="city"
          onChange={handleChangeField}
          value={form.city}
          className="form-control"
          id="city"
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="country" className="col-form-label">
          Страна
        </label>
        <select
          id="country"
          name="country"
          onChange={handleChangeField}
          className="form-control"
          value={form.country}
        >
          <option value="">Выберите</option>
          <option value="Аргентина">Аргентина</option>
          <option value="Россия">Россия</option>
          <option value="Китай">Китай</option>
        </select>
      </div>
      <div className="col-md-6 mb-3">
  <div className="form-check">
    <label className="form-check-label" htmlFor="rules">
      <input
        autoComplete="on"
        id="rules"
        name="acceptRules"
        className={`form-check-input ${errors.acceptRules ? 'is-invalid' : ''}`}
        onChange={handleChangeField}
        type="checkbox"
        checked={form.acceptRules}
      />
      Принять правила
    </label>
    {errors.acceptRules && (
      <div className="invalid-feedback d-block">{errors.acceptRules}</div>
    )}
  </div>
</div>
      <button type="submit" className="btn btn-primary">
        Зарегистрироваться
      </button>
    </form>
  );

  const renderResult = () => (
    <div>
      <h2>Форма успешно отправлена!</h2>
    </div>
  );

  return (
    <>
      {submittingState === "fillingForm" ? renderForm() : renderResult()}
      {Widget(steps)}
    </>
  );
};

export default App;