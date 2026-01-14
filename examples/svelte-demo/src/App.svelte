<script lang="ts">
  import ArrowRight from '@dawnice/icon-forge-svelte/icons/ArrowRight.svelte';
</script>

<main>
  <h1>Icon Forge Svelte Demo</h1>

  <div class="icons">
    <ArrowRight size={24} />
    <ArrowRight size={32} color="blue" />
    <ArrowRight size={48} color="red" strokeWidth={3} />
  </div>
</main>

<style>
  main {
    padding: 50px;
  }

  .icons {
    display: flex;
    gap: 20px;
    margin-top: 30px;
  }
</style>
