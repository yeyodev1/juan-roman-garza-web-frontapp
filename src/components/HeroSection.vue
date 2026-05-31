<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const forbesMockup = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/WhatsApp_Image_2026-05-27_at_7_08_51_PM.jpg';
const profileImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/99f4f652-01b1-4bf3-91af-9e73da8e6c0d.jpg';

onMounted(() => {
  const tl = gsap.timeline();
  
  // Initial entrance animation - Everything centered
  tl.fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.2)
    .fromTo('.hero-title .line', { opacity: 0, y: 80, rotationX: 20 }, { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }, 0.4)
    .fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.8)
    .fromTo('.hero-actions', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.0)
    .fromTo('.hero-media-content', 
      { opacity: 0, y: 150, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, 
      1.2
    );

  // Parallax on scroll
  gsap.to('.hero-media-content', {
    yPercent: -20, // Moves up faster than the background
    scale: 1.05,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.hero-text-content', {
    yPercent: 30, // Moves down slower, creating parallax separation
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section id="home" class="hero-section">
    <!-- Subtle Background Elements -->
    <div class="bg-noise"></div>
    <div class="glow-sphere glow-primary"></div>
    
    <div class="container hero-container">
      
      <!-- Text Content (Centered) -->
      <div class="hero-text-content">
        <span class="hero-tag">LIDERAZGO & SALUD PIONERA</span>
        
        <h1 class="hero-title">
          <div class="line-wrapper"><span class="line">LONGEVIDAD</span></div>
          <div class="line-wrapper"><span class="line text-gold">REGENERATIVA</span></div>
        </h1>
        
        <div class="subtitle-block">El Nuevo Activo Estratégico</div>
        
        <p class="hero-desc">
          Conectando Psicología Organizacional, Tecnología y Medicina Regenerativa para potenciar el rendimiento de los líderes del siglo XXI. Mantén tu vitalidad frente a los desafíos corporativos.
        </p>
        
        <div class="hero-actions">
          <button class="btn-primary" @click="router.push('/contacto')">
            <i class="fa-regular fa-calendar-check"></i> Agenda una Consulta
          </button>
          <button class="btn-secondary" @click="router.push('/longevidad-regenerativa')">
            Descubre el Enfoque
          </button>
        </div>
      </div>

      <!-- Media Content (Centered below text) -->
      <div class="hero-media-content">
        <div class="forbes-wrapper">
          <img :src="forbesMockup" alt="Forbes Magazine Cover" class="forbes-img" />
          <div class="glow-border"></div>
          
          <!-- Glassmorphism Badge -->
          <div class="glass-badge">
             <img :src="profileImage" alt="Juan Román Garza" class="badge-img" />
             <div class="badge-text">
               <strong>Juan Román Garza</strong>
               <span>Fundador</span>
             </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative; 
  width: 100%; 
  min-height: 100vh;
  background-color: var(--bg); 
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 150px; // Offset for header + extra space
  padding-bottom: 100px;
}

.bg-noise {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E');
  z-index: 0; pointer-events: none;
}

.glow-sphere {
  position: absolute; border-radius: 50%; filter: blur(140px); opacity: 0.15; z-index: 1; pointer-events: none;
  &.glow-primary { width: 800px; height: 800px; top: -20%; left: 50%; transform: translateX(-50%); background: radial-gradient(circle, var(--accent) 0%, transparent 70%); }
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  z-index: 2;
  position: relative;
  width: 100%;
  text-align: center;
}

/* Typography (Centered) */
.hero-text-content {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-tag {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.2em;
  color: var(--accent-gold); margin-bottom: 2.5rem; padding: 0.5rem 1.2rem;
  border: 1px solid rgba(229, 213, 181, 0.3); border-radius: 50px; background: rgba(229, 213, 181, 0.05);
  display: inline-block;
}

.hero-title {
  font-size: 5.5rem;
  line-height: 1.05;
  margin-bottom: 0.5rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text);
  perspective: 1000px;
  
  @media (max-width: 1200px) { font-size: 4.5rem; }
  @media (max-width: 768px) { font-size: 3rem; }

  .line-wrapper {
    overflow: hidden;
    padding-bottom: 0.2rem;
  }

  .line {
    display: block;
    will-change: transform, opacity;
    transform-origin: bottom center;
  }

  .text-gold {
    color: transparent;
    -webkit-text-stroke: 1px var(--accent-gold);
    background: linear-gradient(135deg, var(--accent-gold) 0%, #b89528 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
}

.subtitle-block {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: var(--text-muted);
  font-family: var(--font-secondary);
  letter-spacing: -0.02em;

  @media (max-width: 768px) { font-size: 1.5rem; }
}

.hero-desc { 
  font-size: 1.25rem; 
  color: var(--text-muted); 
  max-width: 700px; 
  margin-bottom: 3.5rem; 
  line-height: 1.8; 
}

.hero-actions { 
  display: flex; gap: 1.5rem; justify-content: center;
  @media (max-width: 480px) { flex-direction: column; width: 100%; } 
}

.btn-primary {
  background: var(--text); color: var(--bg); border: none;
  padding: 1.2rem 2.5rem; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); background: var(--accent-gold); color: #111; }
}

.btn-secondary {
  background: transparent; color: var(--text); border: 1px solid var(--border); 
  padding: 1.2rem 2.5rem; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; 
  transition: all 0.3s ease;
  &:hover { background-color: var(--text); color: var(--bg); border-color: var(--text); }
}


/* Centered Media / Forbes Cover */
.hero-media-content { 
  width: 100%; 
  display: flex; justify-content: center; align-items: center; 
  perspective: 1200px; 
  margin-top: 2rem;
}

.forbes-wrapper {
  position: relative; 
  width: 100%; 
  max-width: 350px;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4);
  transform-style: preserve-3d;
  will-change: transform;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) { max-width: 280px; }
}

.forbes-img {
  width: 100%; height: 100%; object-fit: cover;
}

.glow-border {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  box-shadow: inset 0 0 50px rgba(229, 213, 181, 0.2); pointer-events: none;
  border-radius: 20px;
}

/* Glassmorphism Profile Badge */
.glass-badge {
  position: absolute;
  bottom: -25px;
  right: -40px;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  padding: 1rem 1.5rem 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  transform: translateZ(60px); 
  
  @media (max-width: 768px) {
    right: 50%;
    transform: translateX(50%) translateZ(60px);
    bottom: -30px;
  }
  
  .badge-img {
    width: 65px; height: 65px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent-gold);
  }
  
  .badge-text {
    display: flex; flex-direction: column;
    text-align: left;
    
    strong { font-family: var(--font-principal); color: #fff; font-size: 1.05rem; line-height: 1.2; }
    span { color: var(--accent-gold); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.2rem; }
  }
}
</style>
