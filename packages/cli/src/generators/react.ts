import type { IconNode } from '@icon-forge/core'

/**
 * Generate React component code
 */
export function generateReactComponent(componentName: string, iconNode: IconNode, typescript: boolean = true): string {
  const typeImport = typescript
    ? 'import type { IconNode } from \'@icon-forge/core\'\n'
    : ''

  const iconNodeStr = JSON.stringify(iconNode, null, 2)

  return `${typeImport}import { createIcon } from '../createIcon'

export const iconNode${typescript ? ': IconNode' : ''} = ${iconNodeStr}

const ${componentName} = createIcon('${componentName}', iconNode)

export default ${componentName}
`
}
