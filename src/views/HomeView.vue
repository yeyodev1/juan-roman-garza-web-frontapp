<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import ScrollVideoSection from '@/components/ScrollVideoSection.vue';
import IntroPillarsSection from '@/components/IntroPillarsSection.vue';
import HomeGallerySection from '@/components/HomeGallerySection.vue';
import GatewaysSection from '@/components/GatewaysSection.vue';
</script>

<template>
  <div class="home-portal">
    <HeroSection />
    <ScrollVideoSection />
    <IntroPillarsSection />
    <HomeGallerySection />
    <GatewaysSection />
  </div>
</template>

<style lang="scss" scoped>
.home-portal {
  width: 100%;
}
</style>
