import '@testing-library/jest-dom'
import { vi } from 'vitest'

global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
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
