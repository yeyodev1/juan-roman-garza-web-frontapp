<script setup lang="ts">
import { useI18n } from '@/i18n';

const { t } = useI18n();
const forbesMockup = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/WhatsApp_Image_2026-05-27_at_7_08_51_PM.jpg';
</script>

<template>
  <div class="forbes-highlight">
    <div class="forbes-image-wrapper">
      <img :src="forbesMockup" :alt="t('press.forbes.imageAlt')" class="forbes-img" />
      <div class="glow-overlay"></div>
    </div>
    <div class="forbes-content">
      <span class="feature-badge"><i class="fa-solid fa-star"></i> {{ t('press.forbes.badge') }}</span>
      <h3 class="feature-title">{{ t('press.forbes.title') }}</h3>
      <p class="feature-text">
        {{ t('press.forbes.body') }}
      </p>
      <div class="quotes-box">
        <p>{{ t('press.forbes.quote') }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forbes-highlight {
  display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 5rem; align-items: center;
  background-color: var(--card-bg); border: 1px solid var(--border);
  padding: 3.5rem; border-radius: 24px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  margin-bottom: 8rem;

  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 3rem; padding: 2rem; margin-bottom: 6rem; }
}

.forbes-image-wrapper {
  position: relative; width: 100%; max-width: 280px; margin: 0 auto;
  border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);

  .forbes-img { width: 100%; height: auto; display: block; }
  .glow-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 20px rgba(56, 182, 255, 0.35); pointer-events: none; }
}

.forbes-content {
  text-align: left;

  .feature-badge {
    font-family: var(--font-principal); font-size: 0.75rem; font-weight: 700; color: var(--color-cyan);
    letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem; display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .feature-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; color: var(--text); }
  .feature-text { font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem; }
  .quotes-box { border-left: 2px solid var(--accent); padding-left: 1rem; font-style: italic; font-size: 1rem; color: var(--text); font-weight: 500; }
}
</style>
