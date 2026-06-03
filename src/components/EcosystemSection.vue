<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import EcosystemCard from './EcosystemCard.vue';

const entities = [
  {
    name: 'Powerhouse Biotech',
    lead: 'El gran proyecto de Juan Román Garza',
    desc: 'La plataforma de educación, vinculación y telemetría de vanguardia para líderes de la salud. Transformando el futuro de la medicina regenerativa con análisis masivo de datos clínicos.',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095170/assets-juan/c13684b0-ba0e-4bd2-954f-f2ec6756421d.jpg',
    badge: 'PROYECTO INSIGNIA',
    badgeClass: 'gold',
    link: 'https://www.powerhousebiotech.com/',
    details: [
      { icon: 'fa-database', text: '250k+ Casos de Estudio Clínicos' },
      { icon: 'fa-laptop-code', text: 'Telemetría y Fidelización' },
    ],
  },
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
  }
];

onMounted(() => {
  gsap.fromTo('.section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  gsap.fromTo('.ecosystem-grid', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
});
</script>

<template>
  <section id="ecosystem" class="ecosystem-section section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">NUESTRO ECOSISTEMA</span>
        <h2 class="section-title">Ciencia Médica y <a href="https://www.powerhousebiotech.com/" target="_blank" class="cyan-link">Powerhouse Biotech</a></h2>
        <div class="accent-line"></div>
        <p class="section-subtitle">
          El puente que conecta más de dos décadas de investigación biomédica de vanguardia con plataformas de salud digitales personalizadas, liderado por el proyecto insignia <strong>Powerhouse Biotech</strong>.
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
.ecosystem-section { background-color: var(--bg); transition: background-color 0.3s ease; width: 100%; padding-top: 150px; min-height: 100vh; padding-bottom: 100px; }

.section-header {
  text-align: center; max-width: 900px; margin: 0 auto 6rem;
  display: flex; flex-direction: column; align-items: center;

  .section-tag {
    font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
    color: var(--color-cyan); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
    border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
  }
  .section-title { 
    font-size: 3.5rem; color: var(--text); margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; line-height: 1.1;
    @media (max-width: 768px) { font-size: 2.2rem; } 
    .cyan-link, .cyan-link:visited, .cyan-link:active { color: var(--color-cyan); text-decoration: none; border-bottom: 2px dashed var(--color-cyan); transition: all 0.3s ease; }
    .cyan-link:hover { color: #fff; border-color: #fff; }
  }
  .accent-line { width: 60px; height: 3px; background-color: var(--color-cyan); margin: 0 auto 2.5rem; }
  .section-subtitle { font-size: 1.25rem; color: var(--text-muted); line-height: 1.8; }
}

.ecosystem-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; width: 100%;
  max-width: 1200px; margin: 0 auto;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
