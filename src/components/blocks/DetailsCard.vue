<!--CLEAN-->

<script setup lang="ts">
const props = withDefaults(defineProps<{
    intro: string;
    details: string;
}>(), {
    intro: '',
    details: ''
});
</script>

<template>
    <section>
        <div class="intro">
            <p>{{ intro }}</p>
            <p>{{ details }}</p>
        </div>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    padding: var(--space-medium);
    gap: var(--space-large);
}

.intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-medium);
    margin-right: auto;
    p:first-child {
        font-size: var(--font-large);
        line-height: 1;
        max-width: 35ch;
        text-wrap: balance;
    }
    p:last-child {
        font-size: var(--font-medium);
        line-height: 1.5;
        max-width: 75ch;
        text-wrap: balance;
    }
}
</style>