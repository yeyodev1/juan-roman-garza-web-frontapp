<script setup lang="ts">
import { LOCALES, useI18n, type Locale } from '@/i18n';

withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'md' });

const { locale, t, setLocale } = useI18n();

const labels: Record<Locale, string> = { es: 'ES', en: 'EN' };

// Cada botón se describe en su propio idioma, para que quien no entienda el actual lo reconozca
function buttonLabel(code: Locale) {
  return code === 'es' ? t('lang.toEs') : t('lang.toEn');
}
</script>

<template>
  <div class="lang-switch" :class="`lang-switch--${size}`" role="group" :aria-label="t('lang.switchLabel')">
    <span class="lang-switch__thumb" :class="{ 'is-right': locale === 'en' }" aria-hidden="true"></span>
    <button
      v-for="code in LOCALES"
      :key="code"
      type="button"
      class="lang-switch__btn"
      :class="{ 'is-active': locale === code }"
      :lang="code"
      :aria-pressed="locale === code"
      :aria-label="buttonLabel(code)"
      :title="buttonLabel(code)"
      @click="setLocale(code)"
    >
      {{ labels[code] }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.lang-switch {
  --pad: 3px;
  --btn-w: 38px;
  --btn-h: 28px;

  position: relative;
  display: inline-flex;
  align-items: center;
  padding: var(--pad);
  border-radius: 999px;
  background: rgba(10, 16, 40, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  flex-shrink: 0;
  isolation: isolate;

  &--sm {
    --btn-w: 34px;
    --btn-h: 26px;
  }
}

.lang-switch__thumb {
  position: absolute;
  top: var(--pad);
  left: var(--pad);
  width: var(--btn-w);
  height: var(--btn-h);
  border-radius: 999px;
  background: var(--color-cyan);
  box-shadow: 0 0 14px rgba(56, 182, 255, 0.45);
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 0;

  &.is-right {
    transform: translateX(var(--btn-w));
  }
}

.lang-switch__btn {
  position: relative;
  z-index: 1;
  width: var(--btn-w);
  height: var(--btn-h);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--font-principal);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  // compensa el tracking para centrar ópticamente
  text-indent: 0.12em;
  cursor: pointer;
  transition: color 0.25s ease;

  &:hover:not(.is-active) {
    color: #fff;
  }

  &.is-active {
    color: #0d1633;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lang-switch__thumb {
    transition: none;
  }
}
</style>
