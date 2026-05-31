<script setup lang="ts">
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
</script>

<template>
  <section class="home-gallery section-padding">
    <div class="container">
      <div class="gallery-header">
        <span class="section-tag">GALERÍA DE MARCA</span>
        <h2 class="section-title text-center">Presencia y Liderazgo</h2>
        <div class="accent-line"></div>
        <p class="gallery-subtitle text-center">
          Una trayectoria marcada por la innovación en salud, la articulación de datos biotecnológicos y el posicionamiento en los foros empresariales más relevantes.
        </p>
      </div>

      <!-- Asymmetric grid layout -->
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
.home-gallery { background-color: var(--bg); transition: background-color 0.3s ease; width: 100%; }

.gallery-header {
  text-align: center; max-width: 800px; margin-bottom: 5rem;
  .section-tag {
    font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
    color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; display: inline-block;
  }
  .section-title { font-size: 2.5rem; color: var(--text); margin-bottom: 1.5rem; @media (max-width: 768px) { font-size: 1.8rem; } }
  .accent-line { width: 55px; height: 3px; background-color: var(--accent-gold); margin: 0 auto 2rem; }
  .gallery-subtitle { font-size: 1.1rem; color: var(--text-muted); line-height: 1.7; }
}

// Asymmetrical Awwwards Grid
.asymmetric-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2.5rem;
  width: 100%;

  @media (max-width: 992px) { display: flex; flex-direction: column; gap: 2rem; }
}

.gallery-item {
  position: relative; border-radius: 20px; overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &.photo-portrait { grid-column: span 5; aspect-ratio: 3/4; }
  &.photo-landscape { grid-column: span 7; aspect-ratio: 16/10; }
  &.photo-tall { grid-column: span 4; aspect-ratio: 9/16; margin-top: -2rem; @media (max-width: 992px) { margin-top: 0; } }
  &.photo-square { grid-column: span 8; aspect-ratio: 16/9; margin-top: -5rem; @media (max-width: 992px) { margin-top: 0; } }

  &:hover {
    transform: translateY(-8px);
    .legacy-img { transform: scale(1.06); }
    .hover-tint { opacity: 0.5; }
    .item-meta { transform: translateY(0); opacity: 1; }
  }
}

.image-wrapper {
  position: relative; width: 100%; height: 100%;
  .legacy-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .hover-tint { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent 30%, #010d27 100%); opacity: 0.2; transition: opacity 0.4s ease; }
}

.item-meta {
  position: absolute; bottom: 25px; left: 25px; right: 25px; z-index: 2;
  text-align: left; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  .item-cat { font-family: var(--font-principal); font-size: 0.75rem; font-weight: 700; color: var(--accent-gold); letter-spacing: 0.1em; }
  .item-title { font-size: 1.4rem; font-weight: 800; color: #ffffff; margin-top: 0.25rem; }
}
</style>
