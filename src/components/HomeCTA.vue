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
    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' } }
  );
  gsap.fromTo('.cta-buttons',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' } }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="cta-section section-padding">
    <div class="container cta-container">
      <div class="cta-content">
        <h2 class="cta-title">¿Quiere conocer cómo la medicina regenerativa, los biomarcadores y la inteligencia clínica pueden ayudarle a tomar mejores decisiones sobre su salud?</h2>

        <div class="cta-buttons">
          <button class="btn-primary" @click="router.push('/contacto')">
            <i class="fa-regular fa-calendar-check"></i> Solicitar Evaluación
          </button>
          <button class="btn-secondary" @click="router.push('/powerhouse')">
            <i class="fa-regular fa-building"></i> Conocer PowerHouse Biotech
          </button>
          <button class="btn-tertiary" @click="router.push('/contacto')">
            <i class="fa-regular fa-clock"></i> Agendar Consulta
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cta-section {
  background: linear-gradient(135deg, var(--bg-offset) 0%, var(--bg) 100%);
  overflow: hidden; position: relative;

  &::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(ellipse at center, rgba(56, 182, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
}

.cta-container {
  display: flex; flex-direction: column; align-items: center;
}

.cta-content {
  display: flex; flex-direction: column; align-items: center; gap: 2rem;
  max-width: 900px; width: 100%;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(56, 182, 255, 0.15);
  border-radius: 24px;
  position: relative;

  &::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
    background: linear-gradient(90deg, var(--color-cyan), var(--color-darkblue));
    border-radius: 24px 24px 0 0;
  }

  @media (max-width: 768px) { padding: 2rem 1.25rem; }
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
  color: var(--color-cyan); letter-spacing: 0.2em; margin-bottom: 1.5rem; margin-top: 1.5rem; display: inline-block;
  border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; padding-top: 0.75rem; border-radius: 50px; text-transform: uppercase;
}

.cta-title {
  font-size: 2.2rem; font-weight: 800; color: var(--text); line-height: 1.4;
  margin-bottom: 3rem; text-transform: uppercase;
  @media (max-width: 768px) { font-size: 1.6rem; }
}

.cta-buttons {
  display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;

  @media (max-width: 600px) { flex-direction: column; width: 100%; max-width: 320px; }
}

.btn-primary {
  background: var(--color-cyan); color: #ffffff; border: none;
  padding: 1.2rem 2.5rem; border-radius: 50px; font-size: 1.05rem; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 25px rgba(56, 182, 255, 0.4);
  &:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(56, 182, 255, 0.6); background: var(--color-darkblue); color: #ffffff; }
}

.btn-secondary {
  background: rgba(20, 20, 20, 0.4); color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px); padding: 1.2rem 2.5rem;
  border-radius: 50px; font-size: 1.05rem; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 0.75rem;
  transition: all 0.3s ease;
  &:hover { background-color: #fff; color: #000; }
}

.btn-tertiary {
  background: transparent; color: var(--text-muted);
  border: 1px solid var(--border); padding: 1.2rem 2.5rem;
  border-radius: 50px; font-size: 1.05rem; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 0.75rem;
  transition: all 0.3s ease;
  &:hover { border-color: var(--color-cyan); color: var(--color-cyan); background: rgba(56, 182, 255, 0.05); }
}
</style>
