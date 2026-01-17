<template>
  <div class="quiz-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
    </div>

    <!-- 顶部导航 -->
    <div class="top-bar">
      <button class="back-button" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="brand-text">天赋测评</div>
      <div class="spacer"></div>
    </div>

    <!-- 进度条 -->
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        <div class="progress-glow" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-text">{{ Math.round(progress) }}%</div>
    </div>

    <div class="content">
      <!-- 问题卡片 -->
      <div class="question-card">
        <!-- 问题编号徽章 -->
        <div class="question-badge">
          <span class="badge-number">{{ currentQuestionIndex + 1 }}</span>
          <span class="badge-divider">/</span>
          <span class="badge-total">{{ totalQuestions }}</span>
        </div>

        <!-- 维度标签 -->
        <div class="dimension-tag" :style="{ background: getDimensionColor(currentQuestion.dimension) }">
          {{ getDimensionLabel(currentQuestion.dimension) }}
        </div>

        <!-- 问题文本 -->
        <h2 class="question-text">
          {{ currentQuestion.question }}
        </h2>

        <!-- 选项列表 -->
        <div class="options">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-button"
            @click="selectAnswer(index)"
          >
            <div class="option-indicator">{{ ['A', 'B', 'C', 'D'][index] }}</div>
            <span class="option-text">{{ option.text }}</span>
            <div class="option-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- 底部提示 -->
      <div class="footer-hint">
        <div class="hint-icon">💡</div>
        <span>凭直觉选择，没有标准答案</span>
      </div>
    </div>

    <!-- 过渡动画 -->
    <transition name="slide">
      <div v-if="showTransition" class="transition-overlay"></div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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

const dimensionColors = {
  logic: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
  creativity: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
  space: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  focus: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  collaboration: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  exploration: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)'
}

const getDimensionLabel = (dimension) => {
  return dimensionLabels[dimension] || '综合能力'
}

const getDimensionColor = (dimension) => {
  return dimensionColors[dimension] || 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
}

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
  background: var(--gradient-hero);
  position: relative;
  overflow-x: hidden;
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
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #FF6B35 0%, transparent 70%);
  top: 10%;
  right: -80px;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #6366F1 0%, transparent 70%);
  bottom: 20%;
  left: -60px;
}

/* 顶部导航 */
.top-bar {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  animation: fadeInDown 0.5s ease;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  color: white;
  cursor: pointer;
  transition: all var(--transition-base);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(-2px);
}

.brand-text {
  font-size: 15px;
  font-weight: 600;
  color: white;
}

.spacer {
  width: 40px;
}

/* 进度条 */
.progress-container {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 0 var(--space-lg) var(--space-lg);
  animation: fadeIn 0.5s ease 0.2s backwards;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-brand);
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
  position: relative;
  z-index: 2;
}

.progress-glow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--gradient-brand);
  filter: blur(10px);
  transition: width 0.5s ease;
  z-index: 1;
}

.progress-text {
  font-size: 14px;
  font-weight: 700;
  color: var(--brand-primary-light);
  min-width: 45px;
  text-align: right;
}

/* 内容区域 */
.content {
  position: relative;
  z-index: 1;
  padding: var(--space-lg) var(--space-lg) var(--space-2xl);
  max-width: 500px;
  margin: 0 auto;
}

.question-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: var(--space-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slideInUp 0.5s ease 0.3s backwards;
}

/* 问题编号徽章 */
.question-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-md);
}

.badge-number {
  font-size: 18px;
  font-weight: 700;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.badge-divider {
  font-size: 14px;
  color: var(--text-tertiary);
}

.badge-total {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 维度标签 */
.dimension-tag {
  display: inline-block;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: var(--space-lg);
}

/* 问题文本 */
.question-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.5;
  margin-bottom: var(--space-xl);
}

/* 选项列表 */
.options {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.option-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  padding: var(--space-lg);
  background: white;
  border: 2px solid var(--bg-tertiary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  text-align: left;
  overflow: hidden;
}

.option-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-brand);
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 0;
}

.option-button:hover {
  border-color: var(--brand-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
}

.option-button:hover::before {
  opacity: 0.05;
}

.option-indicator {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-secondary);
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.option-button:hover .option-indicator {
  background: var(--gradient-brand);
  color: white;
}

.option-text {
  position: relative;
  z-index: 1;
  flex: 1;
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.5;
}

.option-arrow {
  position: relative;
  z-index: 1;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateX(-8px);
}

.option-button:hover .option-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--brand-primary);
}

/* 底部提示 */
.footer-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-top: var(--space-xl);
  padding: var(--space-md) var(--space-lg);
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  animation: fadeIn 0.5s ease 0.5s backwards;
}

.hint-icon {
  font-size: 18px;
}

.footer-hint span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

/* 过渡动画 */
.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 999;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

/* 动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

/* 响应式 */
@media (max-width: 480px) {
  .question-card {
    padding: var(--space-lg);
  }

  .question-text {
    font-size: 18px;
  }

  .option-button {
    padding: var(--space-md);
  }

  .option-indicator {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  .option-text {
    font-size: 14px;
  }
}
</style>
