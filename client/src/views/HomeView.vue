<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore()
</script>

<template>
  <div class="p-4">
    <h1>UserModel Walking App</h1>
    <p>Current user: {{ authStore.user?.firstName || 'Guest' }}</p>
  </div>
</template>
