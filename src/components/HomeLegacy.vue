<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fatherImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095165/assets-juan/71a520fc-beb0-4eb0-b7b6-3e97fef04266.jpg';
const eternalImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095170/assets-juan/c13684b0-ba0e-4bd2-954f-f2ec6756421d.jpg';
const powerhouseImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/65feeba0-0dce-4cff-b63d-eb15952be89c.jpg';

onMounted(() => {
  gsap.fromTo('.legacy-content',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.legacy-section', start: 'top 80%' } }
  );
  gsap.fromTo('.legacy-image',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.legacy-section', start: 'top 80%' } }
  );

  gsap.fromTo('.whatido-header',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.whatido-section', start: 'top 85%' } }
  );
  gsap.fromTo('.whatido-card',
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.whatido-grid', start: 'top 75%' } }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});

const projects = [
  {
    title: 'Eternal Medical Center',
    desc: 'Atención médica regenerativa avanzada.',
    image: eternalImage,
    icon: 'fa-hospital'
  },
  {
    title: 'PowerHouse Biotech',
    desc: 'Plataforma de inteligencia clínica y evaluación biológica.',
    image: powerhouseImage,
    icon: 'fa-microchip'
  },
  {
    title: 'Educación Médica',
    desc: 'Programas de capacitación y divulgación científica.',
    icon: 'fa-graduation-cap'
  },
  {
    title: 'Investigación y Desarrollo',
    desc: 'Análisis de biomarcadores, longevidad y tecnologías emergentes.',
    icon: 'fa-flask'
  }
];
</script>

<template>
  <section class="legacy-section section-padding">
    <div class="container legacy-container">
      <div class="legacy-grid">
        <div class="legacy-image">
          <img :src="fatherImage" alt="Dr. Juan Antonio Garza Quintanilla" loading="lazy" />
          <div class="legacy-image-badge">LEGADO FAMILIAR</div>
        </div>
        <div class="legacy-content">
          <span class="section-tag">EL LEGADO QUE ME INSPIRA</span>
          <h2 class="legacy-title">La medicina como servicio</h2>
          <div class="accent-line"></div>
          <p class="legacy-paragraph">
            Mi mayor inspiración ha sido el ejemplo de mi padre, el <strong>Dr. Juan Antonio Garza Quintanilla</strong>.
          </p>
          <p class="legacy-paragraph">
            De él aprendí que la medicina no comienza con tratamientos.
          </p>
          <p class="legacy-paragraph emphasis">
            Comienza escuchando.
          </p>
          <p class="legacy-paragraph">
            Comprendí que detrás de cada diagnóstico existe una historia, una familia y una persona que merece ser tratada con respeto, dignidad y empatía.
          </p>
          <p class="legacy-paragraph highlight">
            Ese principio continúa guiando cada proyecto que desarrollo.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="whatido-section section-padding">
    <div class="container whatido-container">
      <div class="whatido-header">
        <span class="section-tag">LO QUE HAGO HOY</span>
        <h2 class="whatido-title">Construyendo el futuro de la medicina regenerativa</h2>
        <div class="accent-line mx-auto"></div>
      </div>

      <div class="whatido-grid">
        <div v-for="(item, idx) in projects" :key="idx" class="whatido-card">
          <div class="card-icon">
            <i class="fa-solid" :class="item.icon"></i>
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
          <div v-if="item.image" class="card-image">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.legacy-section {
  background-color: var(--bg-offset); overflow: hidden;
}

.legacy-container {
  display: flex; flex-direction: column; align-items: center;
}

.legacy-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; width: 100%; max-width: 1300px; align-items: center;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 3rem; }
  @media (max-width: 480px) { gap: 2rem; }
}

.legacy-image {
  position: relative; border-radius: 20px; overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.8s ease; }
  &:hover img { transform: scale(1.05); }

  .legacy-image-badge {
    position: absolute; top: 2rem; left: 2rem;
    font-family: var(--font-principal); font-size: 0.75rem; font-weight: 700;
    color: var(--color-cyan); letter-spacing: 0.2em; text-transform: uppercase;
    padding: 0.5rem 1.2rem; background: rgba(5, 5, 5, 0.7);
    backdrop-filter: blur(10px); border: 1px solid rgba(56, 182, 255, 0.4);
    border-radius: 50px;
  }
}

.legacy-content { display: flex; flex-direction: column; align-items: flex-start; text-align: left;
  @media (max-width: 768px) { padding: 0 0.75rem; }
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
  color: var(--color-cyan); letter-spacing: 0.2em; margin-bottom: 1.5rem; margin-top: 1.5rem; display: inline-block;
  border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; padding-top: 0.75rem; border-radius: 50px; text-transform: uppercase;
}

.legacy-title {
  font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text);
  text-transform: uppercase; line-height: 1.1;
  @media (max-width: 768px) { font-size: 2.2rem; }
}

.accent-line { width: 80px; height: 3px; background-color: var(--color-cyan); margin-bottom: 2rem; }
.mx-auto { margin-left: auto; margin-right: auto; }

.legacy-paragraph {
  font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1rem;
  strong { color: var(--text); font-weight: 700; }
  &.emphasis { font-size: 1.6rem; color: var(--color-cyan); font-weight: 700; font-style: italic; margin: 0.5rem 0; }
  &.highlight { color: var(--text); font-weight: 600; font-size: 1.2rem; margin-top: 0.5rem; }
}

.whatido-section {
  background-color: var(--bg); overflow: hidden;
}

.whatido-container {
  display: flex; flex-direction: column; align-items: center;
}

.whatido-header {
  text-align: center; margin-bottom: 5rem; display: flex; flex-direction: column; align-items: center;
  padding-top: 1.5rem;
  @media (max-width: 768px) { padding: 0 0.75rem; padding-top: 1rem; margin-bottom: 3rem; }
}

.whatido-title {
  font-size: 3.5rem; font-weight: 800; color: var(--text); text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1.1;
  @media (max-width: 768px) { font-size: 2.2rem; }
}

.whatido-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; width: 100%; max-width: 1300px;

  @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  @media (max-width: 992px) { padding: 0 0.75rem; gap: 1.5rem; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 1.5rem; padding: 0 0.5rem; }
}

.whatido-card {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px;
  padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center;
  text-align: center; transition: all 0.4s ease; position: relative; overflow: hidden;

  &:hover {
    transform: translateY(-8px); border-color: var(--color-cyan);
    box-shadow: 0 20px 40px rgba(56, 182, 255, 0.15);
    .card-icon { background: var(--color-cyan); color: #000; }
  }
}

.card-icon {
  width: 70px; height: 70px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex; align-items: center; justify-content: center; font-size: 1.8rem;
  color: var(--color-cyan); margin-bottom: 1.5rem; transition: all 0.4s ease;
}

.card-title {
  font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.02em;
}

.card-desc {
  font-size: 0.95rem; line-height: 1.6; color: var(--text-muted);
}

.card-image {
  margin-top: 1.5rem; border-radius: 12px; overflow: hidden; width: 100%;
  img { width: 100%; height: 120px; object-fit: cover; object-position: center 30%; display: block; transition: transform 0.5s ease; }
  .whatido-card:hover & img { transform: scale(1.08); }
}
</style>
