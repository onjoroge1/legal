import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { act } from '@testing-library/react'
import SignupForm from '../signup-form'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Mock useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn().mockImplementation(({ title, description, variant }) => ({
      id: 'test-toast',
      title,
      description,
      variant,
    })),
  }),
}))

// Mock fetch
global.fetch = jest.fn()

describe('SignupForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
    })
  })

  it('renders signup form with all elements', () => {
    render(<SignupForm />)
    
    // Check for main elements
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create free account/i })).toBeInTheDocument()
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
  })

  it('validates name length', async () => {
    render(<SignupForm />)
    
    const nameInput = screen.getByPlaceholderText(/john doe/i)
    const emailInput = screen.getByPlaceholderText(/name@example.com/i)
    const passwordInput = screen.getByPlaceholderText(/^password$/i)
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create free account/i })
    
    await act(async () => {
      await userEvent.type(nameInput, 'Jo')
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password123')
      await userEvent.type(confirmPasswordInput, 'password123')
    })

    await act(async () => {
      await userEvent.click(submitButton)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<SignupForm />)
    
    const nameInput = screen.getByPlaceholderText(/john doe/i)
    const emailInput = screen.getByPlaceholderText(/name@example.com/i)
    const passwordInput = screen.getByPlaceholderText(/^password$/i)
    const submitButton = screen.getByRole('button', { name: /create free account/i })
    
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe')
      await userEvent.type(emailInput, 'invalid-email')
      await userEvent.type(passwordInput, 'password123')
      await userEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it('validates password length', async () => {
    render(<SignupForm />)
    
    const nameInput = screen.getByPlaceholderText(/john doe/i)
    const emailInput = screen.getByPlaceholderText(/name@example.com/i)
    const passwordInput = screen.getByPlaceholderText(/^password$/i)
    const submitButton = screen.getByRole('button', { name: /create free account/i })
    
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe')
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'short')
      await userEvent.click(submitButton)
    })

    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('validates password match', async () => {
    render(<SignupForm />)
    
    const nameInput = screen.getByPlaceholderText(/john doe/i)
    const emailInput = screen.getByPlaceholderText(/name@example.com/i)
    const passwordInput = screen.getByPlaceholderText(/^password$/i)
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create free account/i })
    
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe')
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password123')
      await userEvent.type(confirmPasswordInput, 'different')
      await userEvent.click(submitButton)
    })

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('handles successful signup', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' })
      })
    )

    render(<SignupForm />)
    
    const nameInput = screen.getByPlaceholderText(/john doe/i)
    const emailInput = screen.getByPlaceholderText(/name@example.com/i)
    const passwordInput = screen.getByPlaceholderText(/^password$/i)
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create free account/i })
    
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe')
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password123')
      await userEvent.type(confirmPasswordInput, 'password123')
      await userEvent.click(submitButton)
    })
    
    expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
        plan: 'free'
      })
    })
  })

  it('handles signup error', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Email already exists' })
      })
    )

    render(<SignupForm />)
    
    const nameInput = screen.getByPlaceholderText(/john doe/i)
    const emailInput = screen.getByPlaceholderText(/name@example.com/i)
    const passwordInput = screen.getByPlaceholderText(/^password$/i)
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create free account/i })
    
    await act(async () => {
      await userEvent.type(nameInput, 'John Doe')
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password123')
      await userEvent.type(confirmPasswordInput, 'password123')
      await userEvent.click(submitButton)
    })
    
    expect(screen.getByText(/email already exists/i)).toBeInTheDocument()
  })

  it('handles social signup', async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({ ok: true })

    render(<SignupForm />)
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i })
    
    await act(async () => {
      await userEvent.click(googleButton)
    })
    
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google', {
        callbackUrl: '/dashboard',
        redirect: true
      })
    })
  })

  it('shows payment button for paid plan', async () => {
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('pro'),
    })

    render(<SignupForm />)
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i })
    
    await act(async () => {
      await userEvent.click(googleButton)
    })
    
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('google', {
        callbackUrl: '/payment?tier=pro',
        redirect: true
      })
    })
  })
}) 