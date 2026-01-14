import type { IconNode } from '@icon-forge/core'

export async function parseSVG(svgContent: string): Promise<IconNode> {
  const iconNode: IconNode = []

  // Remove SVG tags and comments
  const cleanedSVG = svgContent
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')

  const elementRegex = /<(path|circle|rect|line|polygon|polyline|ellipse|g)([^>]*)\/>/g
  const matches = Array.from(cleanedSVG.matchAll(elementRegex))

  let keyIndex = 0
  for (const match of matches) {
    const tag = match[1] as any
    const attrsString = match[2]

    // Parse attributes
    const attrs: Record<string, string | number> = { key: `${tag}-${keyIndex++}` }
    const attrRegex = /(\w+)="([^"]*)"/g
    const attrMatches = Array.from(attrsString.matchAll(attrRegex))

    for (const attrMatch of attrMatches) {
      const [, name, value] = attrMatch
      attrs[name] = value
    }

    iconNode.push([tag, attrs])
  }

  if (iconNode.length === 0) {
    throw new Error('No valid SVG elements found')
  }

  return iconNode
}
