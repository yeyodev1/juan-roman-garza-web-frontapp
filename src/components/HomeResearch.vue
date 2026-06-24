<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: '+', label: 'Años de experiencia', prefix: '' },
  { value: 15, suffix: 'K+', label: 'Pacientes acompañados', prefix: '' },
  { value: 100, suffix: 'K+', label: 'Estudios clínicos analizados', prefix: '' },
];

onMounted(() => {
  gsap.fromTo('.research-header',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.research-section', start: 'top 85%' }
    }
  );
  gsap.fromTo('.research-item',
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.research-grid', start: 'top 75%' }
    }
  );
  gsap.fromTo('.impact-header',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.impact-section', start: 'top 85%' }
    }
  );
  gsap.fromTo('.impact-stat',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.impact-stats', start: 'top 75%' }
    }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>

  <section class="impact-section section-padding">
    <div class="container impact-container">
      <div class="impact-header">
        <span class="section-tag">IMPACTO Y EXPERIENCIA</span>
        <h2 class="impact-title">Más de una década impulsando innovación en salud</h2>
      </div>

      <div class="impact-stats">
        <div v-for="(stat, idx) in stats" :key="idx" class="impact-stat">
          <span class="stat-number">{{ stat.prefix }}{{ stat.value }}{{ stat.suffix }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <p class="impact-footnote">
        Miles de horas dedicadas al estudio de la longevidad, medicina regenerativa y salud personalizada.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.research-section {
  background-color: var(--bg-offset);
  overflow: hidden;
}

.research-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
}

.research-header {
  text-align: center;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    margin-bottom: 3rem;
  }
}

.section-tag {
  font-family: var(--font-principal);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-cyan);
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  display: inline-block;
  border: 1px solid rgba(56, 182, 255, 0.4);
  padding: 0.5rem 1.5rem;
  padding-top: 0.75rem;
  border-radius: 50px;
  text-transform: uppercase;
}

.research-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
}

.accent-line {
  width: 80px;
  height: 3px;
  background-color: var(--color-cyan);
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.research-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  transition: all 0.4s ease;
  cursor: default;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-cyan);
    box-shadow: 0 15px 35px rgba(56, 182, 255, 0.15);

    .research-icon-circle {
      background: var(--color-cyan);
      color: #000;
      transform: scale(1.1) rotate(10deg);
    }
  }
}

.research-icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--color-cyan);
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
}

.research-item-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.impact-section {
  background-color: var(--bg);
  overflow: hidden;
}

.impact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.impact-header {
  text-align: center;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    padding-top: 1rem;
    margin-bottom: 3rem;
  }
}

.impact-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
}

.impact-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 100%;
  max-width: 1100px;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
}

.impact-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--color-cyan), var(--color-darkblue));
  }
}

.stat-number {
  font-family: var(--font-principal);
  font-size: 5rem;
  font-weight: 800;
  color: var(--color-cyan);
  line-height: 1;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
}

.stat-label {
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.impact-footnote {
  margin-top: 3rem;
  font-size: 1.15rem;
  color: var(--text-muted);
  text-align: center;
  max-width: 700px;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
}
</style>
