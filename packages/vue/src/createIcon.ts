import type { IconNode } from '@dawnice/icon-forge-core'
import type { PropType } from 'vue'
import { mergeClasses, toKebabCase } from '@dawnice/icon-forge-core'
import { defineComponent, h } from 'vue'
import { Icon } from './Icon'

/**
 * Factory function to create Vue icon components
 */
export function createIcon(iconName: string, iconNode: IconNode) {
  return defineComponent({
    name: iconName,
    props: {
      size: {
        type: [String, Number] as PropType<string | number>,
        default: 24,
      },
      color: {
        type: String,
        default: 'currentColor',
      },
      strokeWidth: {
        type: [String, Number] as PropType<string | number>,
        default: 2,
      },
      className: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      return () =>
        h(Icon, {
          iconNode,
          ...props,
          className: mergeClasses(`icon-${toKebabCase(iconName)}`, props.className),
        })
    },
  })
}
