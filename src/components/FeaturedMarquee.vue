<script setup lang="ts">
const features = [
  { name: 'The New York Finance', url: 'https://thenewyorkfinance.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://thenewyorkfinance.com/wp-content/uploads/2025/06/cropped-cropped-NYFFINAL-180x180.png' },
  { name: 'The New Jersey Gazette', url: 'https://thenewjerseygazette.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://thenewjerseygazette.com/wp-content/uploads/2021/11/cropped-Copy-of-The-New-York-City-Times-180x180.png' },
  { name: 'Big Boston News', url: 'https://www.bigbostonnews.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://www.bigbostonnews.com/wp-content/uploads/2021/04/cropped-big-boston-news-180x180.png' },
  { name: 'The Chicago Finance', url: 'https://thechicagofinance.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://thechicagofinance.com/wp-content/uploads/2021/04/cropped-The-Chicago-Finane-1-180x180.png' },
  { name: 'The USA Reporter', url: 'https://theusareporter.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://theusareporter.com/wp-content/uploads/2021/02/cropped-ThE-USA-2-180x180.png' },
  { name: 'Houston Weekly News', url: 'https://houstonweeklynews.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://houstonweeklynews.com/wp-content/uploads/2021/01/cropped-ho-180x180.png' },
  { name: 'The Chicago Gazette', url: 'https://www.thechicagogazette.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://www.thechicagogazette.com/wp-content/uploads/2021/11/cropped-Copy-of-The-New-York-City-Times-2-180x180.png' }
];
</script>

<template>
  <section class="featured-marquee-section">
    <div class="marquee-title-wrapper">
      <span class="marquee-title">DESTACADO EN LA PRENSA</span>
    </div>
    
    <div class="marquee-container">
      <div class="marquee-track">
        <!-- Group 1 -->
        <div class="marquee-group">
          <a v-for="(item, idx) in features" :key="`g1-${idx}`" :href="item.url" target="_blank" class="featured-item">
            <img :src="item.icon" :alt="item.name" class="featured-icon" loading="lazy" />
            <span class="featured-name">{{ item.name }}</span>
          </a>
        </div>
        <!-- Group 2 (Duplicate for seamless loop) -->
        <div class="marquee-group">
          <a v-for="(item, idx) in features" :key="`g2-${idx}`" :href="item.url" target="_blank" class="featured-item">
            <img :src="item.icon" :alt="item.name" class="featured-icon" loading="lazy" />
            <span class="featured-name">{{ item.name }}</span>
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

.marquee-title-wrapper {
  padding: 0 3rem;
  position: relative;
  z-index: 2;
  background: var(--bg-offset);
  
  @media (max-width: 768px) {
    padding: 0 0 1.5rem 0;
    width: 100%;
    text-align: center;
  }
}

.marquee-title {
  font-family: var(--font-principal);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-cyan);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
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
  gap: 1rem;
  text-decoration: none;
  filter: grayscale(100%) opacity(0.6);
  transition: all 0.4s ease;
  
  &:hover {
    filter: grayscale(0%) opacity(1);
    transform: translateY(-2px);
    
    .featured-name {
      color: var(--color-cyan);
    }
  }
}

.featured-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255,255,255,0.1);
}

.featured-name {
  font-family: var(--font-secondary);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  transition: color 0.3s ease;
}

@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } 
}
</style>
