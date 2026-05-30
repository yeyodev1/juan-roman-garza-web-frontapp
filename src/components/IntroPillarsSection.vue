<script setup lang="ts">
const pillars = [
  {
    icon: 'fa-brain',
    title: 'Psicología Organizacional',
    subtitle: 'Rendimiento Humano',
    desc: 'Análisis de la conducta en entornos de alta presión. Diseñamos estrategias para potenciar la resiliencia mental, la agilidad cognitiva y la toma de decisiones críticas bajo estrés crónico.',
  },
  {
    icon: 'fa-chart-network',
    iconAlt: 'fa-circle-nodes',
    title: 'Tecnología y Datos',
    subtitle: 'Gestión Eficiente de Salud',
    desc: 'Uso de plataformas digitales, telemetría y bases de datos con más de 250,000 casos para el seguimiento preciso de biomarcadores, garantizando decisiones de salud basadas en evidencia.',
  },
  {
    icon: 'fa-dna',
    title: 'Medicina Regenerativa',
    subtitle: 'Terapias Celulares Pioneras',
    desc: 'Respaldado por Eternal Regenerative Center. Aplicación de protocolos avanzados con células madre y exosomas para revertir el desgaste biológico y rejuvenecer tejidos esenciales.',
  },
];
</script>

<template>
  <section id="why" class="intro-section section-padding">
    <div class="container">
      <!-- "El Por Qué" Introduction Header -->
      <div class="intro-header">
        <span class="sub-tag">EL DESAFÍO BIOLÓGICO</span>
        <h2 class="section-title">El Costo Silencioso del Liderazgo de Alto Nivel</h2>
        <div class="title-divider"></div>
        <p class="intro-text">
          El estrés crónico y el ritmo implacable del entorno empresarial no solo agotan la mente, sino que
          <strong class="highlight">comprometen la biología de los líderes</strong>. La inflamación sistémica acelerada
          y el envejecimiento celular prematuro disminuyen la capacidad decisional y la vitalidad física.
          Juan Román Garza integra la ciencia médica y la psicología organizacional para revertir este desgaste,
          transformando la longevidad en un activo estratégico.
        </p>
      </div>

      <!-- Mosaic / Grid of 3 Pillars -->
      <div class="pillars-grid">
        <div v-for="(pillar, idx) in pillars" :key="idx" class="pillar-card">
          <div class="card-icon-wrapper">
            <i class="fa-solid" :class="pillar.icon || 'fa-circle-nodes'"></i>
          </div>
          <span class="card-subtitle">{{ pillar.subtitle }}</span>
          <h3 class="card-title">{{ pillar.title }}</h3>
          <p class="card-desc">{{ pillar.desc }}</p>
          <div class="card-hover-line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.intro-section {
  background-color: var(--bg-offset);
  position: relative;
  transition: background-color 0.3s ease;
}

.intro-header {
  max-width: 800px;
  margin: 0 auto 5rem;
  text-align: center;
}

.sub-tag {
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
  margin-bottom: 1.5rem;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

.title-divider {
  width: 60px;
  height: 3px;
  background-color: var(--accent-gold);
  margin: 0 auto 2rem;
}

.intro-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);

  .highlight {
    color: var(--text);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

// 3-Column Pillars Grid
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.pillar-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  padding: 3rem 2.2rem;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: var(--accent-gold);

    .card-icon-wrapper {
      background: rgba(212, 175, 55, 0.1);
      color: var(--accent-gold);
      transform: scale(1.1) rotate(5deg);
    }

    .card-hover-line {
      width: 100%;
    }
  }
}

.card-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(32, 148, 210, 0.1);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.card-subtitle {
  font-family: var(--font-principal);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-gold);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.card-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.card-hover-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-gold) 100%);
  transition: width 0.4s ease;
}
</style>
