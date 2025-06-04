<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-3xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1
          class="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
        >
          Submit Your Product
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your innovation with the world! Fill out the details below to
          showcase your product to our community.
        </p>
      </div>

      <!-- Form Section -->
      <form
        v-if="role === 'admin'"
        @submit.prevent="handleSubmit"
        enctype="multipart/form-data"
        class="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-blue-100 transform hover:scale-[1.01] transition-all duration-300"
      >
        <!-- Product Name -->
        <div class="space-y-2">
          <label for="name" class="block text-lg font-semibold text-gray-700">
            Product Name
            <span class="text-red-500">*</span>
          </label>
          <input
            id="name"
            v-model.trim="form.name"
            name="name"
            placeholder="Enter your product name"
            required
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200 text-lg"
          />
        </div>

        <!-- Tagline -->
        <div class="space-y-2">
          <label
            for="tagline"
            class="block text-lg font-semibold text-gray-700"
          >
            Tagline
            <span class="text-red-500">*</span>
          </label>
          <input
            id="tagline"
            v-model.trim="form.tagline"
            name="tagline"
            placeholder="A short, catchy tagline for your product"
            required
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200 text-lg"
          />
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <label
            for="description"
            class="block text-lg font-semibold text-gray-700"
          >
            Description
            <span class="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            v-model.trim="form.description"
            name="description"
            placeholder="Describe your product in detail..."
            rows="4"
            required
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200 text-lg resize-none"
          ></textarea>
        </div>

        <!-- Website URL -->
        <div class="space-y-2">
          <label
            for="websiteUrl"
            class="block text-lg font-semibold text-gray-700"
          >
            Website URL
            <span class="text-red-500">*</span>
          </label>
          <input
            id="websiteUrl"
            v-model.trim="form.websiteUrl"
            name="websiteUrl"
            type="url"
            placeholder="https://your-product.com"
            required
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200 text-lg"
          />
        </div>

        <!-- Category -->
        <div class="space-y-2">
          <label
            for="category"
            class="block text-lg font-semibold text-gray-700"
          >
            Category
            <span class="text-red-500">*</span>
          </label>
          <select
            id="category"
            v-model="form.category"
            name="category"
            required
            class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-200 text-lg bg-white cursor-pointer"
          >
            <option value="" disabled>Select a category</option>
            <option
              v-for="cat in categories"
              :key="cat"
              :value="cat"
              class="py-2"
            >
              {{ cat }}
            </option>
          </select>
        </div>

        <!-- Image Upload -->
        <div class="space-y-2">
          <label for="image" class="block text-lg font-semibold text-gray-700">
            Product Image
            <span class="text-red-500">*</span>
          </label>
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-blue-400 transition-all duration-200"
          >
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="image"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    @change="handleImageChange"
                    required
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <!-- Image Preview -->
          <div v-if="form.imagePreview" class="mt-4">
            <img
              :src="form.imagePreview"
              alt="Preview"
              class="h-48 w-full object-contain rounded-lg shadow-lg border-2 border-blue-100"
            />
          </div>
        </div>

        <!-- Error/Success Messages -->
        <div
          v-if="error"
          class="text-red-500 text-center text-sm bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in"
        >
          {{ error }}
        </div>
        <div
          v-if="success"
          class="text-green-600 text-center text-sm bg-green-50 p-4 rounded-xl border border-green-100 animate-fade-in"
        >
          {{ success }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="loading || !isFormValid"
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
            {{ loading ? "Submitting..." : "Submit Product" }}
          </span>
        </button>
      </form>

      <!-- Non-Admin Message -->
      <div
        v-else
        class="text-center py-16 bg-white rounded-2xl shadow-2xl border border-blue-100"
      >
        <svg
          class="mx-auto h-16 w-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <h2 class="text-2xl font-bold text-gray-700 mb-2">
          Admin Access Required
        </h2>
        <p class="text-gray-500 text-lg">
          Only administrators can submit new products. Please contact your
          administrator for access.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useState } from "#app";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const categories = ["AI", "SaaS", "Devtools", "Productivity", "Other"];

const role = process.client ? localStorage.getItem("role") : "";
const form = ref({
  name: "",
  tagline: "",
  description: "",
  websiteUrl: "",
  category: "",
  image: null,
  imagePreview: null,
});

const loading = ref(false);
const error = ref(null);
const success = ref("");

const products = ref([]); // Add this if you want to show preview

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.tagline &&
    form.value.description &&
    form.value.websiteUrl &&
    form.value.category &&
    form.value.image
  );
});

function handleImageChange(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    form.value.image = file;
    form.value.imagePreview = URL.createObjectURL(file);
    error.value = null;
  } else {
    const errorMessage = "Please select a valid image file";
    toast.error(errorMessage);
    error.value = errorMessage;
    event.target.value = "";
    form.value.image = null;
    form.value.imagePreview = null;
  }
}

async function handleSubmit() {
  error.value = null;
  success.value = "";
  loading.value = true;

  try {
    const token = process.client ? localStorage.getItem("token") : "";
    if (!token) {
      toast.error("Please login to submit a product");
      router.push("/auth/login");
      return;
    }

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("tagline", form.value.tagline);
    formData.append("description", form.value.description);
    formData.append("websiteUrl", form.value.websiteUrl);
    formData.append("category", form.value.category);
    formData.append("image", form.value.image);

    // POST to backend
    const response = await axios.post(
      "https://product-hunt-d3ym.onrender.com/api/products",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Optionally, fetch products again for preview
    await fetchProducts();

    // Show success message
    toast.success("Product submitted successfully!");
    success.value = "Product submitted successfully!";

    // Reset form
    form.value.name = "";
    form.value.tagline = "";
    form.value.description = "";
    form.value.websiteUrl = "";
    form.value.category = "";
    form.value.image = null;
    form.value.imagePreview = null;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message ||
      "Failed to submit product. Please try again.";
    toast.error(errorMessage);
    error.value = errorMessage;
  } finally {
    loading.value = false;
  }
}

// Fetch products for preview
async function fetchProducts() {
  try {
    const res = await axios.get(
      "https://product-hunt-d3ym.onrender.com/api/products"
    );
    products.value = res.data.products || res.data;
  } catch (e) {
    // ignore preview errors
  }
}

// Redirect if not authenticated
onMounted(() => {
  const isAuthenticated = useState("isAuthenticated");
  if (!isAuthenticated.value) {
    router.push("/auth/login");
  }
  fetchProducts();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
