import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TemplatePreview from '../template-preview'

// Mock console.error
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalConsoleError
})

// Mock fetch
global.fetch = jest.fn()

const mockTemplate = {
  id: '1',
  name: 'Test Template',
  content: 'This is a test template with {{variable1}} and {{variable2}}',
  variables: [
    {
      name: 'variable1',
      type: 'text',
      label: 'Variable 1',
      required: true
    },
    {
      name: 'variable2',
      type: 'select',
      label: 'Variable 2',
      required: false,
      options: ['Option 1', 'Option 2']
    }
  ]
}

const mockAnalysisResult = {
  content: 'This is a test template with value1 and Option 1',
  analysis: 'This is a sample analysis',
  suggestions: {
    criticalClauses: ['Critical clause 1'],
    risks: ['Risk 1'],
    customizations: ['Customization 1'],
    compliance: ['Compliance 1'],
    improvements: ['Improvement 1']
  }
}

describe('TemplatePreview', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })

  it('renders template preview', async () => {
    render(<TemplatePreview />)
    
    expect(screen.getByText(/template preview/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /generate analysis/i })).toBeInTheDocument()
  }, 30000)

  it('updates preview on input change', async () => {
    render(<TemplatePreview />)
    
    const input = screen.getByLabelText(/template/i)
    
    await act(async () => {
      await userEvent.type(input, 'Hello {{name}}')
    })
    
    expect(screen.getByText(/hello/i)).toBeInTheDocument()
  }, 30000)

  it('shows preview when button is clicked', async () => {
    render(<TemplatePreview />)
    
    const input = screen.getByLabelText(/template/i)
    const button = screen.getByRole('button', { name: /show preview/i })
    
    await act(async () => {
      await userEvent.type(input, 'Hello {{name}}')
      await userEvent.click(button)
    })
    
    expect(screen.getByText(/hello/i)).toBeInTheDocument()
  }, 30000)

  it('handles input variables', async () => {
    render(<TemplatePreview />)
    
    const input = screen.getByLabelText(/template/i)
    const button = screen.getByRole('button', { name: /show preview/i })
    
    await act(async () => {
      await userEvent.type(input, 'Hello {{name}}, your age is {{age}}')
      await userEvent.click(button)
    })
    
    expect(screen.getByText(/hello/i)).toBeInTheDocument()
    expect(screen.getByText(/your age is/i)).toBeInTheDocument()
  }, 30000)

  it('generates analysis when button is clicked', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ analysis: 'Analysis result' })
      })
    )

    render(<TemplatePreview />)
    
    const input = screen.getByLabelText(/template/i)
    const button = screen.getByRole('button', { name: /generate analysis/i })
    
    await act(async () => {
      await userEvent.type(input, 'Hello {{name}}')
      await userEvent.click(button)
    })
    
    expect(global.fetch).toHaveBeenCalledWith('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template: 'Hello {{name}}' })
    })
    
    expect(screen.getByText(/analysis result/i)).toBeInTheDocument()
  }, 30000)

  it('handles analysis error', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Analysis failed' })
      })
    )

    render(<TemplatePreview />)
    
    const input = screen.getByLabelText(/template/i)
    const button = screen.getByRole('button', { name: /generate analysis/i })
    
    await act(async () => {
      await userEvent.type(input, 'Hello {{name}}')
      await userEvent.click(button)
    })
    
    expect(screen.getByText(/analysis failed/i)).toBeInTheDocument()
  }, 30000)
}) 