import OpenAI from 'openai'
import { DocumentTemplate } from '@prisma/client'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class TemplateRenderer {
  static async render(template: DocumentTemplate, variables: any) {
    if (!template.content) {
      return {
        content: '',
        analysis: '',
        suggestions: []
      }
    }
    
    // Replace variables
    const content = this.replaceVariables(template.content, variables)
    
    // Apply AI analysis
    const analysis = await this.analyzeTemplate(content, variables)
    
    return {
      content,
      analysis: analysis || '',
      suggestions: this.generateSuggestions(analysis || '')
    }
  }

  private static replaceVariables(content: string, variables: any) {
    // Replace all variables in the template
    return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const value = this.getNestedValue(variables, key)
      return value !== undefined ? value : match
    })
  }

  private static getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  private static async analyzeTemplate(content: string, variables: any) {
    const prompt = `Analyze this legal document template and provide insights:

Document Content:
${content}

Variables Used:
${JSON.stringify(variables, null, 2)}

Please analyze:
1. Missing critical clauses
2. Potential risks
3. Areas needing customization
4. Compliance with legal requirements
5. Clarity and readability
6. Suggested improvements`

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a legal document analysis expert. Analyze the provided template and provide detailed insights."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return completion.choices[0].message.content
  }

  private static generateSuggestions(analysis: string) {
    // Extract key suggestions from the analysis
    // This is a placeholder implementation
    return analysis.split('\n').filter(line => line.includes('suggest') || line.includes('recommend'))
  }
} 