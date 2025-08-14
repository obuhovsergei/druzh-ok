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

const onSubmit = async () => {
  await authStore.login(form.value);
};
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen">
    <Card class="w-full md:w-6 lg:w-4">
      <template #title>Login</template>
      <template #content>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label for="email" class="block">Email</label>
            <InputText id="email" v-model="form.email" type="email" class="w-full" />
          </div>
          <div class="field">
            <label for="password" class="block">Password</label>
            <Password id="password" v-model="form.password" toggleMask class="w-full" />
          </div>
          <Button type="submit" label="Submit" class="w-full mt-3" />
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
