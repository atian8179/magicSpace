<template>
  <div class="result-page">
    <div class="content">
      <!-- 天赋类型卡片 -->
      <div class="talent-card" :style="{ background: `linear-gradient(135deg, ${result.talentType.color} 0%, ${result.talentType.color}dd 100%)` }">
        <div class="talent-emoji">{{ result.talentType.emoji }}</div>
        <h1 class="talent-name">{{ result.talentType.name }}</h1>
        <p class="talent-traits">{{ result.talentType.traits }}</p>
        <p class="talent-description">{{ result.talentType.description }}</p>
      </div>

      <!-- 能力雷达图 -->
      <div class="radar-section">
        <h2 class="section-title">你的能力分布</h2>
        <div class="radar-chart-container">
          <RadarChart :scores="result.scores" :color="result.talentType.color" />
        </div>
      </div>

      <!-- 编程适配度 -->
      <div class="match-section">
        <div class="match-header">
          <span class="match-icon">💻</span>
          <h2 class="section-title">编程适配度</h2>
        </div>
        <div class="match-badge">{{ result.talentType.programmingMatch }}</div>
        <p class="match-reason">{{ result.talentType.programmingReason }}</p>
      </div>

      <!-- 学习建议 -->
      <div class="advice-section">
        <h2 class="section-title">📚 专属学习建议</h2>
        <p class="advice-text">{{ result.talentType.learningAdvice }}</p>
      </div>

      <!-- 未来职业方向 -->
      <div class="career-section">
        <h2 class="section-title">🚀 未来可能的发展方向</h2>
        <div class="career-tags">
          <span
            v-for="(tag, index) in result.talentType.careerTags"
            :key="index"
            class="career-tag"
            :style="{ borderColor: result.talentType.color }"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- CTA按钮 -->
      <button class="cta-button" @click="goToCourse">
        <span>解锁专属编程体验课</span>
        <span class="arrow">→</span>
      </button>

      <!-- 分享按钮 -->
      <div class="share-buttons">
        <button class="share-button" @click="retryQuiz">
          <span>🔄 重新测评</span>
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

// 页面加载时统计测评完成
onMounted(() => {
  if (result.value) {
    trackQuizComplete(result.value.talentType.name)
  }
})

const goToCourse = () => {
  trackCourseClick() // 统计：点击领课
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 60px;
}

.content {
  padding: 30px 20px;
  max-width: 600px;
  margin: 0 auto;
}

.talent-card {
  border-radius: 24px;
  padding: 30px;
  text-align: center;
  color: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
  animation: scaleIn 0.5s ease;
}

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

.talent-emoji {
  font-size: 64px;
  margin-bottom: 16px;
}

.talent-name {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.talent-traits {
  font-size: 16px;
  opacity: 0.95;
  margin-bottom: 16px;
  font-weight: 500;
}

.talent-description {
  font-size: 15px;
  opacity: 0.9;
  line-height: 1.6;
}

.radar-section,
.match-section,
.advice-section,
.career-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.5s ease;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.radar-chart-container {
  width: 100%;
  aspect-ratio: 1;
  max-width: 350px;
  margin: 0 auto;
}

.match-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.match-icon {
  font-size: 24px;
}

.match-badge {
  display: inline-block;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
}

.match-reason {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.7;
}

.advice-text {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.7;
}

.career-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.career-tag {
  padding: 10px 18px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.cta-button {
  width: 100%;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #1f2937;
  border: none;
  padding: 20px 32px;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(255, 215, 0, 0.5);
}

.arrow {
  font-size: 22px;
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow {
  transform: translateX(5px);
}

.share-buttons {
  display: flex;
  gap: 12px;
}

.share-button {
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .talent-name {
    font-size: 26px;
  }

  .talent-emoji {
    font-size: 52px;
  }

  .section-title {
    font-size: 16px;
  }
}
</style>
