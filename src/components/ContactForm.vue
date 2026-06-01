<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const form = ref({ firstName: '', lastName: '', phone: '', email: '', message: '' });
const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');
const defaultCountry = ref('MX');

onMounted(async () => {
  try {
    const res = await fetch('https://services.leadconnectorhq.com/funnels/funnel/geo-location/');
    const data = await res.json();
    if (data && data.country) {
      defaultCountry.value = data.country;
    }
  } catch (error) {
    console.warn('Could not auto-detect country for phone input');
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

    const payload = {
      nombre: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      telefono: form.value.phone,
      source: "PHB Web",
      nota: `🏥 PowerHouse Biotech — Formulario PHB\n📌 Fuente: PHB Web\n🕐 Actualizado: ${formattedDate}\n💬 Mensaje: ${form.value.message}`,
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
          <label for="firstName">Nombre *</label>
          <input type="text" id="firstName" v-model="form.firstName" required placeholder="Ej. Carlos" />
        </div>
        <div class="form-group">
          <label for="lastName">Apellido *</label>
          <input type="text" id="lastName" v-model="form.lastName" required placeholder="Ej. Mendoza" />
        </div>
      </div>

      <div class="form-group">
        <label for="email">Correo Corporativo *</label>
        <input type="email" id="email" v-model="form.email" required placeholder="carlos@empresa.com" />
      </div>
      
      <div class="form-group">
        <label>Teléfono (WhatsApp) *</label>
        <!-- vue-tel-input component for full country code parsing -->
        <vue-tel-input 
          v-model="form.phone" 
          mode="international"
          :defaultCountry="defaultCountry"
          :inputOptions="{ placeholder: '+52 55 1234 5678', required: true }"
          :dropdownOptions="{ showSearchBox: true, searchBoxPlaceholder: 'Buscar país...', showFlags: true, showDialCodeInSelection: true }"
          class="custom-tel-input"
        ></vue-tel-input>
      </div>

      <div class="form-group">
        <label for="message">Mensaje / Requerimiento *</label>
        <textarea id="message" v-model="form.message" required rows="4" placeholder="¿Cómo podemos potenciar su longevidad?"></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="!isSubmitting">Enviar Solicitud <i class="fa-solid fa-paper-plane"></i></span>
        <span v-else>Procesando <i class="fa-solid fa-spinner fa-spin"></i></span>
      </button>

      <transition name="fade">
        <div v-if="submitStatus === 'success'" class="alert success-alert">
          <i class="fa-solid fa-circle-check"></i>
          <p>Solicitud enviada con éxito. Nos comunicaremos pronto.</p>
        </div>
        <div v-else-if="submitStatus === 'error'" class="alert error-alert">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>Ocurrió un error o faltan campos por llenar (*).</p>
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
    &:focus { border-color: var(--accent-gold); background-color: rgba(255, 255, 255, 0.06); box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15); }
  }
}

/* Custom styling for vue-tel-input to match the premium theme */
:deep(.custom-tel-input) {
  background-color: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid var(--border) !important;
  border-radius: 10px !important;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: var(--accent-gold) !important;
    background-color: rgba(255, 255, 255, 0.06) !important;
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15) !important;
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
    background-color: #1a1a1a;
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
      
      &:focus { border-color: var(--accent-gold) !important; }
    }
    
    .vti__dropdown-item {
      color: #fff;
      padding: 10px;
      &.highlighted {
        background-color: rgba(212, 175, 55, 0.2);
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
  &:hover:not(:disabled) { background-color: var(--accent-gold); color: #ffffff; box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3); }
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
