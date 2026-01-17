<template>
  <div class="course-page">
    <!-- 噪点纹理 -->
    <div class="noise-overlay"></div>

    <!-- 几何装饰 -->
    <div class="geo-decoration">
      <div class="geo-circle gc-1"></div>
      <div class="geo-circle gc-2"></div>
      <div class="geo-square gs-1"></div>
      <div class="geo-triangle gt-1"></div>
    </div>

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
        <div class="gift-anim">
          <div class="gift-box">
            <div class="gift-lid"></div>
            <div class="gift-body"></div>
            <div class="gift-ribbon"></div>
          </div>
          <div class="sparkles">
            <span class="sparkle s1"></span>
            <span class="sparkle s2"></span>
            <span class="sparkle s3"></span>
            <span class="sparkle s4"></span>
          </div>
        </div>

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
      <div class="course-card">
        <div class="card-header">
          <div class="card-badge">
            <span class="badge-icon">🎯</span>
            <span>专属定制</span>
          </div>
          <div class="card-rating">
            <span>★</span>
            <span>4.9</span>
          </div>
        </div>

        <h2 class="course-title">核桃编程体验课</h2>

        <!-- 天赋匹配 -->
        <div class="talent-match" :style="{ '--talent-color': result?.talentType?.color || '#FF6B35' }">
          <div class="match-icon">{{ result?.talentType?.emoji || '✨' }}</div>
          <div class="match-info">
            <div class="match-label">适合你的天赋</div>
            <div class="match-name">{{ result?.talentType?.name || '创意少年' }}</div>
          </div>
          <div class="match-arrow">→</div>
        </div>

        <!-- 课程亮点 - 重新设计 -->
        <div class="features-section">
          <h4 class="features-title">课程亮点</h4>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-bg" style="--feature-color: #3B82F6;"></div>
              <div class="feature-icon">👨‍🏫</div>
              <span class="feature-text">1对1名师指导</span>
            </div>
            <div class="feature-item">
              <div class="feature-bg" style="--feature-color: #84CC16;"></div>
              <div class="feature-icon">🎮</div>
              <span class="feature-text">趣味游戏化学习</span>
            </div>
            <div class="feature-item">
              <div class="feature-bg" style="--feature-color: #F59E0B;"></div>
              <div class="feature-icon">🏆</div>
              <span class="feature-text">完成作品带回家</span>
            </div>
          </div>
        </div>

        <!-- 课程包含 - 重新设计 -->
        <div class="includes-section">
          <h4 class="includes-title">课包包含</h4>
          <div class="includes-grid">
            <div class="include-item">
              <div class="include-check">✓</div>
              <span>3节直播互动课</span>
            </div>
            <div class="include-item">
              <div class="include-check">✓</div>
              <span>个性化学习报告</span>
            </div>
            <div class="include-item">
              <div class="include-check">✓</div>
              <span>专属学习社群</span>
            </div>
            <div class="include-item">
              <div class="include-check">✓</div>
              <span>编程学习大礼包</span>
            </div>
          </div>
        </div>

        <!-- 价格 - 重新设计 -->
        <div class="price-wrapper">
          <div class="price-main">
            <span class="price-currency">¥</span>
            <span class="price-amount">9.9</span>
          </div>
          <div class="price-original">
            <span>原价</span>
            <span class="price-strike">¥299</span>
          </div>
          <div class="price-save">
            <span>省 ¥289</span>
          </div>
        </div>
      </div>

      <!-- 倒计时 - 重新设计 -->
      <div class="countdown-banner">
        <div class="countdown-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="countdown-content">
          <span class="countdown-label">限时优惠</span>
          <span class="countdown-divider">|</span>
          <span class="countdown-text">仅剩</span>
          <div class="countdown-timer">{{ countdownDisplay }}</div>
        </div>
        <div class="countdown-pulse"></div>
      </div>

      <!-- 表单 - 重新设计 -->
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
              v-model="form.name"
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
              v-model="form.phone"
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
              <option value="10">高一</option>
              <option value="11">高二</option>
              <option value="12">高三</option>
            </select>
          </div>
        </div>

        <button
          class="submit-btn"
          @click="submitForm"
          :disabled="!isFormValid || isSubmitting"
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

      <!-- 用户评价 - 重新设计 -->
      <div class="testimonial-section">
        <div class="testimonial-card">
          <div class="testimonial-header">
            <div class="testimonial-avatar">👧</div>
            <div class="testimonial-info">
              <span class="testimonial-name">小雨</span>
              <span class="testimonial-grade">三年级</span>
            </div>
            <div class="testimonial-stars">★★★★★</div>
          </div>
          <p class="testimonial-text">"老师讲得很有趣，我做出自己的第一个游戏了！妈妈也很惊讶我的进步~"</p>
        </div>
      </div>
    </div>

    <!-- 成功弹窗 -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-success">
            <div class="success-circle">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M7 16L13 22L25 10" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3 class="modal-title">报名成功！</h3>
          <p class="modal-text">
            老师将在24小时内联系您<br>
            请保持手机畅通
          </p>
          <button class="modal-btn" @click="closeModal">
            知道了
          </button>
        </div>
      </div>
    </transition>
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
const countdown = ref(1800)

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

/* 几何装饰 */
.geo-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.geo-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid;
  animation: float 12s ease-in-out infinite;
}

.gc-1 {
  width: 100px;
  height: 100px;
  border-color: var(--brand-orange);
  top: 10%;
  right: 5%;
  animation-delay: 0s;
  opacity: 0.12;
}

.gc-2 {
  width: 70px;
  height: 70px;
  border-color: var(--tech-blue);
  top: 45%;
  left: 3%;
  animation-delay: 4s;
  opacity: 0.08;
}

.geo-square {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid;
  animation: float 15s ease-in-out infinite;
}

.gs-1 {
  border-color: var(--tech-blue);
  bottom: 25%;
  right: 8%;
  transform: rotate(45deg);
  animation-delay: 2s;
  opacity: 0.1;
}

.geo-triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 45px solid var(--brand-orange);
  opacity: 0.08;
  animation: float 18s ease-in-out infinite;
}

.gt-1 {
  bottom: 15%;
  left: 10%;
  animation-delay: 3s;
}

/* 容器 */
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

/* 礼物动画 - 重新设计 */
.gift-anim {
  position: relative;
  margin-bottom: var(--space-8);
}

.gift-box {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  animation: gift-bounce 2s ease-in-out infinite;
}

.gift-body {
  position: absolute;
  bottom: 0;
  width: 80px;
  height: 60px;
  background: var(--gradient-brand);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.4);
}

.gift-lid {
  position: absolute;
  top: 8px;
  left: -4px;
  width: 88px;
  height: 16px;
  background: linear-gradient(135deg, #FF8C5A 0%, #FF6B35 100%);
  border-radius: var(--radius-sm);
  animation: gift-lid-bounce 2s ease-in-out infinite;
}

.gift-ribbon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 60px;
  background: #FFD700;
  border-radius: var(--radius-sm);
}

.gift-ribbon::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #FFD700;
  border-radius: 50%;
}

@keyframes gift-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes gift-lid-bounce {
  0%, 40%, 100% { transform: translateY(0) rotate(0deg); }
  45%, 55% { transform: translateY(-3px) rotate(-5deg); }
  50% { transform: translateY(-3px) rotate(5deg); }
}

.sparkles {
  position: relative;
  height: 30px;
}

.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #FFD700;
  border-radius: 50%;
  animation: sparkle-float 1.5s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

.s1 { left: 0; animation-delay: 0s; }
.s2 { left: 33%; animation-delay: 0.3s; }
.s3 { left: 66%; animation-delay: 0.6s; }
.s4 { right: 0; animation-delay: 0.9s; }

@keyframes sparkle-float {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translateY(-15px) scale(1);
  }
}

/* 标题 */
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

/* 课程卡片 */
.course-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  margin-bottom: var(--space-5);
  animation: slideUp 0.6s var(--easing-smooth) 0.3s backwards;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.card-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: rgba(255, 107, 53, 0.15);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  color: var(--brand-orange-light);
}

.badge-icon {
  font-size: 14px;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 14px;
  font-weight: 600;
  color: var(--brand-orange-light);
}

.course-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-5);
}

/* 天赋匹配 */
.talent-match {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-tertiary);
  border: 2px solid var(--talent-color);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-6);
  transition: all var(--duration-base) var(--easing-smooth);
}

.talent-match:hover {
  transform: translateX(4px);
  box-shadow: -4px 0 20px var(--talent-color);
}

.match-icon {
  font-size: 32px;
}

.match-info {
  flex: 1;
}

.match-label {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-bottom: var(--space-1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.match-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
}

.match-arrow {
  font-size: 20px;
  color: var(--text-tertiary);
  transition: transform var(--duration-base) var(--easing-smooth);
}

.talent-match:hover .match-arrow {
  transform: translateX(4px);
}

/* 课程亮点 */
.features-section {
  margin-bottom: var(--space-6);
}

.features-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.feature-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-2);
  background: var(--bg-tertiary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--duration-base) var(--easing-smooth);
}

.feature-item:hover {
  transform: translateY(-4px);
}

.feature-bg {
  position: absolute;
  inset: 0;
  background: var(--feature-color);
  opacity: 0;
  transition: opacity var(--duration-base) var(--easing-smooth);
}

.feature-item:hover .feature-bg {
  opacity: 0.15;
}

.feature-icon {
  position: relative;
  font-size: 24px;
}

.feature-text {
  position: relative;
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.3;
}

/* 课程包含 */
.includes-section {
  background: var(--bg-tertiary);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  margin-bottom: var(--space-6);
}

.includes-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.includes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.include-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  color: var(--text-secondary);
}

.include-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: var(--accent-lime);
  border-radius: 50%;
  font-size: 10px;
  color: var(--bg-primary);
  font-weight: 700;
  flex-shrink: 0;
}

/* 价格 */
.price-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.price-currency {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--brand-orange);
}

.price-amount {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 800;
  color: var(--brand-orange);
  line-height: 1;
}

.price-original {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.price-original span:first-child {
  font-size: 11px;
  color: var(--text-tertiary);
}

.price-strike {
  font-size: 14px;
  color: var(--text-tertiary);
  text-decoration: line-through;
}

.price-save {
  margin-left: auto;
  padding: var(--space-1) var(--space-3);
  background: rgba(239, 68, 68, 0.15);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  color: #EF4444;
}

/* 倒计时 */
.countdown-banner {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-5);
  overflow: hidden;
  animation: slideUp 0.6s var(--easing-smooth) 0.5s backwards;
}

.countdown-icon {
  display: flex;
  align-items: center;
  color: #EF4444;
}

.countdown-content {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
}

.countdown-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: #EF4444;
}

.countdown-divider {
  color: var(--text-tertiary);
}

.countdown-text {
  font-size: 13px;
  color: var(--text-secondary);
}

.countdown-timer {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 16px;
  color: #EF4444;
  letter-spacing: 2px;
}

.countdown-pulse {
  position: absolute;
  right: var(--space-4);
  width: 8px;
  height: 8px;
  background: #EF4444;
  border-radius: 50%;
  animation: pulse-alert 1.5s ease-in-out infinite;
}

@keyframes pulse-alert {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
}

/* 表单 */
.form-section {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  animation: slideUp 0.6s var(--easing-smooth) 0.6s backwards;
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

/* 用户评价 */
.testimonial-section {
  animation: fadeIn 1s var(--easing-smooth) 0.8s backwards;
}

.testimonial-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.testimonial-avatar {
  font-size: 36px;
}

.testimonial-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.testimonial-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.testimonial-grade {
  font-size: 12px;
  color: var(--text-tertiary);
}

.testimonial-stars {
  font-size: 12px;
  color: #FBBF24;
  letter-spacing: 2px;
}

.testimonial-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-style: italic;
}

/* 弹窗 */
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

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(3deg);
  }
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-item {
    flex-direction: row;
    justify-content: flex-start;
    padding: var(--space-3) var(--space-4);
  }

  .feature-icon {
    font-size: 20px;
  }

  .feature-text {
    font-size: 12px;
  }

  .includes-grid {
    grid-template-columns: 1fr;
  }

  .title-line {
    font-size: 20px;
  }

  .title-highlight {
    font-size: 32px;
  }

  .price-amount {
    font-size: 28px;
  }
}
</style>
