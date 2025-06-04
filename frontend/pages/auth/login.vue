<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100 p-4"
  >
    <div
      class="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-blue-100 transform hover:scale-[1.01] transition-all duration-300"
    >
      <div class="mb-8 text-center space-y-2">
        <h1
          class="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2"
        >
          Welcome Back
        </h1>
        <p class="text-gray-500 text-lg">Enter your credentials to login</p>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-1">
          <Label
            for="email"
            class="block font-semibold text-gray-700 text-sm uppercase tracking-wide"
            >Email</Label
          >
          <Input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200"
          />
        </div>
        <div class="space-y-1">
          <Label
            for="password"
            class="block font-semibold text-gray-700 text-sm uppercase tracking-wide"
            >Password</Label
          >
          <Input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200"
          />
        </div>
        <div
          v-if="error"
          class="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg border border-red-100"
        >
          {{ error }}
        </div>
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          :disabled="loading"
        >
          <span class="flex items-center justify-center">
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ loading ? "Logging in..." : "Login" }}
          </span>
        </button>
      </form>
      <div class="mt-8 text-center space-y-2">
        <p class="text-gray-500">
          Don't have an account?
          <NuxtLink
            to="/auth/register"
            class="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200 cursor-pointer"
            >Register</NuxtLink
          >
        </p>
        <div class="border-t border-gray-100 pt-4">
          <a
            href="#"
            class="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            >Forgot your password?</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useAuth } from "~/composables/useAuth";

const toast = useToast();
const { setAuth } = useAuth();
const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref(null);

async function handleSubmit() {
  // Validate form
  if (!form.value.email || !form.value.password) {
    error.value = "Please fill in all fields";
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    error.value = "Please enter a valid email address";
    return;
  }

  try {
    loading.value = true;
    const response = await fetch(
      "https://product-hunt-d3ym.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    // Set auth state using composable
    setAuth(data);

    // Show success toast and redirect
    toast.success("Login successful!", {
      timeout: 2000,
      onClose: () => {
        navigateTo("/");
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error.message.includes("Invalid credentials")) {
      error.value = "Invalid email or password. Please try again.";
    } else if (error.message.includes("User not found")) {
      error.value = "No account found with this email. Please register first.";
    } else {
      error.value = error.message || "Login failed. Please try again.";
    }
  } finally {
    loading.value = false;
  }
}
</script>
