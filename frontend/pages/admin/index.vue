<template>
  <div
    class="max-w-6xl mx-auto space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen"
  >
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <h1
        class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Admin Dashboard
      </h1>
      <div class="flex flex-col md:flex-row items-center gap-4">
        <Input
          v-model="searchQuery"
          placeholder="Search products..."
          class="w-full md:w-64 shadow-sm hover:shadow-md transition-shadow duration-200"
          @input="handleSearch"
        />
        <Select
          v-model="selectedCategory"
          class="w-full md:w-40 shadow-sm hover:shadow-md transition-shadow duration-200"
          @change="handleFilter"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </Select>
      </div>
    </div>

    <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-blue-800 mb-2">
            Total Products
          </h3>
          <p class="text-3xl font-bold text-blue-600">
            {{ stats.totalProducts }}
          </p>
        </div>
        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-green-800 mb-2">Total Users</h3>
          <p class="text-3xl font-bold text-green-600">
            {{ stats.totalUsers }}
          </p>
        </div>
        <div class="bg-purple-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-purple-800 mb-2">
            Total Upvotes
          </h3>
          <p class="text-3xl font-bold text-purple-600">
            {{ stats.totalUpvotes }}
          </p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div class="p-6">
          <div v-if="loading" class="flex justify-center items-center py-8">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            ></div>
          </div>
          <div
            v-else-if="recentActivity.length === 0"
            class="text-center py-8 text-gray-500"
          >
            No recent activity
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="activity in recentActivity"
              :key="activity._id"
              class="flex items-start space-x-4"
            >
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
                >
                  <span class="text-blue-600 font-semibold">{{
                    activity.type[0].toUpperCase()
                  }}</span>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-800">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(activity.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <div
        class="rounded-xl border bg-white shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-200"
      >
        <h2 class="text-2xl font-semibold text-gray-800">Analytics Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="rounded-xl border bg-gradient-to-br from-blue-50 to-white p-6 space-y-2 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
          >
            <p class="text-gray-600 font-medium">Total Products</p>
            <p class="text-4xl font-bold text-blue-600">
              {{ analytics.totalProducts }}
            </p>
          </div>
          <div
            class="rounded-xl border bg-gradient-to-br from-purple-50 to-white p-6 space-y-2 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
          >
            <p class="text-gray-600 font-medium">Total Users</p>
            <p class="text-4xl font-bold text-purple-600">
              {{ analytics.totalUsers }}
            </p>
          </div>
          <div
            class="rounded-xl border bg-gradient-to-br from-indigo-50 to-white p-6 space-y-2 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
          >
            <p class="text-gray-600 font-medium">Total Upvotes</p>
            <p class="text-4xl font-bold text-indigo-600">
              {{ analytics.totalUpvotes }}
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-xl border bg-white shadow-lg p-6 space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">Recent Products</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b bg-gray-50">
                <th class="py-3 px-4 text-left font-semibold text-gray-600">
                  Name
                </th>
                <th class="py-3 px-4 text-left font-semibold text-gray-600">
                  Category
                </th>
                <th class="py-3 px-4 text-left font-semibold text-gray-600">
                  Submitted By
                </th>
                <th class="py-3 px-4 text-left font-semibold text-gray-600">
                  Upvotes
                </th>
                <th class="py-3 px-4 text-left font-semibold text-gray-600">
                  Date
                </th>
                <th class="py-3 px-4 text-left font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product._id"
                class="border-b hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="py-3 px-4">
                  <NuxtLink
                    :to="`/products/${product.slug}`"
                    class="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {{ product.name }}
                  </NuxtLink>
                </td>
                <td class="py-3 px-4 text-gray-700">{{ product.category }}</td>
                <td class="py-3 px-4 text-gray-700">
                  {{ product.submittedBy.username }}
                </td>
                <td class="py-3 px-4 text-gray-700">
                  {{ product.upvoteCount }}
                </td>
                <td class="py-3 px-4 text-gray-700">
                  {{ formatDate(product.createdAt) }}
                </td>
                <td class="py-3 px-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    @click="handleDelete(product._id)"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <ProductList />
      <div v-if="role === 'admin'" class="bg-white rounded-xl shadow-lg p-6">
        <ProductForm />
      </div>
      <div
        v-else
        class="text-center text-gray-500 mt-4 p-6 bg-gray-50 rounded-xl"
      >
        Only admins can submit new products.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useProducts } from "@/composables/useProducts";
import { useDebounceFn } from "@vueuse/core";
import { useUserRole } from "@/composables/useUserRole";

const { role } = useUserRole();
const { products, loading, error, fetchProducts } = useProducts();
const analytics = ref({
  totalProducts: 0,
  totalUsers: 0,
  totalUpvotes: 0,
});

const searchQuery = ref("");
const selectedCategory = ref("");
const categories = ["AI", "SaaS", "Devtools", "Productivity", "Other"];

const stats = ref({
  totalProducts: 0,
  totalUsers: 0,
  totalUpvotes: 0,
});
const recentActivity = ref([]);

async function fetchAnalytics() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required");

    const response = await fetch(
      "https://product-hunt-d3ym.onrender.com/api/admin/analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch analytics");
    analytics.value = await response.json();
  } catch (error) {
    console.error("Analytics error:", error);
  }
}

async function handleDelete(productId) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required");

    const response = await fetch(
      `https://product-hunt-d3ym.onrender.com/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete product");
    await fetchProducts();
    await fetchAnalytics();
  } catch (error) {
    console.error("Delete error:", error);
    alert(error.message);
  }
}

const handleSearch = useDebounceFn(() => {
  fetchProducts(selectedCategory.value, "-createdAt", searchQuery.value);
}, 300);

function handleFilter() {
  fetchProducts(selectedCategory.value, "-createdAt", searchQuery.value);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Check admin access and fetch data
onMounted(async () => {
  const isAuthenticated = useState("isAuthenticated");
  const { user } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/auth/login");
  }

  await user.value?.fetchUser();
  if (!user.value?.isAdmin) {
    return navigateTo("/");
  }

  await Promise.all([fetchProducts(), fetchAnalytics()]);
  localStorage.removeItem("role");
  localStorage.removeItem("token");

  // Fetch dashboard data
  await fetchDashboardData();
});

// Fetch dashboard data
async function fetchDashboardData() {
  try {
    loading.value = true;
    const response = await fetch(
      "https://product-hunt-d3ym.onrender.com/api/admin/dashboard",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch dashboard data");

    const data = await response.json();
    stats.value = data.stats;
    recentActivity.value = data.recentActivity;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    loading.value = false;
  }
}
</script>
