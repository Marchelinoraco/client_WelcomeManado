<template>
  <div class="min-h-screen bg-white font-sans">
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div
        class="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <div v-else-if="trip" class="pb-32">
      <header
        class="relative h-[70vh] lg:h-[85vh] flex items-end overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10"
        ></div>
        <img
          :src="trip.image"
          class="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom cursor-zoom-in"
          :alt="trip.title"
          @click="openImageModal(trip.image)"
        />
        <div class="absolute top-6 right-6 z-20">
          <button
            type="button"
            class="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-black hover:bg-white/20 transition-colors"
            @click.stop="openImageModal(trip.image)"
            aria-label="Open image"
          >
            ⤢
          </button>
        </div>
        <div
          class="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-20 lg:pb-32"
        >
          <nav
            class="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-white/70 mb-6"
          >
            <router-link to="/" class="hover:text-white transition-colors">{{
              $t("nav.home")
            }}</router-link>
            <span class="mx-3 text-white/30">•</span>
            <router-link
              to="/internasional"
              class="hover:text-white transition-colors"
              >{{ $t("nav.international") }}</router-link
            >
            <span class="mx-3 text-white/30">•</span>
            <span class="text-white">{{ trip.title }}</span>
          </nav>

          <div class="flex flex-wrap items-center gap-4 mb-8">
            <span
              class="px-5 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-red-600/20"
              >{{ regionLabel(trip.region) }}</span
            >
            <span
              class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl"
              >{{ trip.duration_days }} {{ $t("tour.days") }}</span
            >
            <span
              class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl"
              >{{ trip.airline }}</span
            >
            <!-- <span
              v-if="trip.route"
              class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl"
              >{{ trip.route }}</span
            > -->
          </div>

          <h1
            class="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8 uppercase"
          >
            {{ trip.title }}
          </h1>

          <div class="flex items-center text-white/80 text-sm font-bold">
            <div
              class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-4 border border-white/10"
            >
              <Calendar class="w-5 h-5 text-red-300" />
            </div>
            <div class="uppercase tracking-widest text-xs">
              <span class="font-black mr-2">{{ $t("internationalTourDetail.period") }}:</span>
              <span v-if="!trip.departure_periods || trip.departure_periods.length === 0">-</span>
              <span v-else class="inline-flex flex-wrap gap-2 mt-1">
                <span
                  v-for="(p, idx) in trip.departure_periods"
                  :key="idx"
                  class="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white/90 font-bold text-[10px] tracking-widest"
                >{{ p }}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main
        class="max-w-7xl mx-auto px-6 lg:px-10 mt-20 lg:-mt-24 relative z-30"
      >
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div class="lg:col-span-8 space-y-16">
            <section
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  {{ $t("internationalTourDetail.description") }}
                </h2>
              </div>
              <div
                class="tour-rich-content text-slate-600 leading-relaxed font-medium"
                v-html="trip.descriptionHtml"
              ></div>
            </section>

            <section
              v-if="trip.price_breakdown?.sections?.length"
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  {{
                    trip.price_breakdown.title ||
                    $t("internationalTourDetail.priceDetails")
                  }}
                </h2>
              </div>

              <div class="space-y-8">
                <div
                  v-for="(section, sIdx) in trip.price_breakdown.sections"
                  :key="sIdx"
                  class="rounded-[2rem] border border-slate-100 overflow-hidden"
                >
                  <div class="bg-slate-50 px-8 py-5">
                    <div
                      class="text-[11px] font-black text-slate-700 uppercase tracking-widest"
                    >
                      {{ section.title }}
                    </div>
                  </div>
                  <div class="divide-y divide-slate-100">
                    <div
                      v-for="(row, rIdx) in section.rows"
                      :key="rIdx"
                      class="px-8 py-5 flex items-center justify-between"
                    >
                      <div class="text-sm font-bold text-slate-600">
                        {{ row.label }}
                      </div>
                      <div class="text-sm font-black text-slate-900">
                        {{ formatCurrency(row.price_idr) }}
                      </div>
                    </div>
                    <!-- Total row -->
                    <div v-if="section.rows.length > 1" class="px-8 py-5 flex items-center justify-between bg-slate-50/80">
                      <div class="text-sm font-black text-slate-700 uppercase tracking-widest">
                        Total
                      </div>
                      <div class="text-sm font-black text-emerald-600">
                        {{ formatCurrency(section.rows.reduce((sum, r) => sum + (Number(r.price_idr) || 0), 0)) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              v-if="trip.excluded_costs?.length"
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  {{ $t("internationalTourDetail.excludedCosts") }}
                </h2>
              </div>

              <div
                class="divide-y divide-slate-100 rounded-[2rem] border border-slate-100 overflow-hidden"
              >
                <div
                  v-for="(item, idx) in trip.excluded_costs"
                  :key="idx"
                  class="px-8 py-5 flex items-start justify-between gap-6"
                >
                  <div class="text-sm font-bold text-slate-600">
                    {{ item.label }}
                    <div
                      v-if="item.note"
                      class="text-xs font-bold text-slate-400 mt-1"
                    >
                      {{ item.note }}
                    </div>
                  </div>
                  <div
                    class="text-sm font-black text-slate-900 whitespace-nowrap"
                  >
                    <span v-if="item.price_idr">{{
                      formatCurrency(item.price_idr)
                    }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
            </section>

            <section
              v-if="trip.booking_fee?.amount_idr"
              class="bg-red-50 rounded-[2.5rem] border border-red-100 p-10"
            >
              <div class="flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <div
                    class="text-[10px] font-black text-red-700 uppercase tracking-[0.25em]"
                  >
                    {{ $t("internationalTourDetail.bookingFee") }}
                  </div>
                  <div class="text-3xl font-black text-slate-900 mt-2">
                    {{ formatCurrency(trip.booking_fee.amount_idr) }}
                    <span class="text-sm font-black text-slate-500">
                      {{ $t("tour.perPax") }}
                    </span>
                  </div>
                </div>
                <div
                  class="max-w-xl text-sm font-bold text-red-900/70 leading-relaxed"
                >
                  {{ trip.booking_fee.note }}
                </div>
              </div>
            </section>

            <section
              v-if="trip.itinerary?.length"
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-10">
                <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  {{ $t("tour.plannedItinerary") }}
                </h2>
              </div>

              <div class="space-y-10">
                <div
                  v-for="day in trip.itinerary"
                  :key="day.day"
                  class="relative flex gap-6"
                >
                  <div class="flex-shrink-0">
                    <div
                      class="w-12 h-12 rounded-2xl bg-white border-2 border-red-600 flex items-center justify-center text-red-600 font-black text-sm"
                    >
                      {{ day.day }}
                    </div>
                  </div>
                  <div class="flex-1">
                    <div
                      class="text-sm font-black text-slate-900 uppercase tracking-tight"
                    >
                      {{
                        $t("internationalTourDetail.dayTitle", {
                          day: day.day,
                          title: day.title,
                        })
                      }}
                    </div>
                    <ul class="mt-4 space-y-2">
                      <li
                        v-for="(n, idx) in day.notes"
                        :key="idx"
                        class="flex items-start gap-3 text-sm font-medium text-slate-600"
                      >
                        <span
                          class="mt-2 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0"
                        ></span>
                        <div
                          class="tour-rich-content flex-1"
                          v-html="normalizeDescriptionHtml(n)"
                        ></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section
              v-if="trip.itinerary_pdf_path"
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  {{ $t("tour.plannedItinerary") }}
                </h2>
              </div>
              <a
                :href="trip.itinerary_pdf_path"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs"
              >
                {{ $t("tour.downloadItineraryPdf") }}
              </a>
            </section>

            <section
              v-if="tripImages.length > 1"
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-1 bg-red-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  {{ $t("tour.visualJourney") }}
                </h2>
              </div>
              <ImageCarousel
                v-model="galleryIndex"
                :images="tripImages"
                :alt="trip.title"
                main-class="aspect-[4/3] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm"
                thumbnail-class="w-20 h-20 sm:w-24 sm:h-24"
                :show-controls="tripImages.length > 1"
                :show-counter="tripImages.length > 1"
              >
                <div class="absolute top-6 right-6 z-30">
                  <button
                    type="button"
                    class="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-black hover:bg-white/20 transition-colors"
                    @click.stop="openImageModal(tripImages[galleryIndex])"
                    aria-label="Open image"
                  >
                    ⤢
                  </button>
                </div>
              </ImageCarousel>
            </section>

            <section
              v-if="trip.inclusions?.length || trip.exclusions?.length"
              class="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div
                class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
              >
                <div
                  class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
                >
                  {{ $t("internationalTourDetail.inclusions") }}
                </div>
                <ul class="mt-6 space-y-3">
                  <li
                    v-for="(item, idx) in trip.inclusions || []"
                    :key="idx"
                    class="flex items-start gap-3 text-sm font-bold text-slate-700"
                  >
                    <span
                      class="mt-2 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0"
                    ></span>
                    <span class="tour-rich-content" v-html="normalizeDescriptionHtml(item)"></span>
                  </li>
                </ul>
              </div>
              <div
                class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
              >
                <div
                  class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
                >
                  {{ $t("internationalTourDetail.exclusions") }}
                </div>
                <ul class="mt-6 space-y-3">
                  <li
                    v-for="(item, idx) in trip.exclusions || []"
                    :key="idx"
                    class="flex items-start gap-3 text-sm font-bold text-slate-700"
                  >
                    <span
                      class="mt-2 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"
                    ></span>
                    <span class="tour-rich-content" v-html="normalizeDescriptionHtml(item)"></span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div class="lg:col-span-4">
            <div class="sticky top-32 space-y-8">
              <div
                class="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-red-900/40 relative overflow-hidden"
              >
                <div
                  class="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"
                ></div>

                <div class="relative z-10">
                  <span
                    class="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-8 inline-block"
                    >{{ $t("internationalTourDetail.overview") }}</span
                  >

                  <div class="space-y-4 mb-10">
                    <div
                      class="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span>{{ $t("tour.duration") }}</span>
                      <span class="text-white"
                        >{{ trip.duration_days }} {{ $t("tour.days")
                        }}<span v-if="trip.duration_nights">
                          /
                          {{ trip.duration_nights }}
                          {{ $t("tour.nights") }}</span
                        ></span
                      >
                    </div>
                    <div
                      class="flex items-start justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span class="mt-0.5 shrink-0 mr-4">{{ $t("internationalTourDetail.period") }}</span>
                      <div class="text-white text-right">
                        <span v-if="!trip.departure_periods || trip.departure_periods.length === 0">-</span>
                        <span v-else class="flex flex-wrap gap-1.5 justify-end">
                          <span
                            v-for="(p, idx) in trip.departure_periods"
                            :key="idx"
                            class="px-2.5 py-1 bg-white/10 border border-white/20 rounded-lg text-white/90 font-bold text-[10px] tracking-widest"
                          >{{ p }}</span>
                        </span>
                      </div>
                    </div>
                    <div
                      class="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span>{{ $t("internationalTourDetail.seat") }}</span>
                      <span
                        :class="
                          trip.seats_available
                            ? 'text-red-400'
                            : 'text-white/50'
                        "
                      >
                        {{
                          trip.seats_available
                            ? $t("internationalTourDetail.available")
                            : $t("internationalTourDetail.soldOut")
                        }}
                      </span>
                    </div>
                    <div
                      class="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span>{{ $t("internationalTourDetail.airlines") }}</span>
                      <span class="text-white">{{ trip.airline }}</span>
                    </div>
                  </div>

                  <p
                    class="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-1"
                  >
                    {{ $t("internationalTrips.currency") }}
                  </p>
                  <p class="text-white text-sm font-black mb-0.5">{{ $t("internationalTourDetail.totalPrice") }}</p>
                  <p class="text-white/40 text-[10px] font-bold mb-4">{{ $t("internationalTourDetail.totalPriceNote") }}</p>
                  <div class="flex items-baseline gap-2 mb-6">
                    <span class="text-5xl font-black tracking-tighter">{{
                      formatPrice(trip.price_idr)
                    }}</span>
                    <span class="text-white/40 text-sm font-bold">
                      {{ $t("tour.perPax") }}
                    </span>
                  </div>

                  <!-- Warning Note -->
                  <div class="flex items-start gap-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-5 py-4 mb-8">
                    <span class="text-yellow-400 text-lg leading-none mt-0.5">⚠</span>
                    <p class="text-yellow-200 text-xs font-black leading-relaxed">
                      {{ $t("internationalTourDetail.paymentWarning") }}
                    </p>
                  </div>

                  <a
                    :href="`https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20trip:%20${trip.title}`"
                    target="_blank"
                    class="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-red-600/20 active:scale-95 flex items-center justify-center"
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
            </div>
          </div>
        </div>
      </main>

      <section
        v-if="recommendedTripsForCard.length"
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
            v-for="rt in recommendedTripsForCard"
            :key="rt.slug"
            :tour="rt"
            detail-base-path="/internasional/tour"
          />
        </div>
      </section>
    </div>

    <div v-else class="pt-32 pb-20 px-6 lg:px-10">
      <div
        class="max-w-3xl mx-auto bg-white border border-slate-100 rounded-[2.5rem] p-10 text-center shadow-sm"
      >
        <h1 class="text-2xl font-black text-slate-900">
          {{ $t("internationalTourDetail.notFound") }}
        </h1>
        <router-link
          to="/internasional"
          class="mt-8 inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-colors uppercase tracking-widest text-xs"
        >
          {{ $t("internationalTourDetail.backToTrips") }}
        </router-link>
      </div>
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
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { Calendar, MessageCircle } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import {
  getInternationalRegions,
  getInternationalTours,
  getInternationalTourDetail,
} from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { applySeo } from "@/utils/seo";
import { stripHtml } from "@/utils/htmlText";
import {
  dummyInternationalTrips,
  dummyInternationalRegions,
} from "./dummyInternationalTours";
import ImageCarousel from "@/components/ImageCarousel.vue";
import TourCard from "@/components/TourCard.vue";

const route = useRoute();
const { locale, t } = useI18n();
const loading = ref(true);
const trip = ref(null);
const regions = ref([]);
const galleryIndex = ref(0);
const recommendedTrips = ref([]);
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

const tripImages = computed(() => {
  const list = trip.value?.images;
  if (Array.isArray(list) && list.length) return list;
  if (trip.value?.image) return [trip.value.image];
  return [];
});

const regionLabel = (slug) => {
  const list = regions.value.length ? regions.value : dummyInternationalRegions;
  const r = list.find((x) => x.slug === slug);
  return r ? r.name : slug;
};

const placeholderImage =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80";

const splitList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  const str = String(value).trim();
  // If it contains HTML tags, treat as a single rich-text item
  if (hasHtmlContent(str)) return [str];
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const normalizeTrip = (raw) => {
  const image =
    raw.cover_image ||
    raw.image ||
    raw.galleries?.[0]?.image_path ||
    placeholderImage;

  const galleryUrls = Array.isArray(raw.galleries)
    ? raw.galleries.map((g) => g.image_path).filter(Boolean)
    : [];
  const images = Array.from(new Set([image, ...galleryUrls])).filter(Boolean);

  const itinerary = Array.isArray(raw.itineraries)
    ? raw.itineraries.map((it) => ({
        day: it.day_number,
        title: it.title,
        notes: [it.description].filter(Boolean),
      }))
    : raw.itinerary || [];

  const priceDetails = Array.isArray(raw.price_details)
    ? raw.price_details
    : [];
  const rows = priceDetails.map((p) => ({
    label: p.label || p.type || "-",
    price_idr: Number(p.total ?? p.base_price ?? p.price ?? 0),
  }));

  const price_breakdown =
    raw.price_breakdown ||
    (rows.length
      ? {
          title: t("internationalTourDetail.priceDetails"),
          currency: "IDR",
          sections: [
            { title: t("internationalTourDetail.priceSection"), rows },
          ],
        }
      : null);

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: getLocalizedDescriptionFromRaw(raw, locale.value),
    descriptionBase: raw.description || "",
    hasLocalizedDescription:
      localeKey(locale.value) === "en"
        ? Boolean(raw.description_en)
        : localeKey(locale.value) === "ko"
          ? Boolean(raw.description_ko)
          : localeKey(locale.value) === "zh"
            ? Boolean(raw.description_zh)
            : true,
    descriptionHtml: normalizeDescriptionHtml(
      getLocalizedDescriptionFromRaw(raw, locale.value),
    ),
    route: raw.route || raw.category?.name || "",
    region: raw.category?.slug || raw.region || "-",
    duration_days: Number(raw.duration_days || 0),
    duration_nights: Number(raw.duration_nights || 0),
    departure_periods: Array.isArray(raw.departure_periods) ? raw.departure_periods : [],
    airline: raw.airline_info || raw.airline || "",
    seats_available: raw.seats_available ?? true,
    price_idr: Number(raw.base_price || raw.price_idr || 0),
    image,
    images,
    overview: raw.overview || null,
    itinerary,
    inclusions: splitList(raw.inclusions),
    exclusions: splitList(raw.exclusions),
    excluded_costs: raw.excluded_costs || [],
    booking_fee: raw.booking_fee || null,
    itinerary_pdf_path: raw.itinerary_pdf_path || null,
    price_breakdown,
  };
};

const translateTrip = async (tripData, targetLocale) => {
  if (!tripData || targetLocale === "id") return tripData;

  const [title, description, routeText] = await Promise.all([
    tripData.title
      ? autoTranslate(tripData.title, targetLocale)
      : tripData.title,
    tripData.description
      ? tripData.hasLocalizedDescription
        ? Promise.resolve(undefined)
        : hasHtmlContent(tripData.descriptionBase || tripData.description)
        ? Promise.resolve(undefined)
        : autoTranslate(
            stripHtml(tripData.descriptionBase || tripData.description),
            targetLocale,
          )
      : tripData.description,
    tripData.route
      ? autoTranslate(tripData.route, targetLocale)
      : tripData.route,
  ]);

  const itinerary = await Promise.all(
    (tripData.itinerary || []).map(async (day) => {
      const [dayTitle, notes] = await Promise.all([
        day.title ? autoTranslate(day.title, targetLocale) : day.title,
        Promise.all(
          (day.notes || []).map((n) =>
            n
              ? hasHtmlContent(n)
                ? Promise.resolve(n)
                : autoTranslate(n, targetLocale)
              : n,
          ),
        ),
      ]);
      return { ...day, title: dayTitle, notes };
    }),
  );

  const inclusions = await Promise.all(
    (tripData.inclusions || []).map((x) =>
      x ? autoTranslate(x, targetLocale) : x,
    ),
  );
  const exclusions = await Promise.all(
    (tripData.exclusions || []).map((x) =>
      x ? autoTranslate(x, targetLocale) : x,
    ),
  );

  const excluded_costs = await Promise.all(
    (tripData.excluded_costs || []).map(async (x) => ({
      ...x,
      label: x.label ? await autoTranslate(x.label, targetLocale) : x.label,
      note: x.note ? await autoTranslate(x.note, targetLocale) : x.note,
    })),
  );

  const booking_fee = tripData.booking_fee
    ? {
        ...tripData.booking_fee,
        note: tripData.booking_fee.note
          ? await autoTranslate(tripData.booking_fee.note, targetLocale)
          : tripData.booking_fee.note,
      }
    : tripData.booking_fee;

  const price_breakdown = tripData.price_breakdown?.sections?.length
    ? {
        ...tripData.price_breakdown,
        title: tripData.price_breakdown.title
          ? await autoTranslate(tripData.price_breakdown.title, targetLocale)
          : tripData.price_breakdown.title,
        sections: await Promise.all(
          tripData.price_breakdown.sections.map(async (s) => ({
            ...s,
            title: s.title
              ? await autoTranslate(s.title, targetLocale)
              : s.title,
            rows: await Promise.all(
              (s.rows || []).map(async (r) => ({
                ...r,
                label: r.label
                  ? await autoTranslate(r.label, targetLocale)
                  : r.label,
              })),
            ),
          })),
        ),
      }
    : tripData.price_breakdown;

  return {
    ...tripData,
    title,
    description: description ?? tripData.description,
    descriptionHtml: description
      ? plainTextToHtml(description)
      : normalizeDescriptionHtml(tripData.description),
    route: routeText,
    itinerary,
    inclusions,
    exclusions,
    excluded_costs,
    booking_fee,
    price_breakdown,
  };
};

const toTourCard = (t) => {
  const image = t.image || t.images?.[0] || placeholderImage;
  return {
    slug: t.slug,
    title: t.title,
    description: t.description,
    location: "International",
    duration_days: t.duration_days,
    duration_nights: t.duration_nights,
    galleries: [{ image_path: image }],
    category: { name: regionLabel(t.region) },
  };
};

const recommendedTripsForCard = computed(() => {
  return (recommendedTrips.value || []).map(toTourCard);
});

const fetchTrip = async () => {
  loading.value = true;
  try {
    try {
      const regionsRes = await getInternationalRegions();
      regions.value = regionsRes.data.data || [];
    } catch (e) {
      regions.value = [];
    }

    const response = await getInternationalTourDetail(route.params.slug);
    trip.value = normalizeTrip(response.data.data);
  } catch (error) {
    const found = dummyInternationalTrips.find(
      (t) => t.slug === route.params.slug,
    );
    trip.value = found || null;
  } finally {
    if (locale.value !== "id") {
      try {
        if (regions.value?.length) {
          regions.value = await Promise.all(
            regions.value.map(async (r) => ({
              ...r,
              name: r.name ? await autoTranslate(r.name, locale.value) : r.name,
              description: r.description
                ? await autoTranslate(stripHtml(r.description), locale.value)
                : r.description,
            })),
          );
        }

        if (trip.value) {
          trip.value = await translateTrip(trip.value, locale.value);
        }
      } catch (e) {}
    }
    try {
      const regionSlug = trip.value?.region;
      if (!regionSlug) {
        recommendedTrips.value = [];
      } else {
        let all = [];
        try {
          const listRes = await getInternationalTours();
          all = Array.isArray(listRes.data?.data) ? listRes.data.data : [];
        } catch (e) {
          all = dummyInternationalTrips;
        }

        const normalized = (all || []).map((raw) => {
          try {
            return normalizeTrip(raw);
          } catch {
            return raw;
          }
        });

        const base = normalized
          .filter((x) => x?.slug && x.slug !== trip.value?.slug)
          .filter((x) => (x.category?.slug || x.region || "-") === regionSlug)
          .slice(0, 3);

        if (locale.value !== "id" && base.length) {
          const translated = await Promise.all(
            base.map(async (it) => {
              const [title, description] = await Promise.all([
                it.title ? autoTranslate(it.title, locale.value) : it.title,
                it.description
                  ? autoTranslate(stripHtml(it.description), locale.value)
                  : it.description,
              ]);
              return { ...it, title, description };
            }),
          );
          recommendedTrips.value = translated;
        } else {
          recommendedTrips.value = base;
        }
      }
    } catch (e) {
      recommendedTrips.value = [];
    }

    if (trip.value) {
      applySeo({
        title: trip.value.title || "Detail Tour Internasional",
        description:
          stripHtml(trip.value.description) ||
          "Lihat detail tour internasional lengkap dengan itinerary, durasi, harga, dan informasi perjalanan.",
        image: tripImages.value[0],
        url: route.fullPath,
        type: "article",
      });
    } else {
      applySeo({
        title: "Detail Tour Internasional",
        description:
          "Lihat detail tour internasional lengkap dengan itinerary, durasi, harga, dan informasi perjalanan.",
        url: route.fullPath,
        type: "article",
      });
    }

    galleryIndex.value = 0;
    loading.value = false;
  }
};

const openImageModal = (src) => {
  if (!src) return;
  imageModalSrc.value = src;
  isImageModalOpen.value = true;
};

const closeImageModal = () => {
  isImageModalOpen.value = false;
  imageModalSrc.value = "";
};

onMounted(fetchTrip);
watch(locale, fetchTrip);

const formatPrice = (price) => {
  const localeMap = {
    id: "id-ID",
    en: "en-US",
    zh: "zh-CN",
    ko: "ko-KR",
  };
  return new Intl.NumberFormat(localeMap[locale.value] || "en-US").format(
    price || 0,
  );
};

const formatDateRange = (start, end) => {
  if (!start || !end) return "-";
  const s = new Date(`${start}T00:00:00`);
  const e = new Date(`${end}T00:00:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return "-";
  const localeMap = {
    id: "id-ID",
    en: "en-US",
    zh: "zh-CN",
    ko: "ko-KR",
  };
  const dateLocale = localeMap[locale.value] || "en-US";
  const startLabel = s.toLocaleString(dateLocale, {
    day: "numeric",
    month: "short",
  });
  const endLabel = e.toLocaleString(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${startLabel} - ${endLabel}`;
};

const formatCurrency = (price) => {
  return `${t("internationalTrips.currency")} ${formatPrice(price)}`;
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
