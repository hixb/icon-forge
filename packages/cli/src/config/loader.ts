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

  try {
    // Determine the CLI package path for alias resolution
    // Handle both ESM and CJS contexts
    let cliPackageDir: string
    if (typeof __dirname !== 'undefined') {
      // CommonJS context
      cliPackageDir = path.resolve(__dirname, '..')
    }
    else {
      // ESM context
      const currentFile = fileURLToPath(import.meta.url)
      cliPackageDir = path.resolve(path.dirname(currentFile), '..')
    }

    // Use jiti to load TypeScript config files
    const jiti = createJiti(process.cwd(), {
      interopDefault: true,
      moduleCache: false,
      requireCache: false,
      alias: {
        '@icon-forge/cli': cliPackageDir,
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
