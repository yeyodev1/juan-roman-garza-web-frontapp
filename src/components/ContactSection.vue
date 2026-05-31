<script setup lang="ts">
import ContactForm from './ContactForm.vue';
</script>

<template>
  <section id="contact" class="contact-section section-padding">
    <div class="container">
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
            <h3 class="group-title">Clínicas Eternal Regenerative Center</h3>
            
            <div class="location-item">
              <i class="fa-solid fa-hotel location-icon"></i>
              <div class="location-text">
                <h4>Sede Monterrey</h4>
                <p>Av. Vasconcelos, San Pedro Garza García, N.L., México</p>
              </div>
            </div>

            <div class="location-item">
              <i class="fa-solid fa-hospital location-icon"></i>
              <div class="location-text">
                <h4>Sede Montemorelos</h4>
                <p>Centro Médico Eternal, Montemorelos, N.L., México</p>
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
        <ContactForm />
      </div>

      <footer class="footer-block">
        <p>&copy; 2026 Juan Román Garza. Todos los derechos reservados. Longevidad Regenerativa para Liderazgo.</p>
      </footer>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-section { background-color: var(--bg); transition: background-color 0.3s ease; }

.contact-grid {
  display: grid; grid-template-columns: 1fr 1.1fr; gap: 7rem; align-items: flex-start;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 4rem; }
}

.contact-info { text-align: left; }

.section-tag {
  font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700;
  color: var(--accent); letter-spacing: 0.1em; margin-bottom: 0.5rem; display: inline-block;
}

.contact-title {
  font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--text);
  @media (max-width: 768px) { font-size: 1.8rem; }
}

.accent-bar { width: 55px; height: 3px; background-color: var(--accent-gold); margin-bottom: 2.5rem; }
.contact-subtitle { font-size: 1.1rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 3.5rem; }
.locations-group { margin-bottom: 3.5rem; }
.group-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 2rem; color: var(--text); }

.location-item {
  display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 2rem;
  .location-icon { font-size: 1.3rem; color: var(--accent); margin-top: 0.2rem; }
  .location-text {
    h4 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 0.25rem; }
    p { font-size: 0.9rem; color: var(--text-muted); }
  }
}

.social-channels { border-top: 1px solid var(--border); padding-top: 2.5rem; }
.channels-title { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.5rem; }
.social-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }

.social-link {
  text-decoration: none; font-weight: 600; font-size: 0.9rem; padding: 0.6rem 1.2rem;
  border-radius: 50px; display: inline-flex; align-items: center; gap: 0.5rem;
  transition: all 0.3s ease; border: 1px solid var(--border);

  &.instagram { color: var(--text); &:hover { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; border-color: transparent; } }
  &.linkedin { color: var(--text); &:hover { background-color: #0077b5; color: #ffffff; border-color: transparent; } }
}

.footer-block {
  margin-top: 8rem; border-top: 1px solid var(--border); padding: 2.5rem 0 0; text-align: center;
  font-size: 0.8rem; color: var(--text-muted);
}
</style>
