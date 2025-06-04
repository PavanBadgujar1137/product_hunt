<template>
  <div class="max-w-4xl mx-auto">
    <!-- Profile Header -->
    <div
      class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform hover:scale-[1.01] transition-all duration-300"
    >
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="relative group">
          <div
            class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300"
          >
            {{ userInitials }}
          </div>
          <div
            class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-400 border-2 border-white shadow-md"
          ></div>
          <div
            class="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
          ></div>
        </div>
        <div class="text-center md:text-left">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {{ userData.username }}
          </h1>
          <p
            class="text-lg text-gray-600 mb-3 flex items-center justify-center md:justify-start gap-2"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {{ userData.email }}
          </p>
          <div class="flex items-center justify-center md:justify-start gap-2">
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-sm transform hover:scale-105 transition-all duration-200"
              :class="
                userData.role === 'admin'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-blue-100 text-blue-800'
              "
            >
              <svg
                class="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {{ userData.role === "admin" ? "Administrator" : "Regular User" }}
            </span>
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 shadow-sm"
            >
              <svg
                class="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Member since {{ formatDate(userData.createdAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Information -->
    <div
      class="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.01] transition-all duration-300"
    >
      <h2
        class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
      >
        <svg
          class="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Profile Information
      </h2>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <div v-else class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <label class="text-sm font-medium text-gray-500 block mb-1"
              >Username</label
            >
            <p class="text-lg font-semibold text-gray-900">
              {{ userData.username }}
            </p>
          </div>
          <div
            class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <label class="text-sm font-medium text-gray-500 block mb-1"
              >Email</label
            >
            <p class="text-lg font-semibold text-gray-900">
              {{ userData.email }}
            </p>
          </div>
          <div
            class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <label class="text-sm font-medium text-gray-500 block mb-1"
              >Role</label
            >
            <p class="text-lg font-semibold text-gray-900">
              {{ userData.role === "admin" ? "Administrator" : "Regular User" }}
            </p>
          </div>
          <div
            class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <label class="text-sm font-medium text-gray-500 block mb-1"
              >Member Since</label
            >
            <p class="text-lg font-semibold text-gray-900">
              {{ formatDate(userData.createdAt) }}
            </p>
          </div>
        </div>

        <!-- Activity Stats -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <h3
            class="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
          >
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Activity Stats
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="bg-blue-50 rounded-xl p-6 transform hover:scale-105 transition-all duration-200"
            >
              <p class="text-sm text-blue-600 font-medium mb-2">
                Products Submitted
              </p>
              <p class="text-3xl font-bold text-blue-700">
                {{ userData.productsSubmitted || 0 }}
              </p>
            </div>
            <div
              class="bg-green-50 rounded-xl p-6 transform hover:scale-105 transition-all duration-200"
            >
              <p class="text-sm text-green-600 font-medium mb-2">
                Upvotes Given
              </p>
              <p class="text-3xl font-bold text-green-700">
                {{ userData.upvotesGiven || 0 }}
              </p>
            </div>
            <div
              class="bg-purple-50 rounded-xl p-6 transform hover:scale-105 transition-all duration-200"
            >
              <p class="text-sm text-purple-600 font-medium mb-2">
                Comments Made
              </p>
              <p class="text-3xl font-bold text-purple-700">
                {{ userData.commentsMade || 0 }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
import { useToast } from "vue-toastification";

const toast = useToast();
const { isAuthenticated, userRole, userId } = useAuth();
const loading = ref(true);
const userData = ref({});

// Redirect if not authenticated
if (!isAuthenticated.value) {
  navigateTo("/auth/login");
}

// Get user initials for avatar
const userInitials = computed(() => {
  if (!userData.value.username) return "?";
  // Get first two letters of username
  return userData.value.username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

// Format date
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Fetch user data
const fetchUserData = async () => {
  try {
    loading.value = true;
    const response = await fetch(
      `https://product-hunt-d3ym.onrender.com/api/users/${userId.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch user data");

    userData.value = await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    toast.error("Failed to load profile data");
  } finally {
    loading.value = false;
  }
};

// Fetch data on component mount
onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
/* Add smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Add hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Add shadow effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Add gradient effects */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>
