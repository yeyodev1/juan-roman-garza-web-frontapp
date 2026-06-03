<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref<HTMLElement | null>(null);
const scale = ref(0.7);
const borderRadius = ref(24);
const overlayOpacity = ref(0);

const videoUrl = 'https://res.cloudinary.com/drw5sn8qw/video/upload/v1780095169/assets-juan/WhatsApp_Video_2026-05-29_at_12_43_38_PM.mp4';
const videoPoster = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095156/assets-juan/076f4a92-7716-4a09-ab4b-0612fa4c7830.jpg';

function handleScroll() {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const totalScroll = rect.height - window.innerHeight;
  const scrollProgress = -rect.top;

  if (scrollProgress >= 0 && scrollProgress <= totalScroll) {
    const progress = scrollProgress / totalScroll;
    scale.value = 0.7 + progress * 0.3;
    borderRadius.value = Math.max(0, 24 - progress * 24);
    overlayOpacity.value = progress;
  } else if (scrollProgress < 0) {
    scale.value = 0.7;
    borderRadius.value = 24;
    overlayOpacity.value = 0;
  } else {
    scale.value = 1.0;
    borderRadius.value = 0;
    overlayOpacity.value = 1;
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div ref="sectionRef" class="scroll-video-section">
    <div class="sticky-wrapper">
      <!-- Expanding Video Container -->
      <div
        class="video-container"
        :style="{
          transform: `scale(${scale})`,
          borderRadius: `${borderRadius}px`
        }"
      >
        <video
          :src="videoUrl"
          :poster="videoPoster"
          autoplay
          loop
          muted
          playsinline
          class="bg-video"
        ></video>
        
        <!-- Dark Tint & Text Overlays on Scroll -->
        <div class="dark-overlay" :style="{ opacity: overlayOpacity * 0.65 }"></div>
        
        <div class="text-overlay" :style="{ opacity: overlayOpacity }">
          <span class="overlay-tag">TECNOLOGÍA & SALUD</span>
          <h2 class="overlay-title">La Biología del Líder</h2>
          <p class="overlay-desc">
            Revierte el desgaste corporativo y optimiza tu longevidad decisional mediante ciencia de vanguardia.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-video-section {
  position: relative;
  height: 180vh; // Length of scroll track
  background-color: var(--bg);
}

.sticky-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, border-radius;
  transition: max-width 0.1s linear, max-height 0.1s linear;

  // Fluid transition to fullscreen as scale approaches 1
  @media (min-width: 769px) {
    &[style*="scale(1)"] {
      max-width: 100vw;
      max-height: 100vh;
    }
  }
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dark-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--bg);
  z-index: 2;
  pointer-events: none;
}

.text-overlay {
  position: absolute;
  z-index: 3;
  color: #ffffff;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  will-change: opacity;

  .overlay-tag {
    font-family: var(--font-principal);
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-cyan);
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
  }

  .overlay-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: #ffffff;
    @media (max-width: 768px) { font-size: 2rem; }
  }

  .overlay-desc {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.9;
    color: #f3f5f8;
    @media (max-width: 768px) { font-size: 0.95rem; }
  }
}
</style>
