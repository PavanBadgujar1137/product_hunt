<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Dashboard Section (only visible to admins) -->
    <div v-if="role === 'admin'" class="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-blue-800">Total Products</h3>
          <p class="text-3xl font-bold text-blue-600">{{ products.length }}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-green-800">Total Categories</h3>
          <p class="text-3xl font-bold text-green-600">
            {{ categories.length }}
          </p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-purple-800">Total Upvotes</h3>
          <p class="text-3xl font-bold text-purple-600">
            {{ products.reduce((sum, p) => sum + p.upvoteCount, 0) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Hero Section with improved responsive design -->
    <section
      class="py-6 sm:py-8 md:py-10 lg:py-12 mb-4 sm:mb-6 md:mb-8 lg:mb-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100 rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <div
        class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8"
      >
        <div class="w-full md:w-3/5 text-center md:text-left">
          <h1
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 leading-tight"
          >
            🚀 Discover & Launch New Products
          </h1>
          <p
            class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0"
          >
            Welcome to
            <span
              class="font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >Product Hunt
            </span>
            — the place to share, upvote, and discuss the latest in tech, SaaS,
            AI, and more. Join our community and help great products get
            discovered!
          </p>
        </div>
        <svg
          class="w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-300"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="256"
            cy="256"
            r="256"
            fill="#E0F2FE"
            class="animate-pulse"
          />
          <path d="M256 128L320 384H192L256 128Z" fill="#3B82F6" />
          <circle cx="256" cy="256" r="32" fill="#fff" />
        </svg>
      </div>
    </section>

    <!-- Filters with improved responsive layout -->
    <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4"
      >
        <h2
          class="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent w-full sm:w-auto"
        >
          Today's Top Products
        </h2>
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto"
        >
          <select
            v-model="selectedCategory"
            class="w-full sm:w-36 md:w-40 border border-gray-200 rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer transition-all shadow-sm text-xs sm:text-sm md:text-base"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
          <select
            v-model="selectedSort"
            class="w-full sm:w-36 md:w-40 border border-gray-200 rounded-xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer transition-all shadow-sm text-xs sm:text-sm md:text-base"
          >
            <option value="-createdAt">Latest</option>
            <option value="-upvoteCount">Most Upvoted</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]"
      >
        <!-- Spinner -->
        <div class="relative">
          <div
            class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full"
          ></div>
          <div
            class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0"
          ></div>
        </div>
        <p class="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-600">
          Loading products...
        </p>
      </div>

      <!-- Product Grid with improved responsive design -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12"
      >
        <!-- Product Card with improved responsive design -->
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="group bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-3 sm:p-4 md:p-6 flex flex-col relative overflow-hidden cursor-pointer"
          @click="navigateToProduct(product.slug)"
        >
          <!-- Responsive Image Container -->
          <div
            class="aspect-video rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 md:mb-4 bg-gray-50 border group-hover:border-blue-200 transition-colors"
          >
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Responsive Content -->
          <div
            class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3"
          >
            <span
              class="inline-block px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm group-hover:bg-blue-100 transition-colors"
            >
              {{ product.category }}
            </span>
            <span
              class="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 ml-auto hover:text-gray-700 transition-colors"
            >
              <svg
                width="14"
                height="14"
                sm:width="16"
                sm:height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" fill="#60a5fa" />
                <path d="M4 20c0-2.2 3.6-4 8-4" fill="#bae6fd" />
              </svg>
              {{ product.submittedBy.username }}
            </span>
          </div>

          <h3
            class="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 leading-tight group-hover:text-blue-600 transition-colors"
          >
            {{ product.name }}
          </h3>
          <p
            class="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed group-hover:text-gray-800 transition-colors"
          >
            {{ product.tagline }}
          </p>

          <!-- Responsive Footer -->
          <div
            class="flex items-center justify-between mt-auto pt-2 sm:pt-3 md:pt-4 border-t border-gray-100"
          >
            <div class="flex items-center gap-2 sm:gap-3">
              <!-- Upvote Button -->
              <button
                @click.stop="handleUpvote(product._id)"
                :disabled="
                  !isAuthenticated || role !== 'user' || isLoading[product._id]
                "
                class="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 active:from-blue-200 active:to-indigo-200 border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-300 font-medium text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-xs sm:text-sm relative overflow-hidden group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ product.upvoteCount }}</span>
              </button>

              <!-- Admin Actions -->
              <div v-if="role === 'admin'" class="flex items-center gap-2">
                <button
                  @click.stop="handleEdit(product)"
                  class="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-50 hover:bg-yellow-100 border border-yellow-200/50 shadow-sm hover:shadow-md transition-all duration-300 font-medium text-yellow-700 transform hover:scale-105 text-xs sm:text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  @click.stop="handleDelete(product._id)"
                  class="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200/50 shadow-sm hover:shadow-md transition-all duration-300 font-medium text-red-700 transform hover:scale-105 text-xs sm:text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            <a
              :href="product.websiteUrl"
              target="_blank"
              @click.stop
              class="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg transition-all duration-200 hover:shadow-md"
              >Visit Site</a
            >
          </div>

          <!-- Responsive Comment Form -->
          <form
            @submit.prevent="submitComment(product._id)"
            class="mt-2 sm:mt-3 md:mt-4 flex gap-1.5 sm:gap-2"
            @click.stop
          >
            <input
              v-model="commentTexts[product._id]"
              placeholder="Add a comment..."
              required
              class="flex-1 border border-gray-200 rounded-lg sm:rounded-xl px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-gray-50 hover:bg-white transition-all placeholder-gray-400"
            />
            <button
              type="submit"
              class="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect, computed } from "vue";
import { useProducts } from "~/composables/useProducts";
import { useAuth } from "~/composables/useAuth";

const { products, loading, error, fetchProducts, resetProducts } =
  useProducts();
const { isAuthenticated, userId: authUserId, userRole } = useAuth();
const userId = ref(null);
const role = ref("");

onMounted(() => {
  if (process.client) {
    role.value = userRole.value || "";
    userId.value = authUserId.value;
  }
});

const categories = ["AI", "SaaS", "Devtools", "Productivity", "Other"];
const selectedCategory = ref("");
const selectedSort = ref("-createdAt");

const hasMore = ref(false); // Add this line

watchEffect(() => {
  fetchProducts(selectedCategory.value, selectedSort.value);
});

const isLoading = ref({});

async function handleUpvote(productId) {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    isLoading.value[productId] = true;
    const res = await fetch(
      `https://product-hunt-d3ym.onrender.com/api/products/${productId}/upvote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (data.success) {
      // Find and update the product
      const productIndex = products.value.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        const product = products.value[productIndex];
        product.upvoteCount = data.upvoteCount;

        // Update upvotes array
        if (data.hasUpvoted) {
          if (!product.upvotes.includes(userId.value)) {
            product.upvotes.push(userId.value);
          }
        } else {
          product.upvotes = product.upvotes.filter((id) => id !== userId.value);
        }
      }

      // Add a small delay to show the animation
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  } catch (error) {
    console.error("Error toggling upvote:", error);
  } finally {
    isLoading.value[productId] = false;
  }
}

// Fetch user ID on mount if authenticated
onMounted(async () => {
  if (isAuthenticated.value) {
    userId.value = authUserId.value;
  }
});

const loadMore = async (entries) => {
  if (entries[0].isIntersecting) {
    await fetchProducts(selectedCategory.value, selectedSort.value);
  }
};

// Reset products when filters change
watch([selectedCategory, selectedSort], () => {
  resetProducts();
  fetchProducts(selectedCategory.value, selectedSort.value);
});

const commentTexts = ref({});

async function submitComment(productId) {
  const token = localStorage.getItem("token");
  const text = commentTexts.value[productId];
  if (!text) return;
  await fetch(
    `https://product-hunt-d3ym.onrender.com/api/products/${productId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    }
  );
  commentTexts.value[productId] = "";
  // Optionally, refresh product/comments here
}

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter((p) => p.category === selectedCategory.value);
});

// Add this function to handle navigation
function navigateToProduct(slug) {
  navigateTo(`/products/${slug}`);
}

const handleEdit = (product) => {
  // Navigate to edit page with product data
  navigateTo({
    path: `/products/edit/${product._id}`,
    query: {
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      websiteUrl: product.websiteUrl,
      category: product.category,
      imageUrl: product.imageUrl,
    },
  });
};

const handleDelete = async (productId) => {
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

    // Remove product from local state
    products.value = products.value.filter((p) => p._id !== productId);
    toast.success("Product deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    toast.error(error.message || "Failed to delete product");
  }
};
</script>

<style scoped>
/* Add these styles for better cursor interaction */
.cursor-pointer {
  cursor: pointer;
}

/* Add hover effect for the entire card */
.group:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth transition for all interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhance text readability */
.text-gray-600 {
  color: #4b5563;
}

.group:hover .text-gray-600 {
  color: #1f2937;
}

/* Enhanced upvote button animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Smooth transitions for all interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhanced hover effects */
.group:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Button hover effect */
button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

button:active:not(:disabled) {
  transform: translateY(0);
}
</style>
