<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

onMounted(() => {
  gsap.fromTo('.cta-section',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }
    }
  );
  gsap.fromTo('.cta-buttons',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }
    }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="cta-section section-padding">
    <div class="cta-background-glow"></div>
    <div class="container cta-container">
      <div class="cta-content">
        <span class="cta-badge"><i class="fa-solid fa-bolt"></i> EMPIECE HOY</span>
        <h2 class="cta-title">¿Quiere conocer cómo la medicina regenerativa y la inteligencia clínica pueden transformar su salud?</h2>
        <p class="cta-subtitle">Descubra si una Evaluación de Capacidad Regenerativa podría ayudarle a comprender mejor el estado actual de su salud.</p>
        
        <div class="cta-buttons">
          <button class="btn-primary pulse-glow" @click="router.push('/contacto')">
            <i class="fa-regular fa-calendar-check"></i> Iniciar mi Evaluación
          </button>
          <button class="btn-secondary glass-btn" @click="router.push('/powerhouse')">
            <i class="fa-regular fa-building"></i> Explorar PowerHouse Biotech
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cta-section {
  background: var(--bg-offset);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-background-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(56, 182, 255, 0.15) 0%, rgba(56, 182, 255, 0) 70%);
  z-index: 0;
  pointer-events: none;
  animation: pulse-bg 8s infinite alternate ease-in-out;
}

@keyframes pulse-bg {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 1;
  }
}

.cta-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
}

.cta-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;
  padding: 5rem 3rem;
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  position: relative;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(56, 182, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--color-cyan), transparent);
    border-radius: 24px;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
}

.cta-badge {
  font-family: var(--font-principal);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-cyan);
  letter-spacing: 0.2em;
  padding: 0.6rem 1.5rem;
  background: rgba(56, 182, 255, 0.1);
  border: 1px solid rgba(56, 182, 255, 0.3);
  border-radius: 50px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.cta-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

.cta-subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
  max-width: 650px;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
}

.btn-primary {
  background: var(--color-cyan);
  color: #000000;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 10px 30px rgba(56, 182, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &.pulse-glow {
    animation: button-pulse 2s infinite;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(56, 182, 255, 0.6);
    background: #ffffff;
  }
}

@keyframes button-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(56, 182, 255, 0.7);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(56, 182, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(56, 182, 255, 0);
  }
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
  }
}
</style>
