import type { IconForgeConfig } from './types'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

/**
 * Loading configuration file
 */
export async function loadConfig(configPath: string): Promise<IconForgeConfig> {
  const absolutePath = path.resolve(process.cwd(), configPath)
  const configDir = path.dirname(absolutePath)

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
    const loadedConfig = Array.isArray(config) ? config[0] : config

    // Resolve paths relative to config file location
    if (loadedConfig.configDir) {
      // Config file is in a subdirectory, resolve paths relative to project root
      const projectRoot = path.resolve(configDir, loadedConfig.configDir)

      // Resolve input and output paths relative to project root
      loadedConfig.input = path.resolve(projectRoot, loadedConfig.input)
      loadedConfig.output = path.resolve(projectRoot, loadedConfig.output)
    }
    else {
      // Config file is in project root, resolve paths relative to config directory
      loadedConfig.input = path.resolve(configDir, loadedConfig.input)
      loadedConfig.output = path.resolve(configDir, loadedConfig.output)
    }

    return loadedConfig
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
