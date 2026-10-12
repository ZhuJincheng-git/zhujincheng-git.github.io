<script setup lang="ts">
import { computed, ref } from "vue";
import { data as posts } from "../.vitepress/theme/posts.data";

const props = defineProps<{ lang: "en" | "zh" }>();

const t = {
  en: { all: "All", posts: "posts", empty: "No posts in this tag yet." },
  zh: { all: "全部", posts: "篇", empty: "该标签下还没有文章。" },
}[props.lang];

const langPosts = computed(() => posts.filter((p) => p.lang === props.lang));

const tagCounts = computed(() => {
  const map = new Map<string, number>();
  for (const post of langPosts.value)
    for (const tag of post.tags) map.set(tag, (map.get(tag) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
});

const activeTag = ref<string | null>(null);

const filtered = computed(() =>
  activeTag.value
    ? langPosts.value.filter((p) => p.tags.includes(activeTag.value!))
    : langPosts.value
);

function toggle(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag;
}
</script>

<template>
  <div class="tag-browser">
    <div class="tags">
      <button
        class="tag"
        :class="{ active: activeTag === null }"
        @click="activeTag = null"
      >
        {{ t.all }}
        <span class="count">{{ langPosts.length }}</span>
      </button>
      <button
        v-for="[tag, count] in tagCounts"
        :key="tag"
        class="tag"
        :class="{ active: activeTag === tag }"
        @click="toggle(tag)"
      >
        {{ tag }}
        <span class="count">{{ count }}</span>
      </button>
    </div>

    <p class="summary">
      {{ filtered.length }} {{ t.posts }}
      <template v-if="activeTag"> · {{ activeTag }}</template>
    </p>

    <ul class="post-list">
      <li v-for="post in filtered" :key="post.url">
        <a :href="post.url">{{ post.title }}</a>
        <span class="date">{{ post.date }}</span>
      </li>
    </ul>
    <p v-if="!filtered.length" class="empty">{{ t.empty }}</p>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 8px;
}
.tag {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.tag:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-2);
}
.tag.active {
  color: var(--vp-c-brand-contrast);
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.tag .count {
  opacity: 0.7;
  margin-left: 2px;
}
.summary {
  color: var(--vp-c-text-3);
  font-size: 14px;
}
.post-list {
  list-style: none;
  padding: 0;
  margin-top: 8px;
}
.post-list li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.post-list a {
  font-weight: 500;
}
.date {
  color: var(--vp-c-text-3);
  font-size: 13px;
  white-space: nowrap;
}
.empty {
  color: var(--vp-c-text-3);
}
</style>
