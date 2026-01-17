<template>
  <div class="course-page">
    <!-- 噪点纹理 -->
    <div class="noise-overlay"></div>

    <!-- 几何装饰 -->
    <GeometricDecoration variant="default" />

    <div class="container">
      <!-- 顶部 -->
      <header class="header">
        <button class="back-btn" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </header>

      <!-- 成功徽章 -->
      <div class="success-badge">
        <span class="badge-dot"></span>
        <span>测评完成</span>
      </div>

      <!-- 标题区 -->
      <section class="hero-section">
        <CourseGiftAnimation />

        <h1 class="title">
          <span class="title-line">恭喜你！</span>
          <span class="title-highlight">解锁专属福利</span>
        </h1>

        <p class="subtitle">
          根据你的<span class="talent-highlight">{{ result?.talentType?.name || '天赋类型' }}</span>特质
          <br>为你定制专属编程体验课
        </p>
      </section>

      <!-- 课程卡片 -->
      <CourseCard
        :talent-type="result?.talentType || { emoji: '✨', name: '创意少年', color: '#FF6B35' }"
      />

      <!-- 倒计时 -->
      <CourseCountdown :initial-seconds="1800" />

      <!-- 表单 -->
      <CourseForm
        :form="form"
        :is-submitting="isSubmitting"
        @update:name="form.name = $event"
        @update:phone="form.phone = $event"
        @update:grade="form.grade = $event"
        @submit="submitForm"
      />

      <!-- 用户评价 -->
      <div class="testimonial-section">
        <TestimonialCard
          avatar="👧"
          name="小雨"
          grade="三年级"
          text="老师讲得很有趣，我做出自己的第一个游戏了！妈妈也很惊讶我的进步~"
        />
      </div>
    </div>

    <!-- 成功弹窗 -->
    <SuccessModal
      :show="showSuccessModal"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz'
import { trackCourseSubmit } from '../utils/analytics'
import GeometricDecoration from '../components/common/GeometricDecoration.vue'
import CourseGiftAnimation from '../components/course/CourseGiftAnimation.vue'
import CourseCard from '../components/course/CourseCard.vue'
import CourseCountdown from '../components/course/CourseCountdown.vue'
import CourseForm from '../components/course/CourseForm.vue'
import TestimonialCard from '../components/common/TestimonialCard.vue'
import SuccessModal from '../components/course/SuccessModal.vue'

const router = useRouter()
const quizStore = useQuizStore()
const { result } = storeToRefs(quizStore)

const form = ref({
  name: '',
  phone: '',
  grade: ''
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const goBack = () => {
  router.back()
}

const submitForm = async () => {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 1500))

  const submitData = {
    ...form.value,
    talentType: result.value?.talentType?.name,
    scores: result.value?.scores
  }
  console.log('提交表单:', submitData)

  trackCourseSubmit(submitData)

  isSubmitting.value = false
  showSuccessModal.value = true
}

const closeModal = () => {
  showSuccessModal.value = false
}
</script>

<style scoped>
.course-page {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  padding-bottom: var(--space-12);
}

.container {
  position: relative;
  z-index: 1;
  padding: var(--space-6) var(--space-5);
  max-width: 540px;
  margin: 0 auto;
}

/* 头部 */
.header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: var(--space-6);
  animation: slideDown 0.5s var(--easing-smooth) backwards;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-smooth);
}

.back-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  transform: translateX(-2px);
}

/* 成功徽章 */
.success-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(132, 204, 22, 0.15);
  border: 1px solid rgba(132, 204, 22, 0.3);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-8);
  animation: spring-in 0.6s var(--easing-spring) 0.1s backwards;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-lime);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.success-badge span:last-child {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 12px;
  color: var(--accent-lime-light);
}

/* 标题区 */
.hero-section {
  text-align: center;
  margin-bottom: var(--space-8);
  animation: slideUp 0.6s var(--easing-smooth) 0.2s backwards;
}

.title {
  margin-bottom: var(--space-4);
}

.title-line {
  display: block;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.title-highlight {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(36px, 8vw, 48px);
  font-weight: 800;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  filter: drop-shadow(0 0 30px rgba(255, 107, 53, 0.3));
}

.subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.talent-highlight {
  font-weight: 700;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 用户评价 */
.testimonial-section {
  animation: fadeIn 1s var(--easing-smooth) 0.8s backwards;
}

/* 动画 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes spring-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式 */
@media (max-width: 480px) {
  .title-line {
    font-size: 20px;
  }

  .title-highlight {
    font-size: 32px;
  }
}
</style>
