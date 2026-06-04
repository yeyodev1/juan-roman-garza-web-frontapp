<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import ForbesHighlight from './ForbesHighlight.vue';
import ConferenceGallery from './ConferenceGallery.vue';
import PanelVideo from './PanelVideo.vue';

const features = [
  { name: 'The New York Finance', title: 'Román Garza: Pionero en la Salud Regenerativa y la Medicina del Futuro', url: 'https://thenewyorkfinance.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://thenewyorkfinance.com/wp-content/uploads/2025/06/cropped-cropped-NYFFINAL-180x180.png' },
  { name: 'The New Jersey Gazette', title: 'El Emprendedor que está Transformando la Biotecnología Celular', url: 'https://thenewjerseygazette.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://thenewjerseygazette.com/wp-content/uploads/2021/11/cropped-Copy-of-The-New-York-City-Times-180x180.png' },
  { name: 'Big Boston News', title: 'Innovación y Liderazgo: El Impacto de Powerhouse Biotech', url: 'https://www.bigbostonnews.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://www.bigbostonnews.com/wp-content/uploads/2021/04/cropped-big-boston-news-180x180.png' },
  { name: 'The Chicago Finance', title: 'Revolucionando el Bienestar Corporativo: La Estrategia de Román Garza', url: 'https://thechicagofinance.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://thechicagofinance.com/wp-content/uploads/2021/04/cropped-The-Chicago-Finane-1-180x180.png' },
  { name: 'The USA Reporter', title: 'Un Enfoque Vanguardista para la Regeneración y Longevidad', url: 'https://theusareporter.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://theusareporter.com/wp-content/uploads/2021/02/cropped-ThE-USA-2-180x180.png' },
  { name: 'Houston Weekly News', title: 'Tecnología Médica Avanzada: El Futuro de la Lucidez Directiva', url: 'https://houstonweeklynews.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://houstonweeklynews.com/wp-content/uploads/2021/01/cropped-ho-180x180.png' },
  { name: 'The Chicago Gazette', title: 'La Nueva Era de la Medicina: Terapias Celulares y Liderazgo Integral', url: 'https://www.thechicagogazette.com/roman-garza-the-regenerative-entrepreneur-pioneering-regenerative-healthcare-with-a-hearfelt-vision/', icon: 'https://www.thechicagogazette.com/wp-content/uploads/2021/11/cropped-Copy-of-The-New-York-City-Times-2-180x180.png' }
];

onMounted(() => {
  gsap.fromTo('.section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
});
</script>

<template>
  <section id="press" class="press-section section-padding">
    <div class="container press-container">
      <div class="section-header">
        <span class="section-tag">PRENSA Y EVENTOS</span>
        <h2 class="section-title">Presencia Global e Impacto Mediático</h2>
        <div class="accent-line"></div>
      </div>

      <!-- Forbes Highlight First -->
      <ForbesHighlight />

      <!-- Marquee Section -->
      <div class="featured-marquee-section">
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
      </div>

      <!-- Articulos Grid Section -->
      <div class="features-grid-section">
        <h3 class="subsection-title">Artículos Recientes</h3>
        <div class="features-grid">
          <a v-for="(item, idx) in features" :key="`grid-${idx}`" :href="item.url" target="_blank" class="feature-card">
            <div class="feature-card-header">
              <img :src="item.icon" :alt="item.name" class="feature-card-icon" />
              <span class="feature-source">{{ item.name }}</span>
            </div>
            <div class="feature-card-body">
              <h4 class="feature-article-title">{{ item.title }}</h4>
            </div>
            <div class="feature-card-footer">
              <span class="read-article-btn">
                Leer Artículo 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>

      <ConferenceGallery />
      <PanelVideo />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.press-section { background-color: var(--bg); transition: background-color 0.3s ease; padding-top: 150px; min-height: 100vh; padding-bottom: 100px; }

.section-header {
  text-align: center; max-width: 900px; margin: 0 auto 6rem;
  display: flex; flex-direction: column; align-items: center;
  
  .section-tag {
    font-family: var(--font-principal); font-size: 0.9rem; font-weight: 700;
    color: var(--color-cyan); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block;
    border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px;
  }
  .section-title { font-size: 3.5rem; color: var(--text); margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; line-height: 1.1; @media (max-width: 768px) { font-size: 2.2rem; } }
  .accent-line { width: 60px; height: 3px; background-color: var(--color-cyan); margin: 0 auto; }
}

/* Subsection Titles */
.subsection-title {
  font-family: var(--font-secondary);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

/* Marquee Section */
.featured-marquee-section {
  width: 100%;
  background: var(--bg-offset);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 2rem 0;
  margin-bottom: 3rem;
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
  padding-right: 4rem;
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

/* Features Grid Section */
.features-grid-section {
  margin-bottom: 6rem;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.feature-card {
  background: var(--bg-offset);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-cyan);
    box-shadow: 0 10px 30px rgba(56, 182, 255, 0.05);
    
    .feature-article-title {
      color: var(--color-cyan);
    }
    .read-article-btn {
      color: var(--color-cyan);
      
      svg {
        transform: translateX(3px) translateY(-3px);
      }
    }
  }
}
.feature-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.feature-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.feature-source {
  font-family: var(--font-secondary);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
}
.feature-card-body {
  flex: 1;
  margin-bottom: 1rem;
}
.feature-article-title {
  font-family: var(--font-principal);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  transition: color 0.3s ease;
}
.feature-card-footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
}
.read-article-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }
}
</style>
