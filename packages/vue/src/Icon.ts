import type { IconNode, IconProps } from '@dawnice/icon-forge-core'
import type { PropType } from 'vue'
import { mergeClasses } from '@dawnice/icon-forge-core'
import { defineComponent, h } from 'vue'

export interface VueIconProps extends IconProps {
  iconNode?: IconNode
}

/**
 * Base Icon component for Vue
 */
export const Icon = defineComponent({
  name: 'Icon',
  props: {
    iconNode: {
      type: Array as PropType<IconNode>,
      default: undefined,
    },
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
  setup(props, { slots }) {
    return () => {
      if (!props.iconNode && !slots.default) {
        console.warn('Icon: iconNode or default slot is required')
        return null
      }

      const children = [
        ...(props.iconNode?.map(([tag, attrs]) => h(tag, attrs)) || []),
        ...(slots.default ? slots.default() : []),
      ]

      return h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: props.color,
          strokeWidth: props.strokeWidth,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          class: mergeClasses('icon', props.className),
        },
        children,
      )
    }
  },
})
