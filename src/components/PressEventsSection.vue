<script setup lang="ts">
import { ref } from 'vue';

const forbesMockup = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/WhatsApp_Image_2026-05-27_at_7_08_51_PM.jpg';
const panelVideo = 'https://res.cloudinary.com/drw5sn8qw/video/upload/v1780095169/assets-juan/WhatsApp_Video_2026-05-29_at_12_43_38_PM.mp4';

const galleryItems = [
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095165/assets-juan/71a520fc-beb0-4eb0-b7b6-3e97fef04266.jpg',
    title: 'Ponencia Longevidad',
    desc: 'Presentando "Longevidad Regenerativa" como activo de liderazgo.',
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095172/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg',
    title: 'Auditorio Principal',
    desc: 'Conferencia magistral ante líderes empresariales.',
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095163/assets-juan/5dfa62f2-170e-42eb-867b-f98a1c816781.jpg',
    title: 'Masterclass Médica',
    desc: 'Sesión sobre medicina celular y el futuro de la salud.',
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095156/assets-juan/076f4a92-7716-4a09-ab4b-0612fa4c7830.jpg',
    title: 'Mesa de Debate',
    desc: 'Panel "Desarrollos Inmobiliarios e Innovación en Clínicas de Salud".',
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095159/assets-juan/138b7a57-1fd1-47d5-922f-bb4f7ed03ce4.jpg',
    title: 'Flyer Guayaquil 2026',
    desc: 'Conferencia de Entorno Estratégico "The Council".',
  },
  {
    url: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/71d82988-7ebc-48c3-9c7e-1bea286410ab.jpg',
    title: 'Poster Miami',
    desc: 'Presentación en Miami "Raise The Bar".',
  },
];

const selectedImage = ref<string | null>(null);

function openImage(url: string) {
  selectedImage.value = url;
}

function closeImage() {
  selectedImage.value = null;
}
</script>

<template>
  <section id="press" class="press-section section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">PRENSA Y EVENTOS</span>
        <h2 class="section-title">Presencia Global e Impacto Mediático</h2>
        <div class="accent-line"></div>
      </div>

      <!-- Forbes Mockup Highlight -->
      <div class="forbes-highlight">
        <div class="forbes-image-wrapper">
          <img :src="forbesMockup" alt="Mock Forbes Cover Juan Roman Garza" class="forbes-img" />
          <div class="glow-overlay"></div>
        </div>
        <div class="forbes-content">
          <span class="feature-badge"><i class="fa-solid fa-star"></i> Proyección Empresarial</span>
          <h3 class="feature-title">Top Entrepreneur to Follow</h3>
          <p class="feature-text">
            Esta representación de portada conceptual ilustra el posicionamiento de Juan Román Garza como uno de los perfiles empresariales más destacados a seguir en el ámbito de la biotecnología aplicada a la salud ejecutiva y la optimización humana.
          </p>
          <div class="quotes-box">
            <p>"Conectando ciencia regenerativa con el management moderno."</p>
          </div>
        </div>
      </div>

      <!-- Conferences Gallery -->
      <div class="gallery-wrapper">
        <h3 class="gallery-subtitle">Galería de Conferencias y Eventos</h3>
        <div class="gallery-grid">
          <div
            v-for="(item, idx) in galleryItems"
            :key="idx"
            class="gallery-card"
            @click="openImage(item.url)"
          >
            <div class="gallery-img-container">
              <img :src="item.url" :alt="item.title" class="gallery-img" loading="lazy" />
              <div class="card-hover-overlay">
                <i class="fa-solid fa-magnifying-glass-plus zoom-icon"></i>
                <span class="view-tag">Ver Imagen</span>
              </div>
            </div>
            <div class="card-footer">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel Video Native Embed -->
      <div class="video-section">
        <h3 class="video-subtitle">Panel de Discusión: Innovación en Salud</h3>
        <div class="video-container-wrapper">
          <div class="video-glow"></div>
          <div class="video-player-frame">
            <video :src="panelVideo" controls class="native-video" poster="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095156/assets-juan/076f4a92-7716-4a09-ab4b-0612fa4c7830.jpg">
              Tu navegador no soporta la reproducción de video HTML5.
            </video>
          </div>
        </div>
        <p class="video-caption">
          Juan Román Garza discutiendo sobre el desarrollo de clínicas integrales, innovación en salud y modelos de negocios de medicina regenerativa en México y Latinoamérica.
        </p>
      </div>
    </div>

    <!-- Image Lightbox Modal -->
    <transition name="fade">
      <div v-if="selectedImage" class="lightbox-modal" @click="closeImage">
        <button class="close-lightbox" @click="closeImage">&times;</button>
        <img :src="selectedImage" alt="Ampliado" class="lightbox-img" @click.stop />
      </div>
    </transition>
  </section>
</template>

<style lang="scss" scoped>
.press-section {
  background-color: var(--bg-offset);
  position: relative;
  transition: background-color 0.3s ease;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
}

.section-tag {
  font-family: var(--font-principal);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.section-title {
  font-size: 2.5rem;
  color: var(--text);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

.accent-line {
  width: 55px;
  height: 3px;
  background-color: var(--accent-gold);
  margin: 0 auto 2rem;
}

// Forbes Mockup Feature
.forbes-highlight {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 4rem;
  align-items: center;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  margin-bottom: 6rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2rem;
  }
}

.forbes-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  .forbes-img {
    width: 100%;
    height: auto;
    display: block;
  }

  .glow-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.3);
    pointer-events: none;
  }
}

.forbes-content {
  text-align: left;
}

.feature-badge {
  font-family: var(--font-principal);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-gold);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.feature-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.quotes-box {
  border-left: 2px solid var(--accent);
  padding-left: 1rem;
  font-style: italic;
  font-size: 1rem;
  color: var(--text);
  font-weight: 500;
}

// Gallery Subtitle
.gallery-subtitle, .video-subtitle {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: var(--accent-gold);
  }
}

.gallery-wrapper {
  margin-bottom: 6rem;
}

// Gallery Grid
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.gallery-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-gold);

    .gallery-img {
      transform: scale(1.04);
    }

    .card-hover-overlay {
      opacity: 1;
    }
  }
}

.gallery-img-container {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;

  .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
}

.card-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 13, 39, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  .zoom-icon {
    font-size: 1.8rem;
    color: var(--accent-gold);
  }

  .view-tag {
    color: #ffffff;
    font-family: var(--font-principal);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }
}

.card-footer {
  padding: 1.25rem;
  text-align: left;

  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: var(--text);
  }

  p {
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.4;
  }
}

// Video Player styling
.video-section {
  max-width: 800px;
  margin: 0 auto;
}

.video-container-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: visible;
  margin-bottom: 1.5rem;
}

.video-glow {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
  filter: blur(20px);
  border-radius: 24px;
  opacity: 0.2;
  z-index: 1;
}

.video-player-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  border: 1px solid var(--border);
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.native-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
}

.video-caption {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
}

// Lightbox Modal
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 13, 39, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.close-lightbox {
  position: absolute;
  top: 25px;
  right: 35px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 3rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-gold);
  }
}

.lightbox-img {
  max-width: 90%;
  max-height: 85%;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
