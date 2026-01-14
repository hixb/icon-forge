<script lang="ts">
  import type { IconNode } from '@dawnice/icon-forge-core';
  import { mergeClasses } from '@dawnice/icon-forge-core';

  export let iconNode: IconNode | undefined = undefined;
  export let size: string | number = 24;
  export let color: string = 'currentColor';
  export let strokeWidth: string | number = 2;
  let className: string = '';
  export { className as class };

  $: finalClassName = mergeClasses('icon', className);
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={finalClassName}
  {...$$restProps}
>
  {#if iconNode}
    {#each iconNode as [tag, attrs]}
      <svelte:element this={tag} {...attrs} />
    {/each}
  {/if}
  <slot />
</svg>