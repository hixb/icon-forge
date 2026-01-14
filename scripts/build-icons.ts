import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

async function buildIcons() {
  console.log('🔨 Building icons...')

  const iconsDir = path.join(process.cwd(), 'icons')
  const outputDir = path.join(process.cwd(), 'packages/react/src/icons')

  await fs.mkdir(outputDir, { recursive: true })

  const files = await fs.readdir(iconsDir)
  const svgFiles = files.filter(f => f.endsWith('.svg'))

  console.log(`📁 Found ${svgFiles.length} SVG files`)

  for (const file of svgFiles) {
    const iconName = file.replace('.svg', '')
    const componentName = iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')

    const componentCode = `import type { IconNode } from '@icon-forge/core'
import { createIcon } from '../createIcon'

export const iconNode: IconNode = [
  ['path', { d: 'M5 12h14', key: 'line' }],
  ['path', { d: 'm12 5 7 7-7 7', key: 'arrow' }],
]

const ${componentName} = createIcon('${componentName}', iconNode)

export default ${componentName}
`

    await fs.writeFile(
      path.join(outputDir, `${componentName}.tsx`),
      componentCode,
    )

    console.log(`✓ Generated ${componentName}.tsx`)
  }

  const exports = svgFiles.map((file) => {
    const iconName = file.replace('.svg', '')
    const componentName = iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
    return `export { default as ${componentName} } from './${componentName}'`
  })

  await fs.writeFile(
    path.join(outputDir, 'index.ts'),
    `${exports.join('\n')}\n`,
  )

  console.log('✅ Build complete!')
}

buildIcons().catch(console.error)
