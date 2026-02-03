<script setup lang="ts">
import TitleVideo from '@/components/blocks/TitleVideo.vue';
import ReviewBlock from '@/components/blocks/ReviewBlock.vue';
import SoumissionBlock from '@/components/blocks/SoumissionBlock.vue';
import DetailsCard from '@/components/blocks/DetailsCard.vue';
import ListStickyCards from '@/components/layout/ListStickyCards.vue';
import ListItemCol from '@/components/blocks/ListItemCol.vue';
import { getAboutContent } from '@/api/content';

const { heroTitle, ctaTitle, detailsCard, aboutItems, aboutDetailsPanel } = getAboutContent();
const renovationItems: any[] = [];
</script>

<template>
    <TitleVideo
        :titles="heroTitle.titles"
        :videoSrc="heroTitle.videoSrc"
        :variant="heroTitle.variant"
    />
    <DetailsCard
        :intro="detailsCard.intro"
        :details="detailsCard.details"
    />
    <ListItemCol :items="renovationItems" />
    <ListStickyCards :items="aboutItems" :panelData="aboutDetailsPanel" />
    <ReviewBlock />
    <TitleVideo
        :titles="ctaTitle.titles"
        :videoSrc="ctaTitle.videoSrc"
        :variant="ctaTitle.variant"
    />
    <SoumissionBlock
        variant="video"
    />
</template>
