<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const gates = [
  { num: '01', path: '/sobre-mi', label: 'Biografía & Trayectoria', title: 'Sobre Mí', icon: 'fa-user-tie' },
  { num: '02', path: '/longevidad-regenerativa', label: 'Ciencia Celular', title: 'Longevidad', icon: 'fa-dna' },
  { num: '03', path: '/empresas', label: 'Ecosistema de Salud', title: 'Empresas', icon: 'fa-building-shield' },
  { num: '04', path: '/contacto', label: 'Consultas & Clínicas', title: 'Contacto', icon: 'fa-calendar-days' },
];

onMounted(() => {
  // Section Header Animation
  gsap.fromTo('.gateways-header',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gateways-section',
        start: 'top 80%',
      }
    }
  );

  // Cards Staggered Entrance
  gsap.fromTo('.gate-card',
    { opacity: 0, y: 80, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gateways-grid',
        start: 'top 75%',
      }
    }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="gateways-section section-padding">
    <div class="container gateways-container">
      <div class="gateways-header">
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
.gateways-section { background-color: var(--bg); transition: background-color 0.3s ease; width: 100%; padding: 120px 0; }

.gateways-container {
  display: flex;
  flex-direction: column;
  align-items: center; // strictly centered
}

.gateways-header {
  text-align: center; max-width: 800px; margin-bottom: 6rem;
  display: flex; flex-direction: column; align-items: center;
  
  .section-tag {
    font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
    color: var(--accent-gold); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
    border: 1px solid rgba(229, 213, 181, 0.3); padding: 0.5rem 1.2rem; border-radius: 50px;
  }
  .section-title { font-size: 3.5rem; color: var(--text); margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; @media (max-width: 768px) { font-size: 2.2rem; } }
  .accent-line { width: 60px; height: 2px; background-color: var(--accent-gold); margin: 0 auto; }
}

.gateways-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; width: 100%;
  max-width: 1200px;
  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  @media (max-width: 576px) { grid-template-columns: 1fr; }
}

.gate-card {
  background: rgba(15, 15, 15, 0.6); 
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05); 
  padding: 3.5rem 2rem;
  border-radius: 24px; position: relative; overflow: hidden; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; text-align: center; // strictly centered
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;

  &:hover {
    transform: translateY(-10px); border-color: rgba(229, 213, 181, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    background: rgba(20, 20, 20, 0.9);
    
    .gate-arrow { color: var(--accent-gold); .arrow-icon { transform: translateX(5px); } }
    .gate-icon-box { background: rgba(229, 213, 181, 0.1); color: var(--accent-gold); transform: scale(1.1); }
    .card-bg-gradient { opacity: 1; }
  }
}

.card-bg-gradient {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at top right, rgba(229, 213, 181, 0.05) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
}

.gate-num { font-family: var(--font-principal); font-size: 1rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 2rem; letter-spacing: 0.1em; }

.gate-icon-box {
  width: 60px; height: 60px; border-radius: 50%; background: rgba(255, 255, 255, 0.03);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; margin-bottom: 2rem; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.gate-title { font-size: 1.6rem; font-weight: 800; color: #ffffff; margin-bottom: 0.75rem; }
.gate-label { font-size: 0.9rem; color: #a1a1aa; font-weight: 500; margin-bottom: 2.5rem; }

.gate-arrow {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700; color: #e4e4e7;
  display: flex; align-items: center; gap: 0.5rem; text-transform: uppercase;
  letter-spacing: 0.1em; margin-top: auto; transition: color 0.3s ease;
  
  .arrow-icon { transition: transform 0.3s ease; }
}
</style>
