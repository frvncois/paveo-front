<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalHeader from './components/global/GlobalHeader.vue';
import GlobalFooter from './components/global/GlobalFooter.vue';
</script>

<template>
  <GlobalHeader />
  <RouterView />
  <GlobalFooter />
</template>
