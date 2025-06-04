import { ref } from 'vue';

export const useAuth = () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref(null);
  const loading = ref(false);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem('token');
  };

  const fetchUser = async () => {
    if (!token.value) return;

    try {
      loading.value = true;
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user');

      user.value = await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      clearToken();
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    clearToken();
    user.value = null;
    window.location.href = '/auth/login';
  };

  return {
    token,
    user,
    loading,
    setToken,
    clearToken,
    fetchUser,
    logout
  };
};