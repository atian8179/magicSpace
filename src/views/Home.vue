<template>
  <div class="home-page">
    <!-- 噪点纹理 -->
    <div class="noise-overlay"></div>

    <!-- 几何装饰 -->
    <div class="geo-decoration">
      <div class="geo-circle gc-1"></div>
      <div class="geo-circle gc-2"></div>
      <div class="geo-circle gc-3"></div>
      <div class="geo-square gs-1"></div>
      <div class="geo-square gs-2"></div>
      <div class="geo-triangle gt-1"></div>
    </div>

    <!-- 主内容 -->
    <div class="container">
      <!-- 顶部 Logo -->
      <header class="header" style="animation: slideDown 0.8s var(--easing-smooth) backwards;">
        <div class="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="12" fill="url(#logoGrad)"/>
            <path d="M20 10L20 30M20 10L14 16M20 10L26 16" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stop-color="#FF6B35"/>
                <stop offset="100%" stop-color="#FF8C5A"/>
              </linearGradient>
            </defs>
          </svg>
          <span class="logo-text">核桃编程</span>
        </div>
      </header>

      <!-- 主标题区 -->
      <section class="hero">
        <div class="hero-badge" style="animation: spring-in 0.8s var(--easing-spring) 0.1s backwards;">
          <span class="badge-dot"></span>
          AI驱动的天赋测评
        </div>

        <h1 class="hero-title">
          <span class="title-line" style="animation: slideUp 0.8s var(--easing-smooth) 0.2s backwards;">
            发现孩子的
          </span>
          <span class="title-highlight" style="animation: slideUp 0.8s var(--easing-smooth) 0.3s backwards;">
            独特天赋
          </span>
        </h1>

        <p class="hero-subtitle" style="animation: slideUp 0.8s var(--easing-smooth) 0.4s backwards;">
          3分钟精准定位编程潜能<br>
          为每个孩子定制专属成长路径
        </p>

        <button class="cta-button" @click="startQuiz" style="animation: spring-in 0.8s var(--easing-spring) 0.5s backwards;">
          <span>开始测评</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </section>

      <!-- 特性网格 -->
      <section class="features-grid">
        <div class="feature-card" style="animation: slideUp 0.6s var(--easing-smooth) 0.6s backwards;">
          <div class="feature-icon">🎯</div>
          <h3>精准定位</h3>
          <p>6大维度科学评估</p>
        </div>

        <div class="feature-card" style="animation: slideUp 0.6s var(--easing-smooth) 0.7s backwards;">
          <div class="feature-icon">📊</div>
          <h3>能力雷达图</h3>
          <p>可视化天赋分布</p>
        </div>

        <div class="feature-card" style="animation: slideUp 0.6s var(--easing-smooth) 0.8s backwards;">
          <div class="feature-icon">💡</div>
          <h3>个性方案</h3>
          <p>定制学习建议</p>
        </div>
      </section>

      <!-- 社会证明 -->
      <section class="social-proof" style="animation: fadeIn 1s var(--easing-smooth) 1s backwards;">
        <div class="proof-card">
          <div class="proof-avatar">👦</div>
          <p class="proof-text">"测评说我是逻辑探险家，建议学Python。现在我能自己做小程序了！"</p>
          <p class="proof-author">小明 · 11岁</p>
        </div>
      </section>

      <!-- 信任指标 -->
      <div class="trust-metric" style="animation: fadeIn 1s var(--easing-smooth) 1.2s backwards;">
        <span class="metric-dot"></span>
        <span>已有 <strong>12,458</strong> 位孩子完成测评</span>
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
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
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
  width: 120px;
  height: 120px;
  border-color: var(--brand-orange);
  top: 15%;
  right: 10%;
  animation-delay: 0s;
  opacity: 0.15;
}

.gc-2 {
  width: 80px;
  height: 80px;
  border-color: var(--tech-blue);
  top: 60%;
  left: 5%;
  animation-delay: 3s;
  opacity: 0.1;
}

.gc-3 {
  width: 60px;
  height: 60px;
  border-color: var(--accent-lime);
  bottom: 20%;
  right: 20%;
  animation-delay: 6s;
  opacity: 0.12;
}

.geo-square {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid;
  animation: float 15s ease-in-out infinite;
}

.gs-1 {
  border-color: var(--tech-blue);
  top: 25%;
  left: 8%;
  transform: rotate(45deg);
  animation-delay: 2s;
  opacity: 0.1;
}

.gs-2 {
  border-color: var(--brand-orange);
  bottom: 15%;
  left: 15%;
  transform: rotate(45deg);
  animation-delay: 5s;
  opacity: 0.08;
}

.geo-triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 50px solid var(--brand-orange);
  opacity: 0.1;
  animation: float 18s ease-in-out infinite;
}

.gt-1 {
  top: 70%;
  right: 8%;
  animation-delay: 4s;
}

/* 容器 */
.container {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-5) var(--space-16);
}

/* 头部 */
.header {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-16);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--text-primary);
}

/* 主视觉区 */
.hero {
  text-align: center;
  margin-bottom: var(--space-16);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 107, 53, 0.15);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-8);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--brand-orange);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.hero-badge span:last-child {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  color: var(--brand-orange-light);
}

.hero-title {
  margin-bottom: var(--space-6);
}

.title-line {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(32px, 8vw, 48px);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.title-highlight {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(48px, 12vw, 72px);
  font-weight: 800;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.03em;
  filter: drop-shadow(0 0 40px rgba(255, 107, 53, 0.4));
}

.hero-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-10);
}

/* CTA 按钮 */
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-10);
  background: var(--gradient-brand);
  border: none;
  border-radius: var(--radius-xl);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-spring);
  box-shadow: var(--shadow-glow-orange);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform var(--duration-slow) var(--easing-smooth);
}

.cta-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 60px rgba(255, 107, 53, 0.5);
}

.cta-button:hover::before {
  transform: translateX(100%);
}

.cta-button:active {
  transform: translateY(-1px) scale(0.98);
}

/* 特性网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.feature-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  text-align: center;
  transition: all var(--duration-base) var(--easing-smooth);
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 107, 53, 0.3);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: var(--space-3);
}

.feature-card h3 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.feature-card p {
  font-size: 13px;
  color: var(--text-tertiary);
}

/* 社会证明 */
.social-proof {
  margin-bottom: var(--space-12);
}

.proof-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.proof-avatar {
  font-size: 40px;
  margin-bottom: var(--space-3);
}

.proof-text {
  font-size: 14px;
  color: var(--text-secondary);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: var(--space-3);
}

.proof-author {
  font-size: 13px;
  color: var(--text-tertiary);
}

/* 信任指标 */
.trust-metric {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-full);
}

.metric-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-lime);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.trust-metric span:last-child {
  font-size: 13px;
  color: var(--text-tertiary);
}

.trust-metric strong {
  color: var(--brand-orange-light);
  font-weight: 700;
}

/* 响应式 */
@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: var(--space-5) var(--space-4) var(--space-12);
  }
}
</style>
