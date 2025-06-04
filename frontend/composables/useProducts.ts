import { ref } from "vue";
import axios from "axios";

export const useProducts = () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const page = ref(1);
  const hasMore = ref(true);

  const fetchProducts = async (
    category = "",
    sort = "-createdAt",
    search = ""
  ) => {
    try {
      if (!hasMore.value || loading.value) return;

      loading.value = true;
      const query = new URLSearchParams();
      if (category) query.append("category", category);
      if (sort) query.append("sort", sort);
      if (search) query.append("search", search);
      query.append("page", page.value.toString());
      query.append("limit", "9");

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://product-hunt-d3ym.onrender.com/api/products`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const data = response.data;
      products.value =
        page.value === 1
          ? data.products
          : [...products.value, ...data.products];
      hasMore.value = data.hasMore;
      page.value++;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  };

  const resetProducts = () => {
    products.value = [];
    page.value = 1;
    hasMore.value = true;
  };

  return {
    products,
    loading,
    error,
    hasMore,
    fetchProducts,
    resetProducts,
  };
};
