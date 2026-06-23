<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.fromTo('.bio-text > *',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.bio-text', start: 'top 85%' } }
  );

  gsap.fromTo('.bio-visuals',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: '.bio-visuals', start: 'top 80%' } }
  );

  gsap.fromTo('.distinction-item',
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.distinctions-list', start: 'top 85%' } }
  );

  gsap.fromTo('.mission-pillar',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.mission-pillars', start: 'top 80%' } }
  );
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});

const distinctions = [
  'Medicina regenerativa',
  'Biología del envejecimiento',
  'Biomarcadores avanzados',
  'Medicina de precisión',
  'Inteligencia artificial aplicada a la salud',
  'Optimización del bienestar y la longevidad',
];

const pillars = [
  { icon: 'fa-shield-halved', title: 'Preventivo', desc: 'Anticipando riesgos antes de que aparezca la enfermedad.' },
  { icon: 'fa-user-gear', title: 'Personalizado', desc: 'Diseñando estrategias adaptadas a cada individuo.' },
  { icon: 'fa-microchip', title: 'Tecnológico', desc: 'Integrando herramientas avanzadas de diagnóstico y análisis.' },
  { icon: 'fa-hand-holding-heart', title: 'Humano', desc: 'Manteniendo al paciente en el centro de cada decisión.' },
];
</script>

<template>
  <section class="about-section section-padding">
    <div class="container about-container">

      <div class="bio-grid">
        <div class="bio-visuals">
          <img src="https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg"
               alt="Juan Román Garza Delgado" class="bio-main-img" loading="lazy" />
          <div class="bio-floating-badge">
            <span class="badge-icon"><i class="fa-solid fa-quote-left"></i></span>
            <p>"La medicina del futuro no solo prolonga la vida; ayuda a las personas a vivirla con salud, dignidad y plenitud."</p>
          </div>
        </div>

        <div class="bio-text">
          <span class="section-tag">¿QUIÉN ES JUAN ROMÁN GARZA?</span>
          <h2 class="bio-title">Una visión que une ciencia, innovación y humanidad</h2>
          <div class="accent-line"></div>

          <p class="paragraph">
            <strong>Juan Román Garza Delgado</strong> es estratega, investigador y emprendedor especializado en longevidad regenerativa, medicina de precisión e innovación en salud.
          </p>

          <p class="paragraph">
            Como fundador de <strong>Eternal Medical Center</strong> y <strong>PowerHouse Biotech</strong>, lidera el desarrollo de un ecosistema centrado en el paciente donde convergen la medicina regenerativa, los biomarcadores avanzados, la inteligencia artificial y la educación médica.
          </p>

          <p class="paragraph highlight">
            Su trabajo está impulsado por una convicción sencilla pero poderosa: ayudar a las personas a vivir más años con salud, bienestar y plenitud.
          </p>

          <div class="inspiration-block">
            <i class="fa-solid fa-leaf inspiration-icon"></i>
            <div>
              <h3 class="inspiration-title">Nuestra Inspiración</h3>
              <p class="paragraph">
                La filosofía de Juan Román nace de una profunda vocación de servicio inspirada por el legado de su padre, el <strong>Dr. Juan Antonio Garza Quintanilla</strong>, quien le enseñó que la medicina no se trata únicamente de tratar enfermedades, sino de escuchar, acompañar y servir con empatía a cada paciente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="distinctions-section">
        <div class="distinctions-header">
          <span class="section-tag">LO QUE LO DISTINGUE</span>
          <h2 class="distinctions-title">Ciencia con propósito humano</h2>
          <div class="accent-line mx-auto"></div>
          <p class="distinctions-intro">
            Juan Román combina disciplinas tradicionalmente separadas para ofrecer una visión integral de la salud:
          </p>
        </div>

        <div class="distinctions-list">
          <div v-for="(item, idx) in distinctions" :key="idx" class="distinction-item">
            <i class="fa-solid fa-arrow-right"></i>
            <span>{{ item }}</span>
          </div>
        </div>

        <p class="distinctions-closing">
          Su enfoque busca comprender las causas profundas de los problemas de salud y no únicamente sus síntomas.
        </p>
      </div>

      <div class="mission-section">
        <div class="mission-header">
          <span class="section-tag">UNA MISIÓN CLARA</span>
          <h2 class="mission-title">Construyendo el futuro de la salud</h2>
          <div class="accent-line mx-auto"></div>
          <p class="mission-intro">
            A través de Eternal Medical Center y PowerHouse Biotech, trabaja para construir un modelo de atención médica más:
          </p>
        </div>

        <div class="mission-pillars">
          <div v-for="(p, idx) in pillars" :key="idx" class="mission-pillar">
            <div class="pillar-icon">
              <i class="fa-solid" :class="p.icon"></i>
            </div>
            <h3 class="pillar-title">{{ p.title }}</h3>
            <p class="pillar-desc">{{ p.desc }}</p>
          </div>
        </div>
      </div>

      <div class="closing-section">
        <div class="closing-block">
          <i class="fa-solid fa-eye closing-icon"></i>
          <h2 class="closing-title">Mirando hacia el futuro</h2>
          <p class="paragraph">
            Juan Román visualiza un futuro donde las personas tengan acceso a información más precisa sobre su salud, puedan tomar decisiones informadas y dispongan de herramientas que les permitan vivir más tiempo con energía, independencia y bienestar.
          </p>
          <p class="paragraph highlight">
            Su propósito es contribuir a la construcción de una nueva generación de medicina donde la ciencia, la tecnología y la empatía trabajen juntas para transformar vidas y generar un impacto positivo que trascienda generaciones.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-section { background-color: var(--bg); transition: background-color 0.3s ease; padding-top: 150px; padding-bottom: 120px; min-height: 100vh; overflow: hidden; }

.about-container { display: flex; flex-direction: column; align-items: center; gap: 8rem; padding: 0 1.5rem; width: 100%; }

.bio-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; width: 100%; max-width: 1300px; align-items: center;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 4rem; }
}

.bio-visuals { position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 2rem; }

.bio-main-img { width: 100%; max-width: 500px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); transition: transform 0.8s ease; &:hover { transform: scale(1.02); } }

.bio-floating-badge {
  max-width: 400px; padding: 1.5rem 2rem; background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(15px); border: 1px solid rgba(56, 182, 255, 0.3);
  border-radius: 16px; margin-top: -3rem; margin-left: auto; margin-right: 1rem; position: relative; z-index: 2;
  .badge-icon { color: var(--color-cyan); font-size: 1.2rem; display: block; margin-bottom: 0.75rem; }
  p { font-size: 0.95rem; line-height: 1.6; color: var(--text); font-style: italic; }
}

.bio-text { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }

.section-tag { font-family: var(--font-principal); font-size: 0.85rem; font-weight: 700; color: var(--color-cyan); letter-spacing: 0.2em; margin-bottom: 1.5rem; display: inline-block; border: 1px solid rgba(56, 182, 255, 0.4); padding: 0.5rem 1.5rem; border-radius: 50px; text-transform: uppercase; }

.bio-title { font-size: 3rem; margin-bottom: 1.5rem; color: var(--text); font-weight: 800; text-transform: uppercase; line-height: 1.1;
  @media (max-width: 768px) { font-size: 2rem; }
}

.accent-line { width: 80px; height: 3px; background-color: var(--color-cyan); margin-bottom: 2rem; }
.mx-auto { margin-left: auto; margin-right: auto; }

.paragraph { font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;
  strong { color: var(--text); font-weight: 700; }
  &.highlight { color: var(--text); font-weight: 600; font-size: 1.2rem; padding: 1.5rem; border-left: 3px solid var(--color-cyan); background: rgba(56, 182, 255, 0.03); border-radius: 0 12px 12px 0; }
}

.inspiration-block { display: flex; gap: 1.5rem; align-items: flex-start; margin-top: 1rem; padding: 2rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px;
  .inspiration-icon { font-size: 2.5rem; color: var(--color-cyan); flex-shrink: 0; margin-top: 0.25rem; }
  .inspiration-title { font-size: 1.3rem; color: var(--text); font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
  @media (max-width: 600px) { flex-direction: column; }
}

.distinctions-section { width: 100%; max-width: 1100px; display: flex; flex-direction: column; align-items: center; }

.distinctions-header { text-align: center; margin-bottom: 3rem; display: flex; flex-direction: column; align-items: center;
  .distinctions-title { font-size: 3rem; font-weight: 800; color: var(--text); text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1.1; @media (max-width: 768px) { font-size: 2.2rem; } }
  .distinctions-intro { font-size: 1.2rem; color: var(--text-muted); max-width: 700px; line-height: 1.6; }
}

.distinctions-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%; max-width: 900px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.distinction-item { display: flex; align-items: center; gap: 1rem; padding: 1.2rem 1.5rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; font-size: 1.05rem; color: var(--text); font-weight: 500; transition: all 0.3s ease;
  i { color: var(--color-cyan); font-size: 1rem; flex-shrink: 0; }
  &:hover { border-color: var(--color-cyan); transform: translateX(5px); background: rgba(56, 182, 255, 0.03); }
}

.distinctions-closing { margin-top: 2rem; font-size: 1.15rem; color: var(--text-muted); font-style: italic; text-align: center; max-width: 700px; }

.mission-section { width: 100%; max-width: 1100px; display: flex; flex-direction: column; align-items: center; }

.mission-header { text-align: center; margin-bottom: 4rem; display: flex; flex-direction: column; align-items: center;
  .mission-title { font-size: 3rem; font-weight: 800; color: var(--text); text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1.1; @media (max-width: 768px) { font-size: 2.2rem; } }
  .mission-intro { font-size: 1.2rem; color: var(--text-muted); max-width: 700px; line-height: 1.6; }
}

.mission-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; width: 100%;
  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.mission-pillar { background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem 2rem; text-align: center; transition: all 0.4s ease;
  &:hover { transform: translateY(-8px); border-color: var(--color-cyan); box-shadow: 0 20px 40px rgba(56, 182, 255, 0.15); .pillar-icon { background: var(--color-cyan); color: #000; } }
}

.pillar-icon { width: 70px; height: 70px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: var(--color-cyan); margin: 0 auto 1.5rem; transition: all 0.4s ease; }

.pillar-title { font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; text-transform: uppercase; }

.pillar-desc { font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); }

.closing-section { width: 100%; max-width: 900px; }

.closing-block { text-align: center; padding: 4rem 3rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: 24px; position: relative; overflow: hidden;
  &::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, var(--color-cyan), var(--color-darkblue)); }
  .closing-icon { font-size: 3rem; color: var(--color-cyan); margin-bottom: 1.5rem; }
  .closing-title { font-size: 2.5rem; font-weight: 800; color: var(--text); text-transform: uppercase; margin-bottom: 1.5rem; @media (max-width: 768px) { font-size: 1.8rem; } }
  .paragraph { max-width: 700px; margin: 0 auto 1.5rem; }
}
</style>
