<script setup lang="ts">
import DetailsPanel from '@/components/blocks/DetailsPanel.vue';
import ReviewBlock from '@/components/blocks/ReviewBlock.vue';
import TitleVideo from '@/components/blocks/TitleVideo.vue';
import ListStickyCards from '@/components/layout/ListStickyCards.vue';
import SoumissionBlock from '@/components/blocks/SoumissionBlock.vue';
import { getHomeContent } from '@/api/content';

const { heroTitle, ctaTitle, detailsPanel, servicesItems, servicesDetailsPanel } = getHomeContent();
</script>

<template>
  <TitleVideo
    :titles="heroTitle.titles"
    :videoSrc="heroTitle.videoSrc"
    :variant="heroTitle.variant"
  />
  <DetailsPanel
    :headingLeft="detailsPanel.headingLeft"
    :headingRight="detailsPanel.headingRight"
    :title="detailsPanel.title"
    :subtitle="detailsPanel.subtitle"
    :tags="detailsPanel.tags"
    :intro="detailsPanel.intro"
  />
  <ReviewBlock />
  <TitleVideo
    :titles="ctaTitle.titles"
    :videoSrc="ctaTitle.videoSrc"
    :variant="ctaTitle.variant"
  />
  <ListStickyCards :items="servicesItems" :panelData="servicesDetailsPanel" />
  <SoumissionBlock />
</template>