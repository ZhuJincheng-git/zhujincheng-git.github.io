<template>
  <div class="breathing-quote-stage">
    <TransitionGroup tag="div" class="particle-sentence" appear>
      <span
        v-for="(item, index) in displayChars"
        :key="item.id"
        :class="['fluid-char', `state-${phase}`]"
        :style="{
          '--delay-enter': `${index * 0.04}s`,
          '--delay-leave': `${(currentQuote.length - index) * 0.03}s`,
        }"
      >
        {{ item.char }}
      </span>
    </TransitionGroup>
  </div>
</template>

<script setup>
import {
  TransitionGroup,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

const props = defineProps({
  quotes: {
    type: Array,
    required: true,
  },
  initialQuote: {
    type: String,
    default: "",
  },
  displayDuration: {
    type: Number,
    default: 8000,
  },
});

const currentQuote = ref(props.initialQuote || props.quotes[0] || "");
const phase = ref("hidden");
const isActive = ref(false);
const displayChars = computed(() =>
  currentQuote.value.split("").map((char, index) => ({
    id: `${currentQuote.value}-${index}`,
    char,
  })),
);

const pendingTimers = new Set();
function wait(ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pendingTimers.delete(timer);
      resolve();
    }, ms);
    pendingTimers.add(timer);
  });
}

function clearTimers() {
  for (const timer of pendingTimers) {
    clearTimeout(timer);
  }
  pendingTimers.clear();
}

function pickNextQuote() {
  if (!props.quotes || props.quotes.length === 0) {
    return "";
  }

  if (props.quotes.length === 1) {
    return props.quotes[0];
  }

  let nextQuote = currentQuote.value;
  while (nextQuote === currentQuote.value) {
    nextQuote = props.quotes[Math.floor(Math.random() * props.quotes.length)];
  }

  return nextQuote;
}

async function runRotation() {
  await wait(500);
  if (!isActive.value) {
    return;
  }

  phase.value = "enter";
  await nextTick();

  while (isActive.value) {
    await wait(props.displayDuration);
    if (!isActive.value) {
      return;
    }

    phase.value = "leave";
    await nextTick();

    const leaveDuration = currentQuote.value.length * 30 + 1000;
    await wait(leaveDuration);
    if (!isActive.value) {
      return;
    }

    phase.value = "hidden";
    await nextTick();

    currentQuote.value = pickNextQuote();
    await nextTick();

    await wait(300);
    if (!isActive.value) {
      return;
    }

    phase.value = "enter";
    await nextTick();
  }
}

onMounted(() => {
  isActive.value = true;
  runRotation();
});

onBeforeUnmount(() => {
  isActive.value = false;
  clearTimers();
});
</script>

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
