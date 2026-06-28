---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Jack Zhu"
  text: "我所看到的"
  tagline: 持续感知。
  actions:
    - theme: brand
      text: 探索
      link: zh/posts/first-post
    - theme: alt
      text: GitHub
      link: https://github.com/ZhuJincheng-git/

features:
  - title: "计算"
    details: "深度学习、强化学习与智能体。"
  - title: "材料"
    details: "结构筛选、光谱分析与分子合成。"
  - title: "架构"
    details: "追求易拓展、长寿命的程序架构。"
  - title: "提问"
    details: "持续地寻找好问题。"
---

<script setup>
import QuoteRotator from '../components/QuoteRotator.vue'

const quotes = [
  "不要急着学习有用的东西，先看看什么愚蠢的问题还没有解决。",
  "代码跑不通？不会放弃，会debug。",
  "信息是行动的副产品，不是行动的前提。",
  "判断力，是把正确的信息放到正确的地方的能力。",
  "把风险当成\"做事的成本\"，你会评估值不值，而不是敢不敢。"
]
</script>

<QuoteRotator :quotes="quotes" />
