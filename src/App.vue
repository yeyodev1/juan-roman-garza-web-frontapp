<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NavigationHeader from '@/components/NavigationHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';

const route = useRoute();
const isDark = ref(true);

function toggleTheme() {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isDark.value = false;
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    isDark.value = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});
</script>

<template>
  <div class="app-container">
    <!-- Global Header Menu -->
    <NavigationHeader
      :active-section="route.name?.toString().toLowerCase() || 'home'"
      @toggle-theme="toggleTheme"
    />

    <!-- Main Content Container with transition -->
    <router-view v-slot="{ Component }">
      <transition name="route-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <GlobalFooter />
  </div>
</template>

<style lang="scss">
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// Global page route transition styling
.route-fade-enter-active,
.route-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.route-fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.route-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
