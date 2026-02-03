<script setup lang="ts">
const emit = defineEmits<{
    close: []
}>();

const handleLinkClick = () => {
    emit('close');
};
</script>

<template>
    <section>
        <nav>
            <ul>
                <li><RouterLink to="/amenagement" @click="handleLinkClick">Aménagement paysager</RouterLink></li>
                <li><RouterLink to="/construction" @click="handleLinkClick">Construction extérieure</RouterLink></li>
                <li><RouterLink to="/renovation" @click="handleLinkClick">Rénovation résidentielle</RouterLink></li>
            </ul>
            <ul>
                <li><RouterLink to="/about" @click="handleLinkClick">À propos</RouterLink></li>
                <li><RouterLink to="/articles" @click="handleLinkClick">Articles</RouterLink></li>
                <li><RouterLink to="/contact" @click="handleLinkClick">Contact</RouterLink></li>
            </ul>
            <ul>
                <li>
                    <RouterLink to="/soumission" @click="handleLinkClick"><span>Soumission</span><span>→</span></RouterLink>
                </li>
            </ul>
        </nav>
    </section>
</template>

<style scoped>
section {
    position: fixed;
    inset: 0;
    background: var(--dark);
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
}

nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-large);
    width: 100%;
}

h2 {
    font-size: var(--font-medium);
    color: var(--light);
    margin-bottom: var(--space-base);
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    &:first-child {
        li {
            border-bottom: 1px solid var(--light);
            padding: var(--space-medium);
        }
    }
}

li {
    overflow: hidden;
}

a {
    font-size: var(--font-large);
    color: var(--white);
    display: flex;
    align-items: center;
    gap: var(--space-small);
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.6;
    }
}
</style>