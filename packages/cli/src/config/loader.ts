import type { IconForgeConfig } from './types'
import { createJiti } from 'jiti'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'

/**
 * Loading configuration file
 */
export async function loadConfig(configPath: string): Promise<IconForgeConfig> {
  const absolutePath = path.resolve(process.cwd(), configPath)

  try {
    // Determine the config-helper path to avoid circular dependency
    // Handle both ESM and CJS contexts
    let configHelperPath: string
    if (typeof __dirname !== 'undefined') {
      // CommonJS context - __dirname is in dist/ directory
      configHelperPath = path.resolve(__dirname, 'config-helper.js')
    }
    else {
      // ESM context
      const currentFile = fileURLToPath(import.meta.url)
      configHelperPath = path.resolve(path.dirname(currentFile), 'config-helper.mjs')
    }

    // Use jiti to load TypeScript config files
    const jiti = createJiti(process.cwd(), {
      interopDefault: true,
      moduleCache: false,
      requireCache: false,
      alias: {
        // Map @dawnice/icon-forge-cli to config-helper to avoid circular dependency
        '@dawnice/icon-forge-cli': configHelperPath,
      },
    })

    const config = jiti(absolutePath)

    return Array.isArray(config) ? config[0] : config
  }
  catch (error: any) {
    throw new Error(`Failed to load configuration from ${configPath}: ${error.message}`)
  }
}

/**
 * Verify configuration
 */
export function validateConfig(config: IconForgeConfig): void {
  if (!config.framework) {
    throw new Error('Framework not specified in configuration')
  }

  if (!['react', 'vue', 'svelte'].includes(config.framework)) {
    throw new Error(`Invalid framework: ${config.framework}`)
  }

  if (!config.input) {
    throw new Error('Input directory not specified in configuration')
  }

  if (!config.output) {
    throw new Error('Output directory not specified in configuration')
  }
}
