import OpenAI from 'openai'
import { DocumentTemplate } from '@prisma/client'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class TemplateRenderer {
  static async render(template: DocumentTemplate, variables: any) {
    let content = template.content
    
    // Replace variables
    content = this.replaceVariables(content, variables)
    
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
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
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
    // Parse the AI analysis and generate actionable suggestions
    const suggestions = {
      criticalClauses: [] as string[],
      risks: [] as string[],
      customizations: [] as string[],
      compliance: [] as string[],
      improvements: [] as string[]
    }

    // Parse the analysis text and categorize suggestions
    const lines = analysis.split('\n')
    let currentCategory = ''

    lines.forEach(line => {
      if (line.includes('Missing critical clauses')) {
        currentCategory = 'criticalClauses'
      } else if (line.includes('Potential risks')) {
        currentCategory = 'risks'
      } else if (line.includes('Areas needing customization')) {
        currentCategory = 'customizations'
      } else if (line.includes('Compliance')) {
        currentCategory = 'compliance'
      } else if (line.includes('Suggested improvements')) {
        currentCategory = 'improvements'
      } else if (line.trim() && currentCategory) {
        suggestions[currentCategory as keyof typeof suggestions].push(line.trim())
      }
    })

    return suggestions
  }
} 