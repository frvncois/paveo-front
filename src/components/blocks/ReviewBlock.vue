<!--CLEAN-->


<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import NumberFlow from '@number-flow/vue'
import IconStar from '@/assets/IconStar.vue'
import gsap from 'gsap'
// @ts-ignore - GSAP Flip type file case mismatch (Flip.d.ts vs flip.d.ts)
import Flip from 'gsap/Flip'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { getReviews } from '@/api/content'

gsap.registerPlugin(Flip, ScrollTrigger)

const reviews = getReviews()

const years = ref(0)
const projects = ref(0)
const clients = ref(0)
const sectionRef = ref<HTMLElement | null>(null)
const currentReviewIndex = ref(0)
const reviewRef = ref<HTMLElement | null>(null)
const reviewTextRef = ref<HTMLElement | null>(null)

const currentReview = computed(() => reviews[currentReviewIndex.value])

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

let isAnimating = false

const changeReview = async (index: number) => {
  if (
    isAnimating ||
    !reviewRef.value ||
    !reviewTextRef.value
  ) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    currentReviewIndex.value = index
    return
  }

  isAnimating = true

  const state = Flip.getState(reviewRef.value)

  currentReviewIndex.value = index

  await nextTick()

  Flip.from(state, {
    duration: 0.6,
    ease: 'power3.inOut',
    absolute: true,
    fade: true
  })

  isAnimating = false
}

const nextReview = () =>
  changeReview(
    (currentReviewIndex.value + 1) % reviews.length
  )

let observer: IntersectionObserver | null = null
let autoPlayInterval: ReturnType<typeof setInterval> | null = null
let ctx: gsap.Context

onMounted(() => {
  if (!sectionRef.value) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return

      years.value = 15
      projects.value = 320
      clients.value = 100

      observer?.disconnect()
    },
    { threshold: 0.4 }
  )

  observer.observe(sectionRef.value)

  ctx = gsap.context(() => {

    gsap.from(reviewRef.value, {
      y: 32,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        once: true
      }
    })

  }, sectionRef)

  autoPlayInterval = setInterval(nextReview, 5000)
})

onUnmounted(() => {
  observer?.disconnect()
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef">
    <div class="content">
      <ul>
        <li>
          <h3><NumberFlow :value="years" />+</h3>
          <p>Années d'expérience</p>
        </li>
        <li>
          <h3><NumberFlow :value="projects" />+</h3>
          <p>Projets réalisés</p>
        </li>
        <li>
          <h3><NumberFlow :value="clients" />%</h3>
          <p>Clients satisfaits</p>
        </li>
      </ul>

      <div class="review" ref="reviewRef" v-if="currentReview">
        <ul ref="reviewTextRef">
          <li>
            <img v-if="currentReview.photo" :src="currentReview.photo" :alt="currentReview.name" />
            <div v-else class="initials">{{ getInitials(currentReview.name) }}</div>
          </li>
          <li>
            <p>"{{ currentReview.text }}"</p>
            <p>{{ currentReview.name }}</p>
          </li>
        </ul>

        <div class="dots">
          <button
            v-for="(review, index) in reviews"
            :key="review.name"
            :class="{ active: index === currentReviewIndex }"
            @click="changeReview(index)"
            :aria-label="`Go to review ${index + 1}`"
          ></button>
        </div>

        <a href="#reviews">
          <span>
            <img src="@/assets/google.png" alt="Google Reviews" />
            Google Review
          </span>
          <span>
            <IconStar /><IconStar /><IconStar /><IconStar /><IconStar />
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
    section {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-large);
        padding: var(--space-medium);
        z-index: 2;
        .content {
            display: flex;
            ul {
                display: flex;
                align-items: center;
                gap: var(--space-large);
                h3 {
                    font-size: var(--font-large);
                }
            }
        }
        .review {
            position: absolute;
            top: 0;
            width: 30%;
            right: calc(var(--space-xlarge) + var(--space-medium));
            background: var(--white);
            color: var(--dark);
            border-radius: var(--rounded-base);
            margin-bottom: -5.125em;
            box-shadow: 0em 0em 8em -4em var(--dark);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: var(--space-base);
            ul {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                gap: var(--space-base);
                padding: var(--space-base);
                > li:first-child {
                    background: var(--dark);
                    aspect-ratio: 1 / 1;
                    height: 2.5em;
                    border-radius: 100%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    > img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                    .initials {
                        color: var(--white);
                        font-size: var(--font-small);
                        font-weight: 600;
                    }
                }
                > li:last-child {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-base);
                    line-height: 1.25;
                    > p {
                        width: 35ch;
                    }
                    .dots {
                        display: flex;
                        gap: var(--space-small);
                        margin-top: var(--space-small);
                        button {
                            width: 2px;
                            height: 2px;
                            border-radius: 100%;
                            background: var(--dark);
                            opacity: 0.3;
                            border: none;
                            padding: 0;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            &.active {
                                width: 4px;
                                height: 4px;
                                opacity: 1;
                            }
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }
                }
            }
            a {
                display: inline-flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-base) var(--space-base);
                border-top: 1px solid var(--light);
                margin-top: auto;
                span {
                    display: inline-flex;
                    align-items: center;
                    &:first-child {
                        gap: calc(var(--space-small) * 5);
                    }
                    &:last-child {
                        gap: var(--space-small);
                    }
                }
                img {
                    height: 2em;
                    width: auto;
                }
            }
            .dots {
              display: flex;
              gap: var(--space-small);
              margin-left: 6.5em;
              button {
                border: unset;
                width: 0.5em;
                height: 0.5em;
                border-radius: var(--rounded-base);
                transition: width 0.5s;
                background: var(--inactive);
                &.active {
                  width: 2em;
                  background: var(--dark);
                }
              }
            }
        }
    }
</style>
