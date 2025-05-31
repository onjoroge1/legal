import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toBeDisabled(): R
      toHaveValue(value: string | string[] | number): R
      toHaveBeenCalledWith(...args: any[]): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveStyle(style: Record<string, any>): R
      toBeChecked(): R
      toBeRequired(): R
      toBeValid(): R
      toBeInvalid(): R
      toHaveFocus(): R
      toBeEmpty(): R
      toHaveDescription(text: string | RegExp): R
      toHaveAccessibleName(name: string | RegExp): R
      toHaveAccessibleDescription(description: string | RegExp): R
      toHaveRole(role: string): R
      toHaveProperty(prop: string, value?: any): R
      toContainElement(element: HTMLElement | null): R
      toContainHTML(htmlText: string): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toBeGreaterThan(value: number): R
    }
  }
} 