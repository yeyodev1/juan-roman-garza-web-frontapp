<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import NavigationHeader from '@/components/NavigationHeader.vue';
import HeroSection from '@/components/HeroSection.vue';
import IntroPillarsSection from '@/components/IntroPillarsSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import ApproachSection from '@/components/ApproachSection.vue';
import EcosystemSection from '@/components/EcosystemSection.vue';
import PressEventsSection from '@/components/PressEventsSection.vue';
import ContactSection from '@/components/ContactSection.vue';

const activeSection = ref('home');
const isDark = ref(true);

function handleNavigate(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
}

function toggleTheme() {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Dynamic scroll listener for active section highlighting
let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Theme check (default to dark)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isDark.value = false;
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    isDark.value = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Set up IntersectionObserver to detect currently viewed section
  const sectionIds = ['home', 'about', 'approach', 'ecosystem', 'press', 'contact'];
  const options = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies focal center
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options);

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && observer) observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div class="home-view">
    <!-- Premium Navigation -->
    <NavigationHeader
      :active-section="activeSection"
      @navigate="handleNavigate"
      @toggle-theme="toggleTheme"
    />

    <!-- Sections -->
    <main class="main-content">
      <HeroSection @navigate="handleNavigate" />
      <IntroPillarsSection />
      <AboutSection />
      <ApproachSection />
      <EcosystemSection />
      <PressEventsSection />
      <ContactSection />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
