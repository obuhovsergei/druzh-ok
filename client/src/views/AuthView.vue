<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { RouteNames } from "@/router/RouteNames";
import { TLogin } from "@/types/user.type";
import PasswordValidation from "@/components/ui/PasswordValidation.vue";

const authStore = useAuthStore();
const { login, initialize } = authStore;
const form = ref<TLogin>({
  email: '',
  password: ''
});

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return form.value.email ? emailRegex.test(form.value.email) : false;
});

const isPasswordValid = computed(() => {
  const password = form.value.password;
  if (!password) return false;

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  return hasLowercase && hasUppercase && hasNumber && hasMinLength;
});

const isValidated = computed(() => {
  return isEmailValid.value && isPasswordValid.value;
});

const onSubmit = () => {
  if (isValidated.value)
    login(form.value);
};

onMounted(() => {
  initialize();
});
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen">
    <Card class="w-full md:w-6 lg:w-4">
      <template #title>Добро пожаловать</template>
      <template #content>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label for="email">Почта</label>
            <InputText
              id="email"
              v-model="form.email"
              type="email"
              class="w-full"
              :class="{ 'p-invalid': form.email && !isEmailValid }"
            />
            <small v-if="form.email && !isEmailValid" class="p-error">
              Введите корректный email
            </small>
          </div>
          <div class="field">
            <label for="password">Пароль</label>
            <PasswordValidation
              id="password"
              v-model="form.password"
            />
            <small v-if="form.password && !isPasswordValid" class="p-error">
              Пароль не соответствует требованиям
            </small>
          </div>
          <Button
            type="submit"
            label="Войти"
            :disabled="!isValidated"
            class="w-full mt-3"
          />
        </form>
        <Divider class="my-4 block" />

        <div class="text-center">
          <span class="text-sm text-color-secondary">Ещё нет аккаунта? </span>
          <router-link :to="RouteNames.sign" class="text-sm text-primary no-underline">
            Регистрация
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>
