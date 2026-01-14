import type { IconNode } from '@icon-forge/core'
import { createIcon } from '@icon-forge/react'

export const iconNode: IconNode = [
  [
    'path',
    {
      key: 'path-0',
      fill: '#FFF',
      rule: 'evenodd',
      d: 'M8.75 20a1 1 0 0 1-.511-1.86c2.626-1.556 6.51-4.583 6.51-6.14 0-1.56-3.883-4.586-6.51-6.14a1 1 0 0 1 1.02-1.72c1.25.74 7.49 4.598 7.49 7.86 0 3.26-6.238 7.12-7.49 7.86a1 1 0 0 1-.508.14',
    },
  ],
]

const ArrowRight = createIcon('ArrowRight', iconNode)

export default ArrowRight
