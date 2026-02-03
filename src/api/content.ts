import heroVideo from '@/assets/hero.mp4'
import outsideVideo from '@/assets/outside.mp4'
import amenagementVideo from '@/assets/amenagement.mp4'
import constructionVideo from '@/assets/construction.mp4'
import renovationVideo from '@/assets/renovation.mp4'

import content from '@/data/content.json'

const videoMap: Record<string, string> = {
  hero: heroVideo,
  outside: outsideVideo,
  amenagement: amenagementVideo,
  construction: constructionVideo,
  renovation: renovationVideo
}

const mapVideoSrc = (item: any) => ({
  ...item,
  videoSrc: videoMap[item.videoSrc]!
})

const mapTitleData = (titleData: any) => ({
  ...titleData,
  videoSrc: videoMap[titleData.videoSrc]!,
  variant: titleData.variant as 'home' | 'cta' | 'page'
})

// Home View
export const getHomeContent = () => ({
  heroTitle: mapTitleData(content.home.heroTitle),
  ctaTitle: mapTitleData(content.home.ctaTitle),
  detailsPanel: content.home.detailsPanel,
  servicesItems: content.home.servicesItems.map(mapVideoSrc),
  servicesDetailsPanel: content.home.servicesDetailsPanel
})

// Service View
export const getServiceContent = (service: 'amenagement' | 'construction' | 'renovation') => ({
  heroTitle: mapTitleData(content[service].heroTitle),
  ctaTitle: mapTitleData(content[service].ctaTitle),
  detailsCard: content[service].detailsCard,
  items: content[service].items,
  aboutItems: content.shared.aboutItems.map(mapVideoSrc),
  aboutDetailsPanel: content.shared.aboutDetailsPanel
})

// Articles View
export const getArticlesContent = () => ({
  titleSimple: content.articles.titleSimple,
  detailsPanel: content.articles.detailsPanel,
  articlesItems: content.articles.articlesItems.map(mapVideoSrc),
  articlesDetailsPanel: content.articles.articlesDetailsPanel
})

// Single View
export const getSingleContent = () => ({
  titleImage: { ...content.single.titleImage, subtitle: '' },
  articleContent: content.single.articleContent,
  detailsPanel: content.articles.detailsPanel,
  randomArticles: content.articles.articlesItems
    .map(mapVideoSrc)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3),
  articlesDetailsPanel: content.articles.articlesDetailsPanel
})

// About View
export const getAboutContent = () => ({
  heroTitle: mapTitleData(content.about.heroTitle),
  ctaTitle: mapTitleData(content.about.ctaTitle),
  detailsCard: content.about.detailsCard,
  aboutItems: content.shared.aboutItems.map(mapVideoSrc),
  aboutDetailsPanel: content.shared.aboutDetailsPanel
})

// Reviews
export const getReviews = () => content.shared.reviews
