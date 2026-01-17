<template>
  <div class="radar-chart">
    <svg :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size">
      <!-- 背景网格 -->
      <g v-for="level in 5" :key="level">
        <polygon
          :points="getPolygonPoints(level * 0.2)"
          :fill="level === 5 ? 'rgba(102, 126, 234, 0.1)' : 'none'"
          :stroke="'rgba(102, 126, 234, 0.2)'"
          stroke-width="1"
        />
      </g>

      <!-- 轴线 -->
      <g v-for="(axis, index) in axes" :key="index">
        <line
          :x1="center"
          :y1="center"
          :x2="getAxisPoint(index).x"
          :y2="getAxisPoint(index).y"
          stroke="rgba(102, 126, 234, 0.2)"
          stroke-width="1"
        />
      </g>

      <!-- 数据区域 -->
      <polygon
        :points="getDataPoints()"
        :fill="`${color}33`"
        :stroke="color"
        stroke-width="2"
        class="data-polygon"
      />

      <!-- 数据点 -->
      <g v-for="(axis, index) in axes" :key="`point-${index}`">
        <circle
          :cx="getDataPoint(index).x"
          :cy="getDataPoint(index).y"
          r="6"
          :fill="color"
          class="data-point"
        />
      </g>

      <!-- 标签 -->
      <g v-for="(axis, index) in axes" :key="`label-${index}`">
        <text
          :x="getLabelPoint(index).x"
          :y="getLabelPoint(index).y"
          text-anchor="middle"
          :class="['label', `label-${index}`]"
          fill="#374151"
        >
          {{ axis }}
        </text>
      </g>
    </svg>

    <!-- 图例 -->
    <div class="legend">
      <div v-for="(axis, index) in axes" :key="`legend-${index}`" class="legend-item">
        <span class="legend-label">{{ axis }}</span>
        <span class="legend-value" :style="{ color }">
          {{ scores[dimensionKeys[index]] }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scores: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    default: '#667eea'
  }
})

const size = 350
const center = size / 2
const radius = size * 0.35

const axes = ['逻辑推理', '创意创造', '空间想象', '专注坚持', '协作沟通', '观察探索']
const dimensionKeys = ['logic', 'creativity', 'space', 'focus', 'collaboration', 'exploration']
const angles = axes.map((_, i) => (i * 60 - 90) * (Math.PI / 180))

const getPolygonPoints = (scale) => {
  return angles
    .map((angle, i) => {
      const x = center + radius * scale * Math.cos(angle)
      const y = center + radius * scale * Math.sin(angle)
      return `${x},${y}`
    })
    .join(' ')
}

const getAxisPoint = (index) => {
  return {
    x: center + radius * Math.cos(angles[index]),
    y: center + radius * Math.sin(angles[index])
  }
}

const getDataPoint = (index) => {
  const score = props.scores[dimensionKeys[index]] / 100
  return {
    x: center + radius * score * Math.cos(angles[index]),
    y: center + radius * score * Math.sin(angles[index])
  }
}

const getDataPoints = () => {
  return angles
    .map((_, i) => {
      const point = getDataPoint(i)
      return `${point.x},${point.y}`
    })
    .join(' ')
}

const getLabelPoint = (index) => {
  const labelRadius = radius + 30
  return {
    x: center + labelRadius * Math.cos(angles[index]),
    y: center + labelRadius * Math.sin(angles[index]) + 5
  }
}
</script>

<style scoped>
.radar-chart {
  width: 100%;
  height: 100%;
}

.data-polygon {
  animation: fadeIn 0.8s ease;
}

.data-point {
  animation: scaleIn 0.5s ease backwards;
}

.data-point:nth-child(1) { animation-delay: 0.1s; }
.data-point:nth-child(2) { animation-delay: 0.2s; }
.data-point:nth-child(3) { animation-delay: 0.3s; }
.data-point:nth-child(4) { animation-delay: 0.4s; }
.data-point:nth-child(5) { animation-delay: 0.5s; }
.data-point:nth-child(6) { animation-delay: 0.6s; }

.label {
  font-size: 12px;
  font-weight: 500;
}

.legend {
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 10px;
}

.legend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  padding: 8px 12px;
  border-radius: 8px;
}

.legend-label {
  font-size: 12px;
  color: #6b7280;
}

.legend-value {
  font-size: 14px;
  font-weight: 600;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    transform-origin: center;
  }
  to {
    transform: scale(1);
    transform-origin: center;
  }
}
</style>
