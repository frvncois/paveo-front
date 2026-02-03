<script setup lang="ts">
defineProps<{
    items: Array<{
        number: string;
        title: string;
        description: string;
    }>;
}>();
</script>

<template>
    <section>
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <span>{{ item.number }}</span>
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
            </li>
        </ul>
    </section>
</template>

<style scoped>

section {
    background: var(--accent);
}
ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-medium);
    padding: var(--space-large) var(--space-medium);
    li {
        display: flex;
        flex-direction: column;
        gap: var(--space-base);
        border-bottom: 1px solid var(--medium);
        padding-bottom: var(--space-base);
        span {
            font-family: 'mono';
        }
    }
}
</style>