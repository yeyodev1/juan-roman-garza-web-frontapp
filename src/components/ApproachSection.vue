<script setup lang="ts">
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
</script>

<template>
  <section id="approach" class="approach-section section-padding">
    <div class="container">
      <div class="approach-grid">
        <div class="science-column">
          <span class="section-tag">EL ENFOQUE CIENTÍFICO</span>
          <h2 class="approach-title">Medicina Regenerativa: El Futuro de la Longevidad</h2>
          <div class="accent-bar"></div>

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
.approach-section { background-color: var(--bg-offset); transition: background-color 0.3s ease; }

.approach-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6rem;
  align-items: flex-start;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 4rem; }
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
  color: var(--accent); letter-spacing: 0.1em; margin-bottom: 0.5rem; display: inline-block;
}

.approach-title {
  font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--text);
  @media (max-width: 768px) { font-size: 1.8rem; }
}

.accent-bar { width: 55px; height: 3px; background-color: var(--accent-gold); margin-bottom: 2.5rem; }

.explanation-text {
  font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 3rem;
  .highlight { color: var(--text); font-weight: 600; }
}

.protocol-card {
  background: var(--card-bg); border: 1px solid var(--border); border-left: 4px solid var(--accent);
  padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  .protocol-header {
    display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
    .protocol-icon { font-size: 1.5rem; color: var(--accent); }
    h3 { font-size: 1.2rem; font-weight: 700; color: var(--text); }
  }

  .protocol-text {
    font-size: 0.95rem; line-height: 1.6; color: var(--text-muted);
    .highlight-gold { color: var(--accent-gold); font-weight: 600; }
  }
}

.app-column {
  background-color: var(--card-bg); border: 1px solid var(--border);
  padding: 3rem 2.5rem; border-radius: 24px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
}

.app-subtitle {
  font-size: 1.4rem; font-weight: 700; margin-bottom: 3rem; color: var(--text); text-align: center;
  position: relative;
  &::after { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 40px; height: 2px; background-color: var(--accent-gold); }
}

.apps-list { display: flex; flex-direction: column; gap: 2.5rem; }

.app-item {
  display: flex; gap: 1.5rem; align-items: flex-start;

  .app-icon-box {
    width: 48px; height: 48px; border-radius: 10px; background: rgba(212, 175, 55, 0.1); color: var(--accent-gold);
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; transition: all 0.3s ease;
  }

  &:hover .app-icon-box { background: var(--accent-gold); color: var(--bg); transform: scale(1.08); }

  .app-details {
    h4 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text); }
    p { font-size: 0.9rem; line-height: 1.5; color: var(--text-muted); }
  }
}
</style>
