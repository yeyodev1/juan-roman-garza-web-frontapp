<script setup lang="ts">
import { computed } from 'vue';
import pdfCelulas from '@/assets/revistas/Células Madre - La Nueva Frontera de la Salud (ESPAÑOL).pdf?url';
import pdfEdad from '@/assets/revistas/REVISTA EDAD CRONOLÓGICA Y EDAD BIOLÓGICA.pdf?url';
import LanguageSwitch from './LanguageSwitch.vue';
import { useI18n } from '@/i18n';

const { t, tm } = useI18n();
const files = [pdfCelulas, pdfEdad];
const year = new Date().getFullYear();

const revistas = computed(() =>
  tm<string[]>('footer.magazines').map((title, idx) => ({ title, file: files[idx] }))
);
const disclaimer = computed(() => tm<string[]>('footer.disclaimer'));
</script>

<template>
  <footer class="global-footer">
    <div class="container footer-content">
      
      <!-- Publicaciones y Revistas Profesionales -->
      <div class="footer-magazines-section">
        <h4 class="footer-title">{{ t('footer.magazinesTitle') }}</h4>
        <div class="magazines-grid">
          <a v-for="(revista, idx) in revistas" :key="idx" :href="revista.file" target="_blank" rel="noopener" hreflang="es" class="magazine-card">
            <div class="magazine-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M12 18v-6"></path>
                <path d="M9 15l3 3 3-3"></path>
              </svg>
            </div>
            <div class="magazine-info">
              <h5>{{ revista.title }}</h5>
              <span class="view-pdf-btn">{{ t('footer.download') }}</span>
            </div>
          </a>
        </div>
      </div>
      
      <div class="footer-divider"></div>

      <!-- Legal Disclaimer Section -->
      <div class="footer-disclaimer">
        <h4>{{ t('footer.disclaimerTitle') }}</h4>
        <p v-for="(paragraph, idx) in disclaimer" :key="idx">{{ paragraph }}</p>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom-row">
        <div class="footer-info">
        <p class="copyright">{{ t('footer.copyright', { year }) }}</p>
        <p class="powerhouse-footer">
          {{ t('footer.founder') }} <router-link to="/powerhouse" class="cyan-link">Powerhouse Biotech</router-link>
        </p>
        <p class="creator-credit">
          {{ t('footer.creditBefore') }} <a href="https://yeyo.dev/" target="_blank" class="yeyo-link">yeyo.dev</a> {{ t('footer.creditAfter') }}
        </p>
      </div>

      <div class="footer-side">
        <div class="footer-links">
          <a href="https://www.instagram.com/jromangarzainc/" target="_blank" class="social-link" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i> Instagram
          </a>
          <a href="https://wa.me/5215553518114" target="_blank" class="social-link" aria-label="WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>
        <div class="footer-lang">
          <span class="footer-lang__label">{{ t('footer.language') }}</span>
          <LanguageSwitch size="sm" />
        </div>
      </div>
    </div>
  </div>
  </footer>
</template>

<style lang="scss" scoped>
.global-footer {
  background-color: var(--bg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 0;
  width: 100%;
}

.footer-content {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-magazines-section {
  width: 100%;
  margin-bottom: 4rem;
  @media (max-width: 768px) { padding: 0 0.75rem; }
}

.footer-title {
  font-family: var(--font-secondary);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.magazines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.magazine-card {
  display: flex;
  align-items: center;
  background: var(--bg-offset);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    border-color: var(--color-cyan);
    box-shadow: 0 10px 20px rgba(56, 182, 255, 0.05);
    background: rgba(255, 255, 255, 0.02);
    
    .magazine-icon-wrapper {
      background: var(--color-cyan);
      color: var(--bg);
    }
  }
}

.magazine-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: rgba(56, 182, 255, 0.1);
  color: var(--color-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.magazine-info {
  display: flex;
  flex-direction: column;
  
  h5 {
    font-family: var(--font-principal);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.4rem;
    line-height: 1.3;
  }
}

.view-pdf-btn {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.magazine-card:hover .view-pdf-btn {
  color: var(--color-cyan);
}

.footer-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
}

.footer-disclaimer {
  margin-bottom: 3rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.6;

  h4 {
    font-family: var(--font-principal);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    margin-bottom: 0.8rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.footer-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
}

.footer-info {
  text-align: left;
}

.copyright {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.powerhouse-footer {
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 0.5rem;

  .cyan-link, .cyan-link:visited, .cyan-link:active {
    color: var(--color-cyan);
    text-decoration: none;
    font-weight: 800;
    letter-spacing: 0.05em;
    border-bottom: 1px dashed var(--color-cyan);
    transition: all 0.3s ease;

    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }
}

.creator-credit {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 1rem;

  .yeyo-link, .yeyo-link:visited, .yeyo-link:active {
    color: var(--text);
    text-decoration: none;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;

    &:hover {
      color: var(--color-cyan);
      border-color: var(--color-cyan);
    }
  }
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;
}

.footer-lang {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-lang__label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  i {
    font-size: 1.2rem;
    color: var(--color-cyan);
  }

  &:hover {
    color: var(--color-cyan);
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  .footer-bottom-row {
    flex-direction: column;
    text-align: center;
  }

  .footer-magazines-section {
    margin-bottom: 2rem;
  }

  .footer-title {
    text-align: center;
  }

  .footer-info {
    text-align: center;
  }

  .footer-side {
    align-items: center;
  }
}
</style>
