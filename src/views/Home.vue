<template>
  <div class="home-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>

    <div class="content">
      <!-- 顶部 Logo -->
      <div class="top-bar">
        <div class="brand-logo">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="url(#logoGradient)" />
              <path d="M16 8L16 24M16 8L10 14M16 8L22 14" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stop-color="#FF6B35"/>
                  <stop offset="100%" stop-color="#FF8C5A"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span class="logo-text">核桃编程</span>
        </div>
      </div>

      <!-- 主视觉区域 -->
      <div class="hero-section">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          AI 驱动的天赋测评
        </div>

        <h1 class="hero-title">
          <span class="title-line">发现孩子的</span>
          <span class="title-highlight">独特天赋</span>
        </h1>

        <p class="hero-subtitle">
          运用科学测评体系，3分钟精准定位孩子的编程潜能<br>
          为每个孩子定制专属成长路径
        </p>
      </div>

      <!-- 核心价值 -->
      <div class="value-props">
        <div class="value-card">
          <div class="value-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="url(#iconGradient1)" stroke-width="2"/>
              <path d="M20 12V28M20 12L14 18M20 12L26 18" stroke="url(#iconGradient1)" stroke-width="2" stroke-linecap="round"/>
              <defs>
                <linearGradient id="iconGradient1" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stop-color="#FF6B35"/>
                  <stop offset="100%" stop-color="#FF8C5A"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="value-content">
            <h3 class="value-title">精准定位</h3>
            <p class="value-desc">6大能力维度科学测评</p>
          </div>
        </div>

        <div class="value-card">
          <div class="value-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="url(#iconGradient2)" stroke-width="2"/>
              <path d="M14 20L18 24L26 16" stroke="url(#iconGradient2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="iconGradient2" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stop-color="#6366F1"/>
                  <stop offset="100%" stop-color="#8B5CF6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="value-content">
            <h3 class="value-title">专业报告</h3>
            <p class="value-desc">可视化能力雷达图</p>
          </div>
        </div>

        <div class="value-card">
          <div class="value-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="url(#iconGradient3)" stroke-width="2"/>
              <path d="M20 14V26M14 20H26" stroke="url(#iconGradient3)" stroke-width="2" stroke-linecap="round"/>
              <defs>
                <linearGradient id="iconGradient3" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stop-color="#06B6D4"/>
                  <stop offset="100%" stop-color="#3B82F6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="value-content">
            <h3 class="value-title">个性方案</h3>
            <p class="value-desc">定制化学习建议</p>
          </div>
        </div>
      </div>

      <!-- 用户评价 -->
      <div class="testimonials">
        <div class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-mark">"</div>
            <p class="quote-text">测评说我是'逻辑探险家'，建议学Python。现在我能自己做小程序了！</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">👦</div>
            <div class="author-info">
              <div class="author-name">小明</div>
              <div class="author-detail">11岁 · 学习3个月</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA 区域 -->
      <div class="cta-section">
        <button class="cta-button" @click="startQuiz">
          <span class="button-text">开始测评</span>
          <div class="button-shine"></div>
          <svg class="button-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="trust-indicator">
          <div class="trust-dot"></div>
          <span>已有 <strong>12,458</strong> 位孩子完成测评</span>
        </div>
      </div>
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
  trackQuizStart()
  quizStore.resetQuiz()
  router.push('/quiz')
}
</script>

<style scoped>
.home-page {
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
    linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridScroll 20s linear infinite;
}

@keyframes gridScroll {
  0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
  100% { transform: perspective(500px) rotateX(60deg) translateY(60px); }
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #FF6B35 0%, transparent 70%);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #6366F1 0%, transparent 70%);
  bottom: 20%;
  left: -50px;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, #06B6D4 0%, transparent 70%);
  top: 40%;
  right: 10%;
  animation-delay: 4s;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
  }
}

.floating-shape {
  position: absolute;
  border: 2px solid;
  border-radius: 20px;
  opacity: 0.1;
  animation: shapeFloat 12s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  border-color: #FF6B35;
  top: 15%;
  left: 10%;
  animation-delay: 0s;
  transform: rotate(45deg);
}

.shape-2 {
  width: 60px;
  height: 60px;
  border-color: #6366F1;
  top: 60%;
  right: 15%;
  animation-delay: 4s;
  border-radius: 50%;
}

.shape-3 {
  width: 100px;
  height: 100px;
  border-color: #06B6D4;
  bottom: 10%;
  left: 20%;
  animation-delay: 8s;
  transform: rotate(30deg);
}

@keyframes shapeFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(var(--rotation, 0deg));
  }
  50% {
    transform: translate(20px, -40px) rotate(calc(var(--rotation, 0deg) + 180deg));
  }
}

/* 内容区域 */
.content {
  position: relative;
  z-index: 1;
  padding: var(--space-xl) var(--space-md) var(--space-2xl);
  max-width: 480px;
  margin: 0 auto;
}

/* 顶部 Logo */
.top-bar {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-3xl);
  animation: fadeInDown 0.8s ease;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
  letter-spacing: 0.5px;
}

/* 主视觉区域 */
.hero-section {
  text-align: center;
  margin-bottom: var(--space-2xl);
  animation: slideInUp 0.8s ease;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: rgba(255, 107, 53, 0.15);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-lg);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--brand-primary);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.hero-badge {
  font-size: 13px;
  font-weight: 500;
  color: var(--brand-primary-light);
}

.hero-title {
  margin-bottom: var(--space-lg);
}

.title-line {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-inverse);
  line-height: 1.3;
  margin-bottom: var(--space-xs);
}

.title-highlight {
  display: block;
  font-size: 42px;
  font-weight: 800;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 30px rgba(255, 107, 53, 0.4));
}

.hero-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
}

/* 核心价值 */
.value-props {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
}

.value-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
  animation: slideInUp 0.8s ease backwards;
}

.value-card:nth-child(1) { animation-delay: 0.1s; }
.value-card:nth-child(2) { animation-delay: 0.2s; }
.value-card:nth-child(3) { animation-delay: 0.3s; }

.value-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 107, 53, 0.3);
  box-shadow: 0 10px 40px rgba(255, 107, 53, 0.2);
}

.value-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
}

.value-content {
  flex: 1;
}

.value-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-inverse);
  margin-bottom: var(--space-xs);
}

.value-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

/* 用户评价 */
.testimonials {
  margin-bottom: var(--space-2xl);
}

.testimonial-card {
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  animation: slideInUp 0.8s ease 0.4s backwards;
}

.testimonial-content {
  position: relative;
  padding-left: var(--space-xl);
  margin-bottom: var(--space-md);
}

.quote-mark {
  position: absolute;
  left: 0;
  top: -8px;
  font-size: 40px;
  font-weight: 700;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.quote-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.author-avatar {
  font-size: 28px;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
}

.author-detail {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* CTA 区域 */
.cta-section {
  text-align: center;
  animation: fadeIn 0.8s ease 0.6s backwards;
}

.cta-button {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-lg) var(--space-xl);
  background: var(--gradient-brand);
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  overflow: hidden;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-glow);
}

.button-text {
  position: relative;
  z-index: 1;
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 50px rgba(255, 107, 53, 0.5);
}

.cta-button:hover .button-shine {
  left: 100%;
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

.trust-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
  padding: var(--space-sm) var(--space-md);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-full);
}

.trust-dot {
  width: 8px;
  height: 8px;
  background: #10B981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.trust-indicator span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.trust-indicator strong {
  color: var(--brand-primary-light);
  font-weight: 600;
}

/* 动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
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

/* 响应式 */
@media (max-width: 480px) {
  .content {
    padding: var(--space-lg) var(--space-md) var(--space-2xl);
  }

  .title-line {
    font-size: 26px;
  }

  .title-highlight {
    font-size: 34px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .value-card {
    padding: var(--space-md);
  }

  .value-icon {
    width: 42px;
    height: 42px;
  }

  .value-title {
    font-size: 15px;
  }

  .value-desc {
    font-size: 12px;
  }
}
</style>
