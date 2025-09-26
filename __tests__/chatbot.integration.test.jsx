import '@testing-library/jest-dom'

describe('Интеграционное тестирование с фикстурами', () => {
  test('Чат-бот должен поддерживать конфигурацию из фикстур', () => {

    const { welcomeConfig } = require('../__fixtures__/botConfigs')
    
    expect(welcomeConfig).toBeDefined()
    expect(welcomeConfig.steps).toBeInstanceOf(Array)
    expect(welcomeConfig.steps.length).toBeGreaterThan(0)
    
  })
})