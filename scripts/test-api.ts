import fetch from 'node-fetch'

async function main() {
  try {
    console.log('Testing /api/dashboard/categories endpoint...')
    const response = await fetch('http://localhost:3001/api/dashboard/categories')
    console.log('\nResponse status:', response.status)
    
    const data = await response.text()
    console.log('\nResponse body:', data)
    
  } catch (error) {
    console.error('Error:', error)
  }
}

main() 