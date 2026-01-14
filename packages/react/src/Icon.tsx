'use client'

import type { IconNode, IconProps } from '@icon-forge/core'
import type React from 'react'
import { mergeClasses } from '@icon-forge/core'
import { createElement, forwardRef } from 'react'

export interface ReactIconProps extends IconProps, Omit<React.SVGAttributes<SVGSVGElement>, 'color'> {
  iconNode?: IconNode
}

/**
 * Base Icon component for rendering SVG icons
 */
export const Icon = forwardRef<SVGSVGElement, ReactIconProps>(
  (
    {
      iconNode,
      size = 24,
      color = 'currentColor',
      strokeWidth = 2,
      className,
      children,
      ...restProps
    },
    ref,
  ) => {
    if (!iconNode && !children) {
      console.warn('Icon: iconNode or children is required')
      return null
    }

    return createElement(
      'svg',
      {
        ref,
        xmlns: 'http://www.w3.org/2000/svg',
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: color,
        strokeWidth,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        className: mergeClasses('icon', className),
        ...restProps,
      },
      [
        ...(iconNode?.map(([tag, attrs]) => createElement(tag, attrs)) || []),
        ...(Array.isArray(children) ? children : children ? [children] : []),
      ],
    )
  },
)

Icon.displayName = 'Icon'
