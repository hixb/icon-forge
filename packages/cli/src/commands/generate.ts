import type { GenerateStats } from '../config/types'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { toPascalCase } from '@icon-forge/core'
import chalk from 'chalk'
import ora from 'ora'
import { loadConfig, validateConfig } from '../config/loader'
import { generateReactComponent } from '../generators/react'
import { generateSvelteComponent } from '../generators/svelte'
import { generateVueComponent } from '../generators/vue'
import { optimizeSVG } from '../parsers/optimizer'
import { parseSVG } from '../parsers/svgParser'

interface GenerateOptions {
  config: string
}

export async function generateCommand(options: GenerateOptions) {
  const spinner = ora('Loading configuration...').start()
  const startTime = Date.now()

  try {
    // Loading configuration file
    const config = await loadConfig(options.config)
    spinner.succeed(chalk.green('Configuration loaded'))

    // Verify configuration
    validateConfig(config)

    // Parse path
    const inputDir = path.resolve(process.cwd(), config.input)
    const outputDir = path.resolve(process.cwd(), config.output)

    // Check the input directory
    spinner.start('Checking input directory...')
    try {
      await fs.access(inputDir)
      spinner.succeed(chalk.green(`Input directory: ${config.input}`))
    }
    catch {
      spinner.fail(chalk.red(`Input directory not found: ${config.input}`))
      process.exit(1)
    }

    // Create output directory
    await fs.mkdir(outputDir, { recursive: true })

    // Read SVG files
    spinner.start('Reading SVG files...')
    const files = await fs.readdir(inputDir)
    const svgFiles = files.filter(file => file.endsWith('.svg'))

    if (svgFiles.length === 0) {
      spinner.warn(chalk.yellow(`No SVG files found in ${config.input}`))
      return
    }

    spinner.succeed(chalk.green(`Found ${svgFiles.length} SVG files`))

    // Process each SVG file
    console.log(chalk.bold.cyan('\n🎨 Processing icons...\n'))

    const stats: GenerateStats = {
      total: svgFiles.length,
      success: 0,
      failed: 0,
      duration: 0,
      files: [],
    }

    const exports: string[] = []

    for (const file of svgFiles) {
      const iconName = file.replace('.svg', '')
      const svgPath = path.join(inputDir, file)

      try {
        // Read SVG content
        let svgContent = await fs.readFile(svgPath, 'utf-8')

        // Call beforeParse hook
        if (config.hooks?.beforeParse) {
          svgContent = await config.hooks.beforeParse(svgContent, file)
        }

        // Optimize SVG
        if (config.optimize) {
          svgContent = await optimizeSVG(svgContent, config.svgoConfig)
        }

        // Parse SVG
        const iconNode = await parseSVG(svgContent)

        // Generate component name
        let componentName = toPascalCase(iconName)
        if (config.transform) {
          componentName = config.transform(iconName)
        }
        else {
          if (config.prefix)
            componentName = config.prefix + componentName
          if (config.suffix)
            componentName = componentName + config.suffix
        }

        // Generate component based on framework
        let componentCode: string
        let fileExtension: string

        switch (config.framework) {
          case 'react':
            componentCode = generateReactComponent(componentName, iconNode, config.typescript)
            fileExtension = config.typescript ? '.tsx' : '.jsx'
            break
          case 'vue':
            componentCode = generateVueComponent(componentName, iconNode, config.typescript)
            fileExtension = '.vue'
            break
          case 'svelte':
            componentCode = generateSvelteComponent(componentName, iconNode, config.typescript)
            fileExtension = '.svelte'
            break
        }

        // Call afterGenerate hook
        if (config.hooks?.afterGenerate) {
          componentCode = await config.hooks.afterGenerate(componentCode, componentName)
        }

        // Write to file
        const outputPath = path.join(outputDir, `${componentName}${fileExtension}`)
        await fs.writeFile(outputPath, componentCode, 'utf-8')

        // Record statistical information
        const fileStats = await fs.stat(outputPath)
        stats.files.push({
          name: componentName,
          path: outputPath,
          size: fileStats.size,
        })

        exports.push(componentName)
        stats.success++

        console.log(chalk.green(`✓ ${file} → ${componentName}${fileExtension}`))
      }
      catch (error: any) {
        stats.failed++
        console.error(chalk.red(`✗ Failed to process ${file}:`), error.message)
      }
    }

    // Generate index file
    if (config.generateOptions?.index !== false) {
      spinner.start('Generating index file...')

      const indexExtension = config.typescript ? '.ts' : '.js'
      const indexContent = `${exports
        .map((name) => {
          const ext = config.framework === 'react'
            ? (config.typescript ? '.tsx' : '.jsx')
            : config.framework === 'vue'
              ? '.vue'
              : '.svelte'
          return `export { default as ${name} } from './${name}${ext}';`
        })
        .join('\n')}\n`

      await fs.writeFile(
        path.join(outputDir, `index${indexExtension}`),
        indexContent,
        'utf-8',
      )

      spinner.succeed(chalk.green('Index file generated'))
    }

    // Generate type definitions (if needed)
    if (config.generateOptions?.types && config.typescript) {
      spinner.start('Generating type definitions...')

      const typesContent = `export type IconName = ${exports.map(name => `'${name}'`).join(' | ')};\n\nexport const iconNames: IconName[] = ${JSON.stringify(exports, null, 2)};\n`

      await fs.writeFile(
        path.join(outputDir, 'types.ts'),
        typesContent,
        'utf-8',
      )

      spinner.succeed(chalk.green('Type definitions generated'))
    }

    // Calculate duration
    stats.duration = Date.now() - startTime

    // Call onComplete hook
    if (config.hooks?.onComplete) {
      await config.hooks.onComplete(stats)
    }

    // Display statistics
    console.log(chalk.bold.green(`\n🎉 Done! Generated ${stats.success} icon components in ${config.output}`))
    console.log(chalk.gray(`   Duration: ${stats.duration}ms`))
    if (stats.failed > 0) {
      console.log(chalk.yellow(`   Failed: ${stats.failed}`))
    }
  }
  catch (error: any) {
    spinner.fail(chalk.red('Failed to generate icons'))
    console.error(error)
    process.exit(1)
  }
}
