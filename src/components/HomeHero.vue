<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeaturedMarquee from './FeaturedMarquee.vue';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const heroVideoUrl = 'https://res.cloudinary.com/drw5sn8qw/video/upload/v1782231565/assets-juan/uicyiqkjhaoxi7fzoioa.mp4';
const purposeImage = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg';
const videoRef = ref<HTMLVideoElement | null>(null);
const videoLoaded = ref(false);

onMounted(() => {
  const tl = gsap.timeline();

  gsap.fromTo('.hero-bg-media',
    { scale: 1.15, filter: 'blur(10px)' },
    { scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out' }
  );

  tl.fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.5)
    .fromTo('.hero-title .line', { opacity: 0, y: 80, rotationX: 20 }, { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }, 0.7)
    .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1.1)
    .fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.3)
    .fromTo('.hero-actions', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.5)
    .fromTo('.hero-socials-float', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1.7);

  gsap.to('.hero-bg-media', {
    yPercent: 20, ease: 'none',
    scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.fromTo('.purpose-section',
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 1.5, ease: 'power3.out',
      scrollTrigger: { trigger: '.purpose-section', start: 'top 80%' }
    }
  );
  gsap.fromTo('.purpose-image',
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.purpose-section', start: 'top 75%' }
    }
  );
  gsap.fromTo('.purpose-text',
    { opacity: 0, x: 40 },
    {
      opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.purpose-section', start: 'top 75%' }
    }
  );

  // Pause video when out of viewport to save resources
  const videoEl = videoRef.value;
  if (videoEl && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => { /* autoplay may be blocked */ });
        } else {
          videoEl.pause();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(videoEl);

    onUnmounted(() => {
      observer.disconnect();
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <section class="hero-section">
    <div class="hero-bg-wrapper">
      <video
        ref="videoRef"
        class="hero-bg-media"
        :class="{ 'is-loaded': videoLoaded }"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        poster="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/1fdb1f14-5799-4c12-ba46-8590a824770b.jpg"
        @loadeddata="videoLoaded = true"
      >
        <source :src="heroVideoUrl" type="video/mp4" />
      </video>
      <div class="hero-bg-overlay"></div>
      <div class="hero-bg-scanlines" aria-hidden="true"></div>
      <div class="hero-bg-vignette" aria-hidden="true"></div>
    </div>

    <div class="container hero-container">
      <div class="hero-text-content">
        <span class="hero-tag">UNA NUEVA GENERACIÓN DE MEDICINA</span>

        <h1 class="hero-title">
          <div class="line-wrapper"><span class="line">Centrada en</span></div>
          <div class="line-wrapper"><span class="line">el Paciente</span></div>
        </h1>

        <div class="hero-subtitle">
          Juan Román Garza Delgado
        </div>
        <div class="hero-roles">
          <span>Estratega</span>
          <span class="role-sep">•</span>
          <span>Investigador</span>
          <span class="role-sep">•</span>
          <span>Emprendedor</span>
        </div>
        <div class="hero-fields">
          Longevidad Regenerativa | Medicina de Precisión | Inteligencia Clínica
        </div>

        <p class="hero-desc">
          "Mi misión es ayudar a las personas a vivir más años con salud, bienestar y plenitud."
        </p>

        <div class="hero-actions">
          <a class="btn-primary" href="https://chat.whatsapp.com/K43yrnUQbVq2O9hn93X03c?mode=gi_t" target="_blank" rel="noopener noreferrer">
            <i class="fa-regular fa-compass"></i> Sé parte de nuestra misión
          </a>
        </div>

        <div class="hero-socials-float" style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1;">
          <span class="socials-title">SÍGUENOS</span>
          <div class="socials-icons">
            <a href="https://www.instagram.com/jromangarzainc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@jromangarzainc" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <i class="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575813710962" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider"></div>
    <FeaturedMarquee />

  <section class="purpose-section section-padding">
    <div class="container purpose-container">
      <div class="purpose-grid">
        <div class="purpose-image">
          <img :src="purposeImage" alt="Juan Román Garza con pacientes" loading="lazy" />
          <div class="purpose-image-overlay"></div>
        </div>
        <div class="purpose-text">
          <span class="section-tag">MI PROPÓSITO</span>
          <h2 class="purpose-title">La salud del futuro comienza con mejores decisiones</h2>
          <!-- <div class="accent-line"></div> -->
          <p class="purpose-paragraph">
            Durante años he dedicado mi trabajo a comprender una pregunta fundamental:
          </p>
          <blockquote class="purpose-quote">
            ¿Por qué algunas personas recuperan su salud, vitalidad y calidad de vida mientras otras continúan deteriorándose?
          </blockquote>
          <p class="purpose-paragraph">
            La búsqueda de esa respuesta me llevó a estudiar la biología del envejecimiento, los biomarcadores, la medicina regenerativa, la inteligencia artificial y los sistemas de salud emergentes.
          </p>
          <p class="purpose-paragraph highlight">
            Hoy trabajo para acercar la ciencia más avanzada a quienes buscan una oportunidad real para vivir mejor.
          </p>
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
  background-color: var(--bg-offset);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0 10rem;

  @media (max-width: 768px) {
    padding: 90px 0 6rem;
  }
}

.hero-bg-wrapper {
  position: absolute;
  top: -10%;
  left: -5%;
  width: 110%;
  height: 120%;
  z-index: 0;
  overflow: hidden;
}

.hero-bg-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  will-change: transform, filter;
  opacity: 0;
  transition: opacity 1.2s ease;

  &.is-loaded {
    opacity: 1;
  }
}

.hero-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(180deg, rgba(5, 10, 18, 0.2) 0%, rgba(5, 10, 18, 0.5) 60%, rgba(5, 10, 18, 0.92) 100%),
    radial-gradient(circle at 50% 40%, rgba(0, 123, 181, 0.12) 0%, transparent 55%),
    radial-gradient(circle at center, rgba(5, 5, 5, 0.2) 0%, rgba(5, 5, 5, 0.8) 65%, rgba(5, 5, 5, 0.97) 100%);
  z-index: 1;
}

.hero-bg-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 4px);
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 2;
  opacity: 0.35;
}

.hero-bg-vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 18vw rgba(0, 0, 0, 0.85);
  pointer-events: none;
  z-index: 3;
}

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

.hero-text-content {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
}

.hero-tag {
  font-family: var(--font-principal);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--color-cyan);
  margin-bottom: 2rem;
  padding: 0.6rem 1.5rem;
  border: 1px solid rgba(229, 213, 181, 0.4);
  border-radius: 50px;
  background: rgba(20, 20, 20, 0.5);
  backdrop-filter: blur(10px);
  display: inline-block;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.hero-title {
  font-size: 6rem;
  line-height: 1.05;
  margin-bottom: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #ffffff;
  perspective: 1000px;

  @media (max-width: 1200px) {
    font-size: 4.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }

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
    // background: linear-gradient(135deg, #38b6ff 0%, #007bb5 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.hero-subtitle {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: #e4e4e7;
  font-family: var(--font-secondary);
  letter-spacing: -0.02em;
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.hero-roles {
  font-size: 1.1rem;
  color: var(--color-cyan);
  margin-bottom: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;

  .role-sep {
    color: rgba(255, 255, 255, 0.3);
  }
}

.hero-fields {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.hero-desc {
  padding: 16px;
  font-size: 1.4rem;
  color: #ffffff;
  max-width: 750px;
  margin-bottom: 3rem;
  line-height: 1.8;
  font-style: italic;
  font-weight: 300;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.9);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}

.btn-primary {
  background: var(--color-cyan);
  text-decoration: none;
  color: #ffffff;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 25px rgba(56, 182, 255, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(56, 182, 255, 0.6);
    background: var(--color-darkblue);
    color: #ffffff;
  }
}

.section-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-cyan), transparent);
  opacity: 0.3;
}

.purpose-section {
  background-color: var(--bg);
  overflow: hidden;
}

.purpose-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.purpose-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  width: 100%;
  max-width: 1300px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
}

.purpose-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .purpose-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(5, 5, 5, 0.3) 0%, transparent 60%);
  }
}

.purpose-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
}

.section-tag {
  font-family: var(--font-principal);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-cyan);
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  display: inline-block;
  border: 1px solid rgba(56, 182, 255, 0.4);
  padding: 0.5rem 1.5rem;
  padding-top: 0.75rem;
  border-radius: 50px;
  text-transform: uppercase;
}

.purpose-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text);
  text-transform: uppercase;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.accent-line {
  width: 80px;
  height: 3px;
  background-color: var(--color-cyan);
  margin-bottom: 2rem;
}

.purpose-paragraph {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 1.5rem;

  &.highlight {
    color: var(--text);
    font-weight: 600;
    font-size: 1.2rem;
  }
}

.purpose-quote {
  font-size: 1.3rem;
  line-height: 1.6;
  color: var(--text);
  font-weight: 500;
  font-style: italic;
  border-left: 3px solid var(--color-cyan);
  padding: 1.5rem 0 1.5rem 2rem;
  margin: 1.5rem 0 2rem;
  background: rgba(56, 182, 255, 0.03);
  border-radius: 0 12px 12px 0;
}

.hero-socials-float {
  text-decoration: none;
  margin: 3rem auto 0;
  max-width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  .socials-title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 3px;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
  }

  .socials-icons {
    display: flex;
    gap: 1.5rem;

    a {
      color: #ffffff;
      font-size: 1.5rem;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      &:hover {
        color: var(--color-cyan, #00d1ff);
        transform: translateY(-3px);
      }
    }
  }
}
</style>
