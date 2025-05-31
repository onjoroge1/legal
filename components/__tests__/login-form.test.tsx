import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../login-form'
import { signIn } from 'next-auth/react'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
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

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders login form with all elements', () => {
    render(<LoginForm />)
    
    // Check for main elements
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
  })

  it('validates email format', async () => {
    render(<LoginForm />)
    
    const form = screen.getByRole('form')
    const emailInput = screen.getByLabelText(/email/i)

    // Test invalid email
    await userEvent.clear(emailInput)
    await userEvent.type(emailInput, 'invalid-email')
    fireEvent.submit(form)
    
    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText(/please enter a valid email address/i)
      expect(errorMessage).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('validates password length', async () => {
    render(<LoginForm />)
    
    const form = screen.getByRole('form')
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    // Test short password
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, '12345')
    fireEvent.submit(form)
    
    await waitFor(() => {
      const errorMessage = screen.getByText(/password must be at least 6 characters/i)
      expect(errorMessage).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('handles successful login', async () => {
    const mockSignIn = signIn as jest.Mock
    mockSignIn.mockResolvedValueOnce({ url: '/dashboard' })

    render(<LoginForm />)
    
    const form = screen.getByRole('form')
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
        callbackUrl: '/dashboard'
      })
    })
  })

  it('handles login error', async () => {
    const mockSignIn = signIn as jest.Mock
    mockSignIn.mockResolvedValueOnce({ error: 'Invalid credentials' })

    render(<LoginForm />)
    
    const form = screen.getByRole('form')
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'wrongpassword')
    fireEvent.submit(form)

    await waitFor(() => {
      const errorMessage = screen.getByText(/invalid email or password/i)
      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('handles social login', async () => {
    const mockSignIn = signIn as jest.Mock
    mockSignIn.mockResolvedValueOnce({ url: '/dashboard' })

    render(<LoginForm />)
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i })
    await userEvent.click(googleButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('google', { callbackUrl: '/dashboard' })
    })
  })
}) 