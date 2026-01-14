import path from 'node:path'
import process from 'node:process'
import chalk from 'chalk'
import chokidar from 'chokidar'
import { loadConfig } from '../config/loader'
import { generateCommand } from './generate'

interface WatchOptions {
  config: string
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export async function watchCommand(options: WatchOptions) {
  console.log(chalk.bold.cyan('\n👀 Watching for changes...\n'))

  const config = await loadConfig(options.config)
  const inputDir = path.resolve(process.cwd(), config.input)

  const debouncedGenerate = debounce(
    () => generateCommand(options),
    config.watch?.debounce || 300,
  )

  const watcher = chokidar.watch(`${inputDir}/**/*.svg`, {
    ignored: config.watch?.ignore || ['**/node_modules/**', '**/.git/**'],
    persistent: true,
    ignoreInitial: true,
  })

  watcher
    .on('add', (filePath) => {
      console.log(chalk.green(`\n➕ Added: ${path.relative(process.cwd(), filePath)}`))
      debouncedGenerate()
    })
    .on('change', (filePath) => {
      console.log(chalk.blue(`\n📝 Changed: ${path.relative(process.cwd(), filePath)}`))
      debouncedGenerate()
    })
    .on('unlink', (filePath) => {
      console.log(chalk.red(`\n➖ Removed: ${path.relative(process.cwd(), filePath)}`))
      debouncedGenerate()
    })

  console.log(chalk.green(`✓ Watching ${inputDir}/**/*.svg`))
  console.log(chalk.gray('  Press Ctrl+C to stop\n'))
}
