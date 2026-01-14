/**
 * SVG element types
 */
export type SVGElementType = 'path' | 'circle' | 'rect' | 'line' | 'polygon' | 'polyline' | 'ellipse' | 'g'

/**
 * Icon node: [element name, attributes]
 */
export type IconNode = [
    elementName: SVGElementType,
    attrs: Record<string, string | number>,
][]

/**
 * Icon props (base interface for all frameworks)
 */
export interface IconProps {
  size?: string | number
  color?: string
  strokeWidth?: string | number
  className?: string
}
