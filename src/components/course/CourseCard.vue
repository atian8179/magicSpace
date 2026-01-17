<template>
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

    <h2 class="course-title">{{ title }}</h2>

    <!-- 天赋匹配 -->
    <div class="talent-match" :style="{ '--talent-color': talentType.color }">
      <div class="match-icon">{{ talentType.emoji }}</div>
      <div class="match-info">
        <div class="match-label">适合你的天赋</div>
        <div class="match-name">{{ talentType.name }}</div>
      </div>
      <div class="match-arrow">→</div>
    </div>

    <!-- 课程亮点 -->
    <div class="features-section">
      <h4 class="features-title">课程亮点</h4>
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-item"
        >
          <div class="feature-bg" :style="{ '--feature-color': feature.color }"></div>
          <div class="feature-icon">{{ feature.icon }}</div>
          <span class="feature-text">{{ feature.text }}</span>
        </div>
      </div>
    </div>

    <!-- 课程包含 -->
    <div class="includes-section">
      <h4 class="includes-title">课包包含</h4>
      <div class="includes-grid">
        <div v-for="(item, index) in includes" :key="index" class="include-item">
          <div class="include-check">✓</div>
          <span>{{ item }}</span>
        </div>
      </div>
    </div>

    <!-- 价格 -->
    <div class="price-wrapper">
      <div class="price-main">
        <span class="price-currency">¥</span>
        <span class="price-amount">{{ price.current }}</span>
      </div>
      <div class="price-original">
        <span>原价</span>
        <span class="price-strike">¥{{ price.original }}</span>
      </div>
      <div class="price-save">
        <span>省 ¥{{ price.original - price.current }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '核桃编程体验课'
  },
  talentType: {
    type: Object,
    default: () => ({ emoji: '✨', name: '创意少年', color: '#FF6B35' })
  },
  features: {
    type: Array,
    default: () => [
      { icon: '👨‍🏫', text: '1对1名师指导', color: '#3B82F6' },
      { icon: '🎮', text: '趣味游戏化学习', color: '#84CC16' },
      { icon: '🏆', text: '完成作品带回家', color: '#F59E0B' }
    ]
  },
  includes: {
    type: Array,
    default: () => [
      '3节直播互动课',
      '个性化学习报告',
      '专属学习社群',
      '编程学习大礼包'
    ]
  },
  price: {
    type: Object,
    default: () => ({ current: 9.9, original: 299 })
  }
})
</script>

<style scoped>
.course-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  margin-bottom: var(--space-5);
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

  .price-amount {
    font-size: 28px;
  }
}
</style>
