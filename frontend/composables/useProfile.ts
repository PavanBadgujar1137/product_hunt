import { ref } from 'vue';

export const useProfile = () => {
  const submittedProducts = ref([]);
  const upvotedProducts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchUserProducts = async (userId: string) => {
    try {
      loading.value = true;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user products');

      const data = await response.json();
      submittedProducts.value = data.submitted;
      upvotedProducts.value = data.upvoted;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    submittedProducts,
    upvotedProducts,
    loading,
    error,
    fetchUserProducts
  };
};