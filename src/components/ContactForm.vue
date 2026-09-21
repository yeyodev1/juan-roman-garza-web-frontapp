<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { useI18n } from '@/i18n';

const { t, locale } = useI18n();

const form = ref({ firstName: '', lastName: '', phone: '', email: '', message: '' });
const fullPhoneInfo = ref<any>(null);
const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');
const defaultCountry = ref('MX');
const isCountryLoaded = ref(false);

function onPhoneInput(_phone: string, phoneObject: any) {
  fullPhoneInfo.value = phoneObject;
}

onMounted(async () => {
  try {
    const res = await fetch('https://services.leadconnectorhq.com/funnels/funnel/geo-location/');
    const data = await res.json();
    if (data && data.country) {
      defaultCountry.value = data.country;
    }
  } catch (error) {
    console.warn('Could not auto-detect country for phone input');
  } finally {
    isCountryLoaded.value = true;
  }
});

async function handleSubmit() {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.phone || !form.value.message) {
    submitStatus.value = 'error';
    return;
  }
  isSubmitting.value = true;
  submitStatus.value = 'idle';

  try {
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
    const now = new Date();
    
    // Formatting date as required: "23/05/26, 8:32 p.m."
    const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedDate = now.toLocaleString('es-MX', dateOptions);

    // Extract exact parsed number (e.g. +593995254965)
    let parsedPhone = form.value.phone;
    if (fullPhoneInfo.value && fullPhoneInfo.value.number) {
      parsedPhone = fullPhoneInfo.value.number.replace(/\s+/g, '');
    }

    // Nota interna para el CRM (siempre en español); se indica el idioma en que escribió el lead
    const idioma = locale.value === 'en' ? 'Inglés (EN)' : 'Español (ES)';
    const notaContent = `👑 Juan Román Garza — Contacto Ejecutivo\n📌 Fuente: Web Oficial JRG\n🌐 Idioma: ${idioma}\n🕐 Actualizado: ${formattedDate}\n💬 Mensaje: ${form.value.message}`;

    const payload = {
      nombre: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      telefono: parsedPhone,
      source: "Web Oficial JRG",
      nota: notaContent,
      notes: notaContent,
      tags: ["web-juan-roman", "lead-contacto"],
      etiquetas: ["web-juan-roman", "lead-contacto"],
      paso: "paso-0",
      timestamp: now.toISOString()
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Network response was not ok');

    submitStatus.value = 'success';
    form.value = { firstName: '', lastName: '', phone: '', email: '', message: '' };
  } catch (error) {
    console.error('Error enviando formulario:', error);
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="contact-form-wrapper">
    <form @submit.prevent="handleSubmit" class="premium-form">
      
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">{{ t('contact.form.firstName') }}</label>
          <input type="text" id="firstName" v-model="form.firstName" required :placeholder="t('contact.form.firstNamePlaceholder')" />
        </div>
        <div class="form-group">
          <label for="lastName">{{ t('contact.form.lastName') }}</label>
          <input type="text" id="lastName" v-model="form.lastName" required :placeholder="t('contact.form.lastNamePlaceholder')" />
        </div>
      </div>

      <div class="form-group">
        <label for="email">{{ t('contact.form.email') }}</label>
        <input type="email" id="email" v-model="form.email" required :placeholder="t('contact.form.emailPlaceholder')" />
      </div>
      
      <div class="form-group">
        <label for="phone">{{ t('contact.form.phone') }}</label>
        <!-- vue-tel-input component for full country code parsing -->
        <vue-tel-input 
          v-if="isCountryLoaded"
          v-model="form.phone" 
          @on-input="onPhoneInput"
          mode="international"
          :defaultCountry="defaultCountry"
          :inputOptions="{ placeholder: '+52 55 1234 5678', required: true, id: 'phone' }"
          :dropdownOptions="{ showSearchBox: true, searchBoxPlaceholder: t('contact.form.searchCountry'), showFlags: true, showDialCodeInSelection: true }"
          class="custom-tel-input"
        ></vue-tel-input>
        <div v-else class="tel-skeleton">
          <i class="fa-solid fa-spinner fa-spin"></i> {{ t('contact.form.detectingRegion') }}
        </div>
      </div>

      <div class="form-group">
        <label for="message">{{ t('contact.form.message') }}</label>
        <textarea id="message" v-model="form.message" required rows="4" :placeholder="t('contact.form.messagePlaceholder')"></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="!isSubmitting">{{ t('contact.form.submit') }} <i class="fa-solid fa-paper-plane"></i></span>
        <span v-else>{{ t('contact.form.submitting') }} <i class="fa-solid fa-spinner fa-spin"></i></span>
      </button>

      <transition name="fade">
        <div v-if="submitStatus === 'success'" class="alert success-alert" role="status">
          <i class="fa-solid fa-circle-check"></i>
          <p>{{ t('contact.form.success') }}</p>
        </div>
        <div v-else-if="submitStatus === 'error'" class="alert error-alert" role="alert">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>{{ t('contact.form.error') }}</p>
        </div>
      </transition>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.contact-form-wrapper {
  background-color: var(--card-bg); border: 1px solid var(--border);
  padding: 3rem 2.5rem; border-radius: 24px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  @media (max-width: 480px) { padding: 2rem 1.5rem; }
}

.premium-form { display: flex; flex-direction: column; gap: 1.5rem; text-align: left; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; @media (max-width: 576px) { grid-template-columns: 1fr; } }

.form-group {
  display: flex; flex-direction: column; gap: 0.5rem;
  label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text); }

  input, textarea {
    background-color: rgba(255, 255, 255, 0.03); border: 1px solid var(--border); color: var(--text);
    padding: 0.95rem 1.2rem; border-radius: 10px; font-size: 0.95rem; outline: none; transition: all 0.3s ease;
    &:focus { border-color: var(--color-cyan); background-color: rgba(255, 255, 255, 0.06); box-shadow: 0 0 0 3px rgba(56, 182, 255, 0.15); }
  }
}

.tel-skeleton {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px dashed var(--border);
  color: var(--text-muted);
  padding: 0.95rem 1.2rem;
  border-radius: 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Custom styling for vue-tel-input to match the premium theme */
:deep(.custom-tel-input) {
  background-color: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid var(--border) !important;
  border-radius: 10px !important;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: var(--color-cyan) !important;
    background-color: rgba(255, 255, 255, 0.06) !important;
    box-shadow: 0 0 0 3px rgba(56, 182, 255, 0.15) !important;
  }

  .vti__dropdown {
    background: transparent;
    border-right: 1px solid var(--border);
    padding: 0.5rem;
    &:hover, &.open {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  .vti__dropdown-list {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 8px;
    z-index: 100;
    max-width: 300px;
    
    .vti__search_box {
      width: 90%;
      margin: 10px auto;
      display: block;
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid var(--border) !important;
      color: #fff !important;
      border-radius: 6px;
      padding: 0.5rem;
      outline: none;
      
      &:focus { border-color: var(--color-cyan) !important; }
    }
    
    .vti__dropdown-item {
      color: #fff;
      padding: 10px;
      &.highlighted {
        background-color: rgba(56, 182, 255, 0.2);
      }
    }
  }

  input {
    background: transparent !important;
    border: none !important;
    color: var(--text) !important;
    padding: 0.95rem 1.2rem !important;
    font-size: 0.95rem !important;
    &:focus {
      box-shadow: none !important;
    }
  }
}

.submit-btn {
  background: var(--text); color: var(--bg); border: none; padding: 1rem; border-radius: 12px;
  font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; margin-top: 0.5rem;
  &:hover:not(:disabled) { background-color: var(--color-cyan); color: #ffffff; box-shadow: 0 5px 15px rgba(56, 182, 255, 0.3); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.alert {
  display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.4;
  &.success-alert { background-color: rgba(#10b981, 0.1); border: 1px solid rgba(#10b981, 0.2); color: #10b981; }
  &.error-alert { background-color: rgba(#ef4444, 0.1); border: 1px solid rgba(#ef4444, 0.2); color: #ef4444; }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
