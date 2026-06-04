<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// High-end assets for Powerhouse
const heroVideo = 'https://res.cloudinary.com/drw5sn8qw/video/upload/v1780095169/assets-juan/WhatsApp_Video_2026-05-29_at_12_43_38_PM.mp4';
const imageAuditorium = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg';
const imagePresentation = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/65feeba0-0dce-4cff-b63d-eb15952be89c.jpg';
import powerhouseLogo from '@/assets/partners/powerhouse-logo.png';

onMounted(() => {
  const tl = gsap.timeline();
  
  // 1. Hero Background Video & Overlay Reveal
  tl.fromTo('.ph-hero-bg', 
    { scale: 1.15, filter: 'blur(15px)', opacity: 0 }, 
    { scale: 1, filter: 'blur(0px)', opacity: 0.6, duration: 2.5, ease: 'power3.out' }
  )
  .fromTo('.ph-hero-tag', 
    { opacity: 0, y: 30, letterSpacing: '0em' }, 
    { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 1.5, ease: 'power3.out' }, '-=1.5'
  )
  // 2. Title Logo Reveal
  .fromTo('.ph-hero-logo', 
    { opacity: 0, y: 50, scale: 0.9 }, 
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'back.out(1.5)' }, '-=1.2'
  )
  // 3. Subtitle Reveal
  .fromTo('.ph-hero-subtitle', 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, '-=0.8'
  );

  // Stats Counter Animation (Triggered on Scroll)
  gsap.utils.toArray('.stat-num').forEach((el: any) => {
    const endValue = parseInt(el.getAttribute('data-val'));
    const suffix = el.getAttribute('data-suffix') || '';
    
    ScrollTrigger.create({
      trigger: '.ph-stats-section',
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          innerHTML: endValue,
          duration: 2.5,
          ease: 'power3.out',
          snap: { innerHTML: 1 },
          onUpdate: function() {
            el.innerHTML = Math.round(Number(el.innerHTML)) + suffix;
          }
        });
      },
      once: true
    });
  });

  // Sticky Section & Scroll Reveal Text
  gsap.utils.toArray('.reveal-text').forEach((text: any) => {
    gsap.fromTo(text, 
      { opacity: 0.1, y: 40 }, 
      { 
        opacity: 1, y: 0, 
        scrollTrigger: { 
          trigger: text, 
          start: 'top 85%', 
          end: 'bottom 60%', 
          scrub: 1 
        } 
      }
    );
  });

  // Image Parallax Reveal
  gsap.utils.toArray('.ph-image-reveal').forEach((wrapper: any) => {
    const img = wrapper.querySelector('img');
    
    const tlImg = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: 'top 80%' }
    });
    
    tlImg.fromTo(wrapper, 
      { clipPath: 'inset(100% 0 0 0)' }, 
      { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut' }
    );
    
    tlImg.fromTo(img, 
      { scale: 1.3 }, 
      { scale: 1, duration: 2, ease: 'power3.out' }, '<'
    );
  });

  // Line Animations
  gsap.utils.toArray('.anim-line').forEach((line: any) => {
    gsap.fromTo(line, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 1.5, ease: 'power3.inOut', transformOrigin: 'left center', scrollTrigger: { trigger: line, start: 'top 90%' } }
    );
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <div class="powerhouse-layout">
    
    <!-- Hero Section with Video Background -->
    <section class="ph-hero">
      <video class="ph-hero-bg" autoplay loop muted playsinline>
        <source :src="heroVideo" type="video/mp4" />
      </video>
      <div class="ph-hero-overlay"></div>
      
      <div class="ph-hero-content text-center">
        <span class="ph-hero-tag">EL PROYECTO CUMBRE</span>
        <img :src="powerhouseLogo" alt="Powerhouse Biotech" class="ph-hero-logo" />
        <p class="ph-hero-subtitle">
          La primera <strong class="text-cyan">Health Decision Platform</strong> enfocada en Medicina Regenerativa.
        </p>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <span class="scroll-text">DESCUBRE LA PLATAFORMA</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Impact Stats Section -->
    <section class="ph-stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-num" data-val="15" data-suffix="+">0</span>
            <div class="stat-divider"></div>
            <span class="stat-label">Años de Liderazgo<br>en Medicina</span>
          </div>
          <div class="stat-item">
            <span class="stat-num" data-val="100" data-suffix="K+">0</span>
            <div class="stat-divider"></div>
            <span class="stat-label">Casos Analizados<br>Exitosamente</span>
          </div>
          <div class="stat-item">
            <span class="stat-num" data-val="1" data-suffix="ra">0</span>
            <div class="stat-divider"></div>
            <span class="stat-label">Health Decision Platform<br>en su clase</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Narrative Layout -->
    <section class="ph-narrative-section">
      <div class="container">
        <div class="sticky-grid">
        <!-- Left: Sticky Titles -->
        <div class="sticky-sidebar">
          <h2 class="sidebar-title">Ciencia al Servicio del <span class="text-cyan">Rendimiento</span></h2>
          <div class="anim-line"></div>
          <p class="sidebar-desc">Una plataforma integral diseñada exclusivamente para líderes de alto rendimiento, fundada y dirigida por Juan Román Garza.</p>
          
          <a href="https://www.powerhousebiotech.com/" target="_blank" rel="noopener noreferrer" class="ph-btn-outline">
            Ingresar a la Plataforma <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <!-- Right: Scrolling Content & Imagery -->
        <div class="scrolling-content">
          
          <div class="content-block">
            <div class="ph-image-reveal">
              <img :src="imageAuditorium" alt="Conferencia de Longevidad Regenerativa" />
            </div>
            <h3 class="reveal-text">El Cimiento de la Lucidez Directiva</h3>
            <p class="reveal-text">Powerhouse Biotech nace de una convicción inquebrantable: un cuerpo regenerado y optimizado celularmente es el cimiento absoluto de la lucidez directiva. No somos una clínica tradicional; somos una entidad tecnológica-médica.</p>
          </div>

          <div class="content-block">
            <div class="ph-image-reveal">
              <img :src="imagePresentation" alt="Presentación de Powerhouse Biotech" />
            </div>
            <h3 class="reveal-text">Evaluación de Viabilidad Regenerativa™</h3>
            <p class="reveal-text">Antes de sugerir cualquier tratamiento, realizamos un análisis exhaustivo, brutalmente honesto y puramente científico. Nuestro protocolo patentado nos permite determinar con precisión si tu cuerpo está verdaderamente listo para repararse a nivel celular.</p>
            <p class="reveal-text highlight-quote">"Eliminamos conjeturas para proteger tu inversión biológica."</p>
          </div>

        </div>
      </div>
      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
.powerhouse-layout {
  background-color: var(--bg);
  color: var(--text);
  /* overflow: hidden; removed to fix sticky positioning */
  padding-bottom: 120px;
}

/* --- Hero Section --- */
.ph-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 100px; /* Space for the fixed header */
}

.ph-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.ph-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(3,3,3,0.5) 0%, rgba(3,3,3,0.95) 100%);
  z-index: 2;
}

.ph-hero-content {
  position: relative;
  z-index: 3;
  max-width: 1000px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ph-hero-tag {
  font-family: var(--font-principal);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-cyan);
  border: 1px solid rgba(56, 182, 255, 0.4);
  padding: 0.6rem 2rem;
  border-radius: 50px;
  margin-bottom: 2rem;
  text-transform: uppercase;
  background: rgba(15, 15, 15, 0.4);
  backdrop-filter: blur(5px);
}

.ph-hero-logo {
  width: 100%;
  max-width: 900px;
  height: auto;
  margin-bottom: 2rem;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6));
  
  @media (max-width: 768px) {
    max-width: 85%;
  }
}

.ph-hero-subtitle {
  font-size: 1.8rem;
  color: #cccccc;
  line-height: 1.5;
  font-weight: 300;
  
  .text-cyan { color: var(--color-cyan); font-weight: 600; }
  
  @media (max-width: 768px) { font-size: 1.3rem; }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  .scroll-text {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    color: var(--color-cyan);
    font-weight: 700;
  }
  
  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--color-cyan) 0%, transparent 100%);
    animation: scrollDrop 2s infinite ease-in-out;
  }
}

@keyframes scrollDrop {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  50.1% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* --- Stats Section --- */
.ph-stats-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 6rem 0;
  background: linear-gradient(to bottom, transparent, rgba(56, 182, 255, 0.03), transparent);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.stat-num {
  font-family: var(--font-principal);
  font-size: 5rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
  text-shadow: 0 10px 30px rgba(56, 182, 255, 0.2);
}

.stat-divider {
  width: 40px;
  height: 2px;
  background-color: var(--color-cyan);
}

.stat-label {
  font-size: 1rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1.5;
}

/* --- Sticky Narrative Section --- */
.ph-narrative-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 6rem 1.5rem;
}

.sticky-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  width: 100%;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

.sticky-sidebar {
  position: sticky;
  top: 150px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  
  @media (max-width: 992px) { position: relative; top: 0; }
}

.sidebar-title {
  font-size: 3.5rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.1;
  
  .text-cyan { color: var(--color-cyan); }
  @media (max-width: 768px) { font-size: 2.5rem; }
}

.anim-line {
  width: 100%;
  max-width: 150px;
  height: 3px;
  background-color: var(--color-cyan);
}

.sidebar-desc {
  font-size: 1.3rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.ph-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2.5rem;
  border: 1px solid var(--color-cyan);
  color: var(--color-cyan);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.4s ease;
  margin-top: 1rem;
  
  &:hover {
    background: var(--color-cyan);
    color: #030303;
    box-shadow: 0 10px 30px rgba(56, 182, 255, 0.2);
    
    i { transform: translateX(5px); }
  }
}

.scrolling-content {
  display: flex;
  flex-direction: column;
  gap: 10rem;
}

.content-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ph-image-reveal {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: center;
  }
}

.reveal-text {
  font-size: 1.4rem;
  color: var(--text-muted);
  line-height: 1.8;
  
  &.highlight-quote {
    font-size: 1.6rem;
    font-style: italic;
    color: var(--color-cyan);
    border-left: 3px solid var(--color-cyan);
    padding-left: 2rem;
    margin-top: 1rem;
  }
}

h3.reveal-text {
  font-size: 2.2rem;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 0.95;
  margin-top: 0;
  margin-bottom: 0.2rem;
}
</style>
