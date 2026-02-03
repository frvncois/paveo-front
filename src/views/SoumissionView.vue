<script setup lang="ts">
import TitleVideo from '@/components/blocks/TitleVideo.vue';
import ReviewBlock from '@/components/blocks/ReviewBlock.vue';
import SoumissionBlock from '@/components/blocks/SoumissionBlock.vue';
import DetailsCard from '@/components/blocks/DetailsCard.vue';
import ListStickyCards from '@/components/layout/ListStickyCards.vue';

import heroVideo from '@/assets/hero.mp4';
import amenagementVideo from '@/assets/amenagement.mp4';
import constructionVideo from '@/assets/construction.mp4';
import renovationVideo from '@/assets/renovation.mp4';

const aboutItems = [
    {
        videoSrc: amenagementVideo,
        tag: 'Clarté totale',
        number: '01',
        title: 'Décision & transparence',
        description: 'Nous fournissons à nos clients tous les éléments nécessaires pour prendre des décisions éclairées, réalistes et adaptées à leur projet. Chaque recommandation est expliquée clairement, en tenant compte des contraintes du site, du budget et des objectifs à long terme, afin d\'éviter les imprévus et les choix précipités.'
    },
    {
        videoSrc: renovationVideo,
        tag: 'Engagement qualité',
        number: '01',
        title: 'Qualité & responsabilité',
        description: 'Nos travaux sont réalisés avec rigueur et couverts par une garantie de deux ans. Lorsque possible, nous conservons et valorisons les éléments existants de l\'aménagement paysager et assurons une gestion écoresponsable des rebuts et déchets, dans le respect de l\'environnement et des normes en vigueur.',
        bgColor: 'var(--medium)',
        reverse: true
    },
    {
        videoSrc: constructionVideo,
        tag: 'Respect constant',
        number: '01',
        title: 'Respect & environnement',
        description: 'La sécurité, la propreté et le respect sont maintenus en tout temps sur nos chantiers. Nous accordons une importance particulière au bien-être des occupants, du voisinage et de nos employés, en faisant preuve d\'empathie, de bienveillance et de professionnalisme à chaque étape du projet.',
        bgColor: 'var(--accent)'
    }
];

const aboutDetailsPanel = {
    headingLeft: 'Depuis 2006',
    headingRight: 'Montréal',
    title: 'Entrepreneur général',
    subtitle: 'Basé à Montréal',
    tag1: 'Aménagement',
    tag2: 'Construction',
    tag3: '& Rénovation',
    intro: 'PAVÉO est un entrepreneur général basé à Montréal, spécialisé dans les projets résidentiels nécessitant une planification rigoureuse, une exécution précise et des résultats durables.'
};
</script>

<template>
    <TitleVideo
        :titles="['Des projets bien pensés,', 'résultats durables.']"
        :videoSrc="heroVideo"
        variant="home"
    />
    <DetailsCard />
    <ListStickyCards :items="aboutItems" :DetailsPanel="aboutDetailsPanel" />
    <ReviewBlock />
    <TitleVideo
        :titles="['Des projets bien pensés,', 'résultats durables.']"
        :videoSrc="heroVideo"
        variant="content"
    />
    <SoumissionBlock
        variant="video" 
    />
</template>