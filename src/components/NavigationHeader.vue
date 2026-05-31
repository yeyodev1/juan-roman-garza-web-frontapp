<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  activeSection: { type: String, required: true },
});

const emit = defineEmits(['toggle-theme']);
const isMenuOpen = ref(false);

const navItems = [
  { path: '/', label: 'Inicio', num: '01' },
  { path: '/sobre-mi', label: 'Sobre Mí', num: '02' },
  { path: '/powerhouse', label: 'Powerhouse', num: '03' },
  { path: '/longevidad-regenerativa', label: 'Longevidad', num: '04' },
  { path: '/empresas', label: 'Empresas', num: '05' },
  { path: '/prensa-y-eventos', label: 'Prensa', num: '06' },
  { path: '/contacto', label: 'Contacto', num: '07' },
];

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function handleLinkClick() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="nav-header">
    <div class="nav-container">
      <RouterLink to="/" class="brand" @click="handleLinkClick">
        <span class="monogram">JRG</span>
        <span class="full-name">JUAN ROMÁN GARZA</span>
      </RouterLink>

      <div class="right-controls">
        <button class="theme-btn" @click="emit('toggle-theme')" aria-label="Toggle Theme">
          <i class="fa-solid fa-circle-half-stroke"></i>
        </button>
        <button class="burger-menu" :class="{ open: isMenuOpen }" @click="toggleMenu" aria-label="Toggle Navigation">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>

    <!-- Fullscreen Dropdown Overlay -->
    <transition name="slide-overlay">
      <div v-if="isMenuOpen" class="fullscreen-overlay">
        <div class="overlay-container">
          <nav class="overlay-nav">
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="overlay-link"
              :class="{ active: activeSection === item.label.toLowerCase() || (item.path === '/' && activeSection === 'home') }"
              @click="handleLinkClick"
            >
              <span class="link-number">{{ item.num }}</span>
              <span class="link-label">{{ item.label }}</span>
            </RouterLink>
          </nav>

          <div class="overlay-footer">
            <div class="footer-col">
              <span class="footer-label">INSTAGRAM</span>
              <a href="https://www.instagram.com/jromangarzainc/" target="_blank" rel="noopener noreferrer" class="footer-link">@jromangarzainc</a>
            </div>
            <div class="footer-col">
              <span class="footer-label">LINKEDIN</span>
              <a href="https://www.linkedin.com/in/juan-roman-garza/" target="_blank" rel="noopener noreferrer" class="footer-link">Juan Román Garza</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: var(--header-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.nav-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text);
  font-family: var(--font-principal);
  font-weight: 700;
  letter-spacing: 0.05em;
  z-index: 1002;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  .monogram {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
    color: #fefefe;
    padding: 0.35rem 0.65rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 800;
    transition: box-shadow 0.3s ease;
  }

  .full-name {
    font-size: 1.05rem;
    transition: color 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);

    .monogram {
      box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
    }

    .full-name {
      color: var(--accent-gold);
    }
  }
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 1002;
}

.theme-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    opacity: 1;
    color: var(--accent-gold);
    transform: rotate(15deg) scale(1.1);
  }
}

.burger-menu {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0.5rem;

  .bar {
    width: 28px;
    height: 2px;
    background-color: var(--text);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &:hover {
    .bar:nth-child(2) {
      transform: translateX(4px);
      background-color: var(--accent-gold);
    }
  }

  &.open {
    .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
      background-color: var(--text);
    }

    .bar:nth-child(2) {
      opacity: 0;
      transform: translateX(-10px);
    }

    .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
      background-color: var(--text);
    }
  }
}

// Fullscreen Dropdown Overlay
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.overlay-container {
  width: 100%;
  max-width: 1200px;
  padding: 120px 1.5rem 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.overlay-nav {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
  margin: auto 0;
  width: 100%;
  max-width: 600px;
  align-self: center;

  @media (min-width: 768px) {
    align-items: center;
    text-align: center;
  }

  // Awwwards dimming effect on sibling hover
  &:hover .overlay-link:not(:hover) {
    opacity: 0.25;
    transform: scale(0.98);
  }
}

.overlay-link {
  text-decoration: none;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-principal);
  font-weight: 800;
  text-transform: uppercase;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  width: 100%;
  justify-content: flex-start;

  // Mobile first typography
  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
    gap: 1.5rem;
    justify-content: center;
  }

  .link-number {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-gold);
    opacity: 0.8;
    margin-top: -0.5rem;
    transition: color 0.4s ease;

    @media (min-width: 768px) {
      font-size: 1.2rem;
      margin-top: -1.5rem;
    }
  }

  .link-label {
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    // Slide-in underline effect
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0%;
      height: 3px;
      background-color: var(--accent-gold);
      transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
  }

  &:hover,
  &.active {
    color: var(--accent-gold);
    transform: translateX(15px);
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      transform: scale(1.05) translateX(10px);
    }

    .link-label::after {
      width: 100%;
    }

    .link-number {
      color: var(--text);
    }
  }
}

.overlay-footer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: left;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    text-align: center;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-label {
    font-family: var(--font-principal);
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--accent-gold);
    letter-spacing: 0.1em;
  }

  .footer-link {
    text-decoration: none;
    color: var(--text-muted);
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: #fff;
      transform: translateX(5px);
    }

    @media (min-width: 768px) {
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
}

// Overlay Transition (Unfold from top)
.slide-overlay-enter-active,
.slide-overlay-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-overlay-enter-from,
.slide-overlay-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
