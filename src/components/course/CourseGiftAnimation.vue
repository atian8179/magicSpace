<template>
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
</template>

<style scoped>
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
</style>
