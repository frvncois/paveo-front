<!--CLEAN-->

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  titles: string[]
  videoSrc: string
  variant?: 'home' | 'cta' | 'page'
}>()

const sectionClass = computed(() => props.variant)
const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLElement | null>(null)
const spansRef = ref<HTMLElement[]>([])

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

    tl.fromTo(
      videoRef.value,
      { height: '0%' },
      { height: '100%', duration: 1.25, ease: 'power4.inOut' }
    )
    .fromTo(
      spansRef.value,
      {
        yPercent: 100,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.25
      },
      '-=0.6'
    )

  }, sectionRef)

  onUnmounted(() => ctx.revert())
})
</script>

<template>
  <section ref="sectionRef" :class="sectionClass">
    <div class="content">
      <h1>
        <span
          v-for="title in titles"
          :key="title"
          class="mask"
        >
          <span ref="spansRef">{{ title }}</span>
        </span>
      </h1>
    </div>

    <div class="video" ref="videoRef">
      <video
        :src="videoSrc"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      />
    </div>
  </section>
</template>


<style scoped>
section {
    position: relative;
    overflow: hidden;
    margin: var(--space-small);
}
section.home {
    margin-top: 10.5em;
}
section.cta {
    margin: var(--space-medium);
    margin-top: 0em;
    padding: var(--space-small);
}
section.page {
    margin-top: -15vh;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    height: calc(100vh - 18.5em);
    padding: var(--space-medium);
    margin-bottom: -0.5em;
    h1 {
        position: relative;
        z-index: 2;
        font-size: var(--font-heading);
        margin-left: -0.125em;
        display: flex;
        flex-direction: column;
    }
    .mask {
        overflow: hidden;
        display: block;
    }
    .mask span {
        display: inline-block;
    }
}

.video {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--rounded-base);
}

video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    opacity: 0.75;
    position: absolute;
    inset: 0;
}
</style>
