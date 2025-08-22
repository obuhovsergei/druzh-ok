<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  id?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const password = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const hasLowercase = computed(() => /[a-z]/.test(password.value));
const hasUppercase = computed(() => /[A-Z]/.test(password.value));
const hasNumber = computed(() => /\d/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 8);
</script>

<template>
  <Password
    :id="id"
    v-model="password"
    toggleMask
    class="w-full"
    promptLabel="Введите пароль"
    weakLabel="Слишком простой"
    mediumLabel="Средняя сложность"
    strongLabel="Сложный пароль"
    :feedback="true"
  >
    <template #footer>
      <Divider class="mt-2 block"/>
      <ul class="pl-2 my-0 leading-normal text-sm list-none">
        <li class="flex align-items-center gap-2">
          <span class="animated-checkmark" :class="{ 'checked': hasLowercase }">
            <i class="pi pi-check"></i>
          </span>
          <span :class="{ 'text-green-500 font-medium': hasLowercase }">Хотя бы одна маленькая буква</span>
        </li>
        <li class="flex align-items-center mt-2 gap-2">
          <span class="animated-checkmark" :class="{ 'checked': hasUppercase }">
            <i class="pi pi-check"></i>
          </span>
          <span :class="{ 'text-green-500 font-medium': hasUppercase }">Хотя бы одна большая буква</span>
        </li>
        <li class="flex align-items-center mt-2 gap-2">
          <span class="animated-checkmark" :class="{ 'checked': hasNumber }">
            <i class="pi pi-check"></i>
          </span>
          <span :class="{ 'text-green-500 font-medium': hasNumber }">Хотя бы одна цифра</span>
        </li>
        <li class="flex align-items-center mt-2 gap-2">
          <span class="animated-checkmark" :class="{ 'checked': hasMinLength }">
            <i class="pi pi-check"></i>
          </span>
          <span :class="{ 'text-green-500 font-medium': hasMinLength }">Не менее 8 символов</span>
        </li>
      </ul>
    </template>
  </Password>
</template>

<style scoped>
.animated-checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: white;
}

.animated-checkmark.checked {
  background-color: #10b981;
  border-color: #10b981;
  animation: checkmarkPop 0.3s ease;
}

.animated-checkmark i {
  font-size: 10px;
  color: transparent;
  transition: color 0.3s ease;
}

.animated-checkmark.checked i {
  color: white;
}

@keyframes checkmarkPop {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
