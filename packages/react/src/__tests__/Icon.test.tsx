import type { IconNode } from '@icon-forge/core'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon } from '../Icon'

describe('icon Component', () => {
  const testIconNode: IconNode = [
    ['path', { d: 'M5 12h14', key: 'line' }],
    ['path', { d: 'm12 5 7 7-7 7', key: 'arrow' }],
  ]

  it('renders with default props', () => {
    const { container } = render(<Icon iconNode={testIconNode} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeDefined()
    expect(svg?.getAttribute('width')).toBe('24')
    expect(svg?.getAttribute('height')).toBe('24')
  })

  it('renders with custom size', () => {
    const { container } = render(<Icon iconNode={testIconNode} size={48} />)
    const svg = container.querySelector('svg')

    expect(svg?.getAttribute('width')).toBe('48')
    expect(svg?.getAttribute('height')).toBe('48')
  })

  it('renders with custom color', () => {
    const { container } = render(<Icon iconNode={testIconNode} color="red" />)
    const svg = container.querySelector('svg')

    expect(svg?.getAttribute('stroke')).toBe('red')
  })

  it('renders icon elements', () => {
    const { container } = render(<Icon iconNode={testIconNode} />)
    const paths = container.querySelectorAll('path')

    expect(paths.length).toBe(2)
  })
})
