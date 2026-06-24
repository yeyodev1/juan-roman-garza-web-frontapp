<script setup lang="ts">
import logo1 from '@/assets/periodicos/LOGO1.png';
import logo2 from '@/assets/periodicos/LOGO2.png';
import logo3 from '@/assets/periodicos/LOGO3.png';
import logo4 from '@/assets/periodicos/LOGO4.png';
import logo5 from '@/assets/periodicos/LOGO5.png';
import logo6 from '@/assets/periodicos/LOGO6.png';

const features = [
  { name: 'The New York Finance', url: 'https://thenewyorkfinance.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: logo1 },
  { name: 'The New Jersey Gazette', url: 'https://thenewjerseygazette.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: logo2 },
  { name: 'Big Boston News', url: 'https://www.bigbostonnews.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: logo3 },
  { name: 'The Chicago Finance', url: 'https://thechicagofinance.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: logo4 },
  { name: 'The USA Reporter', url: 'https://theusareporter.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: logo5 },
  { name: 'Houston Weekly News', url: 'https://houstonweeklynews.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: logo6 }
];
</script>

<template>
  <section class="featured-marquee-section">
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- Group 1 -->
        <div class="marquee-group">
          <a v-for="(item, idx) in features" :key="`g1-${idx}`" :href="item.url" target="_blank" class="featured-item">
            <img :src="item.icon" :alt="item.name" class="featured-icon" loading="lazy" />
          </a>
        </div>
        <div class="marquee-group">
          <a v-for="(item, idx) in features" :key="`g2-${idx}`" :href="item.url" target="_blank" class="featured-item">
            <img :src="item.icon" :alt="item.name" class="featured-icon" loading="lazy" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.featured-marquee-section {
  width: 100%;
  background: var(--bg-offset);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 2rem 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem 0;
  }
}

.marquee-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  width: 100%;
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: scrollMarquee 40s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
}

.marquee-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4rem;
  padding-right: 4rem; /* Match the gap for seamless wrap */
}

.featured-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-3px);
    .featured-icon {
      filter: grayscale(0%) opacity(1);
    }
  }
}

.featured-icon {
  height: 45px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.6);
  transition: all 0.4s ease;
}

@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } 
}
</style>
