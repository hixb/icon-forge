# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-01-14

### Added

- **Custom config file location**: Users can now specify where to create the configuration file during `init`
  - Interactive prompt asks for config file path (default: `./icon-forge.config.ts`)
  - Supports creating config in subdirectories (e.g., `./config/icons.config.ts`)

- **`configDir` option**: New configuration option to specify config file location relative to project root
  - Use `'.'` if config is in project root (default)
  - Use relative path like `'../..'` if config is in a subdirectory
  - Automatically calculated during `init` command
  - Paths in `input` and `output` are now correctly resolved relative to project root

### Changed

- `init` command now asks for config file location as the first question
- Config loader now resolves `input` and `output` paths based on `configDir` setting
- Success message after `init` now shows the correct command with `--config` flag if needed

### Example Usage

```bash
# Create config in subdirectory
npx icon-forge init
# > Where should we create the config file? ./config/icons.config.ts

# Generated config will include:
# configDir: '../..'  (relative path from config dir to project root)

# Generate icons with custom config location
npx icon-forge generate --config ./config/icons.config.ts
```

## [2.0.0] - 2026-01-14

### Changed

- **Package naming**: All packages renamed from `@dawnice/*` to `@dawnice/icon-forge-*`
  - `@dawnice/cli` → `@dawnice/icon-forge-cli`
  - `@dawnice/core` → `@dawnice/icon-forge-core`
  - `@dawnice/react` → `@dawnice/icon-forge-react`
  - `@dawnice/vue` → `@dawnice/icon-forge-vue`
  - `@dawnice/svelte` → `@dawnice/icon-forge-svelte`

- All import statements and generated code updated to use new package names
- Updated documentation and examples

### Migration Guide

Update your `package.json`:

```diff
- "@dawnice/react": "^1.0.0"
+ "@dawnice/icon-forge-react": "^2.0.0"
```

Update your imports:

```diff
- import { Icon } from '@dawnice/react'
+ import { Icon } from '@dawnice/icon-forge-react'
```

## [1.0.0] - 2026-01-14

### Added

- Initial release of Icon Forge
- Multi-framework support (React, Vue 3, Svelte)
- TypeScript-first with full type definitions
- Tree-shakeable exports
- CLI tool for generating icon components from SVG files
- SVG optimization using SVGO
- Watch mode for automatic regeneration
- Comprehensive configuration options
- Full documentation and examples
