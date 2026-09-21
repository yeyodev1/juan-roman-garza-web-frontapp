<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from '@/i18n';
import { gsap } from 'gsap';
import EcosystemCard from './EcosystemCard.vue';

const { t, tm, rt } = useI18n();

// Datos fijos por entidad; los textos vienen de src/i18n (ecosystem.entities)
const entityData = [
  {
    name: 'Powerhouse Biotech',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/856b90c7-4c38-4f6c-8c5e-2c0b0f50764c.jpg',
    badgeClass: 'gold',
    link: 'https://www.powerhousebiotech.com/',
    icons: ['fa-database', 'fa-laptop-code'],
  },
  {
    name: 'Eternal Regenerative Center',
    image: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095160/assets-juan/19d44cab-fe24-4998-8fa0-7095b1ef858c.jpg',
    badgeClass: '',
    link: '',
    icons: ['fa-location-dot', 'fa-shield-halved'],
  },
];

type EntityCopy = { lead: string; desc: string; badge: string; details: string[] };

const entities = computed(() => {
  const copies = tm<EntityCopy[]>('ecosystem.entities');
  return entityData.map(({ icons, ...data }, idx) => {
    const copy: EntityCopy = copies[idx] ?? { lead: '', desc: '', badge: '', details: [] };
    return {
      ...data,
      lead: copy.lead,
      desc: copy.desc,
      badge: copy.badge,
      details: copy.details.map((text, i) => ({ icon: icons[i] ?? '', text })),
    };
  });
});

onMounted(() => {
  gsap.fromTo('.section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  gsap.fromTo('.ecosystem-grid', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
});
</script>

<template>
  <section id="ecosystem" class="ecosystem-section section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t('ecosystem.tag') }}</span>
        <h2 class="section-title">{{ t('ecosystem.titleBefore') }} <a href="https://www.powerhousebiotech.com/" target="_blank" class="cyan-link">Powerhouse Biotech</a></h2>
        <p class="section-subtitle">
          <template v-for="(seg, i) in rt('ecosystem.subtitle')" :key="i"><strong v-if="seg.bold">{{ seg.text }}</strong><template v-else>{{ seg.text }}</template></template>
        </p>
      </div>

      <div class="ecosystem-grid">
        <EcosystemCard
          v-for="(entity, idx) in entities"
          :key="idx"
          v-bind="entity"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ecosystem-section {
  background-color: var(--bg);
  transition: background-color 0.3s ease;
  width: 100%;
  padding-top: 150px;
  min-height: 100vh;
  padding-bottom: 100px;
}

.section-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-tag {
    font-family: var(--font-principal);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-cyan);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: inline-block;
    border: 1px solid rgba(56, 182, 255, 0.4);
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
  }

  .section-title {
    font-size: 3.5rem;
    color: var(--text);
    margin-bottom: 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1.1;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }

    .cyan-link,
    .cyan-link:visited,
    .cyan-link:active {
      color: var(--color-cyan);
      text-decoration: none;
      border-bottom: 2px dashed var(--color-cyan);
      transition: all 0.3s ease;
    }

    .cyan-link:hover {
      color: #fff;
      border-color: #fff;
    }
  }

  .accent-line {
    width: 60px;
    height: 3px;
    background-color: var(--color-cyan);
    margin: 0 auto 2.5rem;
  }

  .section-subtitle {
    font-size: 1.25rem;
    color: var(--text-muted);
    line-height: 1.8;
  }
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
