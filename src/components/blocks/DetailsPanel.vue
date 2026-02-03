<!--CLEAN-->

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  headingLeft: string
  headingRight: string
  title: string
  subtitle: string
  tags: string[]
  intro: string
  background?: string
}>()

const sectionRef = ref<HTMLElement | null>(null)
const headingLeftRef = ref<HTMLElement | null>(null)
const headingRightRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const tagRefs = ref<HTMLElement[]>([])
const introRef = ref<HTMLElement | null>(null)

const bgStyle = computed(() => ({
  background: props.background
    ? `var(--${props.background})`
    : 'var(--dark)'
}))

onMounted(() => {
  if (!sectionRef.value) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) return

  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        once: true
      }
    })

    tl.from(
      [headingLeftRef.value, headingRightRef.value],
      {
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.25
      }
    )
    .from(
      titleRef.value,
      {
        x: -25,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      },
      '-=1'
    )
    .from(
      subtitleRef.value,
      {
        x: 25,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      },
      '-=1.2'
    )
    .from(
      tagRefs.value,
      {
        opacity: 0,
        y: 10,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15
      },
      '-=1'
    )
    .from(
      introRef.value,
      {
        y: 25,
        opacity: 0,
        duration: 1.25,
        ease: 'power3.out'
      },
      '-=1.25'
    )

  }, sectionRef)

  onUnmounted(() => ctx.revert())
})
</script>


<template>
  <section ref="sectionRef" :style="bgStyle">
    <div class="heading">
      <p ref="headingLeftRef">{{ headingLeft }}</p>
      <p ref="headingRightRef">{{ headingRight }}</p>
    </div>

    <div class="content">
      <div class="title">
        <h2 ref="titleRef">{{ title }}</h2>
      </div>

      <div class="subtitle">
        <h2 ref="subtitleRef">{{ subtitle }}</h2>
        <div>
          <span
            v-for="tag in tags"
            :key="tag"
            ref="tagRefs"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="intro">
        <p ref="introRef">{{ intro }}</p>
      </div>
    </div>
  </section>
</template>


<style scoped>
    h2, p, span {
        will-change: transform, opacity;
    }

    section {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-medium);
        z-index: 2;
        padding: var(--space-medium) var(--space-medium);
        .heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--space-medium);
            overflow: hidden;
            p {
                display: inline-block;
            }
            p:last-child {
                text-align: right;
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
        }
        .content {
            display: flex;
            flex-direction: column;
            margin: 0 var(--space-xlarge);
            padding: var(--space-large) 0 var(--space-large) var(--space-large);
            h2 {
                font-size: var(--font-heading);
            }
            .title {
                text-align: right;
                h2 {
                    display: inline-block;
                    margin-right: -10px;
                }
            }
            .subtitle{
                display: flex;
                align-items: center;
                gap: var(--space-base);
                h2 {
                    display: inline-block;
                    margin-left: -10px;
                }
                div {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-xsmall);
                    > span {
                        font-size: var(--font-medium);
                        line-height: 1.15;
                    }
                    > span:nth-child(2) {
                        margin-left: var(--space-base);
                    }
                    > span:nth-child(3) {
                        margin-left: var(--space-small);
                    }
                }
            }
            .intro {
                margin-top: var(--space-medium);
                max-width: 50ch;
                line-height: 1.5;
                p {
                  font-size: var(--font-medium);
                }
            }
        }
    }
</style>
