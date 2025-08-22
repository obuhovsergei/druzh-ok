<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth";

interface LoginForm {
  email: string;
  password: string;
}

const authStore = useAuthStore();
const form = ref<LoginForm>({
  email: '',
  password: ''
});

const onSubmit = () => {
  authStore.login(form.value);
};
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen">
    <Card class="w-full md:w-6 lg:w-4">
      <template #title>Login</template>
      <template #content>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label for="email">Email</label>
            <InputText id="email" v-model="form.email" type="email" class="w-full" />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <Password id="password" v-model="form.password"
                      toggleMask class="w-full"
                      promptLabel="Введите пароль"
                      weakLabel="Слишком простой"
                      mediumLabel="Средняя сложность"
                      strongLabel="Сложный пароль">
              <template #footer>
                <Divider class="mt-2 block"/>
                <ul class="pl-2 my-0 leading-normal text-sm">
                  <li>Хотя бы одна маленькая буква</li>
                  <li>Хотя бы одна большая буква</li>
                  <li>Хотя бы одна цифра</li>
                  <li>Не менее 8 символов</li>
                </ul>
              </template>
            </Password>
          </div>
          <Button type="submit" label="Submit" disabled class="w-full mt-3" />
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
