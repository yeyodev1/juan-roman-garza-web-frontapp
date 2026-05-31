<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const progress = ref(0);
const isLoaded = ref(false);

const loadingPhrases = [
  "SINTETIZANDO DATOS BIO-REGENERATIVOS...",
  "CALIBRANDO PROTOCOLO DE LONGEVIDAD...",
  "PREPARANDO TRATAMIENTO DE REJUVENECIMIENTO...",
  "OPTIMIZANDO ARQUITECTURA CELULAR..."
];
const currentPhrase = ref(loadingPhrases[0]);

onMounted(() => {
  // Prevent scrolling while loading
  document.body.style.overflow = 'hidden';

  const tl = gsap.timeline({
    onComplete: () => {
      // Once progress is 100%, animate out
      const exitTl = gsap.timeline({
        onComplete: () => {
          isLoaded.value = true;
          document.body.style.overflow = ''; // Restore scrolling
        }
      });

      // Fade out content first
      exitTl.to('.loader-content', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.in'
      });

      // Slide the entire preloader up like a curtain
      exitTl.to('.preloader-container', {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut'
      }, '-=0.4');
    }
  });

  // Animate the progress counter and bar
  tl.to(progress, {
    value: 100,
    duration: 3.5, // Slightly longer load time to read the premium texts
    ease: 'power2.inOut',
    onUpdate: () => {
      const p = Math.round(progress.value);
      progress.value = p;
      
      if (p < 25) currentPhrase.value = loadingPhrases[0];
      else if (p < 55) currentPhrase.value = loadingPhrases[1];
      else if (p < 85) currentPhrase.value = loadingPhrases[2];
      else currentPhrase.value = loadingPhrases[3];
    }
  });
});
</script>

<template>
  <div v-if="!isLoaded" class="preloader-container">
    <div class="loader-content">
      
      <div class="loader-text-wrapper">
        <span class="loader-text monogram">JRG</span>
        <span class="loader-text name">JUAN ROMÁN GARZA</span>
      </div>
      
      <div class="loader-progress-wrapper">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-footer">
          <span class="loading-label">{{ currentPhrase }}</span>
          <span class="loader-progress">{{ progress }}%</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader-container {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: #050505; // Deep dark elite theme
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  will-change: transform;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  width: 100%;
}

.loader-text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loader-text {
  font-family: var(--font-principal);
  font-weight: 800;
  text-transform: uppercase;
}

.monogram {
  font-size: 3rem;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.name {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.3em;
}

.loader-progress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  padding: 0 2rem;
}

.progress-bar-bg {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--accent-gold);
  transition: width 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.loading-label {
  font-family: var(--font-principal);
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.15em;
}

.loader-progress {
  font-family: var(--font-principal);
  font-size: 1rem;
  font-weight: 800;
  color: var(--accent-gold);
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
}
</style>
