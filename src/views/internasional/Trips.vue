<template>
  <div class="min-h-screen bg-white">
    <div
      v-if="activeRegion"
      class="relative h-[60vh] flex items-center overflow-hidden bg-slate-900"
    >
      <img
        :src="regionHeroImage"
        class="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        :alt="$t('internationalTrips.hero.imageAlt')"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 w-full"
      >
        <nav
          class="flex mb-6 text-xs font-bold uppercase tracking-widest text-red-400"
        >
          <router-link to="/" class="hover:text-white transition-colors">{{
            $t("nav.home")
          }}</router-link>
          <span class="mx-3 text-white/30">/</span>
          <router-link
            to="/internasional"
            class="hover:text-white transition-colors"
            >{{ $t("nav.international") }}</router-link
          >
          <span class="mx-3 text-white/30">/</span>
          <span class="text-white">{{ activeRegion.name }}</span>
        </nav>
        <h1
          class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic"
        >
          {{ activeRegion.name }}
        </h1>
        <p class="text-white/80 text-xl max-w-3xl leading-relaxed font-medium">
          {{ regionHeroDescription }}
        </p>
      </div>
    </div>

    <div v-else class="pt-28 pb-10 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p
              class="text-[10px] font-black uppercase tracking-[0.25em] text-red-600/70"
            >
              {{ $t("internationalTrips.hero.badge") }}
            </p>
            <h1
              class="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-2"
            >
              {{ $t("internationalTrips.hero.title") }}
            </h1>
            <p class="text-slate-500 font-medium mt-3 max-w-2xl">
              {{ $t("internationalTrips.hero.subtitle") }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-xs font-bold text-slate-500">
              {{
                $t("internationalTrips.showing", {
                  shown: filteredTrips.length,
                  total: trips.length,
                })
              }}
            </div>
            <select
              v-model="sortBy"
              class="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
            >
              <option value="newest">
                {{ $t("internationalTrips.sort.newest") }}
              </option>
              <option value="price_low">
                {{ $t("internationalTrips.sort.priceLow") }}
              </option>
              <option value="price_high">
                {{ $t("internationalTrips.sort.priceHigh") }}
              </option>
              <option value="duration_low">
                {{ $t("internationalTrips.sort.durationLow") }}
              </option>
              <option value="duration_high">
                {{ $t("internationalTrips.sort.durationHigh") }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div v-if="activeRegion" class="flex items-center justify-between gap-4">
        <div class="text-xs font-bold text-slate-500">
          {{
            $t("internationalTrips.showing", {
              shown: filteredTrips.length,
              total: trips.length,
            })
          }}
        </div>
        <select
          v-model="sortBy"
          class="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
        >
          <option value="newest">
            {{ $t("internationalTrips.sort.newest") }}
          </option>
          <option value="price_low">
            {{ $t("internationalTrips.sort.priceLow") }}
          </option>
          <option value="price_high">
            {{ $t("internationalTrips.sort.priceHigh") }}
          </option>
          <option value="duration_low">
            {{ $t("internationalTrips.sort.durationLow") }}
          </option>
          <option value="duration_high">
            {{ $t("internationalTrips.sort.durationHigh") }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside class="lg:col-span-3">
          <div class="sticky top-28">
            <div
              class="bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-sm"
            >
              <div class="flex items-center justify-between mb-6">
                <h2
                  class="text-sm font-black text-slate-900 uppercase tracking-widest"
                >
                  {{ $t("internationalTrips.filters.title") }}
                </h2>
                <button
                  class="text-xs font-black text-red-600 hover:text-red-700 uppercase tracking-widest"
                  @click="resetFilters"
                >
                  {{ $t("internationalTrips.filters.reset") }}
                </button>
              </div>

              <div class="space-y-8">
                <div>
                  <div
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
                  >
                    {{ $t("internationalTrips.filters.region") }}
                  </div>
                  <div class="space-y-2.5">
                    <label
                      v-for="r in regions"
                      :key="r.slug"
                      class="flex items-center justify-between gap-3 text-sm font-bold text-slate-700"
                    >
                      <span class="flex items-center gap-3">
                        <input
                          type="checkbox"
                          class="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
                          :value="r.slug"
                          v-model="selectedRegions"
                        />
                        <span>{{ r.name }}</span>
                      </span>
                      <span class="text-xs font-black text-slate-400">
                        {{ regionCounts[r.slug] || 0 }}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <div
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
                  >
                    {{ $t("internationalTrips.filters.price") }}
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="p in pricePresets"
                      :key="p.key"
                      @click="togglePricePreset(p.key)"
                      class="h-10 rounded-2xl border text-xs font-black uppercase tracking-widest transition-colors"
                      :class="
                        activePricePresets.includes(p.key)
                          ? 'border-red-600 bg-red-50 text-red-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      "
                    >
                      {{ $t(p.labelKey) }}
                    </button>
                  </div>
                </div>

                <div>
                  <div
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
                  >
                    {{ $t("internationalTrips.filters.durationDays") }}
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="d in durationPresets"
                      :key="d"
                      @click="toggleDuration(d)"
                      class="h-9 rounded-2xl border text-xs font-black uppercase tracking-widest transition-colors"
                      :class="
                        selectedDurations.includes(d)
                          ? 'border-red-600 bg-red-50 text-red-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      "
                    >
                      {{ d }} {{ $t("tour.days") }}
                    </button>
                  </div>
                </div>

                <div>
                  <div
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
                  >
                    {{ $t("internationalTrips.filters.month") }}
                  </div>
                  <select
                    v-model="selectedMonth"
                    class="w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                  >
                    <option value="">
                      {{ $t("internationalTrips.filters.allMonths") }}
                    </option>
                    <option
                      v-for="m in monthOptions"
                      :key="m.value"
                      :value="m.value"
                    >
                      {{ m.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <div
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
                  >
                    {{ $t("internationalTrips.filters.airlines") }}
                  </div>
                  <div
                    class="space-y-2.5 max-h-56 overflow-auto custom-scrollbar pr-1"
                  >
                    <label
                      v-for="a in airlineOptions"
                      :key="a"
                      class="flex items-center gap-3 text-sm font-bold text-slate-700"
                    >
                      <input
                        type="checkbox"
                        class="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
                        :value="a"
                        v-model="selectedAirlines"
                      />
                      <span>{{ a }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"
                  >
                    {{ $t("internationalTrips.filters.search") }}
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="
                      $t('internationalTrips.filters.searchPlaceholder')
                    "
                    class="w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main class="lg:col-span-9">
          <div
            v-if="sortedTrips.length === 0"
            class="text-center py-24 bg-slate-50 rounded-[2.5rem] border border-slate-100"
          >
            <p class="text-slate-500 font-bold">
              {{ $t("internationalTrips.empty") }}
            </p>
          </div>

          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <router-link
              v-for="trip in sortedTrips"
              :key="trip.id"
              :to="`/internasional/tour/${trip.slug}`"
              class="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-slate-900/40 hover:shadow-2xl hover:shadow-red-900/10 transition-all overflow-hidden"
            >
              <div class="relative h-56 overflow-hidden">
                <img
                  :src="trip.image"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  :alt="trip.title"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
                ></div>
                <div class="absolute top-5 left-5">
                  <span
                    class="px-4 py-1.5 bg-amber-400 dark:bg-amber-300 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/20"
                  >
                    {{ trip.duration_days }} {{ $t("tour.days") }}
                  </span>
                </div>
                <div class="absolute top-5 right-5">
                  <button
                    @click.prevent
                    class="w-11 h-11 rounded-2xl bg-white/90 dark:bg-slate-950/90 border border-white/70 dark:border-slate-700/80 backdrop-blur-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
                    :title="$t('internationalTrips.card.favorite')"
                  >
                    <Heart class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div class="p-7">
                <div
                  class="text-[11px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest"
                >
                  {{ regionLabel(trip.region) }}
                </div>
                <h3
                  class="mt-2 text-lg font-black text-slate-900 dark:text-white leading-snug line-clamp-2"
                >
                  {{ trip.title }}
                </h3>

                <div class="mt-4 space-y-2">
                  <div
                    class="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400"
                  >
                    <span>{{
                      formatDateRange(trip.start_date, trip.end_date)
                    }}</span>
                    <span class="uppercase tracking-wider">{{
                      trip.airline
                    }}</span>
                  </div>
                  <div class="flex items-end justify-between">
                    <div>
                      <div
                        class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]"
                      >
                        {{ $t("internationalTrips.card.price") }}
                      </div>
                      <div class="text-xl font-black text-red-500 dark:text-red-400">
                        {{ $t("internationalTrips.currency") }}
                        {{ formatPriceShort(trip.price_idr) }}
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold">
                      <span
                        class="w-2 h-2 rounded-full"
                        :class="
                          trip.seats_available ? 'bg-red-500' : 'bg-slate-300'
                        "
                      ></span>
                      <span
                        :class="
                          trip.seats_available
                            ? 'text-slate-600'
                            : 'text-slate-400'
                        "
                      >
                        {{
                          trip.seats_available
                            ? $t("internationalTrips.card.seatsAvailable")
                            : $t("internationalTrips.card.soldOut")
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Heart } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { getInternationalRegions, getInternationalTours } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import {
  dummyInternationalRegions,
  dummyInternationalTrips,
} from "./dummyInternationalTours";

const route = useRoute();
const { locale, t } = useI18n();

const trips = ref([]);
const regions = ref([]);

const selectedRegions = ref([]);
const selectedAirlines = ref([]);
const selectedDurations = ref([]);
const activePricePresets = ref([]);
const selectedMonth = ref("");
const searchQuery = ref("");
const sortBy = ref("newest");

const pricePresets = [
  {
    key: "0_10",
    labelKey: "internationalTrips.pricePresets.p0_10",
    min: 5000000,
    max: 10000000,
  },
  {
    key: "11_20",
    labelKey: "internationalTrips.pricePresets.p11_20",
    min: 11000000,
    max: 20000000,
  },
  {
    key: "21_30",
    labelKey: "internationalTrips.pricePresets.p21_30",
    min: 21000000,
    max: 30000000,
  },
  {
    key: "31_40",
    labelKey: "internationalTrips.pricePresets.p31_40",
    min: 31000000,
    max: 40000000,
  },
  {
    key: "gt_40",
    labelKey: "internationalTrips.pricePresets.gt_40",
    min: 40000001,
    max: Infinity,
  },
];

const durationPresets = [5, 6, 7, 8, 9, 10, 11, 12, 13];

const regionSlug = computed(() => {
  const slug = route.params.slug;
  return typeof slug === "string" && slug.length ? slug : null;
});

const activeRegion = computed(() => {
  if (!regionSlug.value) return null;
  const list = regions.value.length ? regions.value : dummyInternationalRegions;
  return list.find((r) => r.slug === regionSlug.value) || null;
});

const regionHeroImage = computed(() => {
  const map = {
    asia: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=2400&q=80",
    "asia-tenggara":
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=80",
    japan:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80",
    korea:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=2400&q=80",
    "europe-uk":
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=2400&q=80",
    "australia-nz":
      "https://images.unsplash.com/photo-1506973035872-a4f23b0a5b49?auto=format&fit=crop&w=2400&q=80",
    "usa-canada":
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80",
    "middle-east":
      "https://images.unsplash.com/photo-1548135039-35d13ef30b24?auto=format&fit=crop&w=2400&q=80",
    "south-africa":
      "https://images.unsplash.com/photo-1500043357865-c6b8827edf2a?auto=format&fit=crop&w=2400&q=80",
    china:
      "https://images.unsplash.com/photo-1520967824495-b529aeba26df?auto=format&fit=crop&w=2400&q=80",
  };
  return (
    (regionSlug.value && map[regionSlug.value]) ||
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80"
  );
});

const regionHeroDescription = computed(() => {
  const desc = activeRegion.value?.description;
  if (typeof desc === "string" && desc.trim()) return desc;

  if (regionSlug.value === "asia")
    return t("internationalTrips.regionHero.asia");
  return t("internationalTrips.regionHero.default");
});

const parseMonthKey = (isoDate) => {
  if (!isoDate) return null;
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};

const monthOptions = computed(() => {
  const localeMap = {
    id: "id-ID",
    en: "en-US",
    zh: "zh-CN",
    ko: "ko-KR",
  };

  const dateLocale = localeMap[locale.value] || "en-US";
  const set = new Set(
    trips.value.map((t) => parseMonthKey(t.start_date)).filter(Boolean),
  );
  const arr = Array.from(set).sort();
  return arr.map((key) => {
    const [y, m] = key.split("-");
    const date = new Date(Number(y), Number(m) - 1, 1);
    const label = date.toLocaleString(dateLocale, {
      month: "long",
      year: "2-digit",
    });
    return { value: key, label };
  });
});

const airlineOptions = computed(() => {
  const set = new Set(trips.value.map((t) => t.airline).filter(Boolean));
  return Array.from(set).sort();
});

const regionCounts = computed(() => {
  const counts = {};
  trips.value.forEach((t) => {
    counts[t.region] = (counts[t.region] || 0) + 1;
  });
  return counts;
});

const regionLabel = (slug) => {
  const r = regions.value.find((x) => x.slug === slug);
  return r ? r.name : slug;
};

const matchesPricePresets = (price) => {
  if (!activePricePresets.value.length) return true;
  return activePricePresets.value.some((key) => {
    const preset = pricePresets.find((p) => p.key === key);
    if (!preset) return false;
    return price >= preset.min && price <= preset.max;
  });
};

const filteredTrips = computed(() => {
  const query = (searchQuery.value || "").trim().toLowerCase();
  return trips.value.filter((t) => {
    if (
      selectedRegions.value.length &&
      !selectedRegions.value.includes(t.region)
    ) {
      return false;
    }
    if (
      selectedAirlines.value.length &&
      !selectedAirlines.value.includes(t.airline)
    ) {
      return false;
    }
    if (
      selectedDurations.value.length &&
      !selectedDurations.value.includes(t.duration_days)
    ) {
      return false;
    }
    if (
      selectedMonth.value &&
      t.start_date &&
      parseMonthKey(t.start_date) !== selectedMonth.value
    ) {
      return false;
    }
    if (!matchesPricePresets(t.price_idr)) {
      return false;
    }
    if (query) {
      const haystack =
        `${t.title} ${regionLabel(t.region)} ${t.airline}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
});

const sortedTrips = computed(() => {
  const list = [...filteredTrips.value];
  switch (sortBy.value) {
    case "price_low":
      return list.sort((a, b) => a.price_idr - b.price_idr);
    case "price_high":
      return list.sort((a, b) => b.price_idr - a.price_idr);
    case "duration_low":
      return list.sort((a, b) => a.duration_days - b.duration_days);
    case "duration_high":
      return list.sort((a, b) => b.duration_days - a.duration_days);
    case "newest":
    default:
      return list.sort((a, b) =>
        (b.created_at || b.start_date || "").localeCompare(
          a.created_at || a.start_date || "",
        ),
      );
  }
});

const formatPriceShort = (price) => {
  if (!price) return "-";
  const jt = price / 1000000;
  const s = jt.toFixed(jt % 1 === 0 ? 0 : 1).replace(".", ",");
  return `${s} jt`;
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

const toggleDuration = (d) => {
  if (selectedDurations.value.includes(d)) {
    selectedDurations.value = selectedDurations.value.filter((x) => x !== d);
  } else {
    selectedDurations.value = [...selectedDurations.value, d];
  }
};

const togglePricePreset = (key) => {
  if (activePricePresets.value.includes(key)) {
    activePricePresets.value = activePricePresets.value.filter(
      (x) => x !== key,
    );
  } else {
    activePricePresets.value = [...activePricePresets.value, key];
  }
};

const resetFilters = () => {
  selectedRegions.value = [];
  selectedAirlines.value = [];
  selectedDurations.value = [];
  activePricePresets.value = [];
  selectedMonth.value = "";
  searchQuery.value = "";
  sortBy.value = "newest";
};

const applyRegionFromRoute = () => {
  const regionSlug = route.params.slug;
  if (!regionSlug) return;
  if (!selectedRegions.value.includes(regionSlug)) {
    selectedRegions.value = [regionSlug];
  }
};

const placeholderImage =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80";

const normalizeTrip = (t) => {
  const image =
    t.cover_image ||
    t.image ||
    t.galleries?.[0]?.image_path ||
    placeholderImage;
  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    region: t.category?.slug || t.region || "-",
    duration_days: Number(t.duration_days || 0),
    duration_nights: Number(t.duration_nights || 0),
    airline: t.airline_info || t.airline || "",
    price_idr: Number(t.base_price || t.price_idr || 0),
    start_date: t.start_date || null,
    end_date: t.end_date || null,
    seats_available: t.seats_available ?? true,
    created_at: t.created_at || null,
    image,
  };
};

const fetchData = async () => {
  try {
    const [regionsRes, tripsRes] = await Promise.all([
      getInternationalRegions(),
      getInternationalTours(),
    ]);
    regions.value = regionsRes.data.data || [];
    trips.value = (tripsRes.data.data || []).map(normalizeTrip);
  } catch (error) {
    regions.value = dummyInternationalRegions;
    trips.value = dummyInternationalTrips;
  } finally {
    if (locale.value !== "id") {
      try {
        regions.value = await Promise.all(
          (regions.value || []).map(async (r) => ({
            ...r,
            name: r.name ? await autoTranslate(r.name, locale.value) : r.name,
            description: r.description
              ? await autoTranslate(r.description, locale.value)
              : r.description,
          })),
        );

        trips.value = await Promise.all(
          (trips.value || []).map(async (t) => ({
            ...t,
            title: t.title
              ? await autoTranslate(t.title, locale.value)
              : t.title,
          })),
        );
      } catch (e) {}
    }
    applyRegionFromRoute();
  }
};

onMounted(fetchData);
watch(locale, fetchData);

watch(
  () => route.params.slug,
  () => {
    applyRegionFromRoute();
  },
);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
