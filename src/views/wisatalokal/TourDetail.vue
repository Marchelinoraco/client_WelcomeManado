<template>
  <div class="min-h-screen bg-white font-sans">
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div
        class="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <div v-else-if="tour" class="pb-32 animate-fade-in">
        <!-- Premium Hero Header -->
        <header>
          <ImageCarousel
            v-model="galleryIndex"
            :images="galleryImages"
            :alt="tour.title"
            main-class="h-[70vh] lg:h-[85vh] flex items-end overflow-hidden"
            img-class="scale-105 animate-subtle-zoom"
            :overlay="true"
            :show-thumbnails="false"
          >
            <div class="absolute top-6 right-6 z-30">
              <button
                type="button"
                class="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-black hover:bg-white/20 transition-colors"
                @click.stop="openImageModal(galleryImages[galleryIndex])"
                aria-label="Open image"
              >
                ⤢
              </button>
            </div>
            <div
              class="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-20 lg:pb-32"
            >
              <div
                class="flex flex-wrap items-center gap-4 mb-8 animate-fade-in-up"
              >
                <span
                  class="px-5 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-red-600/20"
                  >{{ tour.category?.name }}</span
                >
                <span
                  class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl"
                >
                  <template v-if="tour.duration_hours">
                    {{ tour.duration_hours }} {{ $t("tour.hours") }}
                  </template>
                  <template v-else>
                    {{ tour.duration_days }} {{ $t("tour.days") }} /
                    {{ tour.duration_nights }} {{ $t("tour.nights") }}
                  </template>
                </span>
              </div>

              <h1
                class="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8 animate-fade-in-up delay-100 uppercase"
              >
                {{ tour.title }}
              </h1>

              <div
                class="flex items-center text-white/80 text-sm font-bold animate-fade-in-up delay-200"
              >
                <div
                  class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-4 border border-white/10"
                >
                  <MapPinIcon class="w-5 h-5 text-red-400" />
                </div>
                <span class="uppercase tracking-widest text-xs">{{
                  tour.location || $t("common.defaultLocation")
                }}</span>
              </div>
            </div>
          </ImageCarousel>
        </header>

        <!-- Content Layout -->
        <main
          class="max-w-7xl mx-auto px-6 lg:px-10 mt-20 lg:-mt-24 relative z-30"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <!-- Left Column: Details -->
            <div class="lg:col-span-8 space-y-24">
              <!-- Quick Summary Cards -->
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up delay-300"
              >
                <div
                  v-for="item in summaryItems"
                  :key="item.label"
                  class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div
                    class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors"
                  >
                    <component :is="item.icon" class="w-6 h-6" />
                  </div>
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                  >
                    {{ item.label }}
                  </p>
                  <p class="text-sm font-black text-slate-900">
                    {{ item.value }}
                  </p>
                </div>
              </div>

              <!-- Overview -->
              <section class="animate-fade-in-up delay-400">
                <div class="flex items-center space-x-4 mb-8">
                  <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                  <h2
                    class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                  >
                    {{ $t("tour.experienceDetails") }}
                  </h2>
                </div>
                <div
                  class="tour-rich-content text-slate-500 leading-[1.8] text-lg font-medium"
                  v-html="tour.descriptionHtml"
                ></div>

                <div v-if="tour.itinerary_pdf_path" class="mt-10">
                  <a
                    :href="tour.itinerary_pdf_path"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center px-8 py-4 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20"
                  >
                    <Download class="w-4 h-4 mr-3" />
                    {{ $t("tour.downloadItineraryPdf") }}
                  </a>
                </div>
              </section>

              <!-- Price Breakdown Table -->
              <section
                v-if="false && tour.price_details?.length"
                class="animate-fade-in-up delay-450"
              >
                <div class="flex items-center space-x-4 mb-8">
                  <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                  <h2
                    class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                  >
                    {{ $t("tour.priceBreakdownTitle") }}
                  </h2>
                </div>

                <div
                  class="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm"
                >
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="bg-slate-50">
                        <th
                          class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100"
                        >
                          {{ $t("tour.priceBreakdown.paxHeader") }}
                        </th>
                        <th
                          class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right"
                        >
                          {{ $t("tour.priceBreakdown.priceHeader") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(price, idx) in tour.price_details"
                        :key="idx"
                        class="hover:bg-red-50/30 transition-colors group"
                      >
                        <td
                          class="px-8 py-5 text-sm font-bold text-slate-600 border-b border-slate-50 group-last:border-0"
                        >
                          {{ price.pax_range }}
                        </td>
                        <td
                          class="px-8 py-5 text-sm font-black text-red-600 border-b border-slate-50 text-right group-last:border-0"
                        >
                          {{ formatPrice(price.price_per_pax) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="px-8 py-4 bg-red-50/50 border-t border-slate-100">
                    <p class="text-[10px] font-bold text-red-600/70 italic">
                      {{ $t("tour.priceBreakdown.disclaimer") }}
                    </p>
                  </div>
                </div>
              </section>

              <!-- Gallery Grid -->
              <section
                v-if="tour.galleries?.length > 1"
                class="animate-fade-in-up delay-500"
              >
                <div class="flex items-center space-x-4 mb-10">
                  <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                  <h2
                    class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                  >
                    {{ $t("tour.visualJourney") }}
                  </h2>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                  <div
                    v-for="(img, idx) in galleryPreview"
                    :key="idx"
                    class="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer border border-slate-100"
                    @click="
                      galleryIndex = idx;
                      openImageModal(img.image_path);
                    "
                  >
                    <img
                      :src="img.image_path"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      class="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    ></div>
                  </div>
                </div>
              </section>

              <!-- Itinerary: Modern Timeline -->
              <section
                v-if="tour.itineraries?.length"
                class="animate-fade-in-up delay-600"
              >
                <div class="flex items-center space-x-4 mb-12">
                  <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                  <h2
                    class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                  >
                    {{ $t("tour.plannedItinerary") }}
                  </h2>
                </div>

                <div class="space-y-12">
                  <div
                    v-for="item in tour.itineraries"
                    :key="item.id"
                    class="group relative flex gap-8 lg:gap-12"
                  >
                    <!-- Timeline Line -->
                    <div
                      class="absolute left-[23px] top-12 bottom-0 w-px bg-slate-100 group-last:hidden"
                    ></div>

                    <!-- Day Badge -->
                    <div class="relative flex-shrink-0">
                      <div
                        class="w-12 h-12 rounded-2xl bg-white border-2 border-red-600 flex items-center justify-center text-red-600 font-black text-sm shadow-xl shadow-red-600/10 group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                      >
                        {{ item.day_number }}
                      </div>
                    </div>

                    <!-- Content Card -->
                    <div
                      class="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex-1"
                    >
                      <div
                        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
                      >
                        <h3
                          class="text-xl font-black text-slate-900 uppercase tracking-tight"
                        >
                          {{ item.title }}
                        </h3>
                        <div class="flex flex-wrap gap-3">
                          <span
                            v-if="item.meals_info"
                            class="inline-flex items-center px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl"
                          >
                            <UtensilsIcon class="w-3 h-3 mr-2" />
                            {{ item.meals_info }}
                          </span>
                        </div>
                      </div>
                      <div
                        class="tour-rich-content text-slate-500 text-sm leading-relaxed font-medium mb-8"
                        v-html="item.descriptionHtml || normalizeDescriptionHtml(item.description)"
                      ></div>

                      <div
                        v-if="item.hotel_info"
                        class="inline-flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div
                          class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm"
                        >
                          <HotelIcon class="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p
                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5"
                          >
                            {{ $t("tour.accommodation") }}
                          </p>
                          <p class="text-sm font-black text-slate-800">
                            {{ item.hotel_info }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Right Column: Premium Booking Card -->
            <div class="lg:col-span-4">
              <div class="sticky top-32 space-y-8 animate-fade-in-up delay-700">
                <!-- Modern Price Card -->
                <div
                  class="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-red-900/40 relative overflow-hidden group"
                >
                  <!-- Background Decoration -->
                  <div
                    class="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] group-hover:bg-red-600/30 transition-colors"
                  ></div>

                  <div class="relative z-10">
                    <span
                      class="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-8 inline-block"
                      >{{ $t("tour.bestPrice") }}</span
                    >

                    <div v-if="false && tour.base_price">
                      <p
                        class="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-3"
                      >
                        {{ $t("tour.investment") }}
                      </p>
                      <div class="flex items-baseline gap-2 mb-10">
                        <span class="text-xs font-black text-red-400">IDR</span>
                        <span class="text-5xl font-black tracking-tighter">{{
                          formatPrice(tour.base_price)
                        }}</span>
                        <span class="text-white/40 text-sm font-bold">
                          {{ $t("tour.perPax") }}
                        </span>
                      </div>
                    </div>
                    <div v-else class="mb-10">
                      <p
                        class="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-3"
                      >
                        {{ $t("tour.pricingInfo") }}
                      </p>
                      <h3
                        class="text-2xl font-black text-white uppercase tracking-tight"
                      >
                        {{ $t("tour.contactInquiry") }}
                      </h3>
                    </div>

                    <!-- Features List -->
                    <div class="space-y-5 mb-12">
                      <div
                        v-for="feat in featureList"
                        :key="feat"
                        class="flex items-center text-sm font-bold text-white/70"
                      >
                        <div
                          class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0"
                        >
                          <CheckIcon class="w-3 h-3 text-red-400" />
                        </div>
                        {{ feat }}
                      </div>
                    </div>

                    <button
                      v-if="false && tour.base_price"
                      class="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-red-600/40 active:scale-95 flex items-center justify-center group/btn mb-4"
                    >
                      {{ $t("tour.reserveSpot") }}
                      <ArrowRight
                        class="ml-3 w-5 h-5 group/btn:translate-x-1 transition-transform"
                      />
                    </button>

                    <a
                      :href="`https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20paket%20tour:%20${tour.title}`"
                      target="_blank"
                      class="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-red-600/20 active:scale-95 flex items-center justify-center group/wa"
                    >
                      <MessageCircle class="mr-3 w-5 h-5" />
                      {{ $t("tour.chatWA") }}
                    </a>

                    <p
                      class="text-center text-[10px] text-white/30 mt-6 font-bold uppercase tracking-widest"
                    >
                      {{ $t("tour.securePayment") }}
                    </p>
                  </div>
                </div>

                <!-- Help Card -->
                <div
                  class="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 group hover:bg-red-100 transition-colors"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-red-600 shadow-sm group-hover:scale-110 transition-transform"
                    >
                      <StarIcon class="w-7 h-7" />
                    </div>
                    <div>
                      <h4
                        class="text-sm font-black text-red-900 uppercase tracking-widest mb-1"
                      >
                        {{ $t("tour.tailoredJourney") }}
                      </h4>
                      <p
                        class="text-xs font-bold text-red-600/70 leading-relaxed"
                      >
                        {{ $t("tour.customizeTour") }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

      <!-- Inclusions & Exclusions -->
      <section
        v-if="tour.inclusions || tour.exclusions"
        class="max-w-7xl mx-auto px-6 lg:px-10 mt-16"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-if="tour.inclusions" class="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
            <h3 class="text-xl font-black text-emerald-900 mb-6 flex items-center">
              <CheckIcon class="w-6 h-6 mr-3 text-emerald-600" />
              {{ $t("tour.inclusions") }}
            </h3>
            <div class="tour-rich-content text-emerald-800 text-sm prose prose-emerald prose-sm leading-relaxed" v-html="normalizeDescriptionHtml(tour.inclusions)"></div>
          </div>
          <div v-if="tour.exclusions" class="bg-red-50 rounded-3xl p-8 border border-red-100">
            <h3 class="text-xl font-black text-red-900 mb-6 flex items-center">
              <X class="w-6 h-6 mr-3 text-red-600" />
              {{ $t("tour.exclusions") }}
            </h3>
            <div class="tour-rich-content text-red-800 text-sm prose prose-red prose-sm leading-relaxed" v-html="normalizeDescriptionHtml(tour.exclusions)"></div>
          </div>
        </div>
      </section>

      <section
        v-if="recommendedTours.length"
        class="max-w-7xl mx-auto px-6 lg:px-10 mt-24"
      >
        <div class="flex items-center space-x-4 mb-10">
          <div class="w-12 h-1 bg-red-600 rounded-full"></div>
          <div>
            <h2
              class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
            >
              {{ $t("tour.recommendedTitle") }}
            </h2>
            <p class="text-slate-500 font-bold mt-2">
              {{ $t("tour.recommendedDescription") }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TourCard
            v-for="rt in recommendedTours"
            :key="rt.id || rt.slug"
            :tour="rt"
            detail-base-path="/tour"
          />
        </div>
      </section>

      <!-- Floating WhatsApp Button -->
      <a
        :href="`https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20paket%20tour:%20${tour.title}`"
        target="_blank"
        class="fixed bottom-10 right-10 z-[99] w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-600/40 hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-slow"
        :title="$t('tour.chatWA')"
      >
        <MessageCircle class="w-8 h-8" />
        <span class="absolute -top-2 -right-2 flex h-5 w-5">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-5 w-5 bg-red-600 border-2 border-white"
          ></span>
        </span>
      </a>
    </div>

    <div
      v-if="isImageModalOpen"
      class="fixed inset-0 z-[200] flex items-center justify-center p-6"
    >
      <div
        class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        @click="closeImageModal"
      ></div>
      <div class="relative w-full max-w-6xl">
        <button
          type="button"
          class="absolute -top-4 -right-4 h-12 w-12 rounded-2xl bg-white text-slate-900 font-black shadow-2xl hover:bg-slate-100 transition-colors"
          @click="closeImageModal"
          aria-label="Close image"
        >
          ✕
        </button>
        <img
          :src="imageModalSrc"
          class="w-full max-h-[85vh] object-contain rounded-3xl bg-black"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  Hotel as HotelIcon,
  Utensils as UtensilsIcon,
  Star as StarIcon,
  Check as CheckIcon,
  Plane as PlaneIcon,
  ArrowRight,
  ShieldCheck,
  Users,
  Compass,
  MessageCircle,
  Phone,
  Share2,
  Facebook,
  Instagram,
  Mail,
  Download,
  X,
} from "lucide-vue-next";
import { getLocalTourDetail, getLocalTours } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { applySeo } from "@/utils/seo";
import { stripHtml } from "@/utils/htmlText";
import { dummyLocalTours } from "./dummyLocalTours";
import ImageCarousel from "@/components/ImageCarousel.vue";
import TourCard from "@/components/TourCard.vue";

const route = useRoute();
const { locale, t } = useI18n();
const tour = ref(null);
const loading = ref(true);
const galleryIndex = ref(0);
const recommendedTours = ref([]);
const isImageModalOpen = ref(false);
const imageModalSrc = ref("");

const localeKey = (value) => {
  const loc = String(value || "").toLowerCase();
  if (loc.startsWith("ko")) return "ko";
  if (loc.startsWith("zh")) return "zh";
  if (loc.startsWith("en")) return "en";
  return "id";
};

const getLocalizedDescriptionFromRaw = (item, loc) => {
  const key = localeKey(loc);
  if (key === "en") return item?.description_en || item?.description || "";
  if (key === "ko") return item?.description_ko || item?.description || "";
  if (key === "zh") return item?.description_zh || item?.description || "";
  return item?.description || "";
};

const hasHtmlContent = (value) => /<[^>]+>/.test(String(value || ""));

const plainTextToHtml = (value) => {
  const text = String(value || "").trim();
  if (!text) return "";

  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
};

const normalizeDescriptionHtml = (value) =>
  hasHtmlContent(value) ? String(value || "") : plainTextToHtml(value);

const galleryImages = computed(() => {
  const urls = (tour.value?.galleries || [])
    .map((g) => g.image_path)
    .filter(Boolean);
  return urls.length
    ? urls
    : [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80",
      ];
});

const normalizePriceDetails = (list) => {
  if (!Array.isArray(list)) return [];
  if (
    list.length &&
    Object.prototype.hasOwnProperty.call(list[0], "pax_range")
  ) {
    return list;
  }
  return list.map((p) => ({
    pax_range: p.label || p.type || "-",
    price_per_pax: Number(p.total ?? p.base_price ?? p.price ?? 0),
  }));
};

const fetchTour = async () => {
  loading.value = true;
  try {
    let rawTour;

    try {
      const response = await getLocalTourDetail(route.params.slug);
      rawTour = response.data.data;
    } catch (apiError) {
      rawTour =
        dummyLocalTours.find((t) => t.slug === route.params.slug) || null;
    }

    if (!rawTour) {
      tour.value = null;
      recommendedTours.value = [];
      applySeo({
        title: "Detail Tour Lokal Manado",
        description:
          "Lihat detail paket tour lokal Manado lengkap dengan itinerary, durasi, dan informasi penting lainnya.",
        url: route.fullPath,
        type: "article",
      });
      return;
    }

    const categorySlug =
      typeof rawTour.category === "string"
        ? rawTour.category
        : rawTour.category?.slug;

    if (locale.value !== "id" && rawTour) {
      const localizedDescription = getLocalizedDescriptionFromRaw(rawTour, locale.value);
      const hasAdminLocalizedDescription =
        localizedDescription && localizedDescription !== (rawTour.description || "");

      // Translate main tour info
      const [translatedTitle, translatedDesc, translatedLocation, translatedInclusions, translatedExclusions] =
        await Promise.all([
          autoTranslate(rawTour.title, locale.value),
          hasAdminLocalizedDescription
            ? Promise.resolve(undefined)
            : hasHtmlContent(rawTour.description)
            ? Promise.resolve(undefined)
            : autoTranslate(stripHtml(rawTour.description), locale.value),
          autoTranslate(
            rawTour.location || "Manado, Sulawesi Utara",
            locale.value,
          ),
          rawTour.inclusions ? autoTranslate(stripHtml(rawTour.inclusions), locale.value) : Promise.resolve(undefined),
          rawTour.exclusions ? autoTranslate(stripHtml(rawTour.exclusions), locale.value) : Promise.resolve(undefined),
        ]);

      // Translate itineraries
      const translatedItineraries = await Promise.all(
        (rawTour.itineraries || []).map(async (it) => {
          const [itTitle, itDesc, itHotel, itMeals] = await Promise.all([
            autoTranslate(it.title, locale.value),
            autoTranslate(stripHtml(it.description), locale.value),
            autoTranslate(it.hotel_info, locale.value),
            autoTranslate(it.meals_info, locale.value),
          ]);
          return {
            ...it,
            title: itTitle,
            description: itDesc ?? it.description,
            descriptionHtml: itDesc
              ? plainTextToHtml(itDesc)
              : normalizeDescriptionHtml(it.description),
            hotel_info: itHotel,
            meals_info: itMeals,
          };
        }),
      );

      tour.value = {
        ...rawTour,
        title: translatedTitle,
        description: translatedDesc ?? localizedDescription,
        descriptionHtml: translatedDesc
          ? plainTextToHtml(translatedDesc)
          : normalizeDescriptionHtml(localizedDescription),
        location: translatedLocation,
        inclusions: translatedInclusions ?? rawTour.inclusions,
        exclusions: translatedExclusions ?? rawTour.exclusions,
        itineraries: translatedItineraries,
        price_details: normalizePriceDetails(rawTour.price_details),
      };
    } else {
      tour.value = {
        ...rawTour,
        description: getLocalizedDescriptionFromRaw(rawTour, locale.value),
        descriptionHtml: normalizeDescriptionHtml(
          getLocalizedDescriptionFromRaw(rawTour, locale.value),
        ),
        price_details: normalizePriceDetails(rawTour.price_details),
      };
    }

    applySeo({
      title: tour.value.title,
      description: stripHtml(tour.value.description),
      image: galleryImages.value[0],
      url: route.fullPath,
      type: "article",
    });

    const fetchRecommended = async () => {
      try {
        const res = await getLocalTours({ category: categorySlug });
        const list = Array.isArray(res.data?.data) ? res.data.data : [];
        return list;
      } catch {
        return dummyLocalTours.filter((t) => {
          const slug =
            typeof t.category === "string" ? t.category : t.category?.slug;
          return slug && slug === categorySlug;
        });
      }
    };

    const list = await fetchRecommended();
    const base = list
      .filter((t) => t?.slug && t.slug !== rawTour.slug)
      .slice(0, 3);

    if (locale.value !== "id" && base.length) {
      const translated = await Promise.all(
        base.map(async (it) => {
          const [title, description, location, categoryName] =
            await Promise.all([
              autoTranslate(it.title || "", locale.value),
              autoTranslate(stripHtml(it.description || ""), locale.value),
              autoTranslate(it.location || "", locale.value),
              autoTranslate(it.category?.name || "", locale.value),
            ]);
          return {
            ...it,
            title,
            description,
            location,
            category: it.category
              ? { ...it.category, name: categoryName }
              : it.category,
          };
        }),
      );
      recommendedTours.value = translated;
    } else {
      recommendedTours.value = base;
    }

    galleryIndex.value = 0;
  } catch (error) {
    console.error("Error fetching tour detail:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTour);
watch(locale, fetchTour);


const displayImages = computed(() => {
  return galleryImages.value;
});

const galleryPreview = computed(() => {
  return (tour.value?.galleries || []).slice(0, 5);
});

const summaryItems = computed(() => {
  let durationValue = `${tour.value?.duration_days} ${t("tour.days")} / ${tour.value?.duration_nights} ${t("tour.nights")}`;
  if (tour.value?.duration_hours_min && tour.value?.duration_hours_max) {
    durationValue = `${tour.value.duration_hours_min}-${tour.value.duration_hours_max} ${t("tour.hours")}`;
  } else if (tour.value?.duration_hours) {
    durationValue = `${tour.value.duration_hours} ${t("tour.hours")}`;
  }

  return [
    {
      label: t("tour.duration"),
      value: durationValue,
      icon: ClockIcon,
    },
    { label: t("tour.groupSize"), value: t("tour.pax"), icon: Users },
    // {
    //   label: t("tour.language"),
    //   value: t("tour.languageValue"),
    //   icon: Compass,
    // },
    // {
    //   label: t("tour.insurance"),
    //   value: t("tour.included"),
    //   icon: ShieldCheck,
    // },
  ];
});

const formatPrice = (price) => {
  const localeMap = {
    id: "id-ID",
    en: "en-US",
    zh: "zh-CN",
    ko: "ko-KR",
  };
  return new Intl.NumberFormat(localeMap[locale.value] || "en-US").format(
    price,
  );
};

const featureList = computed(() => {
  return [
    t("tour.expertGuide"),
    tour.value?.base_price ? t("tour.premiumAcc") : t("tour.safetyEquip"),
    t("tour.instantBooking"),
  ];
});

const openImageModal = (src) => {
  if (!src) return;
  imageModalSrc.value = src;
  isImageModalOpen.value = true;
};

const closeImageModal = () => {
  isImageModalOpen.value = false;
  imageModalSrc.value = "";
};
</script>

<style scoped>
@keyframes subtle-zoom {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1.15);
  }
}
.animate-subtle-zoom {
  animation: subtle-zoom 30s infinite alternate ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}
.delay-400 {
  animation-delay: 0.4s;
}
.delay-500 {
  animation-delay: 0.5s;
}
.delay-600 {
  animation-delay: 0.6s;
}
.delay-700 {
  animation-delay: 0.7s;
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}

.tour-rich-content :deep(p) {
  margin: 0 0 1rem;
}

.tour-rich-content :deep(ul),
.tour-rich-content :deep(ol) {
  margin: 0 0 1rem 1.5rem;
}

.tour-rich-content :deep(li) {
  margin-bottom: 0.5rem;
}

.tour-rich-content :deep(h1),
.tour-rich-content :deep(h2),
.tour-rich-content :deep(h3),
.tour-rich-content :deep(h4) {
  color: rgb(15 23 42);
  font-weight: 900;
  line-height: 1.2;
  margin: 0 0 1rem;
}

.tour-rich-content :deep(a) {
  color: rgb(220 38 38);
  text-decoration: underline;
}
</style>
