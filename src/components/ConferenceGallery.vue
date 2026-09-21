<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from '@/i18n';

const { t, tm } = useI18n();

const galleryImages = [
  { url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095165/assets-juan/71a520fc-beb0-4eb0-b7b6-3e97fef04266.jpg' },
  { url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095172/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg' },
  { url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095163/assets-juan/5dfa62f2-170e-42eb-867b-f98a1c816781.jpg' },
  { url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095156/assets-juan/076f4a92-7716-4a09-ab4b-0612fa4c7830.jpg' },
  { url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095159/assets-juan/138b7a57-1fd1-47d5-922f-bb4f7ed03ce4.jpg' },
  { url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/71d82988-7ebc-48c3-9c7e-1bea286410ab.jpg' },
];

const galleryItems = computed(() => {
  const copy = tm<{ title: string; desc: string }[]>('press.gallery.items');
  return galleryImages.map((item, idx) => ({ ...item, ...copy[idx] }));
});

const selectedImage = ref<string | null>(null);
</script>

<template>
  <div class="gallery-wrapper">
    <h3 class="gallery-subtitle">{{ t('press.gallery.title') }}</h3>
    <div class="gallery-grid">
      <div v-for="(item, idx) in galleryItems" :key="idx" class="gallery-card" @click="selectedImage = item.url">
        <div class="gallery-img-container">
          <img :src="item.url" :alt="item.title" class="gallery-img" loading="lazy" />
          <div class="card-hover-overlay">
            <i class="fa-solid fa-magnifying-glass-plus zoom-icon"></i>
            <span class="view-tag">{{ t('press.gallery.view') }}</span>
          </div>
        </div>
        <div class="card-footer">
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <transition name="fade">
      <div v-if="selectedImage" class="lightbox-modal" @click="selectedImage = null">
        <button class="close-lightbox" :aria-label="t('press.gallery.close')" @click="selectedImage = null">&times;</button>
        <img :src="selectedImage" :alt="t('press.gallery.enlargedAlt')" class="lightbox-img" @click.stop />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.gallery-subtitle {
  font-size: 1.8rem; font-weight: 700; color: var(--text); margin-bottom: 3rem; text-align: center; position: relative;
  &::after { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 40px; height: 2px; background-color: var(--color-cyan); }
}

.gallery-wrapper { margin-bottom: 8rem; padding: 0 1.5rem; @media (max-width: 768px) { margin-bottom: 6rem; } }

.gallery-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 576px) { grid-template-columns: 1fr; gap: 1.5rem; }
}

.gallery-card {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
  cursor: pointer; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03); transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px); border-color: var(--color-cyan);
    .gallery-img { transform: scale(1.04); }
    .card-hover-overlay { opacity: 1; }
  }
}

.gallery-img-container {
  position: relative; width: 100%; height: 220px; overflow: hidden;
  .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
}

.card-hover-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(1, 13, 39, 0.75);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  opacity: 0; transition: opacity 0.3s ease;

  .zoom-icon { font-size: 1.8rem; color: var(--color-cyan); }
  .view-tag { color: #ffffff; font-family: var(--font-principal); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; }
}

.card-footer {
  padding: 1.25rem; text-align: left;
  h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text); }
  p { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; }
}

.lightbox-modal {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(1, 13, 39, 0.95);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 2000;
  display: flex; align-items: center; justify-content: center; padding: 2rem;

  .close-lightbox {
    position: absolute; top: 25px; right: 35px; background: none; border: none; color: #ffffff;
    font-size: 3rem; cursor: pointer; transition: color 0.3s ease;
    &:hover { color: var(--color-cyan); }
  }
  .lightbox-img { max-width: 90%; max-height: 85%; border-radius: 12px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
