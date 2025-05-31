import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Linting Tests', () => {
  it('should have proper type definitions for Jest DOM matchers', () => {
    // Test toBeInTheDocument
    const element = document.createElement('div')
    document.body.appendChild(element)
    expect(element).toBeInTheDocument()

    // Test toBeDisabled
    const button = document.createElement('button')
    button.disabled = true
    document.body.appendChild(button)
    expect(button).toBeDisabled()

    // Test toHaveValue
    const input = document.createElement('input')
    input.value = 'test value'
    document.body.appendChild(input)
    expect(input).toHaveValue('test value')

    // Test toHaveBeenCalledWith
    const mockFn = jest.fn()
    mockFn('test arg')
    expect(mockFn).toHaveBeenCalledWith('test arg')
  })
}) 