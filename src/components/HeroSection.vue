<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

// High quality studio headshot for background
const heroBgImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg';
// Forbes mockup for credibility badge
const forbesMockup = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095167/assets-juan/WhatsApp_Image_2026-05-27_at_7_08_51_PM.jpg';

const forbesCard = ref<HTMLElement | null>(null);

onMounted(() => {
  const tl = gsap.timeline();
  
  // Background Image Scale-in Effect
  gsap.fromTo('.hero-bg-img', 
    { scale: 1.15, filter: 'blur(10px)' }, 
    { scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out' }
  );
  
  // Initial entrance animation - Everything centered
  tl.fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.5)
    .fromTo('.hero-title .line', { opacity: 0, y: 80, rotationX: 20 }, { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }, 0.7)
    .fromTo('.subtitle-block', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1.1)
    .fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.3)
    .fromTo('.hero-actions', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.5)
    .fromTo('.credibility-badge', { opacity: 0, x: 100, rotationY: 20, scale: 0.8 }, { opacity: 1, x: 0, rotationY: -5, scale: 1, duration: 1.5, ease: 'back.out(1.2)' }, 1.8);

  // Background Parallax on scroll
  gsap.to('.hero-bg-img', {
    yPercent: 20, // Moves down slightly as user scrolls down
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Text Content Parallax on scroll
  gsap.to('.hero-container', {
    yPercent: 35, // Moves down slower than scroll
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // 3D Interactive Hover Effect for Forbes Card
  if (forbesCard.value) {
    forbesCard.value.addEventListener('mousemove', (e) => {
      const rect = forbesCard.value!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Calculate rotation (max 15 degrees)
      const rotateX = (0.5 - yPercent) * 30; 
      const rotateY = (xPercent - 0.5) * 30; 

      gsap.to(forbesCard.value, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000
      });
      
      // Move glare exactly to mouse position
      gsap.to('.forbes-glare', {
        x: x,
        y: y,
        opacity: 1,
        duration: 0.1
      });
    });

    forbesCard.value.addEventListener('mouseleave', () => {
      gsap.to(forbesCard.value, {
        rotationX: -5, // Default resting state
        rotationY: -5,
        duration: 0.8,
        ease: 'power2.out'
      });
      gsap.to('.forbes-glare', { opacity: 0, duration: 0.8 });
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section id="home" class="hero-section">
    
    <!-- Fullscreen Background Media -->
    <div class="hero-bg-wrapper">
      <img :src="heroBgImage" class="hero-bg-img" alt="Juan Román Garza Background" loading="eager" />
      <!-- Dark Gradient Overlay for Text Readability -->
      <div class="hero-bg-overlay"></div>
    </div>
    
    <div class="container hero-container">
      <!-- Text Content (Perfectly Centered) -->
      <div class="hero-text-content">
        <span class="hero-tag">LIDERAZGO & SALUD PIONERA</span>
        
        <h1 class="hero-title">
          <div class="line-wrapper"><span class="line">LONGEVIDAD</span></div>
          <div class="line-wrapper"><span class="line text-cyan">REGENERATIVA</span></div>
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
      <!-- Massive Interactive Forbes Card -->
      <div class="credibility-badge" ref="forbesCard">
        <div class="badge-content">
          <img :src="forbesMockup" alt="Forbes Magazine" class="badge-cover-large" />
          <div class="forbes-glare"></div>
        </div>
        
        <!-- 3D Pop-out Label -->
        <div class="badge-info-floating">
          <span class="badge-title">Destacado en</span>
          <span class="badge-subtitle">Forbes Magazine</span>
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
  padding-top: 100px; 
}

/* Background Image & Overlay */
.hero-bg-wrapper {
  position: absolute;
  top: -10%; left: -5%;
  width: 110%; height: 120%;
  z-index: 0;
  overflow: hidden;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  will-change: transform, filter;
}

.hero-bg-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  /* Elegant deep vignette gradient */
  background: radial-gradient(circle at center, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.85) 70%, rgba(5,5,5,0.95) 100%);
  z-index: 1;
}

/* Main Container */
.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

/* Typography (Centered) */
.hero-text-content {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero-tag {
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700; letter-spacing: 0.25em;
  color: var(--accent-gold); margin-bottom: 2.5rem; padding: 0.6rem 1.5rem;
  border: 1px solid rgba(229, 213, 181, 0.4); border-radius: 50px; 
  background: rgba(20, 20, 20, 0.5);
  backdrop-filter: blur(10px);
  display: inline-block;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.hero-title {
  font-size: 6.5rem;
  line-height: 1.05;
  margin-bottom: 0.5rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #ffffff;
  perspective: 1000px;
  text-shadow: 0 20px 50px rgba(0,0,0,0.8);
  
  @media (max-width: 1200px) { font-size: 5rem; }
  @media (max-width: 768px) { font-size: 3.2rem; }
  @media (max-width: 480px) { font-size: 2.5rem; }

  .line-wrapper {
    overflow: hidden;
    padding-bottom: 0.2rem;
  }

  .line {
    display: block;
    will-change: transform, opacity;
    transform-origin: bottom center;
  }

  .text-cyan {
    color: transparent;
    -webkit-text-stroke: 1px rgba(56, 182, 255, 0.5);
    background: linear-gradient(135deg, #38b6ff 0%, #007bb5 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }
}

.subtitle-block {
  font-size: 2.2rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
  color: #e4e4e7;
  font-family: var(--font-secondary);
  letter-spacing: -0.02em;
  text-shadow: 0 10px 20px rgba(0,0,0,0.8);

  @media (max-width: 768px) { font-size: 1.5rem; }
}

.hero-desc { 
  font-size: 1.35rem; 
  color: #a1a1aa; 
  max-width: 750px; 
  margin-bottom: 4rem; 
  line-height: 1.8; 
  text-shadow: 0 5px 15px rgba(0,0,0,0.9);
  
  @media (max-width: 768px) { font-size: 1.1rem; }
}

.hero-actions { 
  display: flex; gap: 1.5rem; justify-content: center;
  @media (max-width: 480px) { flex-direction: column; width: 100%; max-width: 300px; margin: 0 auto; } 
}

.btn-primary {
  background: var(--text); color: var(--bg); border: none;
  padding: 1.2rem 2.5rem; border-radius: 50px; font-size: 1.05rem; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 15px 30px rgba(0,0,0,0.4);
  &:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.6); background: var(--accent-gold); color: #111; }
}

.btn-secondary {
  background: rgba(20, 20, 20, 0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); 
  backdrop-filter: blur(10px);
  padding: 1.2rem 2.5rem; border-radius: 50px; font-size: 1.05rem; font-weight: 600; cursor: pointer; 
  transition: all 0.3s ease;
  &:hover { background-color: #fff; color: #000; }
}

/* Massive Interactive Forbes Card */
.credibility-badge {
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 220px; /* Reduced scale to prevent overlapping */
  border-radius: 16px;
  transform-style: preserve-3d;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  border: 1px solid rgba(255, 255, 255, 0.3); /* Silver styling instead of gold */
  transform: perspective(1000px) rotateY(-5deg) rotateX(-5deg);

  @media (max-width: 1400px) { width: 180px; right: 3%; }
  @media (max-width: 1200px) {
    position: relative;
    bottom: auto; right: auto;
    margin-top: 4rem;
    transform: none;
  }

  .badge-content {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
  }

  .badge-cover-large {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
  }

  .forbes-glare {
    position: absolute;
    top: 0; left: 0;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
    opacity: 0;
    pointer-events: none;
    z-index: 5;
    mix-blend-mode: overlay;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  /* 3D Pop-out label */
  .badge-info-floating {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%) translateZ(60px); // pops out of the screen
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(212, 175, 55, 0.6);
    padding: 1rem 2rem;
    border-radius: 50px;
    white-space: nowrap;
    text-align: center;
    box-shadow: 0 15px 30px rgba(0,0,0,0.7);

    .badge-title { display: block; color: #a1a1aa; font-family: var(--font-principal); font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.2rem; }
    .badge-subtitle { display: block; color: #fff; font-size: 1.25rem; font-weight: 800; text-transform: uppercase; text-shadow: 0 2px 10px rgba(212, 175, 55, 0.5); }
  }
}
</style>
