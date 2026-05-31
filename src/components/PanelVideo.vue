<script setup lang="ts">
const panelVideo = 'https://res.cloudinary.com/drw5sn8qw/video/upload/v1780095169/assets-juan/WhatsApp_Video_2026-05-29_at_12_43_38_PM.mp4';
const videoPoster = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095156/assets-juan/076f4a92-7716-4a09-ab4b-0612fa4c7830.jpg';
</script>

<template>
  <div class="video-section">
    <h3 class="video-subtitle">Panel de Discusión: Innovación en Salud</h3>
    <div class="video-container-wrapper">
      <div class="video-glow"></div>
      <div class="video-player-frame">
        <video :src="panelVideo" :poster="videoPoster" controls class="native-video">
          Tu navegador no soporta la reproducción de video HTML5.
        </video>
      </div>
    </div>
    <p class="video-caption">
      Juan Román Garza discutiendo sobre el desarrollo de clínicas integrales, innovación en salud y modelos de negocios de medicina regenerativa en México y Latinoamérica.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.video-section { max-width: 800px; margin: 0 auto; }

.video-subtitle {
  font-size: 1.8rem; font-weight: 700; color: var(--text); margin-bottom: 3rem; text-align: center; position: relative;
  &::after { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 40px; height: 2px; background-color: var(--accent-gold); }
}

.video-container-wrapper { position: relative; border-radius: 20px; overflow: visible; margin-bottom: 2rem; }

.video-glow {
  position: absolute; top: -15px; left: -15px; right: -15px; bottom: -15px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
  filter: blur(20px); border-radius: 24px; opacity: 0.15; z-index: 1;
}

.video-player-frame {
  position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 20px;
  border: 1px solid var(--border); overflow: hidden; z-index: 2; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.native-video { width: 100%; height: 100%; object-fit: cover; background: #000; }

.video-caption {
  font-size: 0.9rem; color: var(--text-muted); text-align: center; line-height: 1.5; max-width: 600px; margin: 0 auto;
}
</style>
