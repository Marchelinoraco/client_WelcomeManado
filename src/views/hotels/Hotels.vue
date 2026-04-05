<template>
  <div
    class="selection:bg-blue-100 selection:text-blue-700 font-sans min-h-screen bg-slate-50"
  >
    <!-- Hero Header -->
    <header
      class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-10 overflow-hidden bg-slate-900"
    >
      <div
        class="absolute inset-0 z-0 scale-105 animate-pulse"
        style="animation-duration: 20s"
      >
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c0d588fa?auto=format&fit=crop&w=2400&q=80"
          class="w-full h-full object-cover opacity-30"
          alt="Manado Hotels"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
        ></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div
          class="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20"
        >
          <Building class="w-4 h-4 text-blue-400" />
          <span class="text-xs font-black text-white uppercase tracking-[0.3em]"
            >Premium Accommodations</span
          >
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
        >
          STAY IN
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"
            >LUXURY</span
          >
        </h1>
        <p
          class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Discover the finest hotels and resorts in Manado. From beachfront
          paradises to city center landmarks, your perfect getaway awaits.
        </p>
      </div>
    </header>

    <!-- Content Section -->
    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <!-- Search & Filter Section -->
      <div class="mb-20 space-y-10">
        <div class="max-w-2xl mx-auto">
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none"
            >
              <Search
                class="w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors"
              />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search hotels by name or location..."
              class="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all text-slate-800 font-medium text-lg placeholder:text-slate-400"
            />
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="cat in hotelCategories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border"
            :class="
              selectedCategory === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/20'
                : 'bg-white text-slate-500 border-slate-200 hover:border-blue-600 hover:text-blue-600'
            "
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredHotels.length === 0"
        class="text-center py-20 flex flex-col items-center justify-center"
      >
        <div
          class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Building class="w-10 h-10 text-slate-300" />
        </div>
        <h3 class="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          No hotels found
        </h3>
        <p class="text-slate-500 font-medium text-lg max-w-md">
          We couldn't find any hotels matching "<span
            class="text-slate-800 font-bold"
            >{{ searchQuery }}</span
          >". Try another search term!
        </p>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <!-- Hotel Card -->
        <article
          v-for="hotel in filteredHotels"
          :key="hotel.id"
          class="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100 flex flex-col"
        >
          <div class="relative h-72 overflow-hidden">
            <img
              :src="hotel.image"
              :alt="hotel.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
            ></div>

            <div
              class="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl flex items-center space-x-1 shadow-lg"
            >
              <Star class="w-4 h-4 text-amber-500 fill-amber-500" />
              <span class="font-black text-slate-900 text-sm">{{
                hotel.stars
              }}</span>
            </div>
          </div>

          <div class="p-8 flex-1 flex flex-col relative text-left">
            <div class="flex items-center text-blue-600 mb-4 space-x-2">
              <MapPin class="w-4 h-4" />
              <span class="text-xs font-black uppercase tracking-widest">{{
                hotel.location
              }}</span>
            </div>

            <h3
              class="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors"
            >
              {{ hotel.name }}
            </h3>

            <p
              class="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium"
            >
              {{ hotel.description }}
            </p>

            <div
              class="pt-6 border-t border-slate-100 mt-auto flex items-center justify-between"
            >
              <span
                class="text-xs font-bold text-slate-400 uppercase tracking-widest"
                >Featured Selection</span
              >
              <router-link
                :to="'/hotel/' + hotel.slug"
                class="flex items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl group-hover:bg-blue-600 text-slate-400 group-hover:text-white transition-colors duration-300"
              >
                <ArrowRight
                  class="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                />
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Star, MapPin, Building, ArrowRight, Search } from "lucide-vue-next";
import { hotels } from "@/data/hotels";

const searchQuery = ref("");
const selectedCategory = ref("All");
const hotelCategories = [
  "All",
  "Resort",
  "City Hotel",
  "Boutique",
  "Eco Lodge",
];

const filteredHotels = computed(() => {
  let results = hotels;

  // Filter by category
  if (selectedCategory.value !== "All") {
    results = results.filter(
      (hotel) => hotel.category === selectedCategory.value,
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    results = results.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query),
    );
  }

  return results;
});
</script>

<style scoped>
/* Optional custom CSS here, most effects are tailwind */
</style>
