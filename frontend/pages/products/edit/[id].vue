<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div
        class="bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl border border-gray-100"
      >
        <div class="flex items-center justify-between mb-10">
          <div>
            <h1
              class="text-4xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Edit Product
            </h1>
            <p class="mt-2 text-gray-500">Update your product details below</p>
          </div>
          <button
            @click="$router.back()"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:bg-gray-50 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Back
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Name -->
          <div
            class="group transform transition-all duration-300 hover:scale-[1.01]"
          >
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200"
              >Product Name</label
            >
            <div class="relative">
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 px-4 py-3 bg-white"
                :class="{ 'border-red-500': errors.name }"
                required
              />
            </div>
            <p
              v-if="errors.name"
              class="mt-1 text-sm text-red-600 animate-fade-in"
            >
              {{ errors.name }}
            </p>
          </div>

          <!-- Tagline -->
          <div
            class="group transform transition-all duration-300 hover:scale-[1.01]"
          >
            <label
              for="tagline"
              class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200"
              >Tagline</label
            >
            <div class="relative">
              <input
                type="text"
                id="tagline"
                v-model="form.tagline"
                class="block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 px-4 py-3 bg-white"
                :class="{ 'border-red-500': errors.tagline }"
                required
              />
            </div>
            <p
              v-if="errors.tagline"
              class="mt-1 text-sm text-red-600 animate-fade-in"
            >
              {{ errors.tagline }}
            </p>
          </div>

          <!-- Description -->
          <div
            class="group transform transition-all duration-300 hover:scale-[1.01]"
          >
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200"
              >Description</label
            >
            <div class="relative">
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 px-4 py-3 bg-white"
                :class="{ 'border-red-500': errors.description }"
                required
              ></textarea>
            </div>
            <p
              v-if="errors.description"
              class="mt-1 text-sm text-red-600 animate-fade-in"
            >
              {{ errors.description }}
            </p>
          </div>

          <!-- Website URL -->
          <div
            class="group transform transition-all duration-300 hover:scale-[1.01]"
          >
            <label
              for="websiteUrl"
              class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200"
              >Website URL</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="url"
                id="websiteUrl"
                v-model="form.websiteUrl"
                class="block w-full pl-12 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 px-4 py-3 bg-white"
                :class="{ 'border-red-500': errors.websiteUrl }"
                required
              />
            </div>
            <p
              v-if="errors.websiteUrl"
              class="mt-1 text-sm text-red-600 animate-fade-in"
            >
              {{ errors.websiteUrl }}
            </p>
          </div>

          <!-- Category -->
          <div
            class="group transform transition-all duration-300 hover:scale-[1.01]"
          >
            <label
              for="category"
              class="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200"
              >Category</label
            >
            <div class="relative">
              <select
                id="category"
                v-model="form.category"
                class="block w-full rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 px-4 py-3 bg-white appearance-none"
                :class="{ 'border-red-500': errors.category }"
                required
              >
                <option value="" disabled selected>Select a category</option>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p
              v-if="errors.category"
              class="mt-1 text-sm text-red-600 animate-fade-in"
            >
              {{ errors.category }}
            </p>
          </div>

          <!-- Image -->
          <div
            class="group transform transition-all duration-300 hover:scale-[1.01]"
          >
            <label
              class="block text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-200 mb-2"
              >Product Image</label
            >
            <div class="mt-1 flex items-center space-x-4">
              <div
                v-if="form.imagePreview || form.imageUrl"
                class="relative w-32 h-32 group/image"
              >
                <img
                  :src="form.imagePreview || form.imageUrl"
                  alt="Preview"
                  class="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover/image:scale-105 group-hover/image:shadow-lg"
                />
                <button
                  v-if="form.imagePreview || form.imageUrl"
                  @click.prevent="removeImage"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 group/upload"
                  >
                    <div
                      class="flex flex-col items-center justify-center pt-5 pb-6"
                    >
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 group-hover/upload:text-indigo-500 transition-colors duration-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p
                        class="mb-2 text-sm text-gray-500 group-hover/upload:text-indigo-500 transition-colors duration-300"
                      >
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p
                        class="text-xs text-gray-500 group-hover/upload:text-indigo-400 transition-colors duration-300"
                      >
                        PNG, JPG or GIF (MAX. 800x800px)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleImageChange"
                      class="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              @click="$router.back()"
              class="px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <svg
                v-if="loading"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              {{ loading ? "Updating..." : "Update Product" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const categories = ["AI", "SaaS", "Devtools", "Productivity", "Other"];
const loading = ref(false);
const errors = ref({});

const form = ref({
  name: "",
  tagline: "",
  description: "",
  websiteUrl: "",
  category: "",
  image: null,
  imagePreview: null,
  imageUrl: "",
});

// Initialize form with route query data
onMounted(() => {
  const { name, tagline, description, websiteUrl, category, imageUrl } =
    route.query;
  form.value = {
    name: name || "",
    tagline: tagline || "",
    description: description || "",
    websiteUrl: websiteUrl || "",
    category: category || "",
    image: null,
    imagePreview: null,
    imageUrl: imageUrl || "",
  };
});

function validateForm() {
  errors.value = {};
  let isValid = true;

  if (!form.value.name.trim()) {
    errors.value.name = "Product name is required";
    isValid = false;
  }

  if (!form.value.tagline.trim()) {
    errors.value.tagline = "Tagline is required";
    isValid = false;
  }

  if (!form.value.description.trim()) {
    errors.value.description = "Description is required";
    isValid = false;
  }

  if (!form.value.websiteUrl.trim()) {
    errors.value.websiteUrl = "Website URL is required";
    isValid = false;
  } else if (!isValidUrl(form.value.websiteUrl)) {
    errors.value.websiteUrl = "Please enter a valid URL";
    isValid = false;
  }

  if (!form.value.category) {
    errors.value.category = "Category is required";
    isValid = false;
  }

  return isValid;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function handleImageChange(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Image size should be less than 5MB");
      event.target.value = "";
      return;
    }
    form.value.image = file;
    form.value.imagePreview = URL.createObjectURL(file);
  } else {
    toast.error("Please select a valid image file");
    event.target.value = "";
    form.value.image = null;
    form.value.imagePreview = null;
  }
}

function removeImage() {
  form.value.image = null;
  form.value.imagePreview = null;
  form.value.imageUrl = "";
}

async function handleSubmit() {
  if (!validateForm()) {
    toast.error("Please fix the errors in the form");
    return;
  }

  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required");

    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("tagline", form.value.tagline);
    formData.append("description", form.value.description);
    formData.append("websiteUrl", form.value.websiteUrl);
    formData.append("category", form.value.category);
    if (form.value.image) {
      formData.append("image", form.value.image);
    }

    const response = await fetch(
      `https://product-hunt-d3ym.onrender.com/api/products/${route.params.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update product");
    }

    toast.success("Product updated successfully");
    router.push("/");
  } catch (error) {
    console.error("Update error:", error);
    toast.error(error.message || "Failed to update product");
  } finally {
    loading.value = false;
  }
}
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

/* Input focus styles */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
  border-color: #4f46e5;
  outline: none;
}

/* Hover styles for inputs */
input:hover,
textarea:hover,
select:hover {
  border-color: #818cf8;
}

/* Base input styles */
input,
textarea,
select {
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;
}

/* Remove default input styles */
input[type="text"],
input[type="url"],
textarea,
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Error state styles */
input.error,
textarea.error,
select.error {
  border-color: #ef4444;
}

/* Success state styles */
input.success,
textarea.success,
select.success {
  border-color: #10b981;
}

/* Disabled state styles */
input:disabled,
textarea:disabled,
select:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Placeholder styles */
::placeholder {
  color: #9ca3af;
  opacity: 1;
}

/* Focus ring styles */
.focus-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 0.75rem;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
}

input:focus ~ .focus-ring,
textarea:focus ~ .focus-ring,
select:focus ~ .focus-ring {
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}
</style>
