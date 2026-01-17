<template>
  <div class="quiz-page">
    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>

    <div class="content">
      <!-- 问题编号 -->
      <div class="question-number">
        题目 {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}
      </div>

      <!-- 问题卡片 -->
      <div class="question-card">
        <!-- 装饰图标 -->
        <div class="question-icon">{{ getQuestionIcon() }}</div>

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
            <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}</span>
            <span class="option-text">{{ option.text }}</span>
          </button>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="footer-buttons">
        <button
          v-if="currentQuestionIndex > 0"
          class="secondary-button"
          @click="previousQuestion"
        >
          ← 上一题
        </button>
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

const dimensionIcons = {
  logic: '🧮',
  creativity: '🎨',
  space: '🧩',
  focus: '🎯',
  collaboration: '🤝',
  exploration: '🔍'
}

const getQuestionIcon = () => {
  return dimensionIcons[currentQuestion.value.dimension] || '✨'
}

const selectAnswer = (index) => {
  // 显示过渡动画
  showTransition.value = true

  setTimeout(() => {
    quizStore.answerQuestion(index)
    showTransition.value = false

    // 如果是最后一题，跳转到结果页
    if (answers.value.length === totalQuestions.value) {
      const result = quizStore.calculateResult()
      router.push('/result')
    }
  }, 300)
}

const previousQuestion = () => {
  quizStore.previousQuestion()
}
</script>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 100px;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 100;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
  transition: width 0.5s ease;
}

.content {
  padding: 80px 20px 20px;
  max-width: 600px;
  margin: 0 auto;
}

.question-number {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  font-weight: 500;
}

.question-card {
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.5s ease;
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

.question-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;
}

.question-text {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 30px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-button {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 18px 20px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.option-button:hover {
  background: #f3f4f6;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.option-button:active {
  transform: translateY(0);
}

.option-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.option-text {
  font-size: 15px;
  color: #374151;
  font-weight: 500;
  line-height: 1.4;
}

.footer-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

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

@media (max-width: 480px) {
  .question-card {
    padding: 24px;
  }

  .question-icon {
    font-size: 40px;
  }

  .question-text {
    font-size: 18px;
  }

  .option-button {
    padding: 16px;
  }

  .option-label {
    width: 28px;
    height: 28px;
    font-size: 13px;
  }

  .option-text {
    font-size: 14px;
  }
}
</style>
