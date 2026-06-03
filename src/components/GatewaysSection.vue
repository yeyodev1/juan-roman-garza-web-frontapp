<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const gates = [
  { num: '01', path: '/sobre-mi', label: 'Biografía & Trayectoria', title: 'Sobre Mí', image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg' },
  { num: '02', path: '/powerhouse', label: 'Proyecto Cumbre', title: 'Powerhouse', image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095165/assets-juan/71a520fc-beb0-4eb0-b7b6-3e97fef04266.jpg' },
  { num: '03', path: '/longevidad-regenerativa', label: 'Ciencia Celular', title: 'Longevidad', image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095163/assets-juan/5dfa62f2-170e-42eb-867b-f98a1c816781.jpg' },
  { num: '04', path: '/empresas', label: 'Ecosistema de Salud', title: 'Empresas', image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095170/assets-juan/c13684b0-ba0e-4bd2-954f-f2ec6756421d.jpg' },
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

  // Cards Entrance Animation
  gsap.fromTo('.gate-card',
    { opacity: 0, y: 100 },
    {
      opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: 'power4.out',
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

      <!-- Awwwards Expanding Accordion Layout -->
      <div class="gateways-grid">
        <div
          v-for="gate in gates"
          :key="gate.path"
          class="gate-card"
          @click="router.push(gate.path)"
        >
          <!-- Background Image -->
          <img :src="gate.image" :alt="gate.title" class="gate-bg-img" loading="lazy" />
          
          <!-- Content Overlay -->
          <div class="gate-content">
            <div class="gate-num">{{ gate.num }}</div>
            <div class="gate-text-content">
              <h3 class="gate-title">{{ gate.title }}</h3>
              <p class="gate-label">{{ gate.label }}</p>
            </div>
            
            <div class="gate-arrow">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.gateways-section { 
  background-color: var(--bg); 
  width: 100%; 
  padding: 150px 0; 
  overflow: hidden;
}

.gateways-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gateways-header {
  text-align: center; max-width: 800px; margin-bottom: 6rem;
  display: flex; flex-direction: column; align-items: center;
  
  .section-tag {
    font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
    color: var(--color-cyan); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
    border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
  }
  .section-title { 
    font-size: 4rem; color: var(--text); margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; 
    @media (max-width: 768px) { font-size: 2.5rem; } 
  }
  .accent-line { width: 80px; height: 3px; background-color: var(--color-cyan); margin: 0 auto; }
}

/* --- Expanding Accordion Grid --- */
.gateways-grid {
  display: flex;
  height: 600px;
  width: 100%;
  max-width: 1400px;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
    height: 1000px;
  }
}

.gate-card {
  flex: 1;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.7s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease;
  background-color: var(--bg);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  
  &:hover {
    flex: 3;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
    border: 1px solid rgba(56, 182, 255, 0.3);
    
    .gate-bg-img {
      transform: scale(1.05);
      filter: grayscale(0%) brightness(0.8);
      opacity: 0.7;
    }
    
    .gate-content {
      background: linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.4) 50%, transparent 100%);
    }

    .gate-label {
      opacity: 1;
      transform: translateY(0);
      max-height: 50px;
    }
    
    .gate-num {
      color: var(--color-cyan);
    }
    
    .gate-arrow {
      opacity: 1;
      transform: scale(1) rotate(-45deg);
      background-color: var(--color-cyan);
      color: #000;
    }
    
    .gate-title {
      color: #fff;
      letter-spacing: 0.05em;
    }
  }
  
  @media (max-width: 992px) {
    &:hover { flex: 2; }
  }
}

/* --- Card Background Image --- */
.gate-bg-img {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(100%) brightness(0.4);
  opacity: 0.4;
  transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}

/* --- Card Content --- */
.gate-content {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 80%);
  transition: background 0.7s ease;
  z-index: 2;
  
  @media (max-width: 768px) { padding: 1.5rem; }
}

.gate-num {
  font-family: var(--font-principal); 
  font-size: 1.5rem; 
  font-weight: 800; 
  color: rgba(255, 255, 255, 0.4); 
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
  transition: color 0.5s ease;
  
  @media (max-width: 768px) { top: 1.5rem; left: 1.5rem; }
}

.gate-text-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 3;
}

.gate-title { 
  font-size: 2rem; 
  font-weight: 800; 
  color: #dddddd;
  text-transform: uppercase; 
  transition: all 0.5s ease;
  white-space: nowrap;
  
  @media (max-width: 1200px) { font-size: 1.5rem; }
  @media (max-width: 992px) { white-space: normal; }
}

.gate-label { 
  font-size: 1.1rem; 
  color: var(--color-cyan); 
  font-weight: 600; 
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0;
  transform: translateY(20px);
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  white-space: nowrap;
}

.gate-arrow {
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  opacity: 0;
  transform: scale(0.5) rotate(0deg);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  
  @media (max-width: 768px) { bottom: 1.5rem; right: 1.5rem; }
}
</style>
