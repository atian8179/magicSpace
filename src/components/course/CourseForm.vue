<template>
  <div class="form-section">
    <div class="form-header">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1L14 5L10 9M14 5H3M17 9V17C17 17.5304 16.7893 18.0391 16.4142 18.4142C16.0391 18.7893 15.5304 19 15 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V9" stroke="var(--brand-orange)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>立即报名</span>
    </div>

    <div class="form-inputs">
      <div class="input-group">
        <div class="input-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 9C11.4853 9 13.5 6.98528 13.5 4.5C13.5 2.01472 11.4853 0 9 0C6.51472 0 4.5 2.01472 4.5 4.5C4.5 6.98528 6.51472 9 9 9Z" fill="currentColor"/>
            <path d="M9 10.5C5.68629 10.5 0 12.0147 0 15.3V18H18V15.3C18 12.0147 12.3137 10.5 9 10.5Z" fill="currentColor"/>
          </svg>
        </div>
        <input
          :value="form.name"
          @input="$emit('update:name', $event.target.value)"
          type="text"
          placeholder="孩子姓名"
          class="form-input"
        />
      </div>

      <div class="input-group">
        <div class="input-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M16 2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H16C17.1 16 18 15.1 18 14V4C18 2.9 17.1 2 16 2ZM16 4L9 9L2 4H16ZM16 14H2V6L9 11L16 6V14Z" fill="currentColor"/>
          </svg>
        </div>
        <input
          :value="form.phone"
          @input="$emit('update:phone', $event.target.value)"
          type="tel"
          placeholder="家长手机号"
          class="form-input"
          maxlength="11"
        />
      </div>

      <div class="input-group">
        <div class="input-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4.5 2H13.5C14.3284 2 15 2.67157 15 3.5V14.5C15 15.3284 14.3284 16 13.5 16H4.5C3.67157 16 3 15.3284 3 14.5V3.5C3 2.67157 3.67157 2 4.5 2Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6 7H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M6 10.5H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <select :value="form.grade" @change="$emit('update:grade', $event.target.value)" class="form-input">
          <option value="">孩子年级</option>
          <option value="1">一年级</option>
          <option value="2">二年级</option>
          <option value="3">三年级</option>
          <option value="4">四年级</option>
          <option value="5">五年级</option>
          <option value="6">六年级</option>
          <option value="7">初一</option>
          <option value="8">初二</option>
          <option value="9">初三</option>
          <option value="10">高一</option>
          <option value="11">高二</option>
          <option value="12">高三</option>
        </select>
      </div>
    </div>

    <button
      class="submit-btn"
      @click="$emit('submit')"
      :disabled="!isValid || isSubmitting"
    >
      <span v-if="!isSubmitting">立即领取体验课</span>
      <span v-else>提交中...</span>
      <svg v-if="!isSubmitting" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <p class="form-note">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M7 4.5V7.5M7 10H7.005" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      你的信息将被严格保密，仅用于课程安排
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:name', 'update:phone', 'update:grade', 'submit'])

const isValid = computed(() => {
  return props.form.name &&
         props.form.phone.length === 11 &&
         /^1[3-9]\d{9}$/.test(props.form.phone) &&
         props.form.grade
})
</script>

<style scoped>
.form-section {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}

.form-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.form-header span {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--text-primary);
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: var(--space-4);
  display: flex;
  align-items: center;
  color: var(--text-tertiary);
  pointer-events: none;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
  background: var(--bg-tertiary);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  font-size: 15px;
  color: var(--text-primary);
  transition: all var(--duration-base) var(--easing-smooth);
  appearance: none;
  -webkit-appearance: none;
}

.form-input:focus {
  outline: none;
  border-color: var(--brand-orange);
  background: var(--bg-primary);
}

.form-input::placeholder {
  color: var(--text-tertiary);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-5);
  background: var(--gradient-brand);
  border: none;
  border-radius: var(--radius-xl);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  color: white;
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-spring);
  box-shadow: var(--shadow-glow-orange);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform var(--duration-slow) var(--easing-smooth);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 50px rgba(255, 107, 53, 0.5);
}

.submit-btn:hover:not(:disabled)::before {
  transform: translateX(100%);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  text-align: center;
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: var(--space-4);
}

.form-note svg {
  flex-shrink: 0;
}
</style>
