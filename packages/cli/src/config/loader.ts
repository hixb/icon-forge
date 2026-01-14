import type { IconForgeConfig } from './types'
import path from 'node:path'
import process from 'node:process'
import { createJiti } from 'jiti'

/**
 * Loading configuration file
 */
export async function loadConfig(configPath: string): Promise<IconForgeConfig> {
  const absolutePath = path.resolve(process.cwd(), configPath)

  try {
    // Use jiti to load TypeScript config files
    // Use process.cwd() as the base to resolve workspace dependencies correctly
    const jiti = createJiti(process.cwd(), {
      interopDefault: true,
      moduleCache: false,
      requireCache: false,
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
