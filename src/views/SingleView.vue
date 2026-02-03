<script setup lang="ts">
import TitleImage from '@/components/blocks/TitleImage.vue';
import ArticleContent from '@/components/blocks/ArticleContent.vue';
import ListArticle from '@/components/layout/ListArticle.vue';
import DetailsPanel from '@/components/blocks/DetailsPanel.vue';
import SoumissionBlock from '@/components/blocks/SoumissionBlock.vue';
import { getSingleContent } from '@/api/content';

const { titleImage, articleContent, detailsPanel, randomArticles, articlesDetailsPanel } = getSingleContent();
</script>

<template>
    <TitleImage
        :title="titleImage.title"
        :subtitle="titleImage.subtitle"
    />
    <ArticleContent
        :content="articleContent.content"
    />
    <ListArticle :items="randomArticles" :panelData="articlesDetailsPanel" />
    <DetailsPanel
        :headingLeft="detailsPanel.headingLeft"
        :headingRight="detailsPanel.headingRight"
        :title="detailsPanel.title"
        :subtitle="detailsPanel.subtitle"
        :tags="detailsPanel.tags"
        :intro="detailsPanel.intro"
    />
    <SoumissionBlock />
</template>
