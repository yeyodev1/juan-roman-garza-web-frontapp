<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { title: "CREER EN TU POTENCIAL", desc: "La confianza es la base de todos los grandes logros y el motor que impulsa la innovación continua." },
  { title: "APRENDIZAJE CONTINUO", desc: "El crecimiento verdadero proviene de la curiosidad insaciable y la búsqueda de conocimiento constante." },
  { title: "LIDERAR CON EL EJEMPLO", desc: "La integridad inquebrantable y la consistencia son las que inspiran verdadera confianza y lealtad." },
  { title: "VALORAR A TU EQUIPO", desc: "Un líder extraordinario no solo dirige, sino que eleva, aprecia y potencia a cada persona a su alrededor." },
  { title: "SUPERAR EXPECTATIVAS", desc: "El éxito duradero se construye entregando consistentemente un valor que desafía el estándar del mercado." }
];

onMounted(() => {
  // Reveal Text
  gsap.fromTo('.bio-text > *', 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.bio-text', start: 'top 85%' } }
  );

  // Parallax Images
  gsap.fromTo('.img-main', { opacity: 0, scale: 0.9, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: '.bio-visuals', start: 'top 80%' } });
  gsap.fromTo('.img-secondary', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.2, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.bio-visuals', start: 'top 80%' } });
  gsap.fromTo('.img-tertiary', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.bio-visuals', start: 'top 80%' } });
  gsap.fromTo('.experience-badge', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.8, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.bio-visuals', start: 'top 80%' } });

  // Principles Stagger Animation
  gsap.fromTo('.principle-item', 
    { opacity: 0, y: 60, x: -20 },
    { 
      opacity: 1, y: 0, x: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { 
        trigger: '.principles-list', 
        start: 'top 85%' 
      }
    }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section id="about" class="about-section section-padding">
    <div class="container about-container">
      
      <!-- Split Bio Section -->
      <div class="bio-grid">
        <div class="bio-text">
          <span class="section-tag">EL FUNDADOR DE POWERHOUSE BIOTECH</span>
          <h2 class="about-title">El Puente entre la Mente, la Ciencia y el Rendimiento</h2>
          <div class="accent-line"></div>

          <p class="paragraph">
            Graduado de <strong class="bold-text">Psicología Organizacional en el Tecnológico de Monterrey</strong>, Juan Román Garza es el visionario detrás de <a href="https://www.powerhousebiotech.com/" target="_blank" class="cyan-link">Powerhouse Biotech</a>. Ha dedicado su carrera a descifrar cómo interactúan el comportamiento humano, la tecnología de punta y las ciencias médicas.
          </p>

          <p class="paragraph">
            Su enfoque no se limita a tratar la enfermedad, sino a <strong>optimizar la salud desde su base celular</strong>. Con la firme creencia de que un cuerpo regenerado es el cimiento de la lucidez directiva, Juan Román ha estructurado protocolos de bio-longevidad que transforman la energía y la capacidad de toma de decisiones de los líderes empresariales más exigentes.
          </p>

          <blockquote class="legacy-quote">
            <i class="fa-solid fa-quote-left quote-icon"></i>
            <p>
              "Mi padre, un pionero en medicina regenerativa en México, me enseñó que la clave para curar reside en <strong>aprender a hacer las preguntas correctas</strong> para descifrar la necesidad real de las personas."
            </p>
          </blockquote>

          <div class="signature-block">
            <span class="name">Juan Román Garza</span>
            <span class="role">Fundador & CEO de Powerhouse Biotech</span>
          </div>
        </div>

        <div class="bio-visuals">
          <div class="img-main">
            <img src="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg" alt="Juan Román Garza Portrait" class="parallax-img" loading="lazy" />
          </div>
          <div class="img-secondary">
            <img src="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095165/assets-juan/71a520fc-beb0-4eb0-b7b6-3e97fef04266.jpg" alt="Presentación Longevidad Regenerativa" class="parallax-img" loading="lazy" />
          </div>
          <div class="img-tertiary">
            <img src="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095174/assets-juan/db808425-b579-4ae3-bca6-1cb1cc73fa7d.jpg" alt="Studio Portrait" class="parallax-img" loading="lazy" />
          </div>
          <div class="experience-badge">
            <span class="exp-number">15+</span>
            <span class="exp-text">Años de<br>Liderazgo</span>
          </div>
        </div>
      </div>

      <!-- Core Principles -->
      <div class="principles-section">
        <div class="principles-header text-center">
          <span class="section-tag">FILOSOFÍA DIRECTIVA</span>
          <h2 class="principles-title">5 Principios Fundamentales</h2>
          <div class="accent-line mx-auto"></div>
        </div>

        <div class="principles-list">
          <div v-for="(item, idx) in principles" :key="idx" class="principle-item">
            <div class="p-number">0{{ idx + 1 }}</div>
            <div class="p-content">
              <h3 class="p-title">{{ item.title }}</h3>
              <p class="p-desc">{{ item.desc }}</p>
            </div>
            <div class="p-arrow">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-section { background-color: var(--bg); transition: background-color 0.3s ease; padding-top: 150px; padding-bottom: 120px; min-height: 100vh; overflow: hidden; }

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
  padding: 0 1.5rem;
  width: 100%;
}

/* --- Split Bio Grid --- */
.bio-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  width: 100%;
  max-width: 1300px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

.bio-text {
  display: flex; flex-direction: column; align-items: flex-start; text-align: left;
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
  color: var(--color-cyan); letter-spacing: 0.2em; margin-bottom: 1.5rem; display: inline-block;
  border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px; text-transform: uppercase;
}

.about-title {
  font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--text); font-weight: 800; text-transform: uppercase; line-height: 1.1;
  @media (max-width: 768px) { font-size: 2.5rem; }
}

.accent-line { width: 80px; height: 3px; background-color: var(--color-cyan); margin-bottom: 2.5rem; }
.mx-auto { margin-left: auto; margin-right: auto; }

.paragraph {
  font-size: 1.25rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 2rem;
  strong { color: var(--text); font-weight: 700; }
  .cyan-link, .cyan-link:visited, .cyan-link:active { color: var(--color-cyan); text-decoration: none; font-weight: 700; transition: color 0.3s ease; border-bottom: 1px dashed var(--color-cyan); }
  .cyan-link:hover { color: #fff; border-bottom-color: #fff; }
}

.legacy-quote {
  border-left: 3px solid var(--color-cyan);
  padding: 1.5rem 0 1.5rem 2.5rem; margin: 3rem 0;
  position: relative;

  .quote-icon { position: absolute; top: -10px; left: 0px; font-size: 2.5rem; color: rgba(56, 182, 255, 0.2); }
  p { font-style: italic; font-size: 1.4rem; line-height: 1.7; color: var(--text); font-weight: 300; }
}

.signature-block {
  margin-top: 2rem; display: flex; flex-direction: column; align-items: flex-start;
  .name { font-family: var(--font-principal); font-size: 1.8rem; font-weight: 700; color: var(--text); }
  .role { font-size: 1rem; color: var(--color-cyan); font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 0.5rem; }
}

/* --- Bio Visuals (Awwwards Image Collage) --- */
.bio-visuals {
  position: relative;
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 992px) { height: 600px; }
  @media (max-width: 768px) { height: 500px; }
}

.img-main, .img-secondary, .img-tertiary {
  position: absolute;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
  
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
  &:hover img { transform: scale(1.05); }
}

.img-main {
  width: 70%;
  height: 80%;
  z-index: 2;
  left: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.img-secondary {
  width: 50%;
  height: 45%;
  z-index: 3;
  right: -5%;
  bottom: 5%;
  border: 2px solid var(--color-cyan);
}

.img-tertiary {
  width: 40%;
  height: 40%;
  z-index: 1;
  right: 0;
  top: 0;
  opacity: 0.6;
}

.experience-badge {
  position: absolute;
  top: 15%; left: -10%;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(56, 182, 255, 0.4);
  padding: 1.5rem;
  border-radius: 50%;
  width: 140px; height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 4;
  box-shadow: 0 20px 40px rgba(56, 182, 255, 0.2);

  .exp-number { font-family: var(--font-principal); font-size: 2.5rem; font-weight: 800; color: var(--color-cyan); line-height: 1; }
  .exp-text { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; margin-top: 0.3rem; }
}

/* --- Principles Section --- */
.principles-section {
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.principles-header {
  margin-bottom: 5rem;
  display: flex; flex-direction: column; align-items: center;
  
  .principles-title {
    font-size: 3.5rem; font-weight: 800; color: var(--text); text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1.1;
    @media (max-width: 768px) { font-size: 2.2rem; }
  }
}

.principles-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.principle-item {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 3.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: default;
  position: relative;
  overflow: hidden;
  
  &:first-child { border-top: 1px solid rgba(255, 255, 255, 0.08); }
  
  &::before {
    content: '';
    position: absolute; top: 0; left: 0; width: 0%; height: 100%;
    background: linear-gradient(90deg, rgba(56, 182, 255, 0.05) 0%, transparent 100%);
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 0;
  }
  
  &:hover {
    padding-left: 3rem;
    padding-right: 1rem;
    border-color: var(--color-cyan);
    
    &::before { width: 100%; }
    
    .p-number { color: var(--color-cyan); transform: scale(1.1) translateX(10px); }
    .p-title { color: #fff; letter-spacing: 0.1em; }
    .p-arrow { opacity: 1; transform: translateX(0); color: var(--color-cyan); }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 2.5rem 1rem;
    
    &:hover { padding-left: 1.5rem; padding-right: 0.5rem; }
  }
}

.p-number {
  font-family: var(--font-principal);
  font-size: 5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.05);
  line-height: 1;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  width: 140px;
  flex-shrink: 0;
  position: relative; z-index: 1;
  
  @media (max-width: 768px) { font-size: 4rem; width: auto; }
}

.p-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  position: relative; z-index: 1;
}

.p-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.5s ease;
  @media (max-width: 768px) { font-size: 1.4rem; }
}

.p-desc {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.p-arrow {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative; z-index: 1;
  
  @media (max-width: 768px) { display: none; }
}
</style>
