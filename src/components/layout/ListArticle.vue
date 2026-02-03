<script setup lang="ts">
import ListItemArticle from '../blocks/ListItemArticle.vue';

defineProps<{
    items: Array<{
        videoSrc: string;
        tag: string;
        number: string;
        title: string;
        description: string;
        linkTo?: string;
        bgColor?: string;
        reverse?: boolean;
    }>;
}>();
</script>

<template>
    <section>
        <ul>
            <ListItemArticle
                v-for="(item, index) in items"
                :key="index"
                :videoSrc="item.videoSrc"
                :tag="item.tag"
                :number="item.number"
                :title="item.title"
                :description="item.description"
                :linkTo="item.linkTo"
                :bgColor="item.bgColor"
                :reverse="item.reverse"
            />
        </ul>
    </section>
</template>

<style scoped>
    section {
        position: relative;
        padding: var(--space-medium);
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-medium);
        }
    }
</style>
