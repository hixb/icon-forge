# Icon Forge

A flexible, multi-framework icon library with CLI support.

## Features

- 🎨 Multi-framework support (React, Vue, Svelte)
- 🚀 TypeScript first
- 📦 Tree-shakeable
- 🛠️ CLI tool for generating custom icons
- ⚡ Fast and lightweight

## Installation

### React

```bash
npm install @icon-forge/react
```

### Vue

```bash
npm install @icon-forge/vue
```

### Svelte

```bash
npm install @icon-forge/svelte
```

## Usage

### React

```tsx
import { ArrowRight } from '@icon-forge/react';

function App() {
return <ArrowRight size={24} color="blue" />;
}
```

### CLI Tool

```bash
# Install CLI
npm install -D @icon-forge/cli

# Initialize configuration
npx icon-forge init

# Generate icons from SVG files
npx icon-forge generate

# Watch mode
npx icon-forge watch
```

## License

MIT