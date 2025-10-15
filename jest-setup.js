import '@testing-library/jest-dom'

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }

  disconnect() {
    return null
  }

  unobserve() {
    return null
  }
}

global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {},
  }
}
