<template>
  <div
    class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50 pt-20"
  >
    <div v-if="!hotel" class="flex items-center justify-center min-h-screen">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"
      ></div>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <div class="relative h-[60vh] lg:h-[70vh] group overflow-hidden">
        <img
          :src="hotel.image"
          :alt="hotel.name"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"
        ></div>

        <div
          class="absolute bottom-0 left-0 right-0 p-8 lg:p-16 max-w-7xl mx-auto"
        >
          <router-link
            to="/hotels"
            class="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            {{ $t("hotelDetail.back") }}
          </router-link>

          <div class="flex items-center space-x-2 mb-4">
            <div class="flex">
              <Star
                v-for="i in hotel.stars"
                :key="i"
                class="w-5 h-5 text-amber-500 fill-amber-500"
              />
            </div>
            <span class="text-white font-bold ml-2">{{
              $t("hotelDetail.starsLabel", { stars: hotel.stars })
            }}</span>
          </div>

          <h1
            class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-4"
          >
            {{ hotel.name }}
          </h1>

          <div class="flex items-center text-white/80 space-x-2">
            <MapPin class="w-5 h-5 text-red-500" />
            <span class="text-lg font-medium">{{
              hotel._location || hotel.location
            }}</span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <!-- Left Column (Overview) -->
          <div class="lg:col-span-2 space-y-12">
            <section>
              <h2
                class="text-2xl font-black text-slate-900 mb-6 uppercase tracking-widest relative inline-block"
              >
                {{ $t("hotelDetail.overview") }}
                <div
                  class="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"
                ></div>
              </h2>
              <p class="text-slate-600 text-lg leading-relaxed font-medium">
                {{ hotel._description || hotel.description }}
              </p>
            </section>

            <section
              class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-200"
            >
              <div
                class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center"
              >
                <Coffee class="w-8 h-8 text-red-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">{{
                  $t("hotelDetail.amenities.breakfast")
                }}</span>
              </div>
              <div
                class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center"
              >
                <Wifi class="w-8 h-8 text-red-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">{{
                  $t("hotelDetail.amenities.wifi")
                }}</span>
              </div>
              <div
                class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center"
              >
                <Car class="w-8 h-8 text-red-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">{{
                  $t("hotelDetail.amenities.parking")
                }}</span>
              </div>
              <div
                class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center"
              >
                <Wind class="w-8 h-8 text-red-600 mb-3" />
                <span class="font-bold text-slate-700 text-sm">{{
                  $t("hotelDetail.amenities.ac")
                }}</span>
              </div>
            </section>
          </div>

          <!-- Right Column (Booking details) -->
          <div class="lg:col-span-1">
            <div
              class="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-32"
            >
              <h3 class="text-xl font-black text-slate-900 mb-2">
                {{ $t("hotelDetail.booking.title") }}
              </h3>
              <p class="text-slate-500 text-sm mb-8 font-medium">
                {{ $t("hotelDetail.booking.subtitle") }}
              </p>

              <div class="space-y-4 mb-8">
                <div
                  class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                >
                  <span class="text-slate-500 font-medium text-sm">{{
                    $t("hotelDetail.booking.checkIn")
                  }}</span>
                  <span class="font-bold text-slate-900 text-sm">14:00 PM</span>
                </div>
                <div
                  class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                >
                  <span class="text-slate-500 font-medium text-sm">{{
                    $t("hotelDetail.booking.checkOut")
                  }}</span>
                  <span class="font-bold text-slate-900 text-sm">12:00 PM</span>
                </div>
              </div>

              <a
                :href="
                  'https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20tertarik%20untuk%20memesan%20kamar%20di%20' +
                  hotel.name
                "
                target="_blank"
                class="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors flex items-center justify-center shadow-lg shadow-red-600/20 active:scale-95"
              >
                <MessageCircle class="w-5 h-5 mr-3" />
                {{ $t("hotelDetail.booking.cta") }}
              </a>

              <p class="text-center text-xs text-slate-400 font-medium mt-6">
                {{ $t("hotelDetail.booking.fastResponse") }}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { hotels } from "@/data/hotels";
import { translateText } from "@/services/translate";
import {
  Star,
  MapPin,
  ArrowLeft,
  MessageCircle,
  Coffee,
  Wifi,
  Car,
  Wind,
} from "lucide-vue-next";

const route = useRoute();
const { locale } = useI18n();
const hotel = ref(null);
const translatedCache = new Map();

const loadHotel = async () => {
  const slugId = route.params.id; // router was defined with :id
  const baseHotel = hotels.find((h) => h.slug === slugId);

  if (!baseHotel) {
    hotel.value = null;
    window.scrollTo(0, 0);
    return;
  }

  const lang = locale.value;
  const cacheKey = `${lang}:${baseHotel.slug}`;

  if (translatedCache.has(cacheKey)) {
    hotel.value = translatedCache.get(cacheKey);
    window.scrollTo(0, 0);
    return;
  }

  if (lang === "en") {
    const value = {
      ...baseHotel,
      _description: undefined,
      _location: undefined,
    };
    translatedCache.set(cacheKey, value);
    hotel.value = value;
    window.scrollTo(0, 0);
    return;
  }

  const [desc, loc] = await Promise.all([
    translateText(baseHotel.description, lang, "auto"),
    translateText(baseHotel.location, lang, "auto"),
  ]);

  const value = {
    ...baseHotel,
    _description: desc,
    _location: loc,
  };

  translatedCache.set(cacheKey, value);
  hotel.value = value;
  window.scrollTo(0, 0);
};

onMounted(() => {
  loadHotel();
});

watch(
  () => [route.params.id, locale.value],
  () => {
    loadHotel();
  },
);
</script>
