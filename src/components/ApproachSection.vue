<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';

const applications = [
  {
    icon: 'fa-brain',
    title: 'Rendimiento Intelectual y Decisional',
    desc: 'Optimización de la plasticidad sináptica y oxigenación cerebral. Previene la fatiga ejecutiva y mantiene la agudeza mental en momentos de alta presión.',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Manejo del Estrés Crónico e Inflamación',
    desc: 'Regulación del cortisol y reducción del estrés oxidativo celular. Combate la inflamación de bajo grado, detonante principal del envejecimiento prematuro.',
  },
  {
    icon: 'fa-bolt',
    title: 'Revitalización Física para Líderes Senior (50+)',
    desc: 'Reconstrucción y reparación de tejidos desgastados a nivel celular. Restaura la vitalidad mitocondrial y la resistencia física del ejecutivo moderno.',
  },
];

onMounted(() => {
  gsap.fromTo('.science-column', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' });
  gsap.fromTo('.app-column', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
});
</script>

<template>
  <section id="approach" class="approach-section section-padding">
    <div class="container approach-container">
      
      <div class="section-header text-center">
        <span class="section-tag">EL ENFOQUE CIENTÍFICO</span>
        <h2 class="approach-title">Medicina Regenerativa: El Futuro de la Longevidad</h2>
        <div class="accent-line mx-auto"></div>
      </div>

      <div class="approach-grid">
        <div class="science-column">
          <p class="explanation-text">
            Lejos de ser una solución cosmética, la medicina regenerativa se enfoca en potenciar la
            <strong class="highlight">capacidad de autorreparación del propio cuerpo</strong>. Basado en las investigaciones del Premio Nobel <strong class="highlight">Shinya Yamanaka</strong> sobre la reprogramación celular adulta, hoy es posible rejuvenecer tejidos esenciales.
          </p>

          <div class="protocol-card">
            <div class="protocol-header">
              <i class="fa-solid fa-microscope protocol-icon"></i>
              <h3>Protocolos Avanzados de Eternal</h3>
            </div>
            <p class="protocol-text">
              Utilizando infusiones personalizadas de <strong class="highlight-gold">Exosomas y Células Madre</strong>, nuestros protocolos detienen el daño acumulado y reescriben la trayectoria biológica de su salud.
            </p>
          </div>
        </div>

        <div class="app-column">
          <div class="apps-container">
            <h3 class="app-subtitle">Aplicación Ejecutiva de Alto Impacto</h3>
            <div class="apps-list">
              <div v-for="(app, idx) in applications" :key="idx" class="app-item">
                <div class="app-icon-box"><i class="fa-solid" :class="app.icon"></i></div>
                <div class="app-details">
                  <h4>{{ app.title }}</h4>
                  <p>{{ app.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.approach-section { background-color: var(--bg); transition: background-color 0.3s ease; padding-top: 150px; min-height: 100vh; padding-bottom: 100px; }

.approach-container {
  padding: 0 1.5rem;
  width: 100%;
}

.section-header {
  margin-bottom: 5rem;
  display: flex; flex-direction: column; align-items: center;
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
  color: var(--color-cyan); letter-spacing: 0.2em; margin-bottom: 1.5rem; display: inline-block;
  border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
}

.approach-title {
  font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--text); font-weight: 800; text-transform: uppercase; line-height: 1.1; text-align: center;
  @media (max-width: 768px) { font-size: 2.2rem; }
}

.accent-line { width: 60px; height: 3px; background-color: var(--color-cyan); margin: 0 auto 2.5rem; }

.approach-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 4rem; }
}

.explanation-text {
  font-size: 1.25rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 3rem;
  .highlight { color: var(--text); font-weight: 600; }
}

.protocol-card {
  background: rgba(15, 15, 15, 0.6); 
  backdrop-filter: blur(10px);
  border: 1px solid rgba(56, 182, 255, 0.3); border-left: 4px solid var(--color-cyan);
  padding: 2.5rem; border-radius: 16px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  .protocol-header {
    display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
    .protocol-icon { font-size: 1.8rem; color: var(--color-cyan); }
    h3 { font-size: 1.4rem; font-weight: 800; color: var(--text); }
  }

  .protocol-text {
    font-size: 1.05rem; line-height: 1.6; color: var(--text-muted);
    .highlight-gold { color: var(--color-cyan); font-weight: 600; }
  }
}

.app-column {
  background: rgba(20, 20, 20, 0.8); border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3.5rem 2.5rem; border-radius: 24px; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
}

.app-subtitle {
  font-size: 1.6rem; font-weight: 800; margin-bottom: 3rem; color: var(--text); text-align: center;
  position: relative; text-transform: uppercase; letter-spacing: 0.05em;
  &::after { content: ''; position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); width: 50px; height: 3px; background-color: var(--color-cyan); }
}

.apps-list { display: flex; flex-direction: column; gap: 2.5rem; }

.app-item {
  display: flex; gap: 1.5rem; align-items: flex-start;

  .app-icon-box {
    width: 55px; height: 55px; border-radius: 12px; background: rgba(56, 182, 255, 0.1); color: var(--color-cyan);
    display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; transition: all 0.3s ease;
  }

  &:hover .app-icon-box { background: var(--color-cyan); color: #000; transform: scale(1.1); }

  .app-details {
    h4 { font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text); }
    p { font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); }
  }
}
</style>
