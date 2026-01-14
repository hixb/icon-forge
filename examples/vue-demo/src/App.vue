<template>
  <div class="app">
    <h1>Icon Forge Vue Demo</h1>

    <div class="icons">
      <ArrowRight :size="24" />
      <ArrowRight :size="32" color="blue" />
      <ArrowRight :size="48" color="red" :stroke-width="3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@dawnice/icon-forge-vue/icons';
</script>

<style scoped>
.app {
  padding: 50px;
}

.icons {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}
</style>