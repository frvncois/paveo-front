<!--CLEAN-->

<script setup lang="ts">
const props = defineProps<{
    title: string;
    subtitle: string;
}>()
</script>

<template>
    <section>
        <div class="heading">
            <h1>{{ title }}</h1>
            <p>{{ subtitle }}</p>
        </div>
    </section>
</template>

<style scoped>
    section {
        margin: var(--space-small);
    }
    .heading {
        border-radius: var(--rounded-base);
        background: var(--medium);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        min-height: 50vh;
        padding: var(--space-medium);
        h1 {
            position: relative;
            font-size: var(--font-heading);
            margin-left: -0.125em;
            max-width: 12ch;
            text-wrap: balance;
        }
        p {
            position: relative;
            font-size: var(--font-large);
            margin-left: -0.125em;
            max-width: 40ch;
        }
    }
</style>
