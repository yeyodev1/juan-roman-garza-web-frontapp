<script setup lang="ts">
import EcosystemCard from './EcosystemCard.vue';

const entities = [
  {
    name: 'Eternal Regenerative Center',
    lead: 'Dirigido por el Dr. Juan Antonio Garza Quintanilla',
    desc: 'Pioneros con más de 20 años de investigación clínica en geriatría y terapias celulares avanzadas. Especialistas en revertir el desgaste fisiológico, enfermedades crónico-degenerativas y trastornos autoinmunes.',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/19d44cab-fe24-4998-8fa0-7095b1ef858c.jpg',
    badge: 'LA CLÍNICA',
    badgeClass: '',
    details: [
      { icon: 'fa-location-dot', text: 'Monterrey & Montemorelos, México' },
      { icon: 'fa-shield-halved', text: '20+ Años de Investigación Médica' },
    ],
  },
  {
    name: 'Powerhouse Biotech',
    lead: 'El emprendimiento tecnológico de Juan Román Garza',
    desc: 'La plataforma estratégica de educación y vinculación. Especializada en la fidelización de pacientes y análisis masivo de bases de datos clínicas, conectando la ciencia con el mercado de manera eficiente.',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095170/assets-juan/c13684b0-ba0e-4bd2-954f-f2ec6756421d.jpg',
    badge: 'TECNOLOGÍA DIGITAL',
    badgeClass: 'gold',
    details: [
      { icon: 'fa-database', text: '250k+ Casos de Estudio Clínicos' },
      { icon: 'fa-laptop-code', text: 'Telemetría y Fidelización' },
    ],
  },
];
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
        <EcosystemCard
          v-for="(entity, idx) in entities"
          :key="idx"
          v-bind="entity"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ecosystem-section { background-color: var(--bg); transition: background-color 0.3s ease; }

.section-header {
  text-align: center; max-width: 800px; margin: 0 auto 5rem;
  .section-tag {
    font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
    color: var(--accent); letter-spacing: 0.1em; margin-bottom: 0.5rem; display: inline-block;
  }
  .section-title { font-size: 2.5rem; color: var(--text); margin-bottom: 1.5rem; @media (max-width: 768px) { font-size: 1.8rem; } }
  .accent-line { width: 55px; height: 3px; background-color: var(--accent-gold); margin: 0 auto 2rem; }
  .section-subtitle { font-size: 1.1rem; color: var(--text-muted); line-height: 1.7; }
}

.ecosystem-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
