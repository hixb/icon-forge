# Icon Forge

A flexible, multi-framework icon library with CLI support for generating icon components from SVG files.

## Features

- 🎨 **Multi-framework support** - React, Vue 3, and Svelte
- 🚀 **TypeScript first** - Full type safety and IntelliSense support
- 📦 **Tree-shakeable** - Only bundle the icons you use
- 🛠️ **Powerful CLI** - Generate icon components from SVG files
- ⚡ **Fast and lightweight** - Minimal runtime overhead
- 🎯 **Customizable** - Full control over size, color, and stroke width
- 🔥 **Modern** - Built with latest tooling and best practices

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [@dawnice/icon-forge-cli](./packages/cli) | ![npm](https://img.shields.io/npm/v/@dawnice/icon-forge-cli) | CLI tool for generating icon components |
| [@dawnice/icon-forge-core](./packages/core) | ![npm](https://img.shields.io/npm/v/@dawnice/icon-forge-core) | Core utilities and types |
| [@dawnice/icon-forge-react](./packages/react) | ![npm](https://img.shields.io/npm/v/@dawnice/icon-forge-react) | React icon components |
| [@dawnice/icon-forge-vue](./packages/vue) | ![npm](https://img.shields.io/npm/v/@dawnice/icon-forge-vue) | Vue 3 icon components |
| [@dawnice/icon-forge-svelte](./packages/svelte) | ![npm](https://img.shields.io/npm/v/@dawnice/icon-forge-svelte) | Svelte icon components |

## Installation

### React

```bash
npm install @dawnice/icon-forge-react
# or
pnpm add @dawnice/icon-forge-react
# or
yarn add @dawnice/icon-forge-react
```

### Vue

```bash
npm install @dawnice/icon-forge-vue
# or
pnpm add @dawnice/icon-forge-vue
```

### Svelte

```bash
npm install @dawnice/icon-forge-svelte
# or
pnpm add @dawnice/icon-forge-svelte
```

### CLI

```bash
npm install -D @dawnice/icon-forge-cli
# or
pnpm add -D @dawnice/icon-forge-cli
```

## Usage

### React

```tsx
import { Icon, ArrowRight } from '@dawnice/icon-forge-react';

function App() {
  return (
    <div>
      {/* Use pre-generated icon */}
      <ArrowRight size={24} color="blue" strokeWidth={2} />

      {/* Or use the base Icon component */}
      <Icon
        iconNode={[
          ['path', { d: 'M5 12h14' }],
          ['path', { d: 'm12 5 7 7-7 7' }]
        ]}
        size={32}
        color="red"
      />
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div>
    <!-- Use pre-generated icon -->
    <ArrowRight :size="24" color="blue" :stroke-width="2" />

    <!-- Or use the base Icon component -->
    <Icon
      :iconNode="iconNode"
      :size="32"
      color="red"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@dawnice/icon-forge-vue';
import { ArrowRight } from '@dawnice/icon-forge-vue/icons';

const iconNode = [
  ['path', { d: 'M5 12h14' }],
  ['path', { d: 'm12 5 7 7-7 7' }]
];
</script>
```

### Svelte

```svelte
<script lang="ts">
  import { Icon } from '@dawnice/icon-forge-svelte';
  import ArrowRight from '@dawnice/icon-forge-svelte/icons/ArrowRight.svelte';

  const iconNode = [
    ['path', { d: 'M5 12h14' }],
    ['path', { d: 'm12 5 7 7-7 7' }]
  ];
</script>

<!-- Use pre-generated icon -->
<ArrowRight size={24} color="blue" strokeWidth={2} />

<!-- Or use the base Icon component -->
<Icon {iconNode} size={32} color="red" />
```

## CLI Usage

The CLI tool helps you generate icon components from SVG files.

### Initialize Configuration

```bash
npx icon-forge init
```

This will create an `icon-forge.config.ts` file with the following options:

```typescript
import { defineConfig } from '@dawnice/icon-forge-cli';

export default defineConfig({
  // Target framework: 'react' | 'vue' | 'svelte'
  framework: 'react',

  // Input directory containing SVG files
  input: './icons',

  // Output directory for generated components
  output: './src/icons',

  // Generate TypeScript files
  typescript: true,

  // Optimize SVG files using SVGO
  optimize: true,

  // Transform icon names (optional)
  transform: (iconName) => iconName,

  // SVGO configuration (optional)
  svgoConfig: {
    plugins: [
      'preset-default',
      'removeViewBox'
    ]
  }
});
```

### Generate Icons

```bash
npx icon-forge generate
```

This will:
1. Read SVG files from the input directory
2. Optimize them (if enabled)
3. Parse the SVG structure
4. Generate framework-specific components
5. Create an index file for easy importing

### Watch Mode

```bash
npx icon-forge watch
```

Automatically regenerate icons when SVG files change.

## Component Props

All icon components accept the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Icon size (width and height) |
| `color` | `string` | `'currentColor'` | Stroke color |
| `strokeWidth` | `number \| string` | `2` | Stroke width |
| `className` / `class` | `string` | `''` | Additional CSS classes |

React and Vue components also accept all standard SVG attributes.

## Examples

Check out the example projects in the `examples/` directory:

- [React Demo](./examples/react-demo)
- [Vue Demo](./examples/vue-demo)
- [Svelte Demo](./examples/svelte-demo)

## Development

This is a monorepo managed with [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/).

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run development mode
pnpm dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Xiaobing Zhu](https://github.com/hixb)

## Links

- [GitHub Repository](https://github.com/hixb/icon-forge)
- [Issue Tracker](https://github.com/hixb/icon-forge/issues)
- [npm Organization](https://www.npmjs.com/org/dawnice)
