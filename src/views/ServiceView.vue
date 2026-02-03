<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TitleVideo from '@/components/blocks/TitleVideo.vue';
import ReviewBlock from '@/components/blocks/ReviewBlock.vue';
import SoumissionBlock from '@/components/blocks/SoumissionBlock.vue';
import DetailsCard from '@/components/blocks/DetailsCard.vue';
import ListStickyCards from '@/components/layout/ListStickyCards.vue';
import ListItemCol from '@/components/blocks/ListItemCol.vue';
import { getServiceContent } from '@/api/content';

const route = useRoute();
const serviceType = computed(() => route.params.service as 'amenagement' | 'construction' | 'renovation');

const content = computed(() => getServiceContent(serviceType.value));
</script>

<template>
    <TitleVideo
        :titles="content.heroTitle.titles"
        :videoSrc="content.heroTitle.videoSrc"
        :variant="content.heroTitle.variant"
    />
    <DetailsCard
        :intro="content.detailsCard.intro"
        :details="content.detailsCard.details"
    />
    <ListItemCol :items="content.items" />
    <ListStickyCards :items="content.aboutItems" :panelData="content.aboutDetailsPanel" />
    <ReviewBlock />
    <TitleVideo
        :titles="content.ctaTitle.titles"
        :videoSrc="content.ctaTitle.videoSrc"
        :variant="content.ctaTitle.variant"
    />
    <SoumissionBlock
        variant="video"
    />
</template>
