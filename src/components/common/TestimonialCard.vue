<template>
  <div class="testimonial-card">
    <div class="testimonial-header">
      <div class="testimonial-avatar">{{ avatar }}</div>
      <div class="testimonial-info">
        <span class="testimonial-name">{{ name }}</span>
        <span class="testimonial-grade">{{ grade }}</span>
      </div>
      <div class="testimonial-stars">{{ stars }}</div>
    </div>
    <p class="testimonial-text">"{{ text }}"</p>
  </div>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    default: '👧'
  },
  name: {
    type: String,
    default: '小雨'
  },
  grade: {
    type: String,
    default: '三年级'
  },
  stars: {
    type: String,
    default: '★★★★★'
  },
  text: {
    type: String,
    default: '老师讲得很有趣，我做出自己的第一个游戏了！妈妈也很惊讶我的进步~'
  }
})
</script>

<style scoped>
.testimonial-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.testimonial-avatar {
  font-size: 36px;
}

.testimonial-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.testimonial-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.testimonial-grade {
  font-size: 12px;
  color: var(--text-tertiary);
}

.testimonial-stars {
  font-size: 12px;
  color: #FBBF24;
  letter-spacing: 2px;
}

.testimonial-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-style: italic;
}
</style>
