import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    ignores: ['netlify.toml'],
    pnpm: true,
    rules: {
      'ts/explicit-function-return-type': 'off',
    },
  },
)
