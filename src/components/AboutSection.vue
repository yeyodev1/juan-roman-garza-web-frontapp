<script setup lang="ts">
const aboutImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg';
</script>

<template>
  <section id="about" class="about-section section-padding">
    <div class="container about-grid">
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

      <div class="about-content">
        <span class="section-tag">SOBRE MÍ</span>
        <h2 class="about-title">El Puente entre la Mente, la Ciencia y el Rendimiento</h2>
        <div class="title-bar"></div>

        <p class="paragraph">
          Graduado de <strong class="bold-text">Psicología Organizacional en el Tecnológico de Monterrey</strong>, Juan Román Garza ha dedicado su carrera a descifrar cómo interactúan el comportamiento humano, la tecnología y las ciencias médicas.
        </p>

        <blockquote class="legacy-quote">
          <i class="fa-solid fa-quote-left quote-icon"></i>
          <p>
            "Mi padre, un pionero en medicina regenerativa en México, me enseñó que la clave para curar reside en <strong>aprender a hacer las preguntas correctas</strong> para descifrar la necesidad real de las personas."
          </p>
        </blockquote>

        <p class="paragraph">
          Esta lección fundamental definió su evolución. Convencido de que la salud física es el cimiento de la lucidez directiva, unió fuerzas con expertos para estructurar protocolos que optimizan la longevidad celular y el rendimiento decisional.
        </p>

        <div class="signature-block">
          <span class="name">Juan Román Garza</span>
          <span class="role">Fundador & Arquitecto de Longevidad Ejecutiva</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-section { background-color: var(--bg); transition: background-color 0.3s ease; }

.about-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 7rem;
  align-items: center;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 4rem; }
}

.about-media {
  display: flex;
  justify-content: center;
  padding: 0 20px; // Safety padding to prevent offset border overflow
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4 / 5;

  .portrait-image {
    width: 100%; height: 100%; object-fit: cover;
    border-radius: 20px;
    position: relative; z-index: 2;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .accent-frame {
    position: absolute;
    top: 20px; left: -20px; right: 20px; bottom: -20px;
    border: 2px solid var(--accent-gold);
    border-radius: 20px;
    z-index: 1;
    opacity: 0.4;
    @media (max-width: 480px) { top: 10px; left: -10px; right: 10px; bottom: -10px; }
  }
}

.experience-card {
  position: absolute;
  bottom: 30px; right: -25px;
  background: var(--text);
  color: var(--bg);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  z-index: 3;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  @media (max-width: 480px) { right: 10px; bottom: -15px; }

  .exp-number { font-family: var(--font-principal); font-size: 1.8rem; font-weight: 800; color: var(--accent-gold); line-height: 1; }
  .exp-text { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
}

.section-tag {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
  color: var(--accent); letter-spacing: 0.1em; margin-bottom: 0.5rem; display: inline-block;
}

.about-title {
  font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--text);
  @media (max-width: 768px) { font-size: 1.8rem; }
}

.title-bar { width: 50px; height: 3px; background-color: var(--accent-gold); margin-bottom: 2.5rem; }

.paragraph {
  font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;
  .bold-text { color: var(--text); }
}

.legacy-quote {
  border-left: 4px solid var(--accent-gold);
  padding: 1rem 1.5rem; margin: 2.5rem 0;
  background-color: var(--bg-offset);
  border-radius: 0 16px 16px 0;
  position: relative;

  .quote-icon { position: absolute; top: 10px; right: 15px; font-size: 2rem; opacity: 0.08; color: var(--text); }
  p { font-style: italic; font-size: 1.05rem; line-height: 1.6; color: var(--text); }
}

.signature-block {
  margin-top: 3.5rem; display: flex; flex-direction: column;
  .name { font-family: var(--font-principal); font-size: 1.25rem; font-weight: 700; color: var(--text); }
  .role { font-size: 0.85rem; color: var(--accent-gold); font-weight: 600; }
}
</style>
