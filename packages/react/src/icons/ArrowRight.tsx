import type { IconNode } from '@icon-forge/core'
import { createIcon } from '../createIcon'

export const iconNode: IconNode = [
  ['path', { d: 'M5 12h14', key: 'line' }],
  ['path', { d: 'm12 5 7 7-7 7', key: 'arrow' }],
]

const ArrowRight = createIcon('ArrowRight', iconNode)

export default ArrowRight
