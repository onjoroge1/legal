import '@testing-library/jest-dom';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  callback: ResizeObserverCallback;
}

global.ResizeObserver = ResizeObserverMock; 