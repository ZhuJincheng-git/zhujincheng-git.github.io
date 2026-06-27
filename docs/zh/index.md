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
import { ref, onMounted, onUnmounted } from 'vue'

const quotes = [
  "不要急着学习有用的东西，先看看什么愚蠢的问题还没有解决。",
  "代码跑不通？不会放弃，会debug。",
  "信息是行动的副产品，不是行动的前提。",
  "判断力，是把正确的信息放到正确的地方的能力。",
  "把风险当成\"做事的成本\"，你会评估值不值，而不是敢不敢。"
]

const currentQuote = ref(quotes[0])
const phase = ref('hidden') 

let clockTimer = null
let leaveTimer = null
let enterTimer = null
let initTimer = null

function rotateQuote() {
  phase.value = 'leave'
  
  // Dynamically calculate leave duration
  // Max leave animation delay: (length * 0.03s) + animation duration 0.8s
  const leaveDuration = (currentQuote.value.length * 30) + 800 + 200 // +200ms safety margin
  
  leaveTimer = setTimeout(function() {
    phase.value = 'hidden'
    
    let nextQuote = currentQuote.value
    while (nextQuote === currentQuote.value) {
      nextQuote = quotes[Math.floor(Math.random() * quotes.length)]
    }
    currentQuote.value = nextQuote
    
    // Force wait 300ms for stage to clear before entering
    enterTimer = setTimeout(function() {
      phase.value = 'enter'
    }, 300) 
    
  }, leaveDuration) 
}

onMounted(function() {
  initTimer = setTimeout(function() {
    phase.value = 'enter'
  }, 500)
  
  // Set interval long enough, or start next loop inside rotateQuote
  function startLoop() {
    clockTimer = setTimeout(function() {
      rotateQuote()
      // Wait for leaveDuration + enter wait 300ms + display time 5000ms
      // Simplified handling to avoid overlap
      setTimeout(startLoop, 10000)
    }, 8000)
  }
  startLoop()
})

onUnmounted(function() {
  clearTimeout(clockTimer)
  clearTimeout(leaveTimer)
  clearTimeout(enterTimer)
  clearTimeout(initTimer)
})
</script>

<div class="breathing-quote-stage">
  <div class="particle-sentence">
    <span 
      v-for="(char, index) in currentQuote" 
      :key="currentQuote + '-' + index"
      :class="['fluid-char', 'state-' + phase]"
      :style="{
        '--delay-enter': `${index * 0.04}s`, 
        '--delay-leave': `${(currentQuote.length - index) * 0.03}s`
      }"
    >
      {{ char }}
    </span>
  </div>
</div>

<style scoped>
.breathing-quote-stage {
  max-width: 800px;
  margin: 70px auto 30px;
  padding: 0 24px;
  min-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}
.particle-sentence {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95em;
  font-style: italic;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  letter-spacing: 0.04em;
  display: inline-block;
  white-space: normal;
  word-break: break-all;
}
.fluid-char {
  display: inline-block;
  white-space: pre; 
  will-change: transform, opacity, filter;
}
.fluid-char.state-hidden {
  opacity: 0;
  transform: translateY(22px) translateX(0);
  filter: blur(2px);
  transition: none; 
}
.fluid-char.state-enter {
  opacity: 1;
  transform: translateY(0) translateX(0);
  filter: blur(0px);
  transition-property: transform, opacity, filter;
  transition-duration: 0.9s;
  transition-delay: var(--delay-enter);
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
.fluid-char.state-leave {
  opacity: 0;
  transform: translateY(-26px) translateX(18px); 
  filter: blur(4px); 
  transition-property: transform, opacity, filter;
  transition-duration: 0.8s;
  transition-delay: var(--delay-leave);
  transition-timing-function: cubic-bezier(0.32, 0, 0.67, 0); 
}
</style>
