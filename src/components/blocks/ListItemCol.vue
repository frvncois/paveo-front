<!--CLEAN-->



<script setup lang="ts">
const props = defineProps<{
    items: Array<{
        number: string;
        title: string;
        description: string;
    }>;
}>()
</script>

<template>
    <section>
        <ul>
            <li v-for="item in items" :key="item.number">
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
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-medium);
    padding: var(--space-large) var(--space-medium);
    max-width: 1400px;
    margin-inline: auto;
    li {
        display: flex;
        flex-direction: column;
        gap: var(--space-base);
        padding-bottom: var(--space-base);
        min-height: 180px;
        &:not(:last-child) {
            border-bottom: 1px solid var(--medium);
        }
        span {
            font-family: 'mono';
            font-size: var(--font-small);
            opacity: 0.55;
            letter-spacing: 0.04em;
        }
        h2 {
            text-wrap: balance;
        }
        p {
            max-width: 48ch;
        }
    }
}
</style>