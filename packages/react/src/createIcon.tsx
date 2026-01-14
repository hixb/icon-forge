'use client'

import type { IconNode } from '@icon-forge/core'
import type { ReactIconProps } from './Icon'
import { mergeClasses, toKebabCase } from '@icon-forge/core'
import React, { forwardRef } from 'react'
import { Icon } from './Icon'

/**
 * Factory function to create icon components
 */
export function createIcon(iconName: string, iconNode: IconNode) {
  const Component = forwardRef<SVGSVGElement, Omit<ReactIconProps, 'iconNode'>>(
    ({ className, ...props }, ref) => {
      return (
        <Icon
          ref={ref}
          iconNode={iconNode}
          className={mergeClasses(`icon-${toKebabCase(iconName)}`, className)}
          {...props}
        />
      )
    },
  )

  Component.displayName = iconName

  return Component
}
