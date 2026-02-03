<!--CLEAN-->

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import { gsap } from 'gsap'
import { lenis } from '@/main'
import LogoIcon from '@/assets/LogoIcon.vue'
import LogoType from '@/assets/LogoType.vue'
import GlobalNav from './GlobalNav.vue'

const isScrolling = ref(false)
const isMenuOpen = ref(false)
const headerRef = ref<HTMLElement | null>(null)
let ticking = false

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value

    if (isMenuOpen.value) {
        lenis.stop()
    } else {
        lenis.start()
    }
}

const closeMenu = () => {
    isMenuOpen.value = false
    lenis.start()
}

function applyScrolledState(immediate = false) {
    isScrolling.value = true

    const root = headerRef.value
    if (!root) return

    gsap.killTweensOf([root, root.querySelectorAll('nav li a'), root.querySelector('nav'), root.querySelector('a span:first-child svg')])

    gsap.to(root.querySelectorAll('nav li a'), {
        y: '-110%',
        duration: immediate ? 0 : 0.5,
        ease: 'power4.out',
        stagger: 0.025
    })

    gsap.to(root, {
        height: '3.5em',
        backgroundColor: '#111010',
        duration: immediate ? 0 : 1,
        ease: 'power4.out'
    })

    gsap.to(root.querySelector('nav'), {
        maxHeight: 16,
        duration: immediate ? 0 : 0.5,
        ease: 'power4.out'
    })

    gsap.to(root.querySelector('a span:first-child svg'), {
        height: '1.5em',
        duration: immediate ? 0 : 0.5,
        ease: 'power4.out'
    })
}

function applyTopState(immediate = false) {
    isScrolling.value = false

    const root = headerRef.value
    if (!root) return

    gsap.killTweensOf([root, root.querySelectorAll('nav li a'), root.querySelector('nav'), root.querySelector('a span:first-child svg')])

    gsap.to(root.querySelectorAll('nav li a'), {
        y: '0%',
        duration: immediate ? 0 : 1,
        ease: 'power4.out',
        stagger: 0.025
    })

    gsap.to(root, {
        height: '10.5em',
        backgroundColor: '#11101000',
        duration: immediate ? 0 : 1,
        ease: 'power4.out'
    })

    gsap.to(root.querySelector('nav'), {
        maxHeight: 300,
        duration: immediate ? 0 : 0.5,
        ease: 'power4.out'
    })

    gsap.to(root.querySelector('a span:first-child svg'), {
        height: '2.5em',
        duration: immediate ? 0 : 1,
        ease: 'power4.out'
    })
}

const handleScroll = () => {
    if (ticking) return
    ticking = true

    requestAnimationFrame(() => {
        const y = window.scrollY

        if (y > 50 && !isScrolling.value) applyScrolledState()
        if (y <= 50 && isScrolling.value) applyTopState()

        ticking = false
    })
}

onMounted(async () => {
    await nextTick()

    const y = window.scrollY

    if (y > 50) {
        applyScrolledState(true)
    } else {
        applyTopState(true)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <header ref="headerRef">
        <RouterLink to="/">
            <span><LogoIcon /></span>
            <span><LogoType /></span>
        </RouterLink>
        <nav>
            <h2>Montréal</h2>
            <ul>
                <li><RouterLink to="/amenagement">
                        <span>Aménagement paysager</span>
                        <span>Aménagement paysager</span>
                </RouterLink></li>
                <li><RouterLink to="/construction">
                        <span>Construction extérieure</span>
                        <span>Construction extérieure</span>
                </RouterLink></li>
                <li><RouterLink to="/renovation">
                        <span>Rénovation résidentielle</span>
                        <span>Rénovation résidentielle</span>
                </RouterLink></li>
            </ul>
            <ul>
                <li><RouterLink to="/about">
                        <span>À propos</span>
                        <span>À propos</span>
                </RouterLink></li>
                <li><RouterLink to="/articles">
                        <span>Articles</span>
                        <span>Articles</span>
                </RouterLink></li>
                <li><RouterLink to="/contact">
                        <span>Contact</span>
                        <span>Contact</span>
                </RouterLink></li>
            </ul>
            <ul>
                <li>
                <RouterLink to="/soumission">
                        <span>Soumission</span>
                        <span>Soumission</span>
                </RouterLink>
                <button type="button" @click="toggleMenu">
                        <span>{{ isMenuOpen ? 'Fermer' : 'Menu' }}</span>
                        <span>{{ isMenuOpen ? 'Fermer' : 'Menu' }}</span>
                </button>
                </li>
                <li>
                </li>
            </ul>
        </nav>
    </header>
    <GlobalNav v-if="isMenuOpen" @close="closeMenu" />
</template>

<style scoped>
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        background: #11101000;
        align-items: center;
        color: var(--white);
        z-index: 1000;
        padding: 0 var(--space-medium);
        height: 10.5em;

        > a {
            flex: 1;
        }

        nav {
            flex: 2;
        }
    }
    header > a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: var(--space-medium);
        span:first-child {
            height: 100%;
            svg {
                height: 2.5em;
                width: auto;
            }
        }
    }
    nav {
        display: grid;
        grid-template-columns: repeat(4, auto);
        align-items: start;
        gap: var(--space-base);
        max-height: 300px;
        overflow: hidden;
        ul {
            display: flex;
            flex-direction: column;
            gap: var(--space-small);
            &:last-child a {
                text-align: right;
                margin-right: 0;
                margin-left: auto;
            }
            li {
                max-height: 1em;
                display: flex;
                flex-direction: row;
                overflow: hidden;
                 &:before {
                        content: "→";
                        opacity: 0;
                        margin-right: var(--space-small);
                        transform: translateX(-1em);
                        transition: opacity 0.3s ease, transform 0.3s ease;
                        flex-shrink: 0;
                    }
                    &:hover:before {
                        opacity: 1;
                        transform: translateX(0);
                    }
                a {
                    display: flex;
                    flex-direction: column;
                    span {
                        transition: transform 0.4s ease, opacity 0.4s ease;
                    }
                    span:nth-child(2) {
                        opacity: 0;
                    }
                    &:hover span {
                        transform: translateY(-100%);
                    }
                    &:hover span:nth-child(2) {
                        opacity: 1;
                    }
                }
            }
        }
        h2 {
            font-size: var(--font-small);
            display: inline-flex;
            align-items: center;
            --before-margin: var(--space-base);
            --before-opacity: 1;

            &::before {
                content: '';
                margin-right: var(--before-margin);
                opacity: var(--before-opacity);
                background: var(--light);
                border-radius: 100%;
                width: 0.5em;
                height: 0.5em;
                flex-shrink: 0;
            }
        }
        div {
            overflow: hidden;
            a, button {
                display: flex;
                color: var(--light);
                border-bottom: 1px solid var(--light);
                align-items: center;
                justify-content: space-between;
                line-height: 1.5;
                > span {
                    white-space: nowrap;
                }
            }
            button {
                background: none;
                border: none;
                border-bottom: 1px solid var(--light);
                cursor: pointer;
                font: inherit;
                padding: 0;
                width: 100%;
            }
        }
    }
</style>
