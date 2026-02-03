<!--CLEAN-->

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    videoSrc: string;
    tag: string;
    number: string;
    title: string;
    description: string;
    linkTo?: string;
    linkText?: string;
    reverse?: boolean;
    bgColor?: string;
}>();

const liRef = ref<HTMLElement | null>(null)
const videoWrapperRef = ref<HTMLElement | null>(null)
const headingH2Ref = ref<HTMLElement | null>(null)
const headingSpanRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const linkRef = ref<HTMLElement | null>(null)

const handleMouseEnter = (event: Event) => {
    (event.currentTarget as HTMLVideoElement)?.play()
}

const handleMouseLeave = (event: Event) => {
    const vid = event.currentTarget as HTMLVideoElement
    vid.pause()
    vid.currentTime = 0
}

let ctx: gsap.Context

onMounted(() => {
    if (!liRef.value) return

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    ctx = gsap.context(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: liRef.value,
                start: 'top 80%',
                once: true
            }
        })

        tl.from(videoWrapperRef.value, {
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        })
        .from(
            [
                headingH2Ref.value,
                headingSpanRef.value,
                titleRef.value,
                descriptionRef.value
            ],
            {
                opacity: 0,
                duration: 1,
                stagger: 0.2
            },
            '-=0.8'
        )
        .from(linkRef.value, {
            y: 16,
            opacity: 0,
            duration: 0.6
        }, '-=0.6')

    }, liRef)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
    <li ref="liRef" :class="{ reverse }" :style="{ '--item-bg': bgColor || 'var(--dark)' }">
        <div class="cover">
            <div class="video" ref="videoWrapperRef">
                <video
                    :src="videoSrc"
                    muted
                    loop
                    playsinline
                    @mouseenter="handleMouseEnter"
                    @mouseleave="handleMouseLeave"
                ></video>
            </div>
        </div>
        <div class="content">
            <div class="heading">
                <h2 ref="headingH2Ref">{{ tag }}</h2>
                <span ref="headingSpanRef">{{ number }}</span>
            </div>
            <h3 ref="titleRef">{{ title }}</h3>
            <div class="details">
                <p ref="descriptionRef">{{ description }}</p>
                <RouterLink ref="linkRef" class="cta" v-if="linkTo" :to="linkTo">
                    <span>{{ linkText || 'En savoir plus' }}</span>
                    <span>→</span>
                </RouterLink>
            </div>
        </div>
    </li>
</template>

<style scoped>
li {
    position: sticky;
    top: 3.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--space-large);
    padding: var(--space-medium) var(--space-medium) var(--space-large) var(--space-medium);
    border-bottom: 1px solid var(--accent);
    background: var(--item-bg);
    &.reverse {
        flex-direction: row-reverse;
    }
    .cover {
        flex: 1;
        position: relative;
        overflow: hidden;
        border-radius: var(--rounded-base);
    }

    .video {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: var(--rounded-base);
    }

    video {
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: var(--space-large);
        .heading {
            display: flex;
            justify-content: space-between;
            h2 {
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
            span {
                font-family: 'mono';
            }
        }
        h3 {
            font-size: var(--font-heading);
            max-width: 15ch;
            line-height: 0.9;
        }
        p {
            max-width: 50ch;
            line-height: 1.5;
        }
        a {
            font-size: var(--font-large);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: var(--space-base);
        }
        .details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--space-large);
            .cta {
                overflow: hidden;
            }
        }
    }
}
</style>


