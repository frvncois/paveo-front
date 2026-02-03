<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

defineProps<{
    variant?: string;
}>();

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!sectionRef.value) return

    const img = sectionRef.value.querySelector('img')
    const h2 = sectionRef.value.querySelector('.card h2')
    const lis = sectionRef.value.querySelectorAll('.card li')
    const cta = sectionRef.value.querySelector('.cta')
    const contactSpans = sectionRef.value.querySelectorAll('.contact a span')

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none none'
        }
    })

    tl.fromTo(
        img,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power4.out' }
    )
    .fromTo(
        h2,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power4.out' },
        '-=1'
    )
    .fromTo(
        lis,
        { x: '-1em', opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.25 },
        '-=0.8'
    )
    .fromTo(
        cta,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power4.out' },
        '-=0.6'
    )
    .fromTo(
        contactSpans,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1 },
        '-=0.6'
    )

    // GSAP hover animations for links
    if (cta) {
        const ctaTexts = cta.querySelectorAll('.text')
        if (ctaTexts.length === 2) {
            cta.addEventListener('mouseenter', () => {
                gsap.to(ctaTexts[0]!, { yPercent: -100, duration: 0.4, ease: 'power2.out' })
                gsap.to(ctaTexts[1]!, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
            })
            cta.addEventListener('mouseleave', () => {
                gsap.to(ctaTexts[0]!, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
                gsap.to(ctaTexts[1]!, { yPercent: 100, duration: 0.4, ease: 'power2.out' })
            })
        }
    }

    const contactLinks = sectionRef.value.querySelectorAll('.contact a')
    contactLinks.forEach(link => {
        const texts = link.querySelectorAll('.text')
        if (texts.length === 2) {
            link.addEventListener('mouseenter', () => {
                gsap.to(texts[0]!, { yPercent: -100, duration: 0.4, ease: 'power2.out' })
                gsap.to(texts[1]!, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
            })
            link.addEventListener('mouseleave', () => {
                gsap.to(texts[0]!, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
                gsap.to(texts[1]!, { yPercent: 100, duration: 0.4, ease: 'power2.out' })
            })
        }
    })
})
</script>

<template>
    <section ref="sectionRef" :class="{ video: variant === 'video' }">
        <div class="content">
            <img src="@/assets/soumission.png" />
        </div>
        <div class="content">
            <div class="card">
                <div class="heading">
                    <h2>Contactez nous</h2>
                </div>
                <form>
                    <input placeholder="Votre prénom"/>
                    <input placeholder="Votre nom"/>
                    <input placeholder="Entreprise"/>
                    <input placeholder="Courriel"/>
                    <input placeholder="Téléphone"/>
                    <textarea placeholder="Votre message"></textarea>
                </form>

            </div>
            <div class="contact">
                <a href="mailto:info@paveo.ca">
                    <span class="text-wrapper">
                        <span class="text">info@paveo.ca</span>
                        <span class="text">info@paveo.ca</span>
                    </span>
                </a>
                <a href="tel:5147922274">
                    <span class="text-wrapper">
                        <span class="text">514 792 2274</span>
                        <span class="text">514 792 2274</span>
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
        align-items: flex-start;
        margin: var(--space-medium);
        gap: var(--space-medium);
        z-index: 2;
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
                }
                form {
                    padding: var(--space-medium);
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-small);
                    input, textarea {
                        border: unset;
                        border-bottom: 1px solid var(--inactive);
                        font-size: var(--font-medium);
                        padding: var(--space-small) 0;
                        &:focus {
                            border-bottom: 1px solid var(--dark);
                            outline: none;
                        }
                    }
                    textarea {
                        font-family: 'body';
                        resize: none;
                        height: 10em;
                    }
                }
            }
            .contact {
                display: flex;
                flex-direction: column;
                text-align: right;
                a {
                    .text-wrapper {
                        overflow: hidden;
                        display: inline-block;
                        position: relative;
                    }
                    .text {
                        display: block;
                        font-size: var(--font-large);
                    }
                    .text:last-child {
                        position: absolute;
                        top: 0;
                        left: 0;
                        transform: translateY(100%);
                    }
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