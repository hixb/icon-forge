import { optimize } from 'svgo'

export async function optimizeSVG(svgContent: string, config?: any): Promise<string> {
  const result = optimize(svgContent, {
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeEditorsNSData',
      'cleanupAttrs',
      'mergeStyles',
      'inlineStyles',
      'minifyStyles',
      'cleanupIds',
      'removeUselessDefs',
      'cleanupNumericValues',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'removeUnusedNS',
      'sortAttrs',
      'removeTitle',
      'removeDesc',
    ],
    ...config,
  })

  return result.data
}
