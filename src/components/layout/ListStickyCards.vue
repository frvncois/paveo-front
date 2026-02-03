<!--CLEAN-->

<script setup lang="ts">
import DetailsPanel from '../blocks/DetailsPanel.vue';
import ListItemRow from '../blocks/ListItemRow.vue';

const props = withDefaults(defineProps<{
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
    panelData: {
        headingLeft: string;
        headingRight: string;
        title: string;
        subtitle: string;
        tags: string[];
        intro: string;
    };
}>(), {
    items: () => []
});
</script>

<template>
    <section>
        <ul>
            <ListItemRow
                v-for="item in items"
                :key="item.number"
                v-bind="item"
            />

            <DetailsPanel v-bind="panelData" />
        </ul>
    </section>
</template>

<style scoped>
ul {
    position: relative;
}
</style>
