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
import { ref, onMounted, onUnmounted } from 'vue'

const quotes = [
  "Don't rush to learn what's useful; first, identify the foolish problems waiting to be solved.",
  "When code fails, don't walk away—debug.",
  "Information is a byproduct of action, not a prerequisite for it.",
  "Judgment is the ability to place the right information in the right context.",
  "Treat risk as a 'cost of execution'; evaluate if it's worth the price, not whether you have the courage."
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