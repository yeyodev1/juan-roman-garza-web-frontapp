<script setup lang="ts">
</script>

<template>
  <footer class="global-footer">
    <div class="container footer-content">
      <div class="footer-info">
        <p class="copyright">&copy; {{ new Date().getFullYear() }} Juan Román Garza. Todos los derechos reservados.</p>
        <p class="powerhouse-footer">
          Fundador del proyecto <router-link to="/powerhouse" class="cyan-link">Powerhouse Biotech</router-link>
        </p>
        <p class="creator-credit">
          Diseñado y desarrollado por <a href="https://yeyo.dev/" target="_blank" class="yeyo-link">yeyo.dev</a> desde Ecuador 🇪🇨
        </p>
      </div>

      <div class="footer-links">
        <a href="https://www.instagram.com/jromangarzainc/" target="_blank" class="social-link" aria-label="Instagram">
          <i class="fa-brands fa-instagram"></i> Instagram
        </a>
        <a href="https://wa.me/5215553518114" target="_blank" class="social-link" aria-label="WhatsApp">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-info {
    text-align: center;
  }
}
</style>
