<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const philosophyImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg';

const pillars = [
  { text: 'Más preventiva que reactiva.' },
  { text: 'Más personalizada que generalizada.' },
  { text: 'Más humana que burocrática.' },
  { text: 'Más inteligente que improvisada.' },
];

onMounted(() => {
  gsap.fromTo('.philosophy-section',
    { opacity: 0 },
    { opacity: 1, duration: 1,
      scrollTrigger: { trigger: '.philosophy-section', start: 'top 85%' } }
  );
  gsap.fromTo('.philosophy-image',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.philosophy-section', start: 'top 80%' } }
  );
  gsap.fromTo('.philosophy-text',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.philosophy-section', start: 'top 80%' } }
  );
  gsap.fromTo('.pillar-item',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.pillars-list', start: 'top 80%' } }
  );
  gsap.fromTo('.vision-section',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.vision-section', start: 'top 80%' } }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="philosophy-section section-padding">
    <div class="container philosophy-container">
      <div class="philosophy-grid">
        <div class="philosophy-image">
          <img :src="philosophyImage" alt="Juan Román Garza" loading="lazy" />
          <div class="philosophy-image-glow"></div>
        </div>
        <div class="philosophy-text">
          <span class="section-tag">FILOSOFÍA DE TRABAJO</span>
          <h2 class="philosophy-title">Ciencia con propósito humano</h2>
          <div class="accent-line"></div>
          <p class="philosophy-intro">
            Creo que la medicina del futuro será:
          </p>
          <div class="pillars-list">
            <div v-for="(p, idx) in pillars" :key="idx" class="pillar-item">
              <i class="fa-solid fa-check-circle"></i>
              <span>{{ p.text }}</span>
            </div>
          </div>
          <p class="philosophy-closing">
            La tecnología puede potenciar la medicina, pero jamás sustituirá la empatía.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="vision-section section-padding">
    <div class="container vision-container">
      <span class="section-tag">VISIÓN</span>
      <h2 class="vision-title">El futuro que estamos construyendo</h2>
      <div class="accent-line mx-auto"></div>

      <div class="vision-content">
        <img src="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095165/assets-juan/71a520fc-beb0-4eb0-b7b6-3e97fef04266.jpg"
             alt="Juan Román Garza - Visión" class="vision-image" loading="lazy" />
        <div class="vision-text">
          <p>
            Visualizo un mundo donde las personas puedan comprender mejor su cuerpo, anticipar riesgos, tomar decisiones informadas y acceder a herramientas que les permitan vivir más años con salud y dignidad.
          </p>
          <p class="vision-highlight">
            Mi trabajo consiste en ayudar a construir ese futuro.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.philosophy-section {
  background-color: var(--bg-offset); overflow: hidden;
}

.philosophy-container {
  display: flex; flex-direction: column; align-items: center;
}

.philosophy-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; width: 100%; max-width: 1300px; align-items: center;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 3rem; }
  @media (max-width: 480px) { gap: 2rem; }
}

.philosophy-image {
  position: relative; border-radius: 20px; overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.8s ease; }
  &:hover img { transform: scale(1.05); }
  .philosophy-image-glow {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    box-shadow: inset 0 0 60px rgba(56, 182, 255, 0.1);
  }
}

.philosophy-text { display: flex; flex-direction: column; align-items: flex-start; text-align: left;
  @media (max-width: 768px) { padding: 0 0.75rem; }
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
  color: var(--color-cyan); letter-spacing: 0.2em; margin-bottom: 1.5rem; margin-top: 1.5rem; display: inline-block;
  border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; padding-top: 0.75rem; border-radius: 50px; text-transform: uppercase;
}

.philosophy-title {
  font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text);
  text-transform: uppercase; line-height: 1.1;
  @media (max-width: 768px) { font-size: 2.2rem; }
}

.accent-line { width: 80px; height: 3px; background-color: var(--color-cyan); margin-bottom: 2rem; }

.philosophy-intro {
  font-size: 1.3rem; color: var(--text); font-weight: 600; margin-bottom: 2rem;
}

.pillars-list {
  display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem; width: 100%;
}

.pillar-item {
  display: flex; align-items: center; gap: 1rem; font-size: 1.15rem;
  color: var(--text); font-weight: 500; padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border);
  border-radius: 12px; transition: all 0.3s ease;

  i { color: var(--color-cyan); font-size: 1.2rem; }

  &:hover { border-color: var(--color-cyan); background: rgba(56, 182, 255, 0.05); transform: translateX(5px); }
}

.philosophy-closing {
  font-size: 1.2rem; color: var(--color-cyan); font-weight: 700; font-style: italic;
  padding: 1.5rem; border-left: 3px solid var(--color-cyan);
  background: rgba(56, 182, 255, 0.03); border-radius: 0 12px 12px 0;
}

.vision-section {
  background-color: var(--bg); overflow: hidden;
}

.vision-container {
  display: flex; flex-direction: column; align-items: center;
}

.vision-title {
  font-size: 3.5rem; font-weight: 800; color: var(--text); text-transform: uppercase;
  margin-bottom: 1.5rem; line-height: 1.1; text-align: center;
  @media (max-width: 768px) { font-size: 2.2rem; padding: 0 0.75rem; }
}

.mx-auto { margin-left: auto; margin-right: auto; }

.vision-content {
  display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; width: 100%; max-width: 1200px;
  margin-top: 4rem; align-items: center;

  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 2rem; }
  @media (max-width: 480px) { gap: 1.5rem; margin-top: 2rem; }
}

.vision-image {
  width: 100%; border-radius: 20px; object-fit: cover;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  transition: transform 0.8s ease;
  &:hover { transform: scale(1.02); }
}

.vision-text {
  @media (max-width: 768px) { padding: 0 0.75rem; }
  p {
    font-size: 1.2rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;
  }
  .vision-highlight {
    font-size: 1.5rem; color: var(--text); font-weight: 700;
    border-left: 3px solid var(--color-cyan); padding-left: 1.5rem;
  }
}
</style>
