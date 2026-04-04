<template>
  <div class="selection:bg-blue-100 selection:text-blue-700 font-sans min-h-screen bg-slate-50 pt-20">
    <div v-if="!hotel" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <div class="relative h-[60vh] lg:h-[70vh] group overflow-hidden">
        <img 
          :src="hotel.image" 
          :alt="hotel.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-16 max-w-7xl mx-auto">
          <router-link to="/hotels" class="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors uppercase tracking-widest text-xs font-bold">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Hotels
          </router-link>
          
          <div class="flex items-center space-x-2 mb-4">
            <div class="flex">
              <Star v-for="i in hotel.stars" :key="i" class="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <span class="text-white font-bold ml-2">{{ hotel.stars }}-Star Premium Hotel</span>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-4">
            {{ hotel.name }}
          </h1>
          
          <div class="flex items-center text-white/80 space-x-2">
            <MapPin class="w-5 h-5 text-blue-500" />
            <span class="text-lg font-medium">{{ hotel.location }}</span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <!-- Left Column (Overview) -->
          <div class="lg:col-span-2 space-y-12">
            <section>
              <h2 class="text-2xl font-black text-slate-900 mb-6 uppercase tracking-widest relative inline-block">
                Overview
                <div class="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-600 rounded-full"></div>
              </h2>
              <p class="text-slate-600 text-lg leading-relaxed font-medium">
                {{ hotel.description }}
              </p>
            </section>
            
            <section class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-200">
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                <Coffee class="w-8 h-8 text-blue-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">Breakfast</span>
              </div>
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                <Wifi class="w-8 h-8 text-blue-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">Free Wi-Fi</span>
              </div>
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                <Car class="w-8 h-8 text-blue-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">Parking</span>
              </div>
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                <Wind class="w-8 h-8 text-blue-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">AC Rooms</span>
              </div>
            </section>
          </div>
          
          <!-- Right Column (Booking details) -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-32">
              <h3 class="text-xl font-black text-slate-900 mb-2">Book Your Stay</h3>
              <p class="text-slate-500 text-sm mb-8 font-medium">Get the best rates by booking directly with our agents.</p>
              
              <div class="space-y-4 mb-8">
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span class="text-slate-500 font-medium text-sm">Check-in</span>
                  <span class="font-bold text-slate-900 text-sm">14:00 PM</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span class="text-slate-500 font-medium text-sm">Check-out</span>
                  <span class="font-bold text-slate-900 text-sm">12:00 PM</span>
                </div>
              </div>
              
              <a 
                :href="'https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20tertarik%20untuk%20memesan%20kamar%20di%20' + hotel.name"
                target="_blank"
                class="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-colors flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <MessageCircle class="w-5 h-5 mr-3" />
                Book via WhatsApp
              </a>
              
              <p class="text-center text-xs text-slate-400 font-medium mt-6">
                Fast response within 5 minutes.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { hotels } from '../data/hotels';
import { Star, MapPin, ArrowLeft, MessageCircle, Coffee, Wifi, Car, Wind } from 'lucide-vue-next';

const route = useRoute();
const hotel = ref(null);

const loadHotel = () => {
  const slugId = route.params.id; // router was defined with :id
  hotel.value = hotels.find(h => h.slug === slugId);
  window.scrollTo(0,0);
};

onMounted(() => {
  loadHotel();
});

watch(() => route.params, () => {
  loadHotel();
});
</script>
