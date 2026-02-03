<!--CLEAN-->


<script setup lang="ts">
import LogoIcon from '@/assets/LogoIcon.vue';
import LogoType from '@/assets/LogoType.vue';

</script>

<template>
    <footer>
        <div class="brand">
            <span><LogoIcon /></span>
            <span><LogoType /></span>
        </div>
        <nav aria-label="Footer navigation">
            <h3>Montréal</h3>
            <div class="links">
                <ul>
                    <li><RouterLink to="/">Aménagement paysager</RouterLink></li>
                    <li><RouterLink to="/about">Construction extérieure</RouterLink></li>
                    <li><RouterLink to="/about">Rénovation résidentielle</RouterLink></li>
                </ul>
                <ul>
                    <li><RouterLink to="/">À propos</RouterLink></li>
                    <li><RouterLink to="/about">Articles</RouterLink></li>
                    <li><RouterLink to="/about">Contact</RouterLink></li>
                </ul>
            </div>
            <div>
                <RouterLink to="/soumission"><span>Soumission</span><span>→</span></RouterLink>
            </div>
        </nav>
    </footer>
</template>

<style scoped>
    footer {
        display: flex;
        justify-content: space-between;
        align-items: start;
        padding: var(--space-medium);
        background: var(--accent);

        > div {
            flex: 1;
        }

        nav {
            flex: 2;
        }
    }

    .brand {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: var(--space-medium);
        flex-shrink: 0;
    }

    nav {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        align-items: start;
        gap: var(--space-base);

        a {
            transition: opacity 0.2s ease;

            &:hover {
                opacity: 0.7;
            }
        }

        h3 {
            font-size: var(--font-small);
            display: inline-flex;
            align-items: center;

            &::before {
                content: '';
                margin-right: var(--space-base);
                background: var(--light);
                border-radius: 100%;
                width: 0.5em;
                height: 0.5em;
                flex-shrink: 0;
            }
        }

        .links {
            display: contents;

            ul {
                display: flex;
                flex-direction: column;
                gap: var(--space-small);
            }
        }

        > div:last-child {
            a {
                display: flex;
                background-color: var(--light);
                color: var(--dark);
                align-items: center;
                justify-content: space-between;
                border-radius: var(--rounded-base);
                padding: var(--space-small) 1em;
                line-height: 1.5;

                > span {
                    white-space: nowrap;
                }
            }
        }
    }
</style>