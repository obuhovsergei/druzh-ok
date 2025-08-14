<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  authStore.login({
    id: '1',
    name: 'Test User',
    email: email.value
  })
}
</script>

<template>
  <div class="p-4">
    <h2>Login</h2>
    <div class="flex flex-column gap-2" style="max-width: 300px">
      <InputText v-model="email" placeholder="Email" />
      <InputText v-model="password" type="password" placeholder="Password" />
      <Button label="Login" @click="handleLogin" />
    </div>
  </div>
</template>
