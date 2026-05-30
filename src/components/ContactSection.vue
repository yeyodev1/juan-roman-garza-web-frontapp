<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  company: '',
  position: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');

function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    submitStatus.value = 'error';
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = 'idle';

  // Simulating an Awwwards-style premium submission flow
  setTimeout(() => {
    isSubmitting.value = false;
    submitStatus.value = 'success';
    form.value = {
      name: '',
      company: '',
      position: '',
      email: '',
      message: '',
    };
  }, 1800);
}
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

          <!-- Social links -->
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

        <!-- Sleek Business Form (Right) -->
        <div class="contact-form-wrapper">
          <form @submit.prevent="handleSubmit" class="premium-form">
            <div class="form-group">
              <label for="name">Nombre Completo *</label>
              <input type="text" id="name" v-model="form.name" required placeholder="Ej. Carlos Mendoza" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="company">Empresa</label>
                <input type="text" id="company" v-model="form.company" placeholder="Ej. Powerhouse Biotech" />
              </div>
              <div class="form-group">
                <label for="position">Cargo</label>
                <input type="text" id="position" v-model="form.position" placeholder="Ej. CEO / Fundador" />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Correo Electrónico Corporativo *</label>
              <input type="email" id="email" v-model="form.email" required placeholder="carlos@empresa.com" />
            </div>

            <div class="form-group">
              <label for="message">Mensaje / Requerimiento *</label>
              <textarea id="message" v-model="form.message" required rows="5" placeholder="¿Cómo podemos potenciar su rendimiento y longevidad estratégica?"></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Enviar Solicitud <i class="fa-solid fa-paper-plane"></i></span>
              <span v-else>Procesando Consulta <i class="fa-solid fa-spinner fa-spin"></i></span>
            </button>

            <!-- Status alerts -->
            <transition name="fade">
              <div v-if="submitStatus === 'success'" class="alert success-alert">
                <i class="fa-solid fa-circle-check"></i>
                <p>Su solicitud ha sido enviada con éxito. Nos pondremos en contacto a la brevedad.</p>
              </div>
              <div v-else-if="submitStatus === 'error'" class="alert error-alert">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>Por favor rellene todos los campos requeridos marcados con (*).</p>
              </div>
            </transition>
          </form>
        </div>
      </div>

      <!-- Compact elegant footer -->
      <footer class="footer-block">
        <p>&copy; 2026 Juan Román Garza. Todos los derechos reservados. Longevidad Regenerativa para Liderazgo.</p>
      </footer>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-section {
  background-color: var(--bg);
  position: relative;
  transition: background-color 0.3s ease;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 5rem;
  align-items: flex-start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}

.contact-info {
  text-align: left;
}

.section-tag {
  font-family: var(--font-principal);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.contact-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
}

.accent-bar {
  width: 55px;
  height: 3px;
  background-color: var(--accent-gold);
  margin-bottom: 2rem;
}

.contact-subtitle {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 3rem;
}

.locations-group {
  margin-bottom: 3rem;
}

.group-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.location-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  .location-icon {
    font-size: 1.3rem;
    color: var(--accent);
    margin-top: 0.2rem;
  }

  .location-text {
    h4 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  }
}

.social-channels {
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}

.channels-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border);

  &.instagram {
    color: var(--text);
    &:hover {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      color: #ffffff;
      border-color: transparent;
    }
  }

  &.linkedin {
    color: var(--text);
    &:hover {
      background-color: #0077b5;
      color: #ffffff;
      border-color: transparent;
    }
  }
}

// Sleek Form
.contact-form-wrapper {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
}

.premium-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text);
  }

  input, textarea {
    background-color: var(--bg-offset);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.85rem 1rem;
    border-radius: 10px;
    font-family: var(--font-secondary);
    font-size: 0.95rem;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: var(--accent-gold);
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
    }
  }
}

.submit-btn {
  background: var(--text);
  color: var(--bg);
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: var(--accent-gold);
    color: #ffffff;
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.4;

  &.success-alert {
    background-color: rgba(#10b981, 0.1);
    border: 1px solid rgba(#10b981, 0.2);
    color: #10b981;
  }

  &.error-alert {
    background-color: rgba(#ef4444, 0.1);
    border: 1px solid rgba(#ef4444, 0.2);
    color: #ef4444;
  }
}

.footer-block {
  margin-top: 6rem;
  border-top: 1px solid var(--border);
  padding: 2rem 0 0;
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>
