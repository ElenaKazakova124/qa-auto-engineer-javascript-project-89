# QA Auto Engineer JavaScript Project

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io/)

[![Actions Status](https://github.com/hexlet-components/projects-frontend-l4-server/workflows/hexlet-check/badge.svg)](https://github.com/hexlet-components/projects-frontend-l4-server/actions)
[![CI Status](https://github.com/hexlet-components/projects-frontend-l4-server/workflows/CI/badge.svg)](https://github.com/hexlet-components/projects-frontend-l4-server/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=qa-auto-engineer-javascript-project-89&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=qa-auto-engineer-javascript-project-89)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=qa-auto-engineer-javascript-project-89&metric=coverage)](https://sonarcloud.io/summary/new_code?id=qa-auto-engineer-javascript-project-89)

## 📋 Описание проекта

Это проект для автоматизации тестирования веб-приложения с формой регистрации и чат-ботом. Проект включает в себя полный набор автоматических тестов, использующих паттерн Page Object Model для обеспечения поддерживаемости и масштабируемости тестового кода.

### 🎯 Основные возможности

- ✅ Форма регистрации с валидацией полей
- 💬 Интеграция чат-бота от Hexlet
- 🧪 Комплексное тестовое покрытие
- 📊 CI/CD пайплайн с автоматическими проверками
- 🎨 Современный стек технологий

## 🛠 Стек технологий

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Testing Framework:** Vitest
- **Testing Library:** React Testing Library
- **UI Testing:** @testing-library/user-event
- **Code Quality:** ESLint
- **CI/CD:** GitHub Actions
- **Coverage:** SonarCloud, Codecov
- **Package Manager:** npm

## 🚀 Быстрый старт

### Требования

- Node.js >= 18.0.0
- npm >= 9.0.0

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/qa-auto-engineer-javascript-project-89.git
cd qa-auto-engineer-javascript-project-89
```

2. Установите зависимости:
```bash
npm install
```

### Запуск приложения

#### Режим разработки
```bash
npm run dev
```
Приложение будет доступно по адресу: http://localhost:5173

#### Сборка для продакшена
```bash
npm run build
```

#### Предпросмотр продакшен-сборки
```bash
npm run preview
```

## 🧪 Тестирование

### Запуск всех тестов
```bash
npm test
```

### Запуск тестов в режиме CI
```bash
npm run test:run
```

### Запуск тестов с покрытием
```bash
npm run test:coverage
```

### Интерактивный режим тестирования
```bash
npm run test:ui
```

### Проверка кода линтером
```bash
npm run lint
```

## 📁 Структура проекта

```
qa-auto-engineer-javascript-project-89/
├── __tests__/
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.js       # Базовый класс для страниц
│   │   ├── FormPage.js       # Page Object для формы
│   │   ├── ChatBotPage.js    # Page Object для чат-бота
│   │   └── index.js          # Экспорт всех Page Objects
│   ├── chatbot.basic.test.jsx
│   ├── chatbot.e2e.test.jsx
│   ├── chatbot.edge.casses.test.jsx
│   └── chatbot.integration.test.jsx
├── src/
│   ├── components/
│   │   └── Widget.jsx        # Компонент виджета чат-бота
│   ├── App.jsx              # Главный компонент приложения
│   └── main.jsx             # Точка входа
├── .github/
│   └── workflows/
│       ├── hexlet-check.yml # Проверка Hexlet
│       └── ci.yml           # CI/CD пайплайн
├── scripts/
│   └── fix-css.js           # Скрипт для исправления CSS
├── package.json
├── vite.config.js
├── sonar-project.properties
└── README.md
```

## 🏗 Архитектура тестов

### Page Object Model

Проект использует паттерн Page Object Model для организации тестового кода:

- **BasePage** - базовый класс с общими методами для всех страниц
- **FormPage** - инкапсулирует логику работы с формой регистрации
- **ChatBotPage** - содержит методы для взаимодействия с чат-ботом

### Типы тестов

1. **Basic Tests** - базовые тесты отображения компонентов
2. **E2E Tests** - сквозные тесты пользовательских сценариев
3. **Edge Cases Tests** - тесты граничных случаев и валидации
4. **Integration Tests** - интеграционные тесты с фикстурами

## 📊 Метрики качества

- 📈 Code Coverage: >80%
- ✅ All Tests Passing
- 🎯 Zero Critical Issues
- 🔍 Maintainability Rating: A

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Пожалуйста:

1. Форкните репозиторий
2. Создайте feature ветку (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект является учебным и создан в рамках обучения на Hexlet.

## 👥 Авторы

- Hexlet Team
- Contributors

## 🔗 Полезные ссылки

- [Документация Vite](https://vitejs.dev/)
- [Документация React](https://react.dev/)
- [Документация Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

<div align="center">
  Made with ❤️ for Hexlet
</div>