<template>
  <div class="min-h-screen bg-white font-sans">
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div
        class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
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
          class="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
          :alt="trip.title"
        />

        <div
          class="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-20 lg:pb-32"
        >
          <nav
            class="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-white/70 mb-6"
          >
            <router-link to="/" class="hover:text-white transition-colors"
              >Home</router-link
            >
            <span class="mx-3 text-white/30">•</span>
            <router-link
              to="/internasional"
              class="hover:text-white transition-colors"
              >Tours</router-link
            >
            <span class="mx-3 text-white/30">•</span>
            <span class="text-white">{{ trip.title }}</span>
          </nav>

          <div class="flex flex-wrap items-center gap-4 mb-8">
            <span
              class="px-5 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-600/20"
              >{{ regionLabel(trip.region) }}</span
            >
            <span
              class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl"
              >{{ trip.duration_days }} Hari</span
            >
            <span
              class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl"
              >{{ trip.airline }}</span
            >
            <span
              v-if="trip.route"
              class="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl"
              >{{ trip.route }}</span
            >
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
              <Calendar class="w-5 h-5 text-blue-300" />
            </div>
            <span class="uppercase tracking-widest text-xs"
              >Periode:
              {{ formatDateRange(trip.start_date, trip.end_date) }}</span
            >
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
                <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  Deskripsi
                </h2>
              </div>
              <p class="text-slate-600 leading-relaxed font-medium">
                {{ trip.description }}
              </p>
            </section>

            <section
              v-if="trip.price_breakdown?.sections?.length"
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  {{ trip.price_breakdown.title || "Detail Harga" }}
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
                  </div>
                </div>
              </div>
            </section>

            <section
              v-if="trip.excluded_costs?.length"
              class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
            >
              <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  Harga Belum Termasuk
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
              class="bg-blue-50 rounded-[2.5rem] border border-blue-100 p-10"
            >
              <div class="flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <div
                    class="text-[10px] font-black text-blue-700 uppercase tracking-[0.25em]"
                  >
                    Booking Fee
                  </div>
                  <div class="text-3xl font-black text-slate-900 mt-2">
                    {{ formatCurrency(trip.booking_fee.amount_idr) }}
                    <span class="text-sm font-black text-slate-500">/pax</span>
                  </div>
                </div>
                <div
                  class="max-w-xl text-sm font-bold text-blue-900/70 leading-relaxed"
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
                <div class="w-12 h-1 bg-blue-600 rounded-full"></div>
                <h2
                  class="text-2xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  Itinerary
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
                      class="w-12 h-12 rounded-2xl bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 font-black text-sm"
                    >
                      {{ day.day }}
                    </div>
                  </div>
                  <div class="flex-1">
                    <div
                      class="text-sm font-black text-slate-900 uppercase tracking-tight"
                    >
                      Day {{ day.day }} — {{ day.title }}
                    </div>
                    <ul class="mt-4 space-y-2">
                      <li
                        v-for="(n, idx) in day.notes"
                        :key="idx"
                        class="flex items-start gap-3 text-sm font-medium text-slate-600"
                      >
                        <span
                          class="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"
                        ></span>
                        <span>{{ n }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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
                  Harga Termasuk
                </div>
                <ul class="mt-6 space-y-3">
                  <li
                    v-for="(item, idx) in trip.inclusions || []"
                    :key="idx"
                    class="flex items-start gap-3 text-sm font-bold text-slate-700"
                  >
                    <span
                      class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"
                    ></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div
                class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm"
              >
                <div
                  class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
                >
                  Harga Tidak Termasuk
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
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div class="lg:col-span-4">
            <div class="sticky top-32 space-y-8">
              <div
                class="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden"
              >
                <div
                  class="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"
                ></div>

                <div class="relative z-10">
                  <span
                    class="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl mb-8 inline-block"
                    >Overview</span
                  >

                  <div class="space-y-4 mb-10">
                    <div
                      class="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span>Durasi</span>
                      <span class="text-white"
                        >{{ trip.duration_days }} Hari<span
                          v-if="trip.duration_nights"
                        >
                          / {{ trip.duration_nights }} Malam</span
                        ></span
                      >
                    </div>
                    <div
                      class="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span>Periode</span>
                      <span class="text-white">{{
                        formatDateRange(trip.start_date, trip.end_date)
                      }}</span>
                    </div>
                    <div
                      class="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span>Seat</span>
                      <span
                        :class="
                          trip.seats_available
                            ? 'text-emerald-400'
                            : 'text-white/50'
                        "
                      >
                        {{ trip.seats_available ? "Tersedia" : "Sold Out" }}
                      </span>
                    </div>
                    <div
                      class="flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/60"
                    >
                      <span>Airlines</span>
                      <span class="text-white">{{ trip.airline }}</span>
                    </div>
                  </div>

                  <p
                    class="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-3"
                  >
                    IDR
                  </p>
                  <div class="flex items-baseline gap-2 mb-10">
                    <span class="text-5xl font-black tracking-tighter">{{
                      formatPrice(trip.price_idr)
                    }}</span>
                    <span class="text-white/40 text-sm font-bold">/pax</span>
                  </div>

                  <a
                    :href="`https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20trip:%20${trip.title}`"
                    target="_blank"
                    class="w-full py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-[2rem] transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center"
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
import { Calendar, MessageCircle } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import {
  getInternationalRegions,
  getInternationalTourDetail,
} from "@/services/api";
import { autoTranslate } from "@/services/translate";
import {
  dummyInternationalTrips,
  dummyInternationalRegions,
} from "./dummyInternationalTours";

const route = useRoute();
const { locale } = useI18n();
const loading = ref(true);
const trip = ref(null);
const regions = ref([]);

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
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const normalizeTrip = (t) => {
  const image =
    t.cover_image ||
    t.image ||
    t.galleries?.[0]?.image_path ||
    placeholderImage;

  const itinerary = Array.isArray(t.itineraries)
    ? t.itineraries.map((it) => ({
        day: it.day_number,
        title: it.title,
        notes: [it.description].filter(Boolean),
      }))
    : t.itinerary || [];

  const priceDetails = Array.isArray(t.price_details) ? t.price_details : [];
  const rows = priceDetails.map((p) => ({
    label: p.label || p.type || "-",
    price_idr: Number(p.total ?? p.base_price ?? p.price ?? 0),
  }));

  const price_breakdown =
    t.price_breakdown ||
    (rows.length
      ? {
          title: "Detail Harga",
          currency: "IDR",
          sections: [{ title: "Harga", rows }],
        }
      : null);

  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    description: t.description,
    route: t.route || t.category?.name || "",
    region: t.category?.slug || t.region || "-",
    duration_days: Number(t.duration_days || 0),
    duration_nights: Number(t.duration_nights || 0),
    start_date: t.start_date || null,
    end_date: t.end_date || null,
    airline: t.airline_info || t.airline || "",
    seats_available: t.seats_available ?? true,
    price_idr: Number(t.base_price || t.price_idr || 0),
    image,
    overview: t.overview || null,
    itinerary,
    inclusions: splitList(t.inclusions),
    exclusions: splitList(t.exclusions),
    excluded_costs: t.excluded_costs || [],
    booking_fee: t.booking_fee || null,
    price_breakdown,
  };
};

const translateTrip = async (t, targetLocale) => {
  if (!t || targetLocale === "id") return t;

  const [title, description, routeText] = await Promise.all([
    t.title ? autoTranslate(t.title, targetLocale) : t.title,
    t.description ? autoTranslate(t.description, targetLocale) : t.description,
    t.route ? autoTranslate(t.route, targetLocale) : t.route,
  ]);

  const itinerary = await Promise.all(
    (t.itinerary || []).map(async (day) => {
      const [dayTitle, notes] = await Promise.all([
        day.title ? autoTranslate(day.title, targetLocale) : day.title,
        Promise.all(
          (day.notes || []).map((n) =>
            n ? autoTranslate(n, targetLocale) : n,
          ),
        ),
      ]);
      return { ...day, title: dayTitle, notes };
    }),
  );

  const inclusions = await Promise.all(
    (t.inclusions || []).map((x) => (x ? autoTranslate(x, targetLocale) : x)),
  );
  const exclusions = await Promise.all(
    (t.exclusions || []).map((x) => (x ? autoTranslate(x, targetLocale) : x)),
  );

  const excluded_costs = await Promise.all(
    (t.excluded_costs || []).map(async (x) => ({
      ...x,
      label: x.label ? await autoTranslate(x.label, targetLocale) : x.label,
      note: x.note ? await autoTranslate(x.note, targetLocale) : x.note,
    })),
  );

  const booking_fee = t.booking_fee
    ? {
        ...t.booking_fee,
        note: t.booking_fee.note
          ? await autoTranslate(t.booking_fee.note, targetLocale)
          : t.booking_fee.note,
      }
    : t.booking_fee;

  const price_breakdown = t.price_breakdown?.sections?.length
    ? {
        ...t.price_breakdown,
        title: t.price_breakdown.title
          ? await autoTranslate(t.price_breakdown.title, targetLocale)
          : t.price_breakdown.title,
        sections: await Promise.all(
          t.price_breakdown.sections.map(async (s) => ({
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
    : t.price_breakdown;

  return {
    ...t,
    title,
    description,
    route: routeText,
    itinerary,
    inclusions,
    exclusions,
    excluded_costs,
    booking_fee,
    price_breakdown,
  };
};

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
                ? await autoTranslate(r.description, locale.value)
                : r.description,
            })),
          );
        }

        if (trip.value) {
          trip.value = await translateTrip(trip.value, locale.value);
        }
      } catch (e) {}
    }
    loading.value = false;
  }
};

onMounted(fetchTrip);
watch(locale, fetchTrip);

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price || 0);
};

const formatDateRange = (start, end) => {
  if (!start || !end) return "-";
  const s = new Date(`${start}T00:00:00`);
  const e = new Date(`${end}T00:00:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return "-";
  const startLabel = s.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
  });
  const endLabel = e.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${startLabel} - ${endLabel}`;
};

const formatCurrency = (price) => {
  return `IDR ${formatPrice(price)}`;
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
</style>
