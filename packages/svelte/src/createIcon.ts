import type { IconNode } from '@dawnice/icon-forge-core'
import IconComponent from './Icon.svelte'

/**
 * Factory function to create Svelte icon components
 */
export function createIcon(iconName: string, iconNode: IconNode) {
  return class extends IconComponent {
    constructor(options: any) {
      super({
        ...options,
        props: {
          ...options.props,
          iconNode,
        },
      })
    }
  }
}
