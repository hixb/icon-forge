/**
 * Supported SVG element types for icon rendering
 *
 * @remarks
 * These are the primitive SVG elements that can be used to compose icons.
 * Each element type corresponds to a standard SVG element with specific rendering behavior.
 */
export type SVGElementType = 'path' | 'circle' | 'rect' | 'line' | 'polygon' | 'polyline' | 'ellipse' | 'g'

/**
 * Represents an icon as an array of SVG element nodes
 *
 * @remarks
 * Each icon is defined as an array of tuples, where each tuple contains:
 * - Element name: The type of SVG element to render
 * - Attributes: Key-value pairs of SVG attributes (e.g., `d`, `cx`, `cy`, `fill`, etc.)
 *
 * @example
 * ```typescript
 * const arrowIcon: IconNode = [
 *   ['path', { d: 'M5 12h14', key: 'line' }],
 *   ['path', { d: 'm12 5 7 7-7 7', key: 'arrow' }],
 * ]
 * ```
 */
export type IconNode = [
    elementName: SVGElementType,
    attrs: Record<string, string | number>,
][]

/**
 * Base interface for icon component props
 *
 * @remarks
 * This interface provides common properties that can be used across different framework implementations
 * (React, Vue, Svelte, etc.). Framework-specific implementations may extend this interface with
 * additional properties like event handlers or native element attributes.
 *
 * @property size - The width and height of the icon in pixels or CSS units (default: 24)
 * @property color - The stroke color of the icon (default: 'currentColor')
 * @property strokeWidth - The width of the icon's stroke in pixels (default: 2)
 * @property className - Additional CSS class names to apply to the icon element
 */
export interface IconProps {
  /** The width and height of the icon. Accepts pixel values (number) or CSS units (string) */
  size?: string | number
  /** The stroke color of the icon. Supports any valid CSS color value */
  color?: string
  /** The width of the stroke. Accepts pixel values (number) or unitless values (string) */
  strokeWidth?: string | number
  /** Additional CSS class names to apply to the SVG element */
  className?: string
}
