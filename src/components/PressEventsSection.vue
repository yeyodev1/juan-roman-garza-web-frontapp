<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import ForbesHighlight from './ForbesHighlight.vue';
import ConferenceGallery from './ConferenceGallery.vue';
import PanelVideo from './PanelVideo.vue';

onMounted(() => {
  gsap.fromTo('.section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
});
</script>

<template>
  <section id="press" class="press-section section-padding">
    <div class="container press-container">
      <div class="section-header">
        <span class="section-tag">PRENSA Y EVENTOS</span>
        <h2 class="section-title">Presencia Global e Impacto Mediático</h2>
        <div class="accent-line"></div>
      </div>

      <ForbesHighlight />
      <ConferenceGallery />
      <PanelVideo />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.press-section { background-color: var(--bg); transition: background-color 0.3s ease; padding-top: 150px; min-height: 100vh; padding-bottom: 100px; }

.section-header {
  text-align: center; max-width: 900px; margin: 0 auto 6rem;
  display: flex; flex-direction: column; align-items: center;
  
  .section-tag {
    font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
    color: var(--accent-gold); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
    border: 1px solid rgba(212, 175, 55, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
  }
  .section-title { font-size: 3.5rem; color: var(--text); margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; line-height: 1.1; @media (max-width: 768px) { font-size: 2.2rem; } }
  .accent-line { width: 60px; height: 3px; background-color: var(--accent-gold); margin: 0 auto; }
}
</style>
