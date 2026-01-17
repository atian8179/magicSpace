<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <div class="modal-success">
          <div class="success-circle">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 16L13 22L25 10" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <h3 class="modal-title">{{ title }}</h3>
        <p class="modal-text" v-html="message"></p>
        <button class="modal-btn" @click="$emit('close')">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '报名成功！'
  },
  message: {
    type: String,
    default: '老师将在24小时内联系您<br>请保持手机畅通'
  },
  buttonText: {
    type: String,
    default: '知道了'
  }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
  animation: fadeIn 0.3s var(--easing-smooth);
}

.modal-content {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  text-align: center;
  max-width: 320px;
  animation: scaleIn 0.4s var(--easing-spring);
}

.modal-success {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-5);
}

.success-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--gradient-brand);
  border-radius: 50%;
  box-shadow: var(--shadow-glow-orange);
  animation: success-pop 0.6s var(--easing-spring);
}

@keyframes success-pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.modal-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.modal-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.modal-btn {
  background: var(--gradient-tech);
  color: white;
  border: none;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-smooth);
}

.modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
