<template>
  <div class="result-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
    </div>

    <div class="content">
      <!-- 天赋卡片 -->
      <div class="talent-card" :style="{ '--talent-color': result.talentType.color }">
        <div class="talent-bg"></div>
        <div class="talent-glow"></div>

        <div class="talent-header">
          <div class="talent-badge">
            <span class="badge-dot"></span>
            你的天赋类型
          </div>
        </div>

        <div class="talent-emoji">{{ result.talentType.emoji }}</div>

        <h1 class="talent-name">{{ result.talentType.name }}</h1>

        <div class="talent-traits">{{ result.talentType.traits }}</div>

        <p class="talent-description">{{ result.talentType.description }}</p>

        <!-- 装饰线条 -->
        <div class="talent-divider">
          <div class="divider-line"></div>
          <div class="divider-star">✦</div>
          <div class="divider-line"></div>
        </div>
      </div>

      <!-- 雷达图卡片 -->
      <div class="radar-card">
        <div class="card-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" stroke="url(#radarGradient)" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" fill="url(#radarGradient)"/>
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stop-color="#FF6B35"/>
                  <stop offset="100%" stop-color="#FF8C5A"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 class="card-title">能力分布</h2>
        </div>

        <div class="radar-chart-container">
          <RadarChart :scores="result.scores" :color="result.talentType.color" />
        </div>
      </div>

      <!-- 编程适配度 -->
      <div class="match-card">
        <div class="match-header">
          <div class="match-icon">💻</div>
          <h2 class="match-title">编程适配度</h2>
        </div>

        <div class="match-badge" :style="{ background: getMatchGradient() }">
          {{ result.talentType.programmingMatch }}
        </div>

        <p class="match-reason">{{ result.talentType.programmingReason }}</p>
      </div>

      <!-- 学习建议 -->
      <div class="advice-card">
        <div class="card-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 6L12 18M12 6L7 11M12 6L17 11" stroke="url(#adviceGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="adviceGradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stop-color="#6366F1"/>
                  <stop offset="100%" stop-color="#8B5CF6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 class="card-title">专属学习建议</h2>
        </div>

        <p class="advice-text">{{ result.talentType.learningAdvice }}</p>
      </div>

      <!-- 未来职业 -->
      <div class="career-card">
        <div class="card-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 8L9 8L12 2Z" fill="url(#careerGradient)"/>
              <path d="M3 10H21L19 18H5L3 10Z" stroke="url(#careerGradient)" stroke-width="2" stroke-linejoin="round"/>
              <path d="M8 18V22H16V18" stroke="url(#careerGradient)" stroke-width="2"/>
              <defs>
                <linearGradient id="careerGradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stop-color="#06B6D4"/>
                  <stop offset="100%" stop-color="#22D3EE"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 class="card-title">未来发展方向</h2>
        </div>

        <div class="career-tags">
          <span
            v-for="(tag, index) in result.talentType.careerTags"
            :key="index"
            class="career-tag"
            :style="{ '--tag-color': result.talentType.color }"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- CTA 区域 -->
      <div class="cta-section">
        <button class="cta-button" @click="goToCourse">
          <span class="button-text">解锁编程体验课</span>
          <div class="button-glow"></div>
          <svg class="button-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="retry-button" @click="retryQuiz">
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
import { computed, onMounted } from 'vue'
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

const getMatchGradient = () => {
  return 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
}

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
  background: var(--gradient-hero);
  position: relative;
  overflow-x: hidden;
  padding-bottom: var(--space-2xl);
}

/* 背景装饰 */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--brand-primary) 0%, transparent 70%);
  top: -100px;
  right: -100px;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #6366F1 0%, transparent 70%);
  top: 40%;
  left: -60px;
}

.orb-3 {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, #06B6D4 0%, transparent 70%);
  bottom: 10%;
  right: 10%;
}

/* 内容区域 */
.content {
  position: relative;
  z-index: 1;
  padding: var(--space-xl) var(--space-lg) var(--space-2xl);
  max-width: 500px;
  margin: 0 auto;
}

/* 天赋卡片 */
.talent-card {
  position: relative;
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl) var(--space-xl);
  text-align: center;
  margin-bottom: var(--space-lg);
  overflow: hidden;
  animation: scaleIn 0.6s ease;
}

.talent-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--talent-color) 0%, var(--talent-color) 100%);
  opacity: 0.9;
  z-index: 0;
}

.talent-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--talent-color) 0%, transparent 70%);
  filter: blur(40px);
  opacity: 0.5;
  z-index: 0;
}

.talent-header {
  position: relative;
  z-index: 1;
  margin-bottom: var(--space-lg);
}

.talent-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.talent-emoji {
  position: relative;
  z-index: 1;
  font-size: 72px;
  margin-bottom: var(--space-md);
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
}

.talent-name {
  position: relative;
  z-index: 1;
  font-size: 36px;
  font-weight: 800;
  color: white;
  margin-bottom: var(--space-sm);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.talent-traits {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: var(--space-md);
}

.talent-description {
  position: relative;
  z-index: 1;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.talent-divider {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.divider-star {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 通用卡片样式 */
.radar-card,
.match-card,
.advice-card,
.career-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-2xl);
  padding: var(--space-xl);
  margin-bottom: var(--space-md);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.6s ease backwards;
}

.radar-card { animation-delay: 0.1s; }
.match-card { animation-delay: 0.2s; }
.advice-card { animation-delay: 0.3s; }
.career-card { animation-delay: 0.4s; }

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

/* 雷达图 */
.radar-chart-container {
  width: 100%;
  aspect-ratio: 1;
  max-width: 300px;
  margin: 0 auto;
}

/* 编程适配度 */
.match-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.match-icon {
  font-size: 28px;
}

.match-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.match-badge {
  display: inline-block;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin-bottom: var(--space-md);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.match-reason {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* 学习建议 */
.advice-text {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
}

/* 职业标签 */
.career-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.career-tag {
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-secondary);
  border: 2px solid var(--tag-color);
  border-radius: var(--radius-lg);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  transition: all var(--transition-base);
}

.career-tag:hover {
  background: var(--tag-color);
  color: white;
  transform: translateY(-2px);
}

/* CTA 区域 */
.cta-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.cta-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  width: 100%;
  padding: var(--space-lg) var(--space-xl);
  background: var(--gradient-brand);
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  overflow: hidden;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-glow);
  animation: fadeIn 0.6s ease 0.5s backwards;
}

.button-text {
  position: relative;
  z-index: 1;
  font-size: 17px;
  font-weight: 700;
  color: white;
}

.button-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 50px rgba(255, 107, 53, 0.5);
}

.cta-button:hover .button-glow {
  transform: translateX(100%);
}

.button-arrow {
  position: relative;
  z-index: 1;
  color: white;
  transition: transform var(--transition-base);
}

.cta-button:hover .button-arrow {
  transform: translateX(4px);
}

.retry-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-md);
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all var(--transition-base);
}

.retry-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
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

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
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

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* 响应式 */
@media (max-width: 480px) {
  .content {
    padding: var(--space-lg) var(--space-md) var(--space-2xl);
  }

  .talent-card {
    padding: var(--space-xl) var(--space-lg);
  }

  .talent-emoji {
    font-size: 56px;
  }

  .talent-name {
    font-size: 28px;
  }

  .talent-traits {
    font-size: 14px;
  }

  .talent-description {
    font-size: 14px;
  }

  .radar-card,
  .match-card,
  .advice-card,
  .career-card {
    padding: var(--space-lg);
  }

  .card-title,
  .match-title {
    font-size: 16px;
  }
}
</style>
