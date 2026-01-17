<template>
  <div class="result-page">
    <!-- 噪点纹理 -->
    <div class="noise-overlay"></div>

    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="glow-circle gc-1"></div>
      <div class="glow-circle gc-2"></div>
    </div>

    <div class="container">
      <!-- 天赋卡片 -->
      <div class="talent-card" :style="{ '--talent-color': result.talentType.color }">
        <div class="talent-bg"></div>
        <div class="talent-content">
          <div class="talent-badge">
            <span class="badge-dot"></span>
            你的天赋类型
          </div>

          <div class="talent-emoji">{{ result.talentType.emoji }}</div>

          <h1 class="talent-name">{{ result.talentType.name }}</h1>

          <p class="talent-desc">{{ result.talentType.description }}</p>
        </div>
      </div>

      <!-- 雷达图 -->
      <div class="radar-section">
        <div class="section-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" stroke="var(--brand-orange)" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="var(--brand-orange)"/>
          </svg>
          <h3>能力分布</h3>
        </div>
        <div class="radar-wrapper">
          <RadarChart :scores="result.scores" :color="result.talentType.color" />
        </div>
      </div>

      <!-- 编程适配 -->
      <div class="match-section">
        <div class="section-header">
          <span class="section-icon">💻</span>
          <h3>编程适配度</h3>
        </div>
        <div class="match-badge">{{ result.talentType.programmingMatch }}</div>
        <p class="match-text">{{ result.talentType.programmingReason }}</p>
      </div>

      <!-- 学习建议 -->
      <div class="advice-section">
        <div class="section-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 6L12 18M12 6L7 11M12 6L17 11" stroke="var(--tech-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>专属学习建议</h3>
        </div>
        <p class="advice-text">{{ result.talentType.learningAdvice }}</p>
      </div>

      <!-- 职业方向 -->
      <div class="career-section">
        <div class="section-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 8L9 8L12 2Z" fill="var(--accent-lime)"/>
            <path d="M3 10H21L19 18H5L3 10Z" stroke="var(--accent-lime)" stroke-width="2" stroke-linejoin="round"/>
            <path d="M8 18V22H16V18" stroke="var(--accent-lime)" stroke-width="2"/>
          </svg>
          <h3>未来发展方向</h3>
        </div>
        <div class="career-tags">
          <span
            v-for="(tag, i) in result.talentType.careerTags"
            :key="i"
            class="career-tag"
            :style="{ '--tag-color': result.talentType.color }"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <button class="cta-btn" @click="goToCourse">
          <span>解锁编程体验课</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="retry-btn" @click="retryQuiz">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.66667 5.33333C3.86667 3.46667 5.86667 2.33333 8 2.33333C11.1333 2.33333 13.6667 4.86667 13.6667 8C13.6667 11.1333 11.1333 13.6667 8 13.6667C5.86667 13.6667 3.86667 12.5333 2.66667 10.6667M2.66667 10.6667V7.33333M2.66667 10.6667H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>重新测评</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz'
import RadarChart from '../components/RadarChart.vue'
import { trackQuizComplete, trackCourseClick } from '../utils/analytics'

const router = useRouter()
const quizStore = useQuizStore()
const { result } = storeToRefs(quizStore)

if (!result.value) {
  router.push('/')
}

onMounted(() => {
  if (result.value) {
    trackQuizComplete(result.value.talentType.name)
  }
})

const goToCourse = () => {
  trackCourseClick()
  router.push('/course')
}

const retryQuiz = () => {
  quizStore.resetQuiz()
  router.push('/')
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  padding-bottom: var(--space-16);
}

/* 背景装饰 */
.bg-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.glow-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.25;
}

.gc-1 {
  width: 350px;
  height: 350px;
  background: var(--brand-orange);
  top: -100px;
  right: -100px;
}

.gc-2 {
  width: 250px;
  height: 250px;
  background: var(--tech-blue);
  bottom: -80px;
  left: -80px;
}

/* 容器 */
.container {
  position: relative;
  z-index: 1;
  padding: var(--space-8) var(--space-5);
  max-width: 540px;
  margin: 0 auto;
}

/* 天赋卡片 */
.talent-card {
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--space-10) var(--space-8);
  text-align: center;
  margin-bottom: var(--space-6);
  overflow: hidden;
  animation: scaleIn 0.6s var(--easing-spring) backwards;
}

.talent-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--talent-color) 0%, var(--talent-color) 100%);
  opacity: 0.9;
}

.talent-content {
  position: relative;
  z-index: 1;
}

.talent-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.talent-badge span:last-child {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 12px;
  color: white;
}

.talent-emoji {
  font-size: 72px;
  margin-bottom: var(--space-4);
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
}

.talent-name {
  font-family: var(--font-display);
  font-size: clamp(36px, 8vw, 48px);
  font-weight: 800;
  color: white;
  margin-bottom: var(--space-3);
  letter-spacing: -0.02em;
}

.talent-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

/* 通用区块样式 */
.radar-section,
.match-section,
.advice-section,
.career-section {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  animation: slideUp 0.6s var(--easing-smooth) backwards;
}

.radar-section { animation-delay: 0.1s; }
.match-section { animation-delay: 0.2s; }
.advice-section { animation-delay: 0.3s; }
.career-section { animation-delay: 0.4s; }

.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.section-icon {
  font-size: 24px;
}

h3 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  color: var(--text-primary);
}

/* 雷达图 */
.radar-wrapper {
  width: 100%;
  aspect-ratio: 1;
  max-width: 280px;
  margin: 0 auto;
}

/* 编程适配 */
.match-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-5);
  background: var(--gradient-brand);
  border-radius: var(--radius-full);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: white;
  margin-bottom: var(--space-3);
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
}

.match-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 学习建议 */
.advice-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* 职业标签 */
.career-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.career-tag {
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 2px solid var(--tag-color);
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary);
  transition: all var(--duration-base) var(--easing-smooth);
}

.career-tag:hover {
  background: var(--tag-color);
  color: white;
  transform: translateY(-2px);
}

/* CTA */
.cta-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-5) var(--space-8);
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
  animation: slideUp 0.6s var(--easing-smooth) 0.5s backwards;
}

.cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform var(--duration-slow) var(--easing-smooth);
}

.cta-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 50px rgba(255, 107, 53, 0.5);
}

.cta-btn:hover::before {
  transform: translateX(100%);
}

.retry-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-4);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-smooth);
}

.retry-btn:hover {
  background: var(--bg-secondary);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
}

/* 动画 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* 响应式 */
@media (max-width: 480px) {
  .container {
    padding: var(--space-6) var(--space-4);
  }

  .talent-card {
    padding: var(--space-8) var(--space-6);
  }

  .talent-emoji {
    font-size: 56px;
  }

  .talent-name {
    font-size: 28px;
  }

  .radar-section,
  .match-section,
  .advice-section,
  .career-section {
    padding: var(--space-5);
  }
}
</style>
