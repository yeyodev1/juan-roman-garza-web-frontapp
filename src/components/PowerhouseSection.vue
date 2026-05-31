<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Using a wide presentation image for the hero banner
const heroImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/71d82988-7ebc-48c3-9c7e-1bea286410ab.jpg'; 

onMounted(() => {
  // Hero reveal
  gsap.fromTo('.ph-hero-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });
  gsap.fromTo('.ph-hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
  
  // Image reveal
  gsap.fromTo('.ph-image-wrapper', 
    { opacity: 0, scale: 0.95 }, 
    { opacity: 1, scale: 1, duration: 1.5, delay: 0.5, ease: 'power3.out' }
  );

  // Content stagger
  gsap.fromTo('.ph-content-block', 
    { opacity: 0, y: 40 }, 
    { 
      opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', 
      scrollTrigger: { trigger: '.ph-content', start: 'top 85%' } 
    }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="powerhouse-section section-padding">
    <div class="container ph-container">
      
      <!-- Hero Header -->
      <div class="ph-header text-center">
        <span class="section-tag">EL PROYECTO FUNDADOR</span>
        <h1 class="ph-hero-title">Powerhouse Biotech</h1>
        <p class="ph-hero-subtitle">
          La primera <strong class="gold-text">Health Decision Platform</strong> enfocada en Medicina Regenerativa.
        </p>
      </div>

      <!-- Hero Image / Banner -->
      <div class="ph-image-wrapper">
        <img :src="heroImage" alt="Powerhouse Biotech Presentation" class="ph-main-image" loading="lazy" />
        <div class="overlay-gradient"></div>
        
        <!-- Stats Card -->
        <div class="stats-card">
          <div class="stat">
            <span class="num">15+</span>
            <span class="label">Años de Experiencia</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="num">100K+</span>
            <span class="label">Casos Analizados</span>
          </div>
        </div>
      </div>

      <!-- Detailed Content -->
      <div class="ph-content">
        <div class="ph-content-block">
          <h2 class="block-title">El Cimiento de la Lucidez Directiva</h2>
          <div class="accent-line"></div>
          <p class="paragraph">
            Fundada por <strong class="white-text">Juan Román Garza</strong>, Powerhouse Biotech nace de una convicción inquebrantable: un cuerpo regenerado y optimizado celularmente es el cimiento absoluto de la lucidez directiva. No somos una clínica tradicional; somos una plataforma integral de decisiones de salud diseñada exclusivamente para líderes de alto rendimiento.
          </p>
        </div>

        <div class="ph-content-block">
          <h2 class="block-title">Evaluación de Viabilidad Regenerativa™</h2>
          <div class="accent-line"></div>
          <p class="paragraph">
            Antes de sugerir cualquier tratamiento, realizamos un análisis exhaustivo, brutalmente honesto y puramente científico. Nuestro protocolo patentado de <strong>Evaluación de Viabilidad Regenerativa™</strong> nos permite determinar con precisión si tu cuerpo está verdaderamente listo para repararse a nivel celular, eliminando conjeturas y protegiendo tu inversión biológica.
          </p>
        </div>
        
        <div class="ph-content-block text-center action-block">
          <a href="https://www.powerhousebiotech.com/" target="_blank" rel="noopener noreferrer" class="primary-btn">
            Visitar Plataforma Oficial <i class="fa-solid fa-arrow-up-right-from-square btn-icon"></i>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.powerhouse-section {
  background-color: var(--bg);
  min-height: 100vh;
  padding-top: 150px;
  padding-bottom: 120px;
  overflow: hidden;
}

.ph-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
}

/* --- Hero Header --- */
.ph-header {
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-tag {
  font-family: var(--font-principal);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent-gold);
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  display: inline-block;
  border: 1px solid rgba(212, 175, 55, 0.4);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  text-transform: uppercase;
}

.ph-hero-title {
  font-size: 5rem;
  font-weight: 800;
  color: var(--text);
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;

  @media (max-width: 768px) { font-size: 3rem; }
}

.ph-hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 700px;
  
  .gold-text { color: var(--accent-gold); font-weight: 700; }
  
  @media (max-width: 768px) { font-size: 1.2rem; }
}

/* --- Image Wrapper --- */
.ph-image-wrapper {
  width: 100%;
  max-width: 1200px;
  height: 60vh;
  min-height: 500px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.6);

  .ph-main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 1s ease;
  }

  &:hover .ph-main-image {
    transform: scale(1.03);
  }

  .overlay-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.2) 50%, transparent 100%);
    z-index: 1;
  }
}

.stats-card {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  gap: 4rem;
  z-index: 2;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem 3rem;
    bottom: 20px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .num {
    font-family: var(--font-principal);
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--accent-gold);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #fff;
  }

  .stat-divider {
    width: 1px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.2);
    
    @media (max-width: 768px) {
      width: 60px;
      height: 1px;
    }
  }
}

/* --- Content --- */
.ph-content {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.ph-content-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &.text-center { align-items: center; text-align: center; }
}

.block-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  @media (max-width: 768px) { font-size: 2rem; }
}

.accent-line {
  width: 60px;
  height: 3px;
  background-color: var(--accent-gold);
  margin-bottom: 2rem;
}

.paragraph {
  font-size: 1.3rem;
  line-height: 1.8;
  color: var(--text-muted);
  
  strong { color: var(--accent-gold); font-weight: 700; }
  .white-text { color: var(--text); font-weight: 700; }
}

.action-block {
  margin-top: 2rem;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.4s ease;

  .btn-icon {
    font-size: 1.2rem;
    transition: transform 0.4s ease;
  }

  &:hover {
    background: var(--accent-gold);
    color: var(--bg);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);

    .btn-icon {
      transform: translate(3px, -3px);
    }
  }
}
</style>
