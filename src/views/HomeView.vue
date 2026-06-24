<script setup lang="ts">
import HomeHero from '@/components/HomeHero.vue';
import HomeLegacy from '@/components/HomeLegacy.vue';
import HomeResearch from '@/components/HomeResearch.vue';
import HomePhilosophy from '@/components/HomePhilosophy.vue';
import HomeCTA from '@/components/HomeCTA.vue';
</script>

<template>
  <div class="home-portal">
    <HomeHero />
    <div class="section-spacer section-spacer--md"></div>
    <HomeLegacy />
    <div class="section-spacer section-spacer--sm"></div>
    <HomeResearch />
    <div class="section-spacer section-spacer--sm"></div>
    <HomePhilosophy />
    <div class="section-spacer section-spacer--md"></div>
    <HomeCTA />
    <div class="section-spacer section-spacer--md"></div>
  </div>
</template>

<style lang="scss" scoped>
.home-portal {
  width: 100%;
}
</style>
