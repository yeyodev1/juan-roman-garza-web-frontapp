<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryPhotos = [
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095162/assets-juan/3899b4aa-2b3b-43ec-94c7-9fda3dba6209.jpg',
    title: 'Trayectoria Ejecutiva',
    category: 'BIOGRAFÍA',
    class: 'photo-portrait'
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095161/assets-juan/2a75d856-0b98-440f-8187-df8df9a08112.jpg',
    title: 'Vinculación Tecnológica',
    category: 'SUMMIT',
    class: 'photo-landscape'
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095175/assets-juan/e218f195-9aeb-4e69-a502-38a0cc524535.jpg',
    title: 'Presencia Internacional',
    category: 'MIAMI',
    class: 'photo-tall'
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095174/assets-juan/db808425-b579-4ae3-bca6-1cb1cc73fa7d.jpg',
    title: 'Visión Estratégica',
    category: 'STUDIO',
    class: 'photo-square'
  }
];

onMounted(() => {
  // Gallery Header Animation
  gsap.fromTo('.gallery-header',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.home-gallery',
        start: 'top 80%',
      }
    }
  );

  // Gallery Items Staggered Entrance
  gsap.fromTo('.gallery-item',
    { opacity: 0, y: 100, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.asymmetric-grid',
        start: 'top 75%',
      }
    }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="home-gallery section-padding">
    <div class="container gallery-container">
      <div class="gallery-header">
        <span class="section-tag">GALERÍA DE MARCA</span>
        <h2 class="section-title text-center">Presencia y Liderazgo</h2>
        <div class="accent-line"></div>
        <p class="gallery-subtitle text-center">
          Una trayectoria marcada por la innovación en salud, la articulación de datos biotecnológicos y el posicionamiento en los foros empresariales más relevantes.
        </p>
      </div>

      <!-- Asymmetric grid layout with Centered content -->
      <div class="asymmetric-grid">
        <div v-for="(photo, idx) in galleryPhotos" :key="idx" class="gallery-item" :class="photo.class">
          <div class="image-wrapper">
            <img :src="photo.url" :alt="photo.title" class="legacy-img" loading="lazy" />
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
.home-gallery { background-color: var(--bg); transition: background-color 0.3s ease; width: 100%; padding: 120px 0; }

.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center; // strictly centered
}

.gallery-header {
  text-align: center; max-width: 800px; margin-bottom: 6rem;
  display: flex; flex-direction: column; align-items: center;
  
  .section-tag {
    font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
    color: var(--accent-gold); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
    border: 1px solid rgba(229, 213, 181, 0.3); padding: 0.5rem 1.2rem; border-radius: 50px;
  }
  .section-title { font-size: 3.5rem; color: var(--text); margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; @media (max-width: 768px) { font-size: 2.2rem; } }
  .accent-line { width: 60px; height: 2px; background-color: var(--accent-gold); margin: 0 auto 2rem; }
  .gallery-subtitle { font-size: 1.25rem; color: var(--text-muted); line-height: 1.8; }
}

// Asymmetrical Awwwards Grid
.asymmetric-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 992px) { display: flex; flex-direction: column; gap: 2rem; }
}

.gallery-item {
  position: relative; border-radius: 16px; overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;

  &.photo-portrait { grid-column: span 5; aspect-ratio: 3/4; }
  &.photo-landscape { grid-column: span 7; aspect-ratio: 16/10; }
  &.photo-tall { grid-column: span 4; aspect-ratio: 9/16; margin-top: -3rem; @media (max-width: 992px) { margin-top: 0; } }
  &.photo-square { grid-column: span 8; aspect-ratio: 16/9; margin-top: -3rem; @media (max-width: 992px) { margin-top: 0; } }

  &:hover {
    transform: translateY(-10px);
    .legacy-img { transform: scale(1.08); }
    .hover-tint { opacity: 1; }
    .item-meta { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  }
}

.image-wrapper {
  position: relative; width: 100%; height: 100%;
  .legacy-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .hover-tint { 
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(10, 10, 10, 0.7); // Dark theme tint instead of blue
    backdrop-filter: blur(4px);
    opacity: 0; transition: opacity 0.5s ease; 
  }
}

.item-meta {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -40%) scale(0.95);
  z-index: 2;
  text-align: center; // Centered strictly
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  opacity: 0;
  width: 90%;

  .item-cat { font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700; color: var(--accent-gold); letter-spacing: 0.2em; display: block; margin-bottom: 0.5rem; }
  .item-title { font-size: 1.8rem; font-weight: 800; color: #ffffff; text-transform: uppercase; line-height: 1.2; text-shadow: 0 5px 15px rgba(0,0,0,0.5); }
}
</style>
