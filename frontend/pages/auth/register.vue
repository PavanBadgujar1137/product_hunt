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
          Create Account
        </h1>
        <p class="text-gray-500 text-lg">
          Join our community and launch your product!
        </p>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-1">
          <Label
            for="username"
            class="block font-semibold text-gray-700 text-sm uppercase tracking-wide"
            >Username</Label
          >
          <Input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Choose a username"
            required
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200"
          />
        </div>
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
            placeholder="Choose a password"
            required
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200"
          />
        </div>
        <div class="space-y-1">
          <Label
            for="role"
            class="block font-semibold text-gray-700 text-sm uppercase tracking-wide"
            >Role</Label
          >
          <select
            id="role"
            v-model="form.role"
            class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition-all duration-200 hover:border-blue-200 cursor-pointer"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div
          v-if="error"
          class="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg border border-red-100 animate-fade-in"
        >
          {{ error }}
        </div>
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            {{ loading ? "Registering..." : "Register" }}
          </span>
        </button>
      </form>
      <div class="mt-8 text-center space-y-2">
        <p class="text-gray-500">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
            >Login</NuxtLink
          >
        </p>
        <div class="border-t border-gray-100 pt-4">
          <p class="text-sm text-gray-500">
            By registering, you agree to our
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >Terms</a
            >
            and
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >Privacy Policy</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserRole } from "@/composables/useUserRole";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const form = ref({
  username: "",
  email: "",
  password: "",
  role: "user",
});

const loading = ref(false);
const error = ref("");
const isAuthenticated = useState("isAuthenticated");
const { role } = useUserRole();

async function handleSubmit() {
  if (
    !form.value.username ||
    !form.value.email ||
    !form.value.password ||
    !form.value.role
  ) {
    toast.error("Please fill in all fields");
    return;
  }
  error.value = "";
  try {
    loading.value = true;
    await axios.post("http://localhost:5000/api/auth/register", {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      role: form.value.role,
    });
    toast.success("Registration successful! Please login to continue.");
    router.push("/auth/login");
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Registration failed";
    toast.error(errorMessage);
    error.value = errorMessage;
  } finally {
    loading.value = false;
  }
}
</script>
