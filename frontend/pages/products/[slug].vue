<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Back Button -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
      <button
        @click="$router.back()"
        class="group relative inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-100"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-600 group-hover:text-blue-600 transform group-hover:-translate-x-1 transition-all duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span
          class="relative font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
        >
          Back to Products
        </span>
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50"
      >
        <!-- Hero Image Section -->
        <div class="relative w-full h-[400px]">
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10"
          ></div>
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h1 class="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
              {{ product.name }}
            </h1>
            <p class="text-2xl text-white/90 italic font-medium drop-shadow-lg">
              {{ product.tagline }}
            </p>
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-10">
          <div class="space-y-8">
            <p class="text-gray-700 leading-relaxed text-lg">
              {{ product.description }}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                class="bg-gradient-to-br from-gray-50 to-gray-100/80 p-6 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <span class="font-semibold text-gray-700 block mb-2 text-lg"
                  >Category</span
                >
                <span class="text-blue-600 font-medium text-lg">{{
                  product.category
                }}</span>
              </div>

              <div
                class="bg-gradient-to-br from-gray-50 to-gray-100/80 p-6 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <span class="font-semibold text-gray-700 block mb-2 text-lg"
                  >Website</span
                >
                <a
                  :href="product.websiteUrl"
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800 underline break-all transition-colors duration-300 text-lg"
                >
                  {{ product.websiteUrl }}
                </a>
              </div>

              <div
                class="bg-gradient-to-br from-gray-50 to-gray-100/80 p-6 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <span class="font-semibold text-gray-700 block mb-2 text-lg"
                  >Submitted by</span
                >
                <span class="text-gray-700 text-lg">{{
                  product.submittedBy.username
                }}</span>
              </div>

              <div
                class="bg-gradient-to-br from-gray-50 to-gray-100/80 p-6 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <span class="font-semibold text-gray-700 block mb-2 text-lg"
                  >Upvotes</span
                >
                <div class="flex items-center gap-3">
                  <button
                    @click="handleUpvote"
                    :disabled="isLoading"
                    class="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden"
                    :class="[
                      hasUpvoted
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                      isLoading
                        ? 'opacity-75 cursor-not-allowed'
                        : 'cursor-pointer',
                    ]"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 transform transition-transform duration-300"
                      :class="{ 'rotate-180 scale-110': hasUpvoted }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <span
                      class="font-medium transition-all duration-300"
                      :class="{ 'scale-110': hasUpvoted }"
                    >
                      {{ product.upvoteCount }}
                    </span>
                    <div
                      v-if="isLoading"
                      class="absolute inset-0 flex items-center justify-center bg-white/50"
                    >
                      <svg
                        class="animate-spin h-5 w-5 text-blue-600"
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
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-16 pt-10 border-t border-gray-100/50">
            <h2 class="text-3xl font-bold mb-8 flex items-center">
              <span
                class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient"
                >Comments</span
              >
              <span
                class="ml-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                >{{ product.comments.length }}</span
              >
            </h2>

            <div v-if="product.comments.length" class="space-y-6">
              <div
                v-for="comment in product.comments"
                :key="comment._id"
                class="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg text-xl"
                  >
                    {{ comment.user.username.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-3">
                      <span class="font-semibold text-blue-600 text-lg">{{
                        comment.user.username
                      }}</span>
                      <span
                        class="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                      >
                        {{ new Date(comment.createdAt).toLocaleString() }}
                      </span>
                    </div>
                    <p class="mt-3 text-gray-700 text-lg">{{ comment.text }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl"
            >
              <p class="text-gray-500 text-lg">
                No comments yet. Be the first to comment! 💭
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pulse {
  animation: pulse 0.3s ease-in-out;
}
</style>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const product = ref({
  _id: "683e8eaf995d58d260db2482",
  name: "askjhk .,mlklk,kj",
  tagline: "NM NM NLKILFDKJ",
  description: "kiuhiu ,m,joi,mmb nmkj",
  websiteUrl: "http://localhost:3000/submit",
  imageUrl:
    "https://res.cloudinary.com/djolycs3p/image/upload/v1748930223/1748930215267_al1sdw.png",
  category: "SaaS",
  submittedBy: {
    _id: "683dfc341b2f85aa8caaa5dc",
    username: "nitinpatil15",
  },
  upvotes: [],
  upvoteCount: 0,
  comments: [
    {
      user: {
        _id: "683e8f19995d58d260db2490",
        username: "samadhan",
      },
      text: "ok",
      _id: "683e92136b5b561eb131f297",
      createdAt: "2025-06-03T06:11:31.400Z",
    },
  ],
  createdAt: "2025-06-03T05:57:03.465Z",
  updatedAt: "2025-06-03T06:11:31.404Z",
  slug: "askjhk-.mlklkkj",
  __v: 1,
});
const hasUpvoted = ref(false);
const isLoading = ref(false);

const handleUpvote = async () => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const response = await axios.post(
      `https://product-hunt-d3ym.onrender.com/api/products/${product.value._id}/upvote`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      // Animate the count change
      const oldCount = product.value.upvoteCount;
      const newCount = response.data.upvoteCount;
      product.value.upvoteCount = newCount;
      hasUpvoted.value = response.data.hasUpvoted;

      // Add a small delay to show the animation
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  } catch (error) {
    console.error("Error toggling upvote:", error);
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const { slug } = route.params;
  try {
    const res = await axios.get(
      `https://product-hunt-d3ym.onrender.com/api/products/${slug}`
    );
    product.value = res.data.product || res.data;
    // Check if current user has upvoted
    const userId = localStorage.getItem("userId");
    hasUpvoted.value = product.value.upvotes.includes(userId);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});
</script>
