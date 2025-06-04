<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <header
      class="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b transition-all duration-300 ease-in-out"
    >
      <nav
        class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between"
      >
        <NuxtLink
          to="/"
          class="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 tracking-tight flex items-center gap-1.5 sm:gap-2 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          <span class="animate-bounce cursor-default text-lg sm:text-xl"
            >🚀</span
          >
          <span class="hidden sm:inline">ProductHunt</span>
          <span class="sm:hidden">PH</span>
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-2 lg:gap-4">
          <NuxtLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="text-sm lg:text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm active:scale-95 cursor-pointer"
            active-class="bg-blue-100 text-blue-700 shadow-inner"
          >
            {{ item.name }}
          </NuxtLink>
          <template v-if="!isAuthenticated">
            <NuxtLink
              to="/auth/login"
              class="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-sm lg:text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-md active:scale-95 cursor-pointer"
            >
              Login
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-sm lg:text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Register
            </NuxtLink>
          </template>
          <template v-else>
            <div class="flex items-center gap-2">
              <div
                class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
                :class="
                  userRole === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                "
              >
                <span
                  class="w-2 h-2 rounded-full"
                  :class="
                    userRole === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                  "
                ></span>
                {{ userRole === "admin" ? "Admin" : "User" }}
              </div>
              <div class="relative profile-dropdown">
                <button
                  @click="toggleProfile"
                  class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div class="relative">
                    <div
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold transform hover:scale-105 transition-all duration-200"
                    >
                      <svg
                        class="w-6 h-6"
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
                    </div>
                    <div
                      class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"
                    ></div>
                  </div>
                </button>

                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div
                    v-if="isProfileOpen"
                    class="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <div class="py-1">
                      <div class="px-4 py-2 border-b border-gray-100">
                        <p class="text-sm font-medium text-gray-900">
                          Welcome!
                        </p>
                        <p class="text-xs text-gray-500 truncate">
                          {{
                            userRole === "admin"
                              ? "Administrator"
                              : "Regular User"
                          }}
                        </p>
                      </div>

                      <NuxtLink
                        to="/profile"
                        class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        @click="isProfileOpen = false"
                      >
                        <svg
                          class="w-4 h-4"
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
                        Profile
                      </NuxtLink>

                      <button
                        @click="handleLogout"
                        class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Navigation Menu -->
        <div
          v-if="isMobileMenuOpen"
          class="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden"
        >
          <div class="container mx-auto px-3 py-2 space-y-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.path"
              :to="item.path"
              class="block px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
              active-class="bg-blue-100 text-blue-700"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
            <template v-if="!isAuthenticated">
              <NuxtLink
                to="/auth/login"
                class="block px-3 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                @click="isMobileMenuOpen = false"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="block px-3 py-2 text-sm font-semibold rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200"
                @click="isMobileMenuOpen = false"
              >
                Register
              </NuxtLink>
            </template>
            <template v-else>
              <div class="flex items-center gap-2 px-3 py-2">
                <div
                  class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
                  :class="
                    userRole === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  "
                >
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="
                      userRole === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                    "
                  ></span>
                  {{ userRole === "admin" ? "Admin" : "User" }}
                </div>
                <div class="flex-1 flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white"
                  >
                    <svg
                      class="w-4 h-4"
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
                  </div>
                  <button
                    @click="handleLogout"
                    class="flex-1 px-3 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <!-- Welcome Banner for Authenticated Users -->
    <div
      v-if="isAuthenticated"
      class="bg-gradient-to-r from-blue-50 to-indigo-50 border-b"
    >
      <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">👋</span>
            <p class="text-sm text-gray-600">
              Welcome back! You are logged in as a
              <span
                class="font-semibold"
                :class="
                  userRole === 'admin' ? 'text-purple-600' : 'text-blue-600'
                "
              >
                {{ userRole === "admin" ? "Administrator" : "Regular User" }}
              </span>
            </p>
          </div>
          <div class="text-xs text-gray-500">
            {{ new Date().toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>

    <main
      class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const isMobileMenuOpen = ref(false);
const isProfileOpen = ref(false);
const toast = useToast();
const { isAuthenticated, userRole, clearAuth, initAuth } = useAuth();

const navigation = computed(() => {
  const nav = [{ name: "Home", path: "/" }];
  if (userRole.value === "admin") {
    nav.push({ name: "Submit", path: "/submit" });
  }
  return nav;
});

// Toggle profile dropdown
const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value;
};

// Handle click outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector(".profile-dropdown");
  if (dropdown && !dropdown.contains(event.target)) {
    isProfileOpen.value = false;
  }
};

// Handle logout
const handleLogout = () => {
  clearAuth();
  toast.success("Logged out successfully! See you soon!", {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
  isMobileMenuOpen.value = false;
  isProfileOpen.value = false;
  router.push("/auth/login");
};

// Close mobile menu when route changes
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  }
);

// Prevent navigating to login if already logged in
if (process.client && isAuthenticated.value && route.path === "/auth/login") {
  router.push("/");
}

// Block /auth/login and /auth/register if already authenticated
if (
  process.client &&
  isAuthenticated.value &&
  (route.path === "/auth/login" || route.path === "/auth/register")
) {
  // Go back if possible, otherwise go to home
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}

// Initialize auth state on component mount
onMounted(() => {
  initAuth();
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
header {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Make all interactive elements show pointer cursor on hover */
a,
button,
.cursor-pointer {
  cursor: pointer;
}

/* Keep emoji and non-interactive elements with default cursor */
.cursor-default {
  cursor: default;
}

/* Mobile menu animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Add smooth transitions for dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Add hover effect for profile icon */
.profile-icon {
  transition: transform 0.2s ease;
}

.profile-icon:hover {
  transform: scale(1.05);
}

/* Profile dropdown styles */
.profile-dropdown {
  position: relative;
}

/* Ensure dropdown is above other elements */
.profile-dropdown > div:last-child {
  z-index: 50;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Focus styles */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.focus\:ring-offset-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px white;
}
</style>
