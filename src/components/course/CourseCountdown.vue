<template>
  <div class="countdown-banner">
    <div class="countdown-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="countdown-content">
      <span class="countdown-label">限时优惠</span>
      <span class="countdown-divider">|</span>
      <span class="countdown-text">仅剩</span>
      <div class="countdown-timer">{{ display }}</div>
    </div>
    <div class="countdown-pulse"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  initialSeconds: {
    type: Number,
    default: 1800 // 30 minutes
  }
})

const remaining = ref(props.initialSeconds)

const display = computed(() => {
  const minutes = Math.floor(remaining.value / 60)
  const seconds = remaining.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

let timer = null

onMounted(() => {
  timer = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value--
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.countdown-banner {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.countdown-icon {
  display: flex;
  align-items: center;
  color: #EF4444;
}

.countdown-content {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
}

.countdown-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: #EF4444;
}

.countdown-divider {
  color: var(--text-tertiary);
}

.countdown-text {
  font-size: 13px;
  color: var(--text-secondary);
}

.countdown-timer {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 16px;
  color: #EF4444;
  letter-spacing: 2px;
}

.countdown-pulse {
  position: absolute;
  right: var(--space-4);
  width: 8px;
  height: 8px;
  background: #EF4444;
  border-radius: 50%;
  animation: pulse-alert 1.5s ease-in-out infinite;
}

@keyframes pulse-alert {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
}
</style>
