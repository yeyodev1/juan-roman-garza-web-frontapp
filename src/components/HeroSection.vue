<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const forbesMockup = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/WhatsApp_Image_2026-05-27_at_7_08_51_PM.jpg';
const profileImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/99f4f652-01b1-4bf3-91af-9e73da8e6c0d.jpg';
</script>

<template>
  <section id="home" class="hero-section">
    <div class="glow-sphere glow-primary"></div>
    <div class="glow-sphere glow-gold"></div>

    <div class="container hero-container">
      <!-- Centered Text Content -->
      <div class="hero-content">
        <span class="hero-tag">LIDERAZGO & SALUD PIONERA</span>
        <h1 class="hero-title">
          LONGEVIDAD <span class="text-gold">REGENERATIVA</span>
          <span class="subtitle-block">El Nuevo Activo Estratégico del Liderazgo Empresarial</span>
        </h1>
        <p class="hero-desc">
          Conectando Psicología Organizacional, Tecnología y Medicina Regenerativa para potenciar el rendimiento de los líderes del siglo XXI. Mantén tu rendimiento frente a los desafíos corporativos.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="router.push('/contacto')">
            <i class="fa-regular fa-calendar-check"></i> Agenda una Consulta
          </button>
          <button class="btn-secondary" @click="router.push('/longevidad-regenerativa')">
            Descubre el Enfoque <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Overlapping Awwwards Layered Media Composite -->
      <div class="hero-media">
        <div class="media-composite">
          <!-- Forbes Mockup Cover -->
          <div class="forbes-frame">
            <img :src="forbesMockup" alt="Forbes Mockup Cover" class="forbes-photo" />
            <div class="glow-border"></div>
            <span class="forbes-disclaimer">*Representación conceptual de reconocimiento</span>
          </div>

          <!-- Overlapping Portrait Badge -->
          <div class="portrait-badge">
            <img :src="profileImage" alt="Juan Román Garza" class="portrait-photo" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative; min-height: 100vh; padding: 160px 0 100px;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  background-color: var(--bg); width: 100%;
  @media (max-width: 768px) { padding: 120px 0 60px; }
}

.glow-sphere {
  position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.12; z-index: 1; pointer-events: none;
  &.glow-primary { width: 500px; height: 500px; top: -10%; right: -10%; background: radial-gradient(circle, var(--accent) 0%, transparent 70%); }
  &.glow-gold { width: 400px; height: 400px; bottom: -10%; left: -10%; background: radial-gradient(circle, var(--accent-gold) 0%, transparent 70%); }
}

.hero-container {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 5rem; z-index: 2; width: 100%; text-align: center;
}

.hero-content { display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 850px; width: 100%; }

.hero-tag {
  font-family: var(--font-principal); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.15em;
  color: var(--accent-gold); margin-bottom: 1.5rem; padding: 0.4rem 1rem;
  border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 50px; background: rgba(212, 175, 55, 0.05);
}

.hero-title {
  font-size: 3.5rem; line-height: 1.1; margin-bottom: 2rem;
  @media (max-width: 768px) { font-size: 2.2rem; }

  .subtitle-block {
    display: block; font-size: 1.8rem; font-weight: 500; margin-top: 1rem; color: var(--text); opacity: 0.9;
    @media (max-width: 768px) { font-size: 1.3rem; }
  }
}

.hero-desc { font-size: 1.1rem; color: var(--text-muted); max-width: 650px; margin-bottom: 3rem; line-height: 1.6; }
.hero-actions { display: flex; gap: 1.5rem; justify-content: center; @media (max-width: 480px) { flex-direction: column; width: 100%; } }

.btn-primary {
  background: linear-gradient(135deg, var(--text) 0%, #3a4763 100%); color: var(--bg); border: none;
  padding: 1rem 2rem; border-radius: 50px; font-size: 0.95rem; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); background: linear-gradient(135deg, var(--accent-gold) 0%, #b89528 100%); color: #fefefe; }
}

.btn-secondary {
  background: transparent; color: var(--text); border: 1px solid var(--border); padding: 1rem 2rem; border-radius: 50px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  transition: all 0.3s ease;
  &:hover { background-color: var(--border); color: var(--accent-gold); border-color: var(--accent-gold); }
}

.hero-media { display: flex; justify-content: center; width: 100%; }

.media-composite {
  position: relative; width: 100%; max-width: 290px;
  margin: 0 auto; aspect-ratio: 1 / 1.25;
}

.forbes-frame {
  width: 100%; height: 100%; border-radius: 16px; overflow: hidden;
  transform: rotate(-3deg); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  position: relative; z-index: 2; border: 4px solid var(--card-bg);
  display: flex; flex-direction: column;

  .forbes-photo { width: 100%; height: 100%; object-fit: cover; }
  .glow-border {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.35); pointer-events: none;
  }
  .forbes-disclaimer {
    position: absolute; bottom: 8px; width: 100%; text-align: center;
    font-size: 0.55rem; color: rgba(255,255,255,0.7); text-shadow: 1px 1px 2px #000000;
  }
}

.portrait-badge {
  position: absolute; bottom: -20px; right: -30px; width: 120px; height: 120px;
  border-radius: 50%; border: 4px solid var(--card-bg); overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); z-index: 3;
  @media (max-width: 480px) { right: -10px; bottom: -15px; width: 100px; height: 100px; }

  .portrait-photo { width: 100%; height: 100%; object-fit: cover; }
}
</style>
