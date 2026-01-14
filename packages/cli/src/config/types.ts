/**
 * Configuration interface for Icon Forge
 *
 * @remarks
 * This interface defines all available configuration options for generating
 * icon components from SVG files. It supports multiple frameworks and provides
 * extensive customization options for the generation process.
 */
export interface IconForgeConfig {
  /**
   * Target framework for generated components
   *
   * @remarks
   * Determines the output format and syntax of generated icon components
   *
   * @default 'react'
   */
  framework: 'react' | 'vue' | 'svelte'

  /**
   * Input directory containing SVG files
   *
   * @remarks
   * Path to the directory where source SVG files are located.
   * Can be relative to the project root or an absolute path.
   *
   * @default './icons'
   */
  input: string

  /**
   * Output directory for generated components
   *
   * @remarks
   * Path where the generated icon components will be written.
   * Can be relative to the project root or an absolute path.
   *
   * @default './src/components/icons'
   */
  output: string

  /**
   * Enable TypeScript output
   *
   * @remarks
   * When enabled, generates `.tsx` or `.ts` files with proper type definitions.
   * When disabled, generates `.jsx` or `.js` files.
   *
   * @default true
   */
  typescript?: boolean

  /**
   * Enable SVG optimization
   *
   * @remarks
   * When enabled, SVG files are optimized using SVGO before conversion.
   * This can reduce file size and remove unnecessary attributes.
   *
   * @default true
   */
  optimize?: boolean

  /**
   * Prefix to add to generated icon component names
   *
   * @remarks
   * The prefix is added before the icon name in PascalCase.
   *
   * @example
   * ```typescript
   * // With prefix: 'Icon'
   * // arrow-right.svg → IconArrowRight
   * { prefix: 'Icon' }
   * ```
   */
  prefix?: string

  /**
   * Suffix to add to generated icon component names
   *
   * @remarks
   * The suffix is added after the icon name in PascalCase.
   *
   * @example
   * ```typescript
   * // With suffix: 'Icon'
   * // arrow-right.svg → ArrowRightIcon
   * { suffix: 'Icon' }
   * ```
   */
  suffix?: string

  /**
   * Custom transformation function for icon names
   *
   * @remarks
   * Allows full control over how SVG file names are converted to component names.
   * This function is applied after prefix/suffix but can override the default behavior.
   *
   * @param iconName - The base icon name derived from the SVG file name
   * @returns The transformed component name
   *
   * @example
   * ```typescript
   * {
   *   transform: (name) => `My${name}Component`
   * }
   * ```
   */
  transform?: (iconName: string) => string

  /**
   * SVGO optimization configuration
   *
   * @remarks
   * Configuration object passed directly to SVGO for SVG optimization.
   * Only used when `optimize` is true.
   *
   * @see https://github.com/svg/svgo for available options
   *
   * @example
   * ```typescript
   * {
   *   svgoConfig: {
   *     plugins: [
   *       { name: 'removeViewBox', active: false },
   *       { name: 'removeDimensions', active: true }
   *     ]
   *   }
   * }
   * ```
   */
  svgoConfig?: {
    /** Array of SVGO plugins to apply */
    plugins?: any[]
    /** Additional SVGO configuration options */
    [key: string]: any
  }

  /**
   * Options for code generation
   *
   * @remarks
   * Controls which additional files are generated alongside icon components
   */
  generateOptions?: {
    /** Whether to generate an index file that exports all icons */
    index?: boolean
    /** Whether to generate TypeScript type definition files */
    types?: boolean
  }

  /**
   * File watch mode configuration
   *
   * @remarks
   * Enables automatic regeneration of components when SVG files change
   */
  watch?: {
    /** Enable watch mode */
    enabled?: boolean
    /** Glob patterns for files/directories to ignore */
    ignore?: string[]
    /** Debounce delay in milliseconds before triggering regeneration */
    debounce?: number
  }

  /**
   * Lifecycle hooks for custom processing
   *
   * @remarks
   * Hooks allow you to inject custom logic at different stages of the generation process.
   * All hooks support both synchronous and asynchronous functions.
   */
  hooks?: {
    /**
     * Called before parsing each SVG file
     *
     * @param svgContent - Raw SVG file content
     * @param fileName - Name of the SVG file
     * @returns Modified SVG content or original content
     */
    beforeParse?: (svgContent: string, fileName: string) => string | Promise<string>

    /**
     * Called after generating component code
     *
     * @param componentCode - Generated component code
     * @param iconName - Name of the icon component
     * @returns Modified component code or original code
     */
    afterGenerate?: (componentCode: string, iconName: string) => string | Promise<string>

    /**
     * Called when generation process completes
     *
     * @param stats - Statistics about the generation process
     */
    onComplete?: (stats: GenerateStats) => void | Promise<void>
  }
}

/**
 * Statistics collected during icon generation
 *
 * @remarks
 * Provides detailed information about the generation process,
 * including success/failure counts and file metadata
 */
export interface GenerateStats {
  /** Total number of SVG files processed */
  total: number
  /** Number of successfully generated components */
  success: number
  /** Number of failed generations */
  failed: number
  /** Total duration of the generation process in milliseconds */
  duration: number
  /** Detailed information about generated files */
  files: Array<{
    /** Component name */
    name: string
    /** Full path to the generated file */
    path: string
    /** File size in bytes */
    size: number
  }>
}

/**
 * Type-safe configuration helper function
 *
 * @remarks
 * Provides autocomplete and type checking for configuration objects.
 * This is a simple identity function that enables better IDE support.
 *
 * @param config - Icon Forge configuration object
 * @returns The same configuration object with proper typing
 *
 * @example
 * ```typescript
 * // In icon-forge.config.ts
 * import { defineConfig } from '@icon-forge/cli'
 *
 * export default defineConfig({
 *   framework: 'react',
 *   input: './icons',
 *   output: './src/icons'
 * })
 * ```
 */
export function defineConfig(config: IconForgeConfig): IconForgeConfig {
  return config
}
