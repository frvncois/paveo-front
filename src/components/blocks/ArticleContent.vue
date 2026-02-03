<!--CLEAN-->

<script setup lang="ts">
defineProps<{
    content: string;
}>();
</script>

<template>
    <section>
        <div class="content" v-html="content"></div>
    </section>
</template>

<style scoped>
section {
    padding: var(--space-medium);
    display: flex;
    justify-content: center;
}

.content {
    max-width: 75ch;
    line-height: 1.75;
    font-size: var(--font-medium);
}

.content :deep(h2) {
    font-size: var(--font-large);
}

.content :deep(h3) {
    font-size: var(--font-medium);
}

.content :deep(ul),
.content :deep(ol) {
    margin-bottom: var(--space-base);
    padding-left: var(--space-base);
}

.content :deep(li) {
    margin-bottom: var(--space-small);
}

.content :deep(img) {
    width: 100%;
    border-radius: var(--rounded-base);
    margin: var(--space-large) 0;
}
</style>
