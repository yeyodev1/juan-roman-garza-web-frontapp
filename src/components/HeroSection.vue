<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const profileImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/99f4f652-01b1-4bf3-91af-9e73da8e6c0d.jpg';
</script>

<template>
  <section id="home" class="hero-section">
    <!-- Abstract glowing circles for premium styling -->
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

      <!-- Centered Media Portrait -->
      <div class="hero-media">
        <div class="media-frame">
          <img :src="profileImage" alt="Juan Román Garza" class="profile-photo" />
          <div class="glow-border"></div>
          <div class="floating-badge">
            <i class="fa-solid fa-dna badge-icon"></i>
            <div class="badge-text">
              <span class="badge-num">20+</span>
              <span class="badge-lbl">Años Clínicos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding: 160px 0 100px;
  display: flex;
  align-items: center;
  justify-content: center; // Ensure container is centered on large screens
  overflow: hidden;
  background-color: var(--bg);
  width: 100%;
  @media (max-width: 768px) { padding: 120px 0 60px; }
}

.glow-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  z-index: 1;
  pointer-events: none;
  &.glow-primary { width: 500px; height: 500px; top: -10%; right: -10%; background: radial-gradient(circle, var(--accent) 0%, transparent 70%); }
  &.glow-gold { width: 400px; height: 400px; bottom: -10%; left: -10%; background: radial-gradient(circle, var(--accent-gold) 0%, transparent 70%); }
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.5rem;
  z-index: 2;
  width: 100%;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; // Center text inside elements
  max-width: 850px;
  width: 100%;
}

.hero-tag {
  font-family: var(--font-principal);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50px;
  background: rgba(212, 175, 55, 0.05);
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  @media (max-width: 768px) { font-size: 2.2rem; }

  .subtitle-block {
    display: block;
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 1rem;
    color: var(--text);
    opacity: 0.9;
    @media (max-width: 768px) { font-size: 1.3rem; }
  }
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 650px;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  @media (max-width: 480px) { flex-direction: column; width: 100%; }
}

.btn-primary {
  background: linear-gradient(135deg, var(--text) 0%, #3a4763 100%);
  color: var(--bg);
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); background: linear-gradient(135deg, var(--accent-gold) 0%, #b89528 100%); color: #fefefe; }
}

.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  &:hover { background-color: var(--border); color: var(--accent-gold); border-color: var(--accent-gold); }
}

.hero-media { display: flex; justify-content: center; width: 100%; }

.media-frame {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1 / 1;

  .profile-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    position: relative;
    z-index: 2;
    border: 4px solid var(--card-bg);
  }

  .glow-border {
    position: absolute;
    top: -8px; left: -8px; right: -8px; bottom: -8px;
    border-radius: 30px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
    z-index: 1;
    opacity: 0.3;
    filter: blur(6px);
  }
}

.floating-badge {
  position: absolute;
  bottom: 20px;
  left: -20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 3;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  @media (max-width: 480px) { left: 10px; bottom: -20px; }

  .badge-icon { font-size: 1.4rem; color: var(--accent-gold); }
  .badge-text { display: flex; flex-direction: column; text-align: left; }
  .badge-num { font-weight: 800; font-size: 1.1rem; color: var(--text); }
  .badge-lbl { font-size: 0.7rem; color: var(--text-muted); }
}
</style>
