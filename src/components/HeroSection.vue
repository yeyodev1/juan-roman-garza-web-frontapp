<script setup lang="ts">
const emit = defineEmits(['navigate']);

const profileImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/99f4f652-01b1-4bf3-91af-9e73da8e6c0d.jpg';
</script>

<template>
  <section id="home" class="hero-section">
    <!-- Abstract premium glow elements for Awwwards-style biotech look -->
    <div class="glow-sphere glow-primary"></div>
    <div class="glow-sphere glow-gold"></div>

    <div class="container hero-grid">
      <!-- Left side text content -->
      <div class="hero-content">
        <span class="hero-tag">LIDERAZGO & SALUD PIONERA</span>
        <h1 class="hero-title">
          LONGEVIDAD <span class="text-gold">REGENERATIVA</span>:
          <span class="subtitle-block">El Nuevo Activo Estratégico del Liderazgo Empresarial</span>
        </h1>
        <p class="hero-desc">
          Conectando Psicología Organizacional, Tecnología y Medicina Regenerativa para potenciar el rendimiento de los líderes del siglo XXI. Mantén tu alto rendimiento físico e intelectual frente a los desafíos corporativos modernos.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="emit('navigate', 'contact')">
            <i class="fa-regular fa-calendar-check"></i> Agenda una Consulta
          </button>
          <button class="btn-secondary" @click="emit('navigate', 'approach')">
            Descubre el Enfoque <i class="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </div>

      <!-- Right side profile photo with premium frame -->
      <div class="hero-media">
        <div class="media-frame">
          <img :src="profileImage" alt="Juan Román Garza" class="profile-photo" />
          <div class="glow-border"></div>
          <!-- Biotech floating badge -->
          <div class="floating-badge">
            <i class="fa-solid fa-dna badge-icon"></i>
            <div class="badge-text">
              <span class="badge-num">20+</span>
              <span class="badge-lbl">Años de Respaldo Clínico</span>
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
  padding: 120px 0 80px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--bg);
  transition: background-color 0.3s ease;
}

// Glow spheres for biotech Awwwards background
.glow-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  z-index: 1;
  pointer-events: none;
}

.glow-primary {
  width: 500px;
  height: 500px;
  top: -10%;
  right: -10%;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
}

.glow-gold {
  width: 400px;
  height: 400px;
  bottom: -10%;
  left: -10%;
  background: radial-gradient(circle, var(--accent-gold) 0%, transparent 70%);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 992px) {
    align-items: center;
  }
}

.hero-tag {
  font-family: var(--font-principal);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent-gold);
  margin-bottom: 1rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50px;
  background: rgba(212, 175, 55, 0.05);
}

.hero-title {
  font-size: 3.2rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  .subtitle-block {
    display: block;
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 0.75rem;
    color: var(--text);
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 992px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, var(--accent-gold) 0%, #b89528 100%);
    color: #fefefe;
  }
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

  &:hover {
    background-color: var(--border);
    color: var(--accent-gold);
    border-color: var(--accent-gold);
  }
}

.hero-media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.media-frame {
  position: relative;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  overflow: visible;

  .profile-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    position: relative;
    z-index: 2;
    border: 4px solid var(--card-bg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .glow-border {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 30px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
    z-index: 1;
    opacity: 0.4;
    filter: blur(8px);
  }
}

.floating-badge {
  position: absolute;
  bottom: 20px;
  left: -30px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 3;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  @media (max-width: 480px) {
    left: 10px;
    bottom: -20px;
  }

  .badge-icon {
    font-size: 1.5rem;
    color: var(--accent-gold);
  }

  .badge-text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .badge-num {
    font-family: var(--font-principal);
    font-weight: 800;
    font-size: 1.1rem;
    line-height: 1;
    color: var(--text);
  }

  .badge-lbl {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-weight: 500;
  }
}
</style>
