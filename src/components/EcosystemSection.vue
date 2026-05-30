<script setup lang="ts">
const clinicImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/19d44cab-fe24-4998-8fa0-7095b1ef858c.jpg';
const biotechImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095170/assets-juan/c13684b0-ba0e-4bd2-954f-f2ec6756421d.jpg';
</script>

<template>
  <section id="ecosystem" class="ecosystem-section section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">NUESTRO ECOSISTEMA</span>
        <h2 class="section-title">Ciencia Médica y Estrategia Tecnológica</h2>
        <div class="accent-line"></div>
        <p class="section-subtitle">
          El puente que conecta más de dos décadas de investigación biomédica de vanguardia con plataformas de salud digitales personalizadas.
        </p>
      </div>

      <div class="ecosystem-grid">
        <!-- 1. Eternal Regenerative Center -->
        <div class="ecosystem-card">
          <div class="card-img-wrapper">
            <img :src="clinicImage" alt="Eternal Regenerative Center" class="card-img" />
            <div class="img-overlay"></div>
            <div class="entity-badge">LA CLÍNICA</div>
          </div>
          <div class="card-body">
            <h3 class="entity-name">Eternal Regenerative Center</h3>
            <span class="entity-lead">Dirigido por el Dr. Juan Antonio Garza Quintanilla</span>
            <p class="entity-desc">
              Pioneros con más de 20 años de investigación clínica en geriatría y terapias celulares avanzadas. Especialistas en revertir el desgaste fisiológico, enfermedades crónico-degenerativas y trastornos autoinmunes.
            </p>
            <div class="entity-details">
              <span class="detail-item"><i class="fa-solid fa-location-dot"></i> Monterrey & Montemorelos, México</span>
              <span class="detail-item"><i class="fa-solid fa-shield-halved"></i> 20+ Años de Investigación</span>
            </div>
          </div>
        </div>

        <!-- 2. Powerhouse Biotech -->
        <div class="ecosystem-card">
          <div class="card-img-wrapper">
            <img :src="biotechImage" alt="Powerhouse Biotech" class="card-img" />
            <div class="img-overlay"></div>
            <div class="entity-badge gold">TECNOLOGÍA DIGITAL</div>
          </div>
          <div class="card-body">
            <h3 class="entity-name">Powerhouse Biotech</h3>
            <span class="entity-lead">El emprendimiento tecnológico de Juan Román Garza</span>
            <p class="entity-desc">
              La plataforma estratégica de educación y vinculación. Especializada en la fidelización de pacientes y análisis masivo de bases de datos clínicas, conectando la ciencia con el mercado de manera eficiente.
            </p>
            <div class="entity-details">
              <span class="detail-item"><i class="fa-solid fa-database"></i> 250k+ Casos de Estudio</span>
              <span class="detail-item"><i class="fa-solid fa-laptop-code"></i> Telemetría de Biomarcadores</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ecosystem-section {
  background-color: var(--bg);
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

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.7;
}

// Cards Grid
.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.ecosystem-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
  transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: var(--accent-gold);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);

    .card-img {
      transform: scale(1.05);
    }
  }
}

.card-img-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 40%, rgba(1, 13, 39, 0.7) 100%);
  }
}

.entity-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--accent);
  color: #ffffff;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-family: var(--font-principal);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  z-index: 2;

  &.gold {
    background: var(--accent-gold);
    color: #ffffff;
  }
}

.card-body {
  padding: 2.5rem 2rem;
  text-align: left;
}

.entity-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.entity-lead {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
}

.entity-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 2rem;
  min-height: 75px;
}

.entity-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;

  .detail-item {
    font-size: 0.85rem;
    color: var(--text);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.65rem;

    i {
      color: var(--accent-gold);
      width: 16px;
    }
  }
}
</style>
