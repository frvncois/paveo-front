<!--CLEAN-->


<script setup lang="ts">
const props = defineProps<{
    videoSrc: string;
    tag: string;
    number: string;
    title: string;
    description: string;
    linkTo?: string;
    linkText?: string;
    reverse?: boolean;
    bgColor?: string;
}>()

const handleMouseEnter = (event: Event) => {
    (event.currentTarget as HTMLVideoElement)?.play()
}

const handleMouseLeave = (event: Event) => {
    const video = event.currentTarget as HTMLVideoElement
    video.pause()
    video.currentTime = 0
}
</script>

<template>
    <li>
        <div class="media">
            <video
                :src="videoSrc"
                poster="/images/video-poster.webp"
                muted
                loop
                playsinline
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
            ></video>
        </div>
        <div class="content">
            <div class="header">
                <h2>{{ tag }}</h2>
                <span>{{ number }}</span>
            </div>
            <h3>{{ title }}</h3>
            <div class="body">
                <p>{{ description }}</p>
                <RouterLink v-if="linkTo" :to="linkTo">
                    <span>{{ linkText || 'En savoir plus' }}</span>
                    <span>→</span>
                </RouterLink>
            </div>
        </div>
    </li>
</template>

<style scoped>
    li {
        display: flex;
        flex-direction: column;
        gap: var(--space-medium);
        border-radius: var(--rounded-base);
        background: var(--item-bg);
        height: 100%;
        transition: transform 0.25s ease;

        &:hover {
            transform: translateY(-6px);
        }

        .media {
            overflow: hidden;
            border-radius: var(--rounded-small);
        }

        .content {
            display: flex;
            flex-direction: column;
            gap: var(--space-base);
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .body {
            display: flex;
            flex-direction: column;
            gap: var(--space-small);
        }

        span {
            opacity: 0.6;
            font-size: var(--font-small);
            letter-spacing: 0.05em;
        }

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

        h3 {
            font-size: var(--font-large);
            margin: var(--space-small) 0;
        }

        p {
            font-size: var(--font-base);
            line-height: 1.5;
            max-width: 55ch;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        a {
            font-size: var(--font-base);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            aspect-ratio: 16 / 9;
        }
    }
</style>
