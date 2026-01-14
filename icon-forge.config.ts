export default {
  // Framework
  framework: 'vue',

  // Input directory for SVG files
  input: './icons',

  // Output directory for generated components
  output: './packages/vue/src/icons',

  // Generate TypeScript files
  typescript: true,

  // Optimize SVG files
  optimize: true,

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
}
