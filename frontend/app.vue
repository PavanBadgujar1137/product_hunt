<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Check authentication status on app load
const isAuthenticated = useState('isAuthenticated', () => false);

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isAuthenticated.value = true;
  }
});
</script>