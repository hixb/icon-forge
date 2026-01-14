import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'

interface InitOptions {
  force?: boolean
  config?: string
}

export async function initCommand(options: InitOptions) {
  // Interactive Q&A for config path first
  const pathAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'configPath',
      message: 'Where should we create the config file?',
      default: options.config || './icon-forge.config.ts',
      validate: (input: string) => {
        if (!input.endsWith('.ts') && !input.endsWith('.js')) {
          return 'Config file must have .ts or .js extension'
        }
        return true
      },
    },
  ])

  const configPath = path.resolve(process.cwd(), pathAnswers.configPath)
  const configDir = path.dirname(configPath)
  const spinner = ora()

  // Check if the configuration file already exists
  const configExists = await fs.access(configPath).then(() => true).catch(() => false)

  if (configExists && !options.force) {
    console.log(chalk.yellow('⚠️  Configuration file already exists!'))
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'Do you want to overwrite it?',
        default: false,
      },
    ])

    if (!overwrite) {
      console.log(chalk.blue('ℹ️  Cancelled.'))
      return
    }
  }

  console.log(chalk.bold.cyan('\n🎨 Welcome to Icon Forge!\n'))
  console.log('Let\'s set up your icon configuration...\n')

  // Interactive Q&A
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Select your framework:',
      choices: ['react', 'vue', 'svelte'],
      default: 'react',
    },
    {
      type: 'input',
      name: 'input',
      message: 'Where are your SVG files?',
      default: './icons',
    },
    {
      type: 'input',
      name: 'output',
      message: 'Where should we generate the components?',
      default: './src/components/icons',
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Use TypeScript?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'optimize',
      message: 'Enable SVG optimization?',
      default: true,
    },
    {
      type: 'input',
      name: 'prefix',
      message: 'Add icon name prefix? (leave empty to skip)',
      default: '',
    },
    {
      type: 'input',
      name: 'suffix',
      message: 'Add icon name suffix? (leave empty to skip)',
      default: '',
    },
  ])

  // Calculate relative path from config file to project root
  const relativeConfigDir = path.relative(configDir, process.cwd()) || '.'

  // Generate configuration file content
  const configContent = `import { defineConfig } from '@dawnice/icon-forge-cli';

export default defineConfig({
  // Framework
  framework: '${answers.framework}',

  // Config file directory (used to resolve relative paths)
  // Leave as '.' if config is in project root, or set to relative path to root
  configDir: '${relativeConfigDir === '.' ? '.' : relativeConfigDir}',

  // Input directory for SVG files
  input: '${answers.input}',

  // Output directory for generated components
  output: '${answers.output}',

  // Generate TypeScript files
  typescript: ${answers.typescript},

  // Optimize SVG files
  optimize: ${answers.optimize},

  ${answers.prefix ? `// Icon name prefix\n  prefix: '${answers.prefix}',\n` : ''}${answers.suffix ? `// Icon name suffix\n  suffix: '${answers.suffix}',\n` : ''}
  // Advanced options (uncomment to use)
  // transform: (iconName) => iconName,
  // svgoConfig: {
  //   plugins: [],
  // },
  // generateOptions: {
  //   index: true,
  //   types: true,
  // },
  // watch: {
  //   enabled: false,
  //   ignore: ['**/node_modules/**'],
  //   debounce: 300,
  // },
  // hooks: {
  //   beforeParse: async (svg) => svg,
  //   afterGenerate: async (code) => code,
  //   onComplete: async (stats) => console.log(stats),
  // },
});
`

  spinner.start('Creating configuration file...')

  try {
    // Ensure config directory exists
    await fs.mkdir(configDir, { recursive: true })

    // Write to configuration file
    await fs.writeFile(configPath, configContent, 'utf-8')
    spinner.succeed(chalk.green(`✅ Configuration file created: ${path.relative(process.cwd(), configPath)}`))

    // Create input directory (relative to config file location)
    const inputDir = path.resolve(configDir, relativeConfigDir, answers.input)
    await fs.mkdir(inputDir, { recursive: true })
    console.log(chalk.green(`✅ Created directory: ${answers.input}`))

    // Create output directory (relative to config file location)
    const outputDir = path.resolve(configDir, relativeConfigDir, answers.output)
    await fs.mkdir(outputDir, { recursive: true })
    console.log(chalk.green(`✅ Created directory: ${answers.output}`))

    // Success prompt
    console.log(chalk.bold.green('\n🎉 All set! Now you can:\n'))
    console.log(chalk.cyan(`   1. Add your SVG files to ${answers.input}`))
    console.log(chalk.cyan(`   2. Run: npx icon-forge generate ${pathAnswers.configPath !== './icon-forge.config.ts' ? `--config ${pathAnswers.configPath}` : ''}\n`))
  }
  catch (error) {
    spinner.fail(chalk.red('Failed to create configuration'))
    console.error(error)
    process.exit(1)
  }
}
