<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gallerySection = ref<HTMLElement | null>(null);
const horizontalContainer = ref<HTMLElement | null>(null);

const galleryPhotos = [
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095162/assets-juan/3899b4aa-2b3b-43ec-94c7-9fda3dba6209.jpg',
    title: 'Trayectoria Ejecutiva',
    category: 'BIOGRAFÍA',
    position: 'top'
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095161/assets-juan/2a75d856-0b98-440f-8187-df8df9a08112.jpg',
    title: 'Vinculación Tecnológica',
    category: 'SUMMIT',
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095175/assets-juan/e218f195-9aeb-4e69-a502-38a0cc524535.jpg',
    title: 'Presencia Internacional',
    category: 'MIAMI',
    position: 'top'
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095174/assets-juan/db808425-b579-4ae3-bca6-1cb1cc73fa7d.jpg',
    title: 'Visión Estratégica',
    category: 'STUDIO',
  }
];

onMounted(() => {
  const section = gallerySection.value;
  const container = horizontalContainer.value;

  if (!section || !container) return;

  // Calculate the total horizontal scroll distance needed
  const getScrollAmount = () => {
    const containerWidth = container.scrollWidth;
    return -(containerWidth - window.innerWidth);
  };

  // Horizontal Scroll Tween
  const tween = gsap.to(container, {
    x: getScrollAmount,
    ease: "none"
  });

  // Pin the section and scrub the horizontal tween
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1, // Smooth scrubbing
    invalidateOnRefresh: true // Recalculate on window resize
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="home-gallery" ref="gallerySection">
    
    <div class="gallery-header-wrapper">
      <div class="container gallery-container">
        <div class="gallery-header">
          <span class="section-tag">GALERÍA DE MARCA</span>
          <h2 class="section-title text-center">Presencia y Liderazgo</h2>
          <div class="accent-line"></div>
        </div>
      </div>
    </div>

    <!-- Horizontal scroll track -->
    <div class="horizontal-scroll-wrapper">
      <div class="horizontal-container" ref="horizontalContainer">
        
        <!-- Intro text card as the first item -->
        <div class="gallery-item-horizontal intro-item">
          <p class="gallery-subtitle">
            Una trayectoria marcada por la innovación en salud, la articulación de datos biotecnológicos y el posicionamiento en los foros empresariales más relevantes a nivel mundial.
          </p>
        </div>

        <!-- Photo items -->
        <div v-for="(photo, idx) in galleryPhotos" :key="idx" class="gallery-item-horizontal photo-item">
          <div class="image-wrapper">
            <img 
              :src="photo.url" 
              :alt="photo.title" 
              class="legacy-img" 
              :style="{ objectPosition: photo.position || 'center' }"
              loading="lazy" 
            />
            <div class="hover-tint"></div>
            <div class="item-meta">
              <span class="item-cat">{{ photo.category }}</span>
              <h3 class="item-title">{{ photo.title }}</h3>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home-gallery { 
  background-color: var(--bg); 
  width: 100vw; 
  height: 100vh; // Fill the screen for pinning
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden; // Hide the overflowing horizontal items
  position: relative;
}

.gallery-header-wrapper {
  margin-bottom: 3rem;
  padding: 0 2rem;
}

.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Align left to fit the horizontal flow
}

.gallery-header {
  text-align: left; max-width: 800px;
  display: flex; flex-direction: column; align-items: flex-start;
  
  .section-tag {
    font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
    color: var(--color-cyan); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
    border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
  }
  .section-title { font-size: 4rem; color: var(--text); margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; line-height: 1.1; @media (max-width: 768px) { font-size: 2.5rem; } }
  .accent-line { width: 80px; height: 3px; background-color: var(--color-cyan); }
}

.horizontal-scroll-wrapper {
  width: 100%;
  overflow: visible;
}

.horizontal-container {
  display: flex;
  gap: 3rem;
  padding: 0 5vw;
  width: max-content;
  flex-wrap: nowrap;
  align-items: center;
}

.gallery-item-horizontal {
  position: relative; 
  border-radius: 16px; 
  overflow: hidden;
  flex-shrink: 0;
  
  &.intro-item {
    width: 30vw;
    min-width: 350px;
    padding-right: 3rem;
    
    .gallery-subtitle { 
      font-size: 1.5rem; color: var(--text-muted); line-height: 1.6; font-weight: 300; 
      @media (max-width: 768px) { font-size: 1.25rem; }
    }
  }

  &.photo-item {
    width: 50vw; 
    height: 60vh;
    max-width: 800px;
    max-height: 600px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    @media (max-width: 768px) {
      width: 80vw;
      height: 50vh;
    }

    &:hover {
      transform: translateY(-15px);
      .legacy-img { transform: scale(1.08); }
      .hover-tint { opacity: 1; }
      .item-meta { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
  }
}

.image-wrapper {
  position: relative; width: 100%; height: 100%;
  .legacy-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .hover-tint { 
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(10, 10, 10, 0.6); 
    backdrop-filter: blur(5px);
    opacity: 0; transition: opacity 0.5s ease; 
  }
}

.item-meta {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -40%) scale(0.95);
  z-index: 2;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  opacity: 0;
  width: 90%;

  .item-cat { font-family: var(--font-principal); font-size: 0.9rem; font-weight: 800; color: var(--color-cyan); letter-spacing: 0.2em; display: block; margin-bottom: 0.5rem; text-transform: uppercase; }
  .item-title { font-size: 2.5rem; font-weight: 800; color: #ffffff; text-transform: uppercase; line-height: 1.1; text-shadow: 0 10px 20px rgba(0,0,0,0.5); @media (max-width: 768px) { font-size: 1.8rem; } }
}
</style>
