#!/usr/bin/env node
import { program } from 'commander'
import packageJson from '../package.json'
import { generateCommand } from './commands/generate'
import { initCommand } from './commands/init'
import { watchCommand } from './commands/watch'

export type { GenerateStats, IconForgeConfig } from './config/types'
export { defineConfig } from './config/types'

program
  .name('icon-forge')
  .description('Generate icon components from SVG files')
  .version(packageJson.version)

// Init command
program
  .command('init')
  .description('Initialize icon-forge configuration')
  .option('-f, --force', 'Overwrite existing configuration')
  .action(initCommand)

// Generate command
program
  .command('generate')
  .alias('gen')
  .description('Generate icon components from configuration')
  .option('-c, --config <path>', 'Path to configuration file', './icon-forge.config.ts')
  .action(generateCommand)

// Watch command
program
  .command('watch')
  .description('Watch SVG files and regenerate on changes')
  .option('-c, --config <path>', 'Path to configuration file', './icon-forge.config.ts')
  .action(watchCommand)

program.parse()
