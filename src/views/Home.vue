<template>
  <div class="home-page">
    <!-- 头部装饰 -->
    <div class="header-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="content">
      <!-- Logo和标题 -->
      <div class="hero-section">
        <div class="logo">
          <span class="logo-icon">✨</span>
          <span class="logo-text">天赋探索</span>
        </div>

        <h1 class="main-title">
          发现孩子的
          <span class="highlight">独特天赋</span>
        </h1>

        <p class="subtitle">
          每个孩子都有与生俱来的天赋密码<br>
          3分钟测评，解锁孩子的编程潜能
        </p>
      </div>

      <!-- 产品价值 -->
      <div class="features">
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <div class="feature-text">
            <div class="feature-title">精准定位</div>
            <div class="feature-desc">科学测评6大能力维度</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">📊</div>
          <div class="feature-text">
            <div class="feature-title">专业报告</div>
            <div class="feature-desc">可视化能力雷达图</div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">💡</div>
          <div class="feature-text">
            <div class="feature-title">学习建议</div>
            <div class="feature-desc">个性化编程成长方案</div>
          </div>
        </div>
      </div>

      <!-- 用户评价 -->
      <div class="testimonials">
        <div class="testimonial-item">
          <div class="avatar">👦</div>
          <div class="quote">
            "测评说我是'逻辑探险家'，建议学Python。现在我能自己做小程序了！"
          </div>
          <div class="author">小明，11岁</div>
        </div>

        <div class="testimonial-item">
          <div class="avatar">👩</div>
          <div class="quote">
            "报告帮助我了解了孩子的特点，沟通和学习都更有效了。"
          </div>
          <div class="author">李妈妈，家长</div>
        </div>
      </div>

      <!-- CTA按钮 -->
      <button class="cta-button" @click="startQuiz">
        <span>开始测评</span>
        <span class="arrow">→</span>
      </button>

      <p class="trust-badge">
        <span class="badge-icon">🔒</span>
        已有 <span class="highlight">12,458</span> 位孩子完成测评
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz'
import { trackQuizStart } from '../utils/analytics'

const router = useRouter()
const quizStore = useQuizStore()

const startQuiz = () => {
  trackQuizStart() // 统计：开始测评
  quizStore.resetQuiz()
  router.push('/quiz')
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  right: -50px;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 50px;
  left: -30px;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  top: 150px;
  right: 50px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

.content {
  position: relative;
  z-index: 1;
  padding: 60px 20px 40px;
  max-width: 600px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.main-title {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  line-height: 1.3;
}

.highlight {
  color: #FFD700;
  position: relative;
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 13px;
  color: #6b7280;
}

.testimonials {
  margin-bottom: 40px;
}

.testimonial-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 12px;
}

.avatar {
  font-size: 32px;
  margin-bottom: 8px;
}

.quote {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
  margin-bottom: 8px;
  font-style: italic;
}

.author {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.cta-button {
  width: 100%;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #1f2937;
  border: none;
  padding: 20px 40px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(255, 215, 0, 0.5);
}

.cta-button:active {
  transform: translateY(0);
}

.arrow {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow {
  transform: translateX(5px);
}

.trust-badge {
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.badge-icon {
  margin-right: 4px;
}

@media (max-width: 480px) {
  .main-title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .feature-item {
    padding: 16px;
  }

  .feature-icon {
    font-size: 28px;
  }

  .cta-button {
    padding: 18px 32px;
    font-size: 16px;
  }
}
</style>
