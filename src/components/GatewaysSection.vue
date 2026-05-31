<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const gates = [
  { num: '01', path: '/sobre-mi', label: 'Biografía & Trayectoria', title: 'Sobre Mí', icon: 'fa-user-tie' },
  { num: '02', path: '/longevidad-regenerativa', label: 'Ciencia Celular', title: 'Longevidad', icon: 'fa-dna' },
  { num: '03', path: '/empresas', label: 'Ecosistema de Salud', title: 'Empresas', icon: 'fa-building-shield' },
  { num: '04', path: '/contacto', label: 'Consultas & Clínicas', title: 'Contacto', icon: 'fa-calendar-days' },
];
</script>

<template>
  <section class="gateways-section section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">EXPLORAR CONTENIDO</span>
        <h2 class="section-title text-center">Navegación Estratégica</h2>
        <div class="accent-line"></div>
      </div>

      <div class="gateways-grid">
        <div
          v-for="gate in gates"
          :key="gate.path"
          class="gate-card"
          @click="router.push(gate.path)"
        >
          <div class="card-bg-gradient"></div>
          <span class="gate-num">{{ gate.num }}</span>
          <div class="gate-icon-box">
            <i class="fa-solid" :class="gate.icon"></i>
          </div>
          <h3 class="gate-title">{{ gate.title }}</h3>
          <p class="gate-label">{{ gate.label }}</p>
          <div class="gate-arrow">
            Explorar <i class="fa-solid fa-arrow-right arrow-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.gateways-section { background-color: var(--bg-offset); transition: background-color 0.3s ease; width: 100%; }

.section-header {
  text-align: center; max-width: 800px; margin-bottom: 5rem;
  .section-tag {
    font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
    color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; display: inline-block;
  }
  .section-title { font-size: 2.5rem; color: var(--text); margin-bottom: 1.5rem; @media (max-width: 768px) { font-size: 1.8rem; } }
  .accent-line { width: 55px; height: 3px; background-color: var(--accent-gold); margin: 0 auto; }
}

.gateways-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; width: 100%;
  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 576px) { grid-template-columns: 1fr; }
}

.gate-card {
  background-color: var(--card-bg); border: 1px solid var(--border); padding: 3rem 2rem;
  border-radius: 20px; position: relative; overflow: hidden; cursor: pointer;
  display: flex; flex-direction: column; align-items: flex-start; text-align: left;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-8px); border-color: var(--accent-gold);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    .gate-arrow { color: var(--accent-gold); .arrow-icon { transform: translateX(5px); } }
    .gate-icon-box { background: rgba(212, 175, 55, 0.1); color: var(--accent-gold); }
    .card-bg-gradient { opacity: 0.03; }
  }
}

.card-bg-gradient {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
  opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
}

.gate-num { font-family: var(--font-principal); font-size: 1rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 1.5rem; }

.gate-icon-box {
  width: 52px; height: 52px; border-radius: 12px; background: rgba(32, 148, 210, 0.08);
  color: var(--accent); display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; margin-bottom: 2rem; transition: all 0.3s ease;
}

.gate-title { font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 0.5rem; }
.gate-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; margin-bottom: 2rem; }

.gate-arrow {
  font-family: var(--font-principal); font-size: 0.8rem; font-weight: 700; color: var(--text);
  display: flex; align-items: center; gap: 0.5rem; text-transform: uppercase;
  letter-spacing: 0.05em; margin-top: auto; transition: color 0.3s ease;
  
  .arrow-icon { transition: transform 0.3s ease; }
}
</style>
