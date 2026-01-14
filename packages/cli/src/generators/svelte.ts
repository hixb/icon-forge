import type { IconNode } from '@dawnice/icon-forge-core'

/**
 * Generate Svelte component code
 */
export function generateSvelteComponent(componentName: string, iconNode: IconNode, typescript: boolean = true): string {
  const scriptLang = typescript ? ' lang="ts"' : ''
  const iconNodeStr = JSON.stringify(iconNode, null, 2)

  return `<script${scriptLang}>
  import { Icon } from '@dawnice/icon-forge-svelte';
  ${typescript ? 'import type { IconNode } from \'@dawnice/icon-forge-core\';\n' : ''}
  const iconNode${typescript ? ': IconNode' : ''} = ${iconNodeStr};
</script>

<Icon {iconNode} {...$$restProps} />
`
}
