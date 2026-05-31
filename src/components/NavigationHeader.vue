<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  activeSection: { type: String, required: true },
});

const emit = defineEmits(['navigate', 'toggle-theme']);
const isMobileMenuOpen = ref(false);

const navItems = [
  { id: 'home', label: 'Inicio' },
  { id: 'about', label: 'Sobre Mí' },
  { id: 'approach', label: 'Longevidad' },
  { id: 'ecosystem', label: 'Empresas' },
  { id: 'press', label: 'Prensa' },
];

function handleNavigate(id: string) {
  isMobileMenuOpen.value = false;
  emit('navigate', id);
}
</script>

<template>
  <header class="nav-header">
    <div class="nav-container">
      <a href="#home" class="brand" @click.prevent="handleNavigate('home')">
        <span class="monogram">JRG</span>
        <span class="full-name">JUAN ROMÁN GARZA</span>
      </a>

      <nav class="desktop-menu">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
          @click.prevent="handleNavigate(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="header-actions">
        <button class="theme-btn" @click="emit('toggle-theme')" aria-label="Toggle Theme">
          <i class="fa-solid fa-circle-half-stroke"></i>
        </button>
        <a href="#contact" class="cta-button" @click.prevent="handleNavigate('contact')">Contacto</a>
      </div>

      <button class="mobile-toggle" :class="{ open: isMobileMenuOpen }" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle Menu">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
      </button>
    </div>

    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-drawer">
        <nav class="mobile-nav">
          <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`" class="mobile-link" :class="{ active: activeSection === item.id }" @click.prevent="handleNavigate(item.id)">
            {{ item.label }}
          </a>
          <a href="#contact" class="mobile-link contact-mobile" @click.prevent="handleNavigate('contact')">Contacto</a>
          <button class="mobile-theme-btn" @click="emit('toggle-theme')"><i class="fa-solid fa-circle-half-stroke"></i> Tema</button>
        </nav>
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
  border-bottom: 1px solid var(--border);
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

  .monogram {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-gold) 100%);
    color: #fefefe;
    padding: 0.35rem 0.65rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 800;
  }

  .full-name {
    font-size: 1.05rem;
    @media (max-width: 480px) { display: none; }
  }
}

.desktop-menu {
  display: flex;
  gap: 2rem;
  @media (max-width: 992px) { display: none; }
}

.nav-link {
  text-decoration: none;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.8;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--accent-gold);
    transition: all 0.3s ease;
  }

  &:hover, &.active {
    opacity: 1;
    color: var(--accent-gold);
    &::after { width: 100%; left: 0; }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 992px) { display: none; }
}

.theme-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
  &:hover { opacity: 1; color: var(--accent-gold); transform: rotate(15deg); }
}

.cta-button {
  text-decoration: none;
  background-color: var(--text);
  color: var(--bg);
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    background-color: transparent;
    color: var(--accent-gold);
    border-color: var(--accent-gold);
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
  }
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 6px;
  z-index: 1001;
  @media (max-width: 992px) { display: flex; }

  .bar {
    width: 22px;
    height: 2px;
    background-color: var(--text);
    transition: all 0.3s ease;
  }

  &.open {
    .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .bar:nth-child(2) { opacity: 0; }
    .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
  }
}

.mobile-drawer {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: var(--bg);
  z-index: 999;
  padding: 2rem 1.5rem;
  border-top: 1px solid var(--border);

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .mobile-link {
      text-decoration: none;
      color: var(--text);
      font-size: 1.2rem;
      font-weight: 700;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
      &.active, &:hover { color: var(--accent-gold); }
      &.contact-mobile { color: var(--accent); border-bottom: none; }
    }

    .mobile-theme-btn {
      align-self: flex-start;
      background: none;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.5rem 1rem;
      border-radius: 50px;
      margin-top: 1rem;
    }
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
