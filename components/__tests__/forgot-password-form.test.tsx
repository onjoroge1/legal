import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { act } from '@testing-library/react'
import ForgotPasswordForm from '../forgot-password-form'

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('renders forgot password form', () => {
    render(<ForgotPasswordForm />)
    
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    render(<ForgotPasswordForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    
    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.click(submitButton)
    })

    // Fast-forward the timer to simulate API call
    act(() => {
      jest.runAllTimers()
    })

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeInTheDocument()
    })
  })

  it('disables form elements during submission', async () => {
    render(<ForgotPasswordForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    
    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.click(submitButton)
    })

    expect(emailInput).toBeDisabled()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/sending link/i)

    // Fast-forward the timer to simulate API call
    act(() => {
      jest.runAllTimers()
    })
  })

  it('validates email input', async () => {
    render(<ForgotPasswordForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /send reset link/i })
    
    await act(async () => {
      await userEvent.type(emailInput, 'invalid-email')
      await userEvent.click(submitButton)
    })

    expect(emailInput).toBeInvalid()

    // Fast-forward the timer to simulate API call
    act(() => {
      jest.runAllTimers()
    })
  })
}) 