<script setup lang="ts">
import ForbesHighlight from './ForbesHighlight.vue';
import ConferenceGallery from './ConferenceGallery.vue';
import PanelVideo from './PanelVideo.vue';
</script>

<template>
  <section id="press" class="press-section section-padding">
    <div class="container">
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
.press-section { background-color: var(--bg-offset); transition: background-color 0.3s ease; }

.section-header {
  text-align: center; max-width: 800px; margin: 0 auto 6rem;
  
  .section-tag {
    font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
    color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; display: inline-block;
  }
  .section-title { font-size: 2.5rem; color: var(--text); margin-bottom: 1.5rem; @media (max-width: 768px) { font-size: 1.8rem; } }
  .accent-line { width: 55px; height: 3px; background-color: var(--accent-gold); margin: 0 auto; }
}
</style>
