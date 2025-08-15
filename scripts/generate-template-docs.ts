import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'template'
}

async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true })
}

async function main(): Promise<void> {
  const outDir = path.resolve(process.cwd(), 'docs', 'templates')
  await ensureDir(outDir)

  const templates = await prisma.documentTemplate.findMany({
    include: {
      category: true,
      questionnaires: {
        include: {
          _count: { select: { questions: true } },
        },
        orderBy: { name: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  })

  let written = 0

  for (const tpl of templates) {
    const fileBase = tpl.code || slugify(`${tpl.name}-${tpl.id.slice(0, 6)}`)
    const filePath = path.join(outDir, `${fileBase}.md`)

    const lines: string[] = []

    lines.push(`# ${tpl.name}`)
    lines.push('')
    lines.push(`- ID: \`${tpl.id}\``)
    lines.push(`- Code: \`${tpl.code ?? '-'}\``)
    lines.push(`- Type: \`${tpl.type}\``)
    lines.push(`- Category: \`${tpl.category?.name ?? '-'}\``)
    lines.push(`- Version: \`${tpl.version}\``)
    lines.push(`- State: \`${tpl.state ?? '-'}\``)
    lines.push('')

    if (tpl.description) {
      lines.push('## Description')
      lines.push('')
      lines.push(tpl.description)
      lines.push('')
    }

    lines.push('## Questionnaires')
    lines.push('')

    if (!tpl.questionnaires || tpl.questionnaires.length === 0) {
      lines.push('- None')
    } else {
      for (const q of tpl.questionnaires) {
        const parts: string[] = []
        parts.push(`- **${q.name}**`)
        parts.push(`ID: \`${q.id}\``)
        parts.push(`Questions: ${q._count?.questions ?? 0}`)
        if (q.description) parts.push(`Description: ${q.description}`)
        lines.push(parts.join(' — '))
      }
    }

    lines.push('')

    await fs.writeFile(filePath, lines.join('\n'), 'utf8')
    written += 1
    console.log(`Wrote ${filePath}`)
  }

  console.log(`\nGenerated ${written} markdown file(s) in ${outDir}`)
}

main()
  .catch((err) => {
    console.error('Error generating template docs:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })