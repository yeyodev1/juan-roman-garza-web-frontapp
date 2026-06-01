<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import ContactForm from './ContactForm.vue';

onMounted(() => {
  gsap.fromTo('.contact-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' });
  gsap.fromTo('.footer-block', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
});
</script>

<template>
  <section id="contact" class="contact-section section-padding">
    <div class="container contact-container">
      <div class="contact-grid">
        <!-- Contact Info & Locations (Left) -->
        <div class="contact-info">
          <span class="section-tag">AGENDAR CONSULTA</span>
          <h2 class="contact-title">Inicia tu Camino de Longevidad</h2>
          <div class="accent-bar"></div>
          <p class="contact-subtitle">
            Solicite información o agende una sesión de evaluación para diseñar su protocolo de rejuvenecimiento celular a la medida.
          </p>

          <div class="locations-group">
            <h3 class="group-title">Atención Digital y Global</h3>
            
            <div class="location-item">
              <div class="icon-box"><i class="fa-solid fa-globe"></i></div>
              <div class="location-text">
                <h4>Asesoría Sin Fronteras</h4>
                <p>Para agilizar nuestra respuesta y brindarle atención confidencial en cualquier parte del mundo, operamos exclusivamente a través de nuestros canales digitales y este portal seguro.</p>
              </div>
            </div>
          </div>

          <div class="social-channels">
            <h4 class="channels-title">Canales Profesionales</h4>
            <div class="social-links">
              <a href="https://www.instagram.com/jromangarzainc/" target="_blank" rel="noopener noreferrer" class="social-link instagram" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i> @jromangarzainc
              </a>
              <a href="https://www.linkedin.com/in/juan-roman-garza/" target="_blank" rel="noopener noreferrer" class="social-link linkedin" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin-in"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <!-- Glassmorphic Form (Right) -->
        <div class="form-wrapper">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-section { background-color: var(--bg); transition: background-color 0.3s ease; padding-top: 150px; min-height: 100vh; padding-bottom: 60px; }

.contact-container {
  padding: 0 1.5rem;
  width: 100%;
}

.contact-grid {
  display: grid; grid-template-columns: 1fr 1.1fr; gap: 7rem; align-items: flex-start;
  max-width: 1200px; margin: 0 auto;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 5rem; }
}

.contact-info { text-align: left; }

.section-tag {
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
  color: var(--accent-gold); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
  border: 1px solid rgba(212, 175, 55, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
}

.contact-title {
  font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--text); font-weight: 800; text-transform: uppercase; line-height: 1.1;
  @media (max-width: 768px) { font-size: 2.2rem; }
}

.accent-bar { width: 60px; height: 3px; background-color: var(--accent-gold); margin-bottom: 2.5rem; }
.contact-subtitle { font-size: 1.25rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 3.5rem; }

.locations-group { margin-bottom: 4rem; }
.group-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 2.5rem; color: var(--text); text-transform: uppercase; letter-spacing: 0.05em; }

.location-item {
  display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 2.5rem;
  .icon-box { 
    width: 50px; height: 50px; border-radius: 12px; background: rgba(212, 175, 55, 0.1); color: var(--accent-gold);
    display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;
  }
  .location-text {
    h4 { font-size: 1.15rem; font-weight: 800; color: var(--text); margin-bottom: 0.25rem; }
    p { font-size: 1rem; color: var(--text-muted); line-height: 1.5; }
  }
}

.social-channels { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 3rem; }
.channels-title { font-size: 1.2rem; font-weight: 800; color: var(--text); margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.05em; }
.social-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }

.social-link {
  text-decoration: none; font-weight: 700; font-size: 1rem; padding: 0.8rem 1.5rem;
  border-radius: 50px; display: inline-flex; align-items: center; gap: 0.75rem;
  transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(20, 20, 20, 0.5);

  &.instagram { color: var(--text); &:hover { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; border-color: transparent; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); } }
  &.linkedin { color: var(--text); &:hover { background-color: #0077b5; color: #ffffff; border-color: transparent; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); } }
}

.footer-block {
  margin-top: 8rem; border-top: 1px solid rgba(255, 255, 255, 0.1); padding: 3rem 0 0; text-align: center;
  font-size: 0.9rem; color: var(--text-muted);
  
  .powerhouse-footer {
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--text);
    
    .gold-link {
      color: var(--accent-gold);
      text-decoration: none;
      font-weight: 800;
      letter-spacing: 0.05em;
      border-bottom: 1px dashed var(--accent-gold);
      transition: all 0.3s ease;
      
      &:hover { color: #fff; border-color: #fff; }
    }
  }
}
</style>
