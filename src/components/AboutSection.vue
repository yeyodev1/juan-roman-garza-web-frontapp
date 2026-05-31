<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';

const aboutImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg';

onMounted(() => {
  gsap.fromTo('.about-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });
  gsap.fromTo('.about-media', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 });
});
</script>

<template>
  <section id="about" class="about-section section-padding">
    <div class="container about-container">
      <div class="about-content text-center">
        <span class="section-tag">EL FUNDADOR DE POWERHOUSE BIOTECH</span>
        <h2 class="about-title">El Puente entre la Mente, la Ciencia y el Rendimiento</h2>
        <div class="accent-line"></div>

        <p class="paragraph mx-auto">
          Graduado de <strong class="bold-text">Psicología Organizacional en el Tecnológico de Monterrey</strong>, Juan Román Garza es el visionario detrás de <a href="https://www.powerhousebiotech.com/" target="_blank" class="gold-link">Powerhouse Biotech</a>. Ha dedicado su carrera a descifrar cómo interactúan el comportamiento humano, la tecnología y las ciencias médicas.
        </p>

        <blockquote class="legacy-quote mx-auto">
          <i class="fa-solid fa-quote-left quote-icon"></i>
          <p>
            "Mi padre, un pionero en medicina regenerativa en México, me enseñó que la clave para curar reside en <strong>aprender a hacer las preguntas correctas</strong> para descifrar la necesidad real de las personas."
          </p>
        </blockquote>

        <p class="paragraph mx-auto">
          Esta lección fundamental definió su evolución. Convencido de que la salud física es el cimiento de la lucidez directiva, unió fuerzas con expertos para estructurar protocolos que optimizan la longevidad celular y el rendimiento decisional.
        </p>

        <div class="signature-block mx-auto">
          <span class="name">Juan Román Garza</span>
          <span class="role">Fundador & CEO de Powerhouse Biotech</span>
        </div>
      </div>

      <div class="about-media">
        <div class="image-wrapper">
          <img :src="aboutImage" alt="Juan Román Garza" class="portrait-image" />
          <div class="accent-frame"></div>
          <div class="experience-card">
            <span class="exp-number">15+</span>
            <span class="exp-text">Años de Liderazgo</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-section { background-color: var(--bg); transition: background-color 0.3s ease; padding-top: 150px; min-height: 100vh; padding-bottom: 100px; }

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
}

.about-content {
  display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 900px;
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
  color: var(--accent-gold); letter-spacing: 0.2em; margin-bottom: 1.5rem; display: inline-block;
  border: 1px solid rgba(212, 175, 55, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
}

.about-title {
  font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--text); font-weight: 800; text-transform: uppercase; line-height: 1.1;
  @media (max-width: 768px) { font-size: 2.2rem; }
}

.accent-line { width: 60px; height: 3px; background-color: var(--accent-gold); margin: 0 auto 3rem; }

.mx-auto { margin-left: auto; margin-right: auto; }

.paragraph {
  font-size: 1.25rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 2rem; max-width: 800px;
  .bold-text { color: var(--text); }
  .gold-link { color: var(--accent-gold); text-decoration: none; font-weight: 700; transition: color 0.3s ease; border-bottom: 1px dashed var(--accent-gold); }
  .gold-link:hover { color: #fff; border-bottom-color: #fff; }
}

.legacy-quote {
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 2.5rem; margin: 3rem auto;
  background: rgba(15, 15, 15, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  position: relative;
  max-width: 800px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);

  .quote-icon { position: absolute; top: -15px; left: 30px; font-size: 2.5rem; color: var(--accent-gold); background: var(--bg); padding: 0 10px; }
  p { font-style: italic; font-size: 1.3rem; line-height: 1.7; color: var(--text); font-weight: 300; }
}

.signature-block {
  margin-top: 3.5rem; display: flex; flex-direction: column; align-items: center;
  .name { font-family: var(--font-principal); font-size: 1.5rem; font-weight: 700; color: var(--text); }
  .role { font-size: 0.95rem; color: var(--accent-gold); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.5rem; }
}

.about-media {
  display: flex;
  justify-content: center;
  width: 100%;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16 / 9;

  .portrait-image {
    width: 100%; height: 100%; object-fit: cover;
    border-radius: 20px;
    position: relative; z-index: 2;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  }

  .accent-frame {
    position: absolute;
    top: 20px; left: -20px; right: 20px; bottom: -20px;
    border: 2px solid rgba(212, 175, 55, 0.5);
    border-radius: 20px;
    z-index: 1;
  }
}

.experience-card {
  position: absolute;
  bottom: -30px; right: 40px;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 1.5rem 2.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  .exp-number { font-family: var(--font-principal); font-size: 2.5rem; font-weight: 800; color: var(--accent-gold); line-height: 1; margin-bottom: 0.2rem; }
  .exp-text { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; }
}
</style>
