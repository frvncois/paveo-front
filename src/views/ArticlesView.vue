<script setup lang="ts">
import TitleSimple from '@/components/blocks/TitleSimple.vue';
import DetailsPanel from '@/components/blocks/DetailsPanel.vue';
import SoumissionBlock from '@/components/blocks/SoumissionBlock.vue';
import ListArticle from '@/components/layout/ListArticle.vue';
import { getArticlesContent } from '@/api/content';

const { titleSimple, detailsPanel, articlesItems, articlesDetailsPanel } = getArticlesContent();
</script>

<template>
    <TitleSimple
        :title="titleSimple.title"
        :subtitle="titleSimple.subtitle"
    />
    <ListArticle :items="articlesItems" :panelData="articlesDetailsPanel" />
    <DetailsPanel
        :headingLeft="detailsPanel.headingLeft"
        :headingRight="detailsPanel.headingRight"
        :title="detailsPanel.title"
        :subtitle="detailsPanel.subtitle"
        :tags="detailsPanel.tags"
        :intro="detailsPanel.intro"
        background="medium"
    />
    <SoumissionBlock/>
</template>