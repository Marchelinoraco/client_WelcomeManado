<template>
  <div class="min-h-screen bg-white font-sans">
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div
        class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <div v-else-if="tour" class="pb-32 animate-fade-in">
      <!-- Layout 1: Daily Tour (Sesuai Gambar) -->
      <div v-if="isDaily">
        <!-- Simple Blue Header -->
        <div class="bg-[#1e293b] pt-32 pb-20">
          <div class="max-w-7xl mx-auto px-6 lg:px-10">
            <h1 class="text-4xl md:text-5xl font-serif text-white text-right">
              {{ tour.title }}
            </h1>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <!-- Left: Image Grid (3 Images) -->
            <div
              class="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden shadow-lg"
            >
              <div
                v-for="(img, idx) in displayImages"
                :key="idx"
                class="aspect-square bg-slate-100"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Right: Content -->
            <div class="space-y-6">
              <h2 class="text-3xl font-bold text-slate-800 leading-tight">
                {{ tour.title }}
                <span v-if="!tour.title.toLowerCase().includes('lunch')"
                  >& Lunch Makanan Khas Manado</span
                >
              </h2>
              <div class="text-slate-600 font-medium">
                Durasi
                <template
                  v-if="tour.duration_hours_min && tour.duration_hours_max"
                  >{{ tour.duration_hours_min }}-{{
                    tour.duration_hours_max
                  }}
                  jam</template
                >
                <template v-else-if="tour.duration_hours"
                  >{{ tour.duration_hours }} jam</template
                >
                <template v-else>{{ tour.duration_days }} hari</template>
              </div>

              <div
                class="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm"
              >
                <p
                  v-for="(para, idx) in tour.description.split('\n')"
                  :key="idx"
                  class="mb-4"
                >
                  {{ para }}
                </p>
              </div>

              <div class="pt-8 border-t border-slate-100">
                <p class="text-xl font-bold text-slate-800 mb-6">
                  Hubungi kami untuk keterangan lebih lanjut
                </p>

                <!-- Simple CTA Button -->
                <a
                  :href="`https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20paket%20tour:%20${tour.title}`"
                  target="_blank"
                  class="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <MessageCircle class="mr-3 w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Contact Info -->
          <div
            class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-slate-100"
          >
            <!-- Alamat -->
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0"
              >
                <MapPinIcon class="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-800 mb-4">Alamat</h3>
                <p class="text-slate-500 text-sm leading-relaxed">
                  Jl. A. A. Maramis No. 171, Manado,<br />
                  Sulawesi Utara
                </p>
              </div>
            </div>

            <!-- No Telepon -->
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0"
              >
                <Phone class="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-800 mb-4">
                  No Telepon
                </h3>
                <p class="text-slate-500 text-sm font-bold">+6282293935566</p>
              </div>
            </div>

            <!-- Sosial Media -->
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0"
              >
                <Share2 class="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-800 mb-4">
                  Sosial Media
                </h3>
                <div class="flex items-center space-x-3">
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Facebook class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all"
                  >
                    <Instagram class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    <MessageCircle class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white transition-all"
                  >
                    <Mail class="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Layout 2: Premium Package (Default) -->
      <div v-else>
        <!-- Premium Hero Header -->
        <header
          class="relative h-[70vh] lg:h-[85vh] flex items-end overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10"
          ></div>
          <img
            :src="mainImage"
            class="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
            :alt="tour.title"
          />

          <div
            class="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-20 lg:pb-32"
          >
            <div
              class="flex flex-wrap items-center gap-4 mb-8 animate-fade-in-up"
            >
              <span
                class="px-5 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-600/20"
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
                <MapPinIcon class="w-5 h-5 text-blue-400" />
              </div>
              <span class="uppercase tracking-widest text-xs">{{
                tour.location || "Manado, North Sulawesi"
              }}</span>
            </div>
          </div>
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
                    class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors"
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
                  <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
                  <h2
                    class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                  >
                    {{ $t("tour.experienceDetails") }}
                  </h2>
                </div>
                <p class="text-slate-500 leading-[1.8] text-lg font-medium">
                  {{ tour.description }}
                </p>
              </section>

              <!-- Price Breakdown Table -->
              <section
                v-if="tour.price_details?.length"
                class="animate-fade-in-up delay-450"
              >
                <div class="flex items-center space-x-4 mb-8">
                  <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
                  <h2
                    class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                  >
                    Rincian Harga Paket
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
                          Jumlah Peserta (Pax)
                        </th>
                        <th
                          class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-right"
                        >
                          Harga per Orang (IDR)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(price, idx) in tour.price_details"
                        :key="idx"
                        class="hover:bg-blue-50/30 transition-colors group"
                      >
                        <td
                          class="px-8 py-5 text-sm font-bold text-slate-600 border-b border-slate-50 group-last:border-0"
                        >
                          {{ price.pax_range }}
                        </td>
                        <td
                          class="px-8 py-5 text-sm font-black text-blue-600 border-b border-slate-50 text-right group-last:border-0"
                        >
                          {{ formatPrice(price.price_per_pax) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    class="px-8 py-4 bg-blue-50/50 border-t border-slate-100"
                  >
                    <p class="text-[10px] font-bold text-blue-600/70 italic">
                      * Harga dapat berubah sewaktu-waktu. Silakan hubungi kami
                      untuk konfirmasi ketersediaan dan harga final.
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
                  <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
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
                    @click="mainImage = img.image_path"
                  >
                    <img
                      :src="img.image_path"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      class="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
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
                  <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
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
                        class="w-12 h-12 rounded-2xl bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 font-black text-sm shadow-xl shadow-blue-600/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
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
                            class="inline-flex items-center px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl"
                          >
                            <UtensilsIcon class="w-3 h-3 mr-2" />
                            {{ item.meals_info }}
                          </span>
                        </div>
                      </div>
                      <p
                        class="text-slate-500 text-sm leading-relaxed font-medium mb-8"
                      >
                        {{ item.description }}
                      </p>

                      <div
                        v-if="item.hotel_info"
                        class="inline-flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div
                          class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm"
                        >
                          <HotelIcon class="w-5 h-5 text-blue-600" />
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
                  class="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group"
                >
                  <!-- Background Decoration -->
                  <div
                    class="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-600/30 transition-colors"
                  ></div>

                  <div class="relative z-10">
                    <span
                      class="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-8 inline-block"
                      >Best Price Guarantee</span
                    >

                    <div v-if="tour.base_price">
                      <p
                        class="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-3"
                      >
                        Investment Starts From
                      </p>
                      <div class="flex items-baseline gap-2 mb-10">
                        <span class="text-xs font-black text-blue-400"
                          >IDR</span
                        >
                        <span class="text-5xl font-black tracking-tighter">{{
                          formatPrice(tour.base_price)
                        }}</span>
                        <span class="text-white/40 text-sm font-bold"
                          >/pax</span
                        >
                      </div>
                    </div>
                    <div v-else class="mb-10">
                      <p
                        class="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-3"
                      >
                        Pricing Information
                      </p>
                      <h3
                        class="text-2xl font-black text-white uppercase tracking-tight"
                      >
                        Contact us for price inquiry
                      </h3>
                    </div>

                    <!-- Features List -->
                    <div class="space-y-5 mb-12">
                      <div
                        v-for="feat in [
                          'Expert Local Guide',
                          tour.base_price
                            ? 'Premium Accommodation'
                            : 'Safety Equipment Included',
                          'Full Insurance Coverage',
                          'Instant Booking',
                        ]"
                        :key="feat"
                        class="flex items-center text-sm font-bold text-white/70"
                      >
                        <div
                          class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0"
                        >
                          <CheckIcon class="w-3 h-3 text-blue-400" />
                        </div>
                        {{ feat }}
                      </div>
                    </div>

                    <button
                      v-if="tour.base_price"
                      class="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-600/40 active:scale-95 flex items-center justify-center group/btn mb-4"
                    >
                      Reserve Your Spot
                      <ArrowRight
                        class="ml-3 w-5 h-5 group/btn:translate-x-1 transition-transform"
                      />
                    </button>

                    <a
                      :href="`https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20paket%20tour:%20${tour.title}`"
                      target="_blank"
                      class="w-full py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center group/wa"
                    >
                      <MessageCircle class="mr-3 w-5 h-5" />
                      Chat on WhatsApp
                    </a>

                    <p
                      class="text-center text-[10px] text-white/30 mt-6 font-bold uppercase tracking-widest"
                    >
                      Secure Payment & Instant Confirmation
                    </p>
                  </div>
                </div>

                <!-- Help Card -->
                <div
                  class="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 group hover:bg-blue-100 transition-colors"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform"
                    >
                      <StarIcon class="w-7 h-7" />
                    </div>
                    <div>
                      <h4
                        class="text-sm font-black text-blue-900 uppercase tracking-widest mb-1"
                      >
                        Tailored Journey?
                      </h4>
                      <p
                        class="text-xs font-bold text-blue-600/70 leading-relaxed"
                      >
                        Let us customize this tour exactly to your preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Floating WhatsApp Button -->
      <a
        :href="`https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20paket%20tour:%20${tour.title}`"
        target="_blank"
        class="fixed bottom-10 right-10 z-[99] w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-slow"
        title="Chat on WhatsApp"
      >
        <MessageCircle class="w-8 h-8" />
        <span class="absolute -top-2 -right-2 flex h-5 w-5">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white"
          ></span>
        </span>
      </a>
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
} from "lucide-vue-next";
import { getLocalTourDetail } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { dummyLocalTours } from "./dummyLocalTours";

const route = useRoute();
const { locale } = useI18n();
const tour = ref(null);
const loading = ref(true);
const mainImage = ref("");

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
      return;
    }

    if (locale.value !== "id" && rawTour) {
      // Translate main tour info
      const [translatedTitle, translatedDesc, translatedLocation] =
        await Promise.all([
          autoTranslate(rawTour.title, locale.value),
          autoTranslate(rawTour.description, locale.value),
          autoTranslate(
            rawTour.location || "Manado, North Sulawesi",
            locale.value,
          ),
        ]);

      // Translate itineraries
      const translatedItineraries = await Promise.all(
        (rawTour.itineraries || []).map(async (it) => {
          const [itTitle, itDesc, itHotel, itMeals] = await Promise.all([
            autoTranslate(it.title, locale.value),
            autoTranslate(it.description, locale.value),
            autoTranslate(it.hotel_info, locale.value),
            autoTranslate(it.meals_info, locale.value),
          ]);
          return {
            ...it,
            title: itTitle,
            description: itDesc,
            hotel_info: itHotel,
            meals_info: itMeals,
          };
        }),
      );

      tour.value = {
        ...rawTour,
        title: translatedTitle,
        description: translatedDesc,
        location: translatedLocation,
        itineraries: translatedItineraries,
        price_details: normalizePriceDetails(rawTour.price_details),
      };
    } else {
      tour.value = {
        ...rawTour,
        price_details: normalizePriceDetails(rawTour.price_details),
      };
    }

    // Set initial main image
    if (tour.value?.galleries?.length) {
      const primary = tour.value.galleries.find((g) => g.is_primary);
      mainImage.value = primary
        ? primary.image_path
        : tour.value.galleries[0].image_path;
    } else {
      mainImage.value =
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2400";
    }
  } catch (error) {
    console.error("Error fetching tour detail:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTour);
watch(locale, fetchTour);

const isDaily = computed(() => {
  if (!tour.value) return false;
  // Daily tours are typically 1 day or less and have no nights
  return (
    (tour.value.duration_days || 0) <= 1 &&
    (tour.value.duration_nights || 0) === 0
  );
});

const displayImages = computed(() => {
  if (!tour.value?.galleries?.length) {
    return Array(3).fill(
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800",
    );
  }

  const images = tour.value.galleries.map((g) => g.image_path);
  // Fill with placeholders if less than 3
  while (images.length < 3) {
    images.push(images[0]);
  }
  return images.slice(0, 3);
});

const galleryPreview = computed(() => {
  return (tour.value?.galleries || []).slice(0, 3);
});

const summaryItems = computed(() => {
  let durationValue = `${tour.value?.duration_days}D / ${tour.value?.duration_nights}N`;
  if (tour.value?.duration_hours_min && tour.value?.duration_hours_max) {
    durationValue = `${tour.value.duration_hours_min}-${tour.value.duration_hours_max} Hours`;
  } else if (tour.value?.duration_hours) {
    durationValue = `${tour.value.duration_hours} Hours`;
  }

  return [
    {
      label: "Duration",
      value: durationValue,
      icon: ClockIcon,
    },
    { label: "Group Size", value: "Min. 2 Pax", icon: Users },
    { label: "Language", value: "ID / EN", icon: Compass },
    { label: "Insurance", value: "Included", icon: ShieldCheck },
  ];
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
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
</style>
