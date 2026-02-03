<!--CLEAN-->

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    variant?: 'video' | 'default';
}>();

const sectionRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const liRefs = ref<HTMLElement[]>([])
const ctaRef = ref<HTMLElement | null>(null)
const contactLinkRefs = ref<HTMLElement[]>([])

let ctx: gsap.Context

onMounted(() => {
    if (!sectionRef.value) return

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    ctx = gsap.context(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top 80%',
                once: true
            }
        })

        tl.from(imgRef.value, {
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        })
        .from(titleRef.value, {
            opacity: 0,
            duration: 0.9
        }, '-=0.8')
        .from(liRefs.value, {
            x: -24,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        }, '-=0.6')
        .from(ctaRef.value, {
            opacity: 0,
            duration: 0.6
        }, '-=0.5')
        .from(contactLinkRefs.value, {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6
        }, '-=0.5')

    }, sectionRef)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
    <section ref="sectionRef" :class="{ video: variant === 'video' }">
        <div class="content">
            <img ref="imgRef" src="@/assets/soumission.png" />
        </div>
        <div class="content">
            <div class="card">
                <div class="heading">
                    <h2 ref="titleRef">Prêt à commencer?</h2>
                    <ul>
                        <li ref="liRefs">
                            <p>Retour en 48hr</p>
                        </li>
                        <li ref="liRefs">
                            <p>Disponibilité pour 2026</p>
                        </li>
                    </ul>
                </div>
                <div class="details">
                    <p>PAVÉO est un entrepreneur général basé à Montréal, spécialisé dans les projets résidentiels nécessitant une planification rigoureuse, une exécution précise et des résultats durables.</p>
                </div>
                    <RouterLink ref="ctaRef" class="cta" to="/soumission">
                    <span>Obtenez une soumission</span>
                    <span>→</span>
                </RouterLink>
            </div>
            <div class="contact">
                <a ref="contactLinkRefs" href="mailto:info@paveo.ca">info@paveo.ca</a>
                <a ref="contactLinkRefs" href="tel:5147922274">514 792 2274</a>
            </div>
        </div>
    </section>
</template>

<style scoped>
    img,
    h2,
    li,
    .cta,
    .contact a {
        will-change: transform, opacity;
    }

    section {
        position: relative;
        display: flex;
        align-items: flex-start;
        margin: var(--space-medium);
        gap: var(--space-medium);
        .content {
            flex: 1;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            aspect-ratio: 1 / 1;
            overflow: hidden;
        }

        &:not(.video) .content:nth-child(2) {
            margin-top: -12.5em;
        }
            .card {
                display: flex;
                flex-direction: column;
                background: var(--white);
                color: var(--dark);
                border-radius: var(--rounded-base);
                gap: var(--space-medium);
                .heading {
                    display: flex;
                    justify-content: space-between;
                    padding: var(--space-medium) var(--space-medium) 0 var(--space-medium);
                    gap: var(--space-base);
                    h2 {
                        font-size: var(--font-large);
                        max-width: 10ch;
                        line-height: 0.75;
                    }
                    ul {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        gap: var(--space-small);
                        li {
                            border: 1px solid var(--dark);
                            padding: var(--space-small) var(--space-base);
                            border-radius: var(--rounded-base);
                            background: var(--dark);
                            color: var(--light);
                        }
                    }
                }
                .details {
                    padding: 0 var(--space-medium);
                    max-width: 45ch;
                }
                .cta {
                    border-radius: var(--rounded-small);
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    gap: var(--space-base);
                    padding: 0 var(--space-medium) var(--space-medium) var(--space-medium);
                    span {
                        font-size: var(--font-large);
                    }
                }
            }
            .contact {
                display: flex;
                flex-direction: column;
                text-align: right;
                a {
                    font-size: var(--font-large);
                }
            }
        }
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: var(--rounded-base);
        }
    
</style>