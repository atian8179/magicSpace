<template>
  <div class="quiz-page">
    <!-- 噪点纹理 -->
    <div class="noise-overlay"></div>

    <!-- 顶部导航 -->
    <div class="nav-bar">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="nav-title">天赋测评</span>
      <div class="spacer"></div>
    </div>

    <!-- 进度 -->
    <div class="progress-section">
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-number">{{ Math.round(progress) }}%</div>
    </div>

    <!-- 问题卡片 -->
    <div class="question-wrapper">
      <div class="question-counter">题目 {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</div>

      <div class="dimension-tag" :style="{ background: getDimensionGradient(currentQuestion.dimension) }">
        {{ getDimensionLabel(currentQuestion.dimension) }}
      </div>

      <h2 class="question-text">{{ currentQuestion.question }}</h2>

      <div class="options-list">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="option-item"
          @click="selectAnswer(index)"
        >
          <span class="option-letter">{{ ['A', 'B', 'C', 'D'][index] }}</span>
          <span class="option-content">{{ option.text }}</span>
          <svg class="option-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 提示 -->
    <div class="hint-box">
      <span class="hint-icon">💡</span>
      <span>凭直觉选择，没有标准答案</span>
    </div>

    <!-- 过渡 -->
    <transition name="fade">
      <div v-if="showTransition" class="transition-overlay"></div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz'

const router = useRouter()
const quizStore = useQuizStore()
const { currentQuestionIndex, totalQuestions, currentQuestion, progress, answers } = storeToRefs(quizStore)

const showTransition = ref(false)

const dimensionLabels = {
  logic: '逻辑推理',
  creativity: '创意创造',
  space: '空间想象',
  focus: '专注坚持',
  collaboration: '协作沟通',
  exploration: '观察探索'
}

const dimensionGradients = {
  logic: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
  creativity: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
  space: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
  focus: 'linear-gradient(135deg, #84CC16 0%, #A3E635 100%)',
  collaboration: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  exploration: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)'
}

const getDimensionLabel = (dim) => dimensionLabels[dim] || '综合能力'
const getDimensionGradient = (dim) => dimensionGradients[dim] || dimensionGradients.logic

const selectAnswer = (index) => {
  showTransition.value = true

  setTimeout(() => {
    quizStore.answerQuestion(index)
    showTransition.value = false

    if (answers.value.length === totalQuestions.value) {
      const result = quizStore.calculateResult()
      router.push('/result')
    }
  }, 300)
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

/* 导航栏 */
.nav-bar {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
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
}

.nav-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--text-primary);
}

.spacer {
  width: 40px;
}

/* 进度 */
.progress-section {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: 0 var(--space-5) var(--space-6);
  animation: fadeIn 0.5s var(--easing-smooth) 0.1s backwards;
}

.progress-bar-bg {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--gradient-brand);
  border-radius: var(--radius-full);
  transition: width 0.5s var(--easing-smooth);
}

.progress-number {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--brand-orange-light);
  min-width: 45px;
  text-align: right;
}

/* 问题区域 */
.question-wrapper {
  position: relative;
  z-index: 1;
  padding: var(--space-6) var(--space-5);
  max-width: 540px;
  margin: 0 auto;
  animation: slideUp 0.6s var(--easing-smooth) 0.2s backwards;
}

.question-counter {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: var(--space-3);
  text-align: center;
}

.dimension-tag {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: var(--space-6);
}

.question-text {
  font-family: var(--font-display);
  font-size: clamp(22px, 5vw, 28px);
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.4;
  margin-bottom: var(--space-10);
}

/* 选项列表 */
.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-5);
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-spring);
  text-align: left;
}

.option-item:hover {
  border-color: var(--brand-orange);
  background: var(--bg-tertiary);
  transform: translateX(4px);
}

.option-item:active {
  transform: scale(0.98);
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--text-secondary);
  flex-shrink: 0;
  transition: all var(--duration-base) var(--easing-smooth);
}

.option-item:hover .option-letter {
  background: var(--gradient-brand);
  color: white;
}

.option-content {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
}

.option-arrow {
  color: var(--text-tertiary);
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--duration-base) var(--easing-smooth);
  flex-shrink: 0;
}

.option-item:hover .option-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--brand-orange);
}

/* 提示框 */
.hint-box {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  margin: var(--space-8) auto 0;
  max-width: 540px;
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-lg);
  animation: fadeIn 1s var(--easing-smooth) 0.5s backwards;
}

.hint-icon {
  font-size: 16px;
}

.hint-box span:last-child {
  font-size: 13px;
  color: var(--text-tertiary);
}

/* 过渡动画 */
.transition-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 480px) {
  .question-wrapper {
    padding: var(--space-5) var(--space-4);
  }

  .option-item {
    padding: var(--space-4);
  }

  .option-letter {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  .option-content {
    font-size: 14px;
  }
}
</style>
