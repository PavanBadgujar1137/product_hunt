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
            <div class="relative group cursor-pointer">
              <span
                class="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold mr-2 transform hover:scale-105 transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  lg:width="20"
                  lg:height="20"
                  fill="currentColor"
                  class="mx-auto group-hover:animate-pulse"
                >
                  <circle cx="10" cy="7" r="4" />
                  <path d="M2 18c0-3.3 3.6-6 8-6" />
                </svg>
              </span>
            </div>
            <button
              @click="logout"
              class="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-sm lg:text-base font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Logout
            </button>
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
                <span
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="mx-auto"
                  >
                    <circle cx="10" cy="7" r="4" />
                    <path d="M2 18c0-3.3 3.6-6 8-6" />
                  </svg>
                </span>
                <button
                  @click="logout"
                  class="flex-1 px-3 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </template>
          </div>
        </div>
      </nav>
    </header>
    <main
      class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

const router = useRouter();
const route = useRoute();
const isMobileMenuOpen = ref(false);

const isAuthenticated = useState("isAuthenticated", () => {
  if (process.client) {
    return !!localStorage.getItem("token");
  }
  return false;
});
const role = ref("");
if (process.client) {
  role.value = localStorage.getItem("role") || "";
}

const navigation = computed(() => {
  const nav = [{ name: "Home", path: "/" }];
  if (role.value === "admin") {
    nav.push({ name: "Submit", path: "/submit" });
  }
  return nav;
});

const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
  isAuthenticated.value = false;
  role.value = "";
  isMobileMenuOpen.value = false;
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
</style>
