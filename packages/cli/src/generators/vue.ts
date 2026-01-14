import type { IconNode } from '@dawnice/icon-forge-core'

/**
 * Generate Vue component code
 */
export function generateVueComponent(componentName: string, iconNode: IconNode, typescript: boolean = true): string {
  const scriptLang = typescript ? ' lang="ts"' : ''
  const iconNodeStr = JSON.stringify(iconNode, null, 2)

  return `<template>
  <Icon :iconNode="iconNode" v-bind="$attrs" />
</template>

<script${scriptLang}>
import { defineComponent } from 'vue';
import { Icon } from '@dawnice/icon-forge-vue';
${typescript ? 'import type { IconNode } from \'@dawnice/icon-forge-core\';\n' : ''}
export default defineComponent({
  name: '${componentName}',
  components: { Icon },
  setup() {
    const iconNode${typescript ? ': IconNode' : ''} = ${iconNodeStr};
    return { iconNode };
  },
});
</script>
`
}
