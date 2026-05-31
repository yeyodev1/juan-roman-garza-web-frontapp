<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    id: 1,
    icon: 'fa-brain',
    title: 'Psicología Organizacional',
    subtitle: 'Rendimiento Humano',
    desc: 'Análisis de la conducta en entornos de alta presión. Diseñamos estrategias para potenciar la resiliencia mental, la agilidad cognitiva y la toma de decisiones críticas bajo estrés crónico.',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095162/assets-juan/3899b4aa-2b3b-43ec-94c7-9fda3dba6209.jpg'
  },
  {
    id: 2,
    icon: 'fa-chart-network',
    title: 'Tecnología y Datos',
    subtitle: 'Gestión Eficiente de Salud',
    desc: 'Uso de plataformas digitales, telemetría y bases de datos con más de 250,000 casos para el seguimiento preciso de biomarcadores, garantizando decisiones de salud basadas en evidencia.',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/856b90c7-4c38-4f6c-8c5e-2c0b0f50764c.jpg'
  },
  {
    id: 3,
    icon: 'fa-dna',
    title: 'Medicina Regenerativa',
    subtitle: 'Terapias Celulares Pioneras',
    desc: 'Respaldado por Eternal Regenerative Center. Aplicación de protocolos avanzados con células madre y exosomas para revertir el desgaste biológico y rejuvenecer tejidos esenciales.',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095173/assets-juan/d302ccc6-09cb-4d70-8786-2122f17323cc.jpg'
  },
];

onMounted(() => {
  // Fullscreen GSAP Stacking Panels
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.panels-container',
      start: 'top top',
      end: '+=400%', // 4 screens of scrolling
      pin: true,
      scrub: 1, // Smooth scrub
    }
  });

  // GSAP Set Initial States
  gsap.set('.panel-1', { yPercent: 100 });
  gsap.set('.panel-2', { yPercent: 100 });
  gsap.set('.panel-3', { yPercent: 100 });

  // Transition 0 -> 1: Header goes back, Pillar 1 slides up
  tl.to('.panel-0', { scale: 0.85, opacity: 0, filter: 'blur(10px)', duration: 1 })
    .to('.panel-1', { yPercent: 0, duration: 1, ease: 'power2.inOut' }, "<");

  tl.to({}, { duration: 0.2 }); // small pause

  // Transition 1 -> 2: Pillar 1 goes back, Pillar 2 slides up
  tl.to('.panel-1', { scale: 0.85, opacity: 0.3, filter: 'blur(10px)', duration: 1 })
    .to('.panel-2', { yPercent: 0, duration: 1, ease: 'power2.inOut' }, "<");

  tl.to({}, { duration: 0.2 });

  // Transition 2 -> 3: Pillar 2 goes back, Pillar 3 slides up
  tl.to('.panel-2', { scale: 0.85, opacity: 0.3, filter: 'blur(10px)', duration: 1 })
    .to('.panel-3', { yPercent: 0, duration: 1, ease: 'power2.inOut' }, "<");

  tl.to({}, { duration: 0.2 });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section id="why" class="fullscreen-pillars-section">
    <div class="panels-container">
      
      <!-- Panel 0: The Header -->
      <div class="panel panel-0">
        <div class="container flex-center h-full">
          <div class="intro-header">
            <span class="sub-tag">EL DESAFÍO BIOLÓGICO</span>
            <h2 class="section-title">El Costo Silencioso del Liderazgo de Alto Nivel</h2>
            <div class="title-divider"></div>
            <p class="intro-text">
              El estrés crónico y el ritmo implacable del entorno empresarial no solo agotan la mente, sino que
              <strong class="highlight">comprometen la biología de los líderes</strong>. La inflamación de bajo grado y el envejecimiento celular prematuro disminuyen la vitalidad física. Juan Román Garza integra la ciencia médica y la psicología para revertir este desgaste.
            </p>
          </div>
        </div>
      </div>

      <!-- Panels 1 to 3: The Pillars -->
      <div 
        v-for="(pillar, idx) in pillars" 
        :key="pillar.id" 
        class="panel" 
        :class="`panel-${idx + 1}`"
      >
        <div class="panel-split">
          <!-- Text Content (Left side on Desktop, overlay on Mobile) -->
          <div class="panel-left">
            <div class="pillar-num">0{{ pillar.id }}</div>
            <div class="pillar-content">
              <div class="card-icon-wrapper">
                <i class="fa-solid" :class="pillar.icon"></i>
              </div>
              <span class="card-subtitle">{{ pillar.subtitle }}</span>
              <h3 class="card-title">{{ pillar.title }}</h3>
              <p class="card-desc">{{ pillar.desc }}</p>
              
              <ul class="pillar-features">
                <li><i class="fa-solid fa-arrow-right text-gold"></i> Enfoque Estratégico</li>
                <li><i class="fa-solid fa-arrow-right text-gold"></i> Basado en Evidencia</li>
              </ul>
            </div>
          </div>
          
          <!-- Image Content (Right side on Desktop, background on Mobile) -->
          <div class="panel-right">
            <img :src="pillar.image" :alt="pillar.title" class="panel-img" loading="lazy" />
            <div class="img-overlay"></div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fullscreen-pillars-section {
  width: 100%;
  background-color: var(--bg);
}

.panels-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-offset);
}

.panel {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100vh;
  will-change: transform, opacity, filter;
  background-color: var(--bg-offset);
  overflow: hidden;
}

/* Z-Index Stacking */
.panel-0 { z-index: 1; display: flex; align-items: center; justify-content: center; }
.panel-1 { z-index: 2; }
.panel-2 { z-index: 3; }
.panel-3 { z-index: 4; }

/* Panel 0: Header Styles */
.intro-header { 
  max-width: 900px; 
  margin: 0 auto; 
  text-align: center; 
  padding: 0 2rem;
}
.sub-tag {
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700; color: var(--accent);
  letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem; display: inline-block;
}
.section-title { font-size: 3.5rem; margin-bottom: 2rem; color: var(--text); line-height: 1.1; @media (max-width: 768px) { font-size: 2.2rem; } }
.title-divider { width: 80px; height: 4px; background-color: var(--accent-gold); margin: 0 auto 2.5rem; }
.intro-text { font-size: 1.3rem; line-height: 1.8; color: var(--text-muted); .highlight { color: var(--text); font-weight: 700; } @media (max-width: 768px) { font-size: 1.1rem; } }


/* Panel Split Screen Styles */
.panel-split {
  display: flex;
  width: 100%;
  height: 100%;
}

.panel-left {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem;
  position: relative;
  background-color: var(--bg-offset);
}

.panel-right {
  width: 50%;
  height: 100%;
  position: relative;
}

.panel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.img-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to right, var(--bg-offset) 0%, transparent 20%);
}

/* Typography & Details inside panels */
.pillar-num {
  position: absolute;
  top: 10%;
  left: 2rem;
  font-size: 14rem;
  font-weight: 900;
  color: var(--border);
  opacity: 0.2;
  z-index: 0;
  line-height: 1;
  font-family: var(--font-principal);
}

.pillar-content {
  position: relative;
  z-index: 1;
  max-width: 500px;
}

.card-icon-wrapper {
  width: 80px; height: 80px; border-radius: 50%; 
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 2rem; color: var(--accent-gold);
}

.card-subtitle { font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700; color: var(--accent-gold); letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 0.8rem; }
.card-title { font-size: 3rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--text); line-height: 1.1; }
.card-desc { font-size: 1.15rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 2.5rem; }

.pillar-features {
  list-style: none; padding: 0; margin: 0;
  li { 
    margin-bottom: 1rem; font-size: 1.05rem; color: var(--text); font-weight: 500; display: flex; align-items: center; gap: 1rem;
    .text-gold { font-size: 0.9rem; }
  }
}

/* Mobile Responsive Adjustments */
@media (max-width: 992px) {
  .panel-left {
    width: 100%;
    position: absolute;
    top: 0; left: 0; z-index: 2;
    background: linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.4) 100%);
    padding: 2rem;
    align-items: flex-end; /* Push text to bottom */
    padding-bottom: 5rem;
  }
  
  .panel-right {
    width: 100%;
    position: absolute;
    top: 0; left: 0; z-index: 1;
  }
  
  .img-overlay {
    background: none;
  }

  .pillar-num {
    top: auto;
    bottom: 20%;
    right: 1rem;
    left: auto;
    font-size: 8rem;
  }
  
  .card-title { font-size: 2.2rem; }
  .card-desc { font-size: 1rem; }
}
</style>
