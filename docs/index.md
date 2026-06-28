---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Jack Zhu"
  text: "What I See"
  tagline: Continuous perception.
  actions:
    - theme: brand
      text: Explore
      link: /posts/first-post
    - theme: alt
      text: GitHub
      link: https://github.com/ZhuJincheng-git/

features:
  - title: "Computing"
    details: "Deep Learning, Reinforcement Learning, and Autonomous Agents."
  - title: "Materials"
    details: "Structural Screening, Spectral Analysis, and Molecular Synthesis."
  - title: "Architecture"
    details: "Engineering for Scalability and Longevity."
  - title: "Inquiry"
    details: "The Pursuit of Better Questions."
---

<script setup>
import QuoteRotator from './components/QuoteRotator.vue'

const quotes = [
  "Don't rush to learn what's useful; first, identify the foolish problems waiting to be solved.",
  "When code fails, don't walk away — debug.",
  "Information is a byproduct of action, not a prerequisite for it.",
  "Judgment is the ability to place the right information in the right context.",
  "Treat risk as a 'cost of execution'; evaluate if it's worth the price, not whether you have the courage."
]
</script>

<QuoteRotator :quotes="quotes" />
