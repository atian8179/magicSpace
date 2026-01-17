<template>
  <div class="geo-decoration">
    <div
      v-for="(shape, index) in shapes"
      :key="index"
      :class="shape.class"
      :style="shape.style"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'minimal', 'dense'].includes(value)
  }
})

const shapeConfigs = {
  default: [
    { type: 'circle', size: 100, color: 'var(--brand-orange)', top: '10%', right: '5%', delay: '0s', opacity: 0.12 },
    { type: 'circle', size: 70, color: 'var(--tech-blue)', top: '45%', left: '3%', delay: '4s', opacity: 0.08 },
    { type: 'square', size: 50, color: 'var(--tech-blue)', bottom: '25%', right: '8%', delay: '2s', opacity: 0.1 },
    { type: 'triangle', size: 45, color: 'var(--brand-orange)', bottom: '15%', left: '10%', delay: '3s', opacity: 0.08 }
  ],
  minimal: [
    { type: 'circle', size: 80, color: 'var(--brand-orange)', top: '15%', right: '8%', delay: '0s', opacity: 0.1 },
    { type: 'circle', size: 60, color: 'var(--tech-blue)', bottom: '30%', left: '5%', delay: '3s', opacity: 0.08 }
  ],
  dense: [
    { type: 'circle', size: 120, color: 'var(--brand-orange)', top: '5%', right: '3%', delay: '0s', opacity: 0.12 },
    { type: 'circle', size: 80, color: 'var(--tech-blue)', top: '40%', left: '2%', delay: '4s', opacity: 0.08 },
    { type: 'circle', size: 60, color: 'var(--accent-lime)', top: '70%', right: '15%', delay: '6s', opacity: 0.1 },
    { type: 'square', size: 50, color: 'var(--tech-blue)', top: '25%', left: '8%', delay: '2s', opacity: 0.1 },
    { type: 'square', size: 40, color: 'var(--brand-orange)', bottom: '20%', left: '15%', delay: '5s', opacity: 0.08 },
    { type: 'triangle', size: 45, color: 'var(--brand-orange)', top: '75%', right: '8%', delay: '3s', opacity: 0.08 }
  ]
}

const shapes = computed(() => {
  const config = shapeConfigs[props.variant] || shapeConfigs.default
  return config.map((shape, index) => {
    const baseClass = `geo-shape geo-${shape.type}`
    return {
      class: `${baseClass} gs-${index}`,
      style: {
        ...getPositionStyle(shape),
        '--shape-color': shape.color,
        '--shape-opacity': shape.opacity,
        '--animation-delay': shape.delay
      }
    }
  })
})

function getPositionStyle(shape) {
  const style = {}
  if (shape.top) style.top = shape.top
  if (shape.bottom) style.bottom = shape.bottom
  if (shape.left) style.left = shape.left
  if (shape.right) style.right = shape.right

  if (shape.type === 'circle') {
    style.width = `${shape.size}px`
    style.height = `${shape.size}px`
  } else if (shape.type === 'square') {
    style.width = `${shape.size}px`
    style.height = `${shape.size}px`
  }
  return style
}
</script>

<style scoped>
.geo-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.geo-shape {
  position: absolute;
  animation: float 12s ease-in-out infinite;
  animation-delay: var(--animation-delay);
}

.geo-circle {
  border-radius: 50%;
  border: 2px solid var(--shape-color);
  opacity: var(--shape-opacity);
}

.geo-square {
  border: 2px solid var(--shape-color);
  opacity: var(--shape-opacity);
  transform: rotate(45deg);
}

.geo-triangle {
  width: 0 !important;
  height: 0 !important;
  border-left: calc(var(--size, 45px) * 1) solid transparent;
  border-right: calc(var(--size, 45px) * 1) solid transparent;
  border-bottom: calc(var(--size, 45px) * 1.8) solid var(--shape-color);
  opacity: var(--shape-opacity);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(3deg);
  }
}
</style>
