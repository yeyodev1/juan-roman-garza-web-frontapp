<script setup lang="ts">
import { type PropType } from 'vue';

interface DetailItem {
  icon: string;
  text: string;
}

const props = defineProps({
  name: { type: String, required: true },
  lead: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  badge: { type: String, required: true },
  badgeClass: { type: String, default: '' },
  details: { type: Array as PropType<DetailItem[]>, required: true },
  link: { type: String, default: '' },
});
</script>

<template>
  <div class="ecosystem-card">
    <div class="card-img-wrapper">
      <img :src="image" :alt="name" class="card-img" />
      <div class="img-overlay"></div>
      <div class="entity-badge" :class="badgeClass">{{ badge }}</div>
    </div>
    <div class="card-body">
      <h3 class="entity-name">{{ name }}</h3>
      <span class="entity-lead">{{ lead }}</span>
      <p class="entity-desc">{{ desc }}</p>
      
      <!-- Premium external portal link -->
      <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visitar Sitio Web <i class="fa-solid fa-arrow-up-right-from-square link-arrow"></i>
      </a>

      <div class="entity-details">
        <span v-for="(item, idx) in details" :key="idx" class="detail-item">
          <i class="fa-solid" :class="item.icon"></i> {{ item.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ecosystem-card {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 24px;
  overflow: hidden; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
  transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-8px); border-color: var(--color-cyan); box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
    .card-img { transform: scale(1.05); }
  }
}

.card-img-wrapper {
  position: relative; width: 100%; height: 280px; overflow: hidden;

  .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .img-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent 40%, rgba(1, 13, 39, 0.7) 100%); }
}

.entity-badge {
  position: absolute; top: 20px; left: 20px; background: var(--accent); color: #ffffff;
  padding: 0.4rem 1rem; border-radius: 50px; font-family: var(--font-principal); font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.05em; z-index: 2;
  &.cyan { background: var(--color-cyan); }
}

.card-body { padding: 3rem 2.5rem; text-align: left; }
.entity-name { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text); }
.entity-lead { display: block; font-size: 0.9rem; font-weight: 600; color: var(--color-cyan); margin-bottom: 1.75rem; }
.entity-desc { font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 1.5rem; min-height: 75px; }

.visit-link {
  display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;
  color: var(--color-cyan); font-weight: 700; font-size: 0.9rem; margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover { color: lighten(#38b6ff, 10%); .link-arrow { transform: translate(2px, -2px); } }
  .link-arrow { font-size: 0.8rem; transition: transform 0.3s ease; }
}

.entity-details {
  display: flex; flex-direction: column; gap: 0.75rem; border-top: 1px solid var(--border); padding-top: 2rem;

  .detail-item {
    font-size: 0.85rem; color: var(--text); font-weight: 600; display: flex; align-items: center; gap: 0.65rem;
    i { color: var(--color-cyan); width: 16px; }
  }
}
</style>
