<template>
  <div class="course-page">
    <div class="content">
      <!-- 头部 -->
      <div class="header">
        <button class="back-button" @click="goBack">
          ← 返回
        </button>
      </div>

      <!-- 礼物动画 -->
      <div class="gift-animation">
        <div class="gift-box">🎁</div>
        <div class="sparkles">
          <span class="sparkle sparkle-1">✨</span>
          <span class="sparkle sparkle-2">✨</span>
          <span class="sparkle sparkle-3">✨</span>
        </div>
      </div>

      <!-- 标题 -->
      <h1 class="title">
        恭喜你！<br>
        <span class="highlight">解锁专属福利</span>
      </h1>

      <!-- 课程卡片 -->
      <div class="course-card">
        <div class="course-badge">🎯 专属定制</div>
        <h2 class="course-title">核桃编程体验课</h2>

        <!-- 适合天赋 -->
        <div class="talent-match" :style="{ borderColor: result?.talentType?.color || '#667eea' }">
          <span class="talent-icon">{{ result?.talentType?.emoji || '✨' }}</span>
          <div>
            <div class="talent-label">适合你的天赋</div>
            <div class="talent-name">{{ result?.talentType?.name || '创意少年' }}</div>
          </div>
        </div>

        <!-- 课程亮点 -->
        <div class="course-features">
          <div class="feature">
            <span class="feature-icon">👨‍🏫</span>
            <span class="feature-text">1对1名师指导</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🎮</span>
            <span class="feature-text">趣味游戏化学习</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🏆</span>
            <span class="feature-text">完成作品带回家</span>
          </div>
        </div>

        <!-- 课程内容 -->
        <div class="course-content">
          <h3 class="content-title">课包包含</h3>
          <ul class="content-list">
            <li>3节直播互动课</li>
            <li>个性化学习报告</li>
            <li>专属学习社群</li>
            <li>编程学习大礼包</li>
          </ul>
        </div>

        <!-- 原价/优惠价 -->
        <div class="price-section">
          <span class="original-price">原价 ¥299</span>
          <span class="current-price">限时特惠 ¥9.9</span>
        </div>
      </div>

      <!-- 限时倒计时 -->
      <div class="countdown">
        <span class="countdown-icon">⏰</span>
        <span class="countdown-text">优惠仅剩</span>
        <span class="countdown-time">{{ countdownDisplay }}</span>
      </div>

      <!-- 报名表单 -->
      <div class="form-section">
        <div class="form-group">
          <input
            v-model="form.name"
            type="text"
            placeholder="孩子姓名"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            v-model="form.phone"
            type="tel"
            placeholder="家长手机号"
            class="form-input"
            maxlength="11"
          />
        </div>
        <div class="form-group">
          <select v-model="form.grade" class="form-input">
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
          </select>
        </div>

        <button class="submit-button" @click="submitForm" :disabled="!isFormValid">
          <span v-if="!isSubmitting">立即领取体验课</span>
          <span v-else>提交中...</span>
          <span v-if="!isSubmitting" class="arrow">→</span>
        </button>

        <p class="privacy-note">
          🔒 你的信息将被严格保密，仅用于课程安排
        </p>
      </div>

      <!-- 用户评价 -->
      <div class="testimonials">
        <div class="testimonial">
          <div class="avatar">👧</div>
          <div class="quote">
            "老师讲得很有趣，我做出自己的第一个游戏了！"
          </div>
          <div class="author">- 小雨，三年级</div>
        </div>
      </div>
    </div>

    <!-- 成功弹窗 -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">🎉</div>
        <h3 class="modal-title">报名成功！</h3>
        <p class="modal-text">
          老师将在24小时内联系您<br>
          请保持手机畅通
        </p>
        <button class="modal-button" @click="closeModal">
          知道了
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz'
import { trackCourseSubmit } from '../utils/analytics'

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
const countdown = ref(1800) // 30分钟

const isFormValid = computed(() => {
  return form.value.name &&
         form.value.phone.length === 11 &&
         /^1[3-9]\d{9}$/.test(form.value.phone) &&
         form.value.grade
})

const countdownDisplay = computed(() => {
  const minutes = Math.floor(countdown.value / 60)
  const seconds = countdown.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

let countdownTimer = null

onMounted(() => {
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
  }, 1000)
})

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})

const goBack = () => {
  router.back()
}

const submitForm = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true

  // 这里接入实际的API接口
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1500))

  // 发送数据到后台
  const submitData = {
    ...form.value,
    talentType: result.value?.talentType?.name,
    scores: result.value?.scores
  }
  console.log('提交表单:', submitData)

  // 统计：表单提交
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 40px;
}

.content {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.header {
  padding: 10px 0 20px;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.gift-animation {
  text-align: center;
  margin: 30px 0;
  position: relative;
}

.gift-box {
  font-size: 80px;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.sparkles {
  position: relative;
  height: 40px;
}

.sparkle {
  position: absolute;
  font-size: 24px;
  animation: sparkle 1.5s ease infinite;
}

.sparkle-1 {
  left: 20%;
  animation-delay: 0s;
}

.sparkle-2 {
  left: 50%;
  animation-delay: 0.5s;
}

.sparkle-3 {
  right: 20%;
  animation-delay: 1s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 30px;
  line-height: 1.4;
}

.highlight {
  color: #FFD700;
}

.course-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}

.course-badge {
  display: inline-block;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #1f2937;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.course-title {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
}

.talent-match {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  margin-bottom: 20px;
}

.talent-icon {
  font-size: 40px;
}

.talent-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.talent-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.course-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 12px;
}

.feature-icon {
  font-size: 24px;
}

.feature-text {
  font-size: 12px;
  color: #4b5563;
  font-weight: 500;
}

.course-content {
  background: #f9fafb;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
}

.content-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.content-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.content-list li {
  padding: 8px 0;
  font-size: 14px;
  color: #4b5563;
  position: relative;
  padding-left: 24px;
}

.content-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10B981;
  font-weight: 600;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.original-price {
  font-size: 16px;
  color: #9ca3af;
  text-decoration: line-through;
}

.current-price {
  font-size: 24px;
  font-weight: 700;
  color: #EF4444;
}

.countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(239, 68, 68, 0.2);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
  margin-bottom: 24px;
}

.countdown-icon {
  font-size: 18px;
}

.countdown-text {
  font-size: 14px;
}

.countdown-time {
  font-size: 18px;
  font-weight: 700;
  font-family: monospace;
}

.form-section {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.2s;
  background: #f9fafb;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
}

.submit-button {
  width: 100%;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #1f2937;
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(255, 215, 0, 0.5);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.arrow {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.submit-button:hover:not(:disabled) .arrow {
  transform: translateX(5px);
}

.privacy-note {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 16px;
}

.testimonials {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
}

.testimonial {
  text-align: center;
}

.avatar {
  font-size: 40px;
  margin-bottom: 12px;
}

.quote {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  font-style: italic;
  margin-bottom: 8px;
  line-height: 1.6;
}

.author {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 24px;
  padding: 40px 30px;
  text-align: center;
  max-width: 320px;
  animation: scaleIn 0.3s ease;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
}

.modal-text {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.modal-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

@media (max-width: 480px) {
  .gift-box {
    font-size: 64px;
  }

  .title {
    font-size: 24px;
  }

  .course-card {
    padding: 20px;
  }

  .course-features {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .feature {
    padding: 10px 8px;
  }

  .feature-text {
    font-size: 11px;
  }
}
</style>
