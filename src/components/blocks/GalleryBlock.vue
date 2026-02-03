<template>
    <section>
        <div class="grid">
            <div>qwe</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </section>
</template>


<style scoped>
section {
    padding: var(--space-medium);
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-large);
    div {
        position: relative;
        background: red;
        aspect-ratio: 2 / 1;
        border-radius: var(--rounded-base);
        overflow: hidden;
        &:nth-child(1) {
            grid-row: span 2;
            aspect-ratio: unset;
        }
        &:nth-child(2) {
            grid-column: span 2;
            background: blue;
            aspect-ratio: unset;
            aspect-ratio: 2 / 1;
        }
    }
}
</style>