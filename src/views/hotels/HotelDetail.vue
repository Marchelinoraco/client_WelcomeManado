<template>
  <div
    class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50"
  >
    <div
      v-if="isLoading"
      class="flex items-center justify-center min-h-screen"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"
      ></div>
    </div>

    <div v-else-if="hotel">
      <!-- Hero Section -->
      <div class="relative min-h-[72vh] lg:min-h-[82vh] group overflow-hidden">
        <img
          :src="hotel.heroImage"
          :alt="hotel.name"
          class="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/15 to-transparent"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent"
        ></div>

        <div
          class="relative z-10 flex min-h-[72vh] lg:min-h-[82vh] items-end"
        >
          <div class="w-full max-w-7xl mx-auto px-6 lg:px-10 pb-10 lg:pb-16">
            <router-link
              to="/hotels"
              class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/80 hover:text-white hover:bg-white/15 mb-6 transition-colors uppercase tracking-widest text-xs font-bold backdrop-blur-md"
            >
              <ArrowLeft class="w-4 h-4 mr-2" />
              {{ $t("hotelDetail.back") }}
            </router-link>

            <div class="max-w-4xl">
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
                class="text-4xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-4"
              >
                {{ hotel.name }}
              </h1>

              <div class="flex items-center text-white/85 space-x-2">
                <MapPin class="w-5 h-5 text-red-400 shrink-0" />
                <span class="text-lg font-medium">{{
                  hotel._location || hotel.location
                }}</span>
              </div>
            </div>
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

    <div
      v-else
      class="min-h-screen flex items-center justify-center px-6 text-center"
    >
      <div class="max-w-lg">
        <h1 class="text-3xl font-black text-slate-900 mb-3">
          Hotel tidak ditemukan
        </h1>
        <p class="text-slate-500 text-lg mb-8">
          Data hotel ini belum tersedia atau slug hotel berubah setelah admin
          memperbarui data.
        </p>
        <router-link
          to="/hotels"
          class="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-red-700"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Kembali ke daftar hotel
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { getHotelDetail, getHotels } from "@/services/api";
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
const isLoading = ref(true);
const translatedCache = new Map();

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1551882547-ff40c0d588fa?auto=format&fit=crop&w=2400&q=80";

const unwrapHotelPayload = (payload) => {
  if (!payload) return null;
  if (payload.data && !Array.isArray(payload.data)) return unwrapHotelPayload(payload.data);
  return payload;
};

const normalizeHotel = (rawHotel) => {
  if (!rawHotel) return null;

  const heroImage =
    rawHotel.primary_image ||
    rawHotel.thumbnail ||
    rawHotel.image ||
    rawHotel.images?.find((img) => img?.is_primary)?.image_path ||
    rawHotel.images?.[0]?.image_path ||
    FALLBACK_IMAGE;

  return {
    id: rawHotel.id,
    slug: rawHotel.slug,
    name: rawHotel.name || "Hotel",
    description: rawHotel.description || "",
    location: rawHotel.location || "",
    stars: Number(rawHotel.stars || 0),
    image: heroImage,
    heroImage,
  };
};

const findHotelFromCollection = async (slugOrId) => {
  const res = await getHotels();
  const arr = Array.isArray(res.data?.data?.data)
    ? res.data.data.data
    : Array.isArray(res.data?.data)
      ? res.data.data
      : [];

  const matched = arr.find(
    (item) => String(item.slug) === String(slugOrId) || String(item.id) === String(slugOrId),
  );

  return normalizeHotel(matched || null);
};

const loadHotel = async () => {
  isLoading.value = true;

  try {
    const slugId = route.params.id;
    let baseHotel = null;

    try {
      const response = await getHotelDetail(slugId);
      baseHotel = normalizeHotel(unwrapHotelPayload(response.data));
    } catch (error) {
      baseHotel = null;
    }

    if (!baseHotel) {
      baseHotel = await findHotelFromCollection(slugId);
    }

    if (!baseHotel) {
      hotel.value = null;
      return;
    }

    const lang = locale.value;
    const cacheKey = `${lang}:${baseHotel.slug || slugId}`;

    if (translatedCache.has(cacheKey)) {
      hotel.value = translatedCache.get(cacheKey);
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
  } finally {
    isLoading.value = false;
    window.scrollTo(0, 0);
  }
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
