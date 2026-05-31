<script setup lang="ts">
import { ref } from 'vue';

const form = ref({ name: '', company: '', position: '', email: '', message: '' });
const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');

function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    submitStatus.value = 'error';
    return;
  }
  isSubmitting.value = true;
  submitStatus.value = 'idle';
  setTimeout(() => {
    isSubmitting.value = false;
    submitStatus.value = 'success';
    form.value = { name: '', company: '', position: '', email: '', message: '' };
  }, 1800);
}
</script>

<template>
  <div class="contact-form-wrapper">
    <form @submit.prevent="handleSubmit" class="premium-form">
      <div class="form-group">
        <label for="name">Nombre Completo *</label>
        <input type="text" id="name" v-model="form.name" required placeholder="Ej. Carlos Mendoza" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="company">Empresa</label>
          <input type="text" id="company" v-model="form.company" placeholder="Ej. Powerhouse Biotech" />
        </div>
        <div class="form-group">
          <label for="position">Cargo</label>
          <input type="text" id="position" v-model="form.position" placeholder="Ej. CEO / Fundador" />
        </div>
      </div>

      <div class="form-group">
        <label for="email">Correo Corporativo *</label>
        <input type="email" id="email" v-model="form.email" required placeholder="carlos@empresa.com" />
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
          <p>Por favor rellene todos los campos requeridos (*).</p>
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
