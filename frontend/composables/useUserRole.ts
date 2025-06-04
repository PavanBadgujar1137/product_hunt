// composables/useUserRole.js
import { ref } from 'vue';

export function useUserRole() {
  const role = ref('');
  if (process.client) {
    role.value = localStorage.getItem('role') || '';
  }
  return role;
}