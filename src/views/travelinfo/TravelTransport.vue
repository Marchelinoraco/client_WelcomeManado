<template>
  <div
    class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50"
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
          src="https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=2400&q=80"
          class="w-full h-full object-cover opacity-30"
          alt="Manado Guide"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
        ></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div
          class="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20"
        >
          <Compass class="w-4 h-4 text-red-400" />
          <span
            class="text-xs font-black text-white uppercase tracking-[0.3em]"
            >{{ $t("transport.hero.badge") }}</span
          >
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
        >
          {{ $t("transport.hero.title1") }}
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
            >{{ $t("transport.hero.title2") }}</span
          >
        </h1>
        <p
          class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          {{ $t("transport.hero.description") }}
        </p>
      </div>
    </header>

    <!-- Content Section -->
    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div class="mb-12 text-center max-w-3xl mx-auto">
        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur border border-slate-200 shadow-sm"
        >
          <Car class="w-4 h-4 text-red-600" />
          <span
            class="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]"
          >
            {{ $t("transport.rentalBadge") }}
          </span>
        </div>
        <h2
          class="mt-6 text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
        >
          {{ $t("transport.rentalSection.title") }}
        </h2>
        <p class="mt-4 text-slate-600 font-medium leading-relaxed">
          {{ $t("transport.rentalSection.description") }}
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <div class="h-px w-10 bg-slate-200"></div>
          <div
            class="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
          ></div>
          <div class="h-px w-10 bg-slate-200"></div>
        </div>
      </div>

      <div
        class="relative rounded-[2.5rem] border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)] overflow-hidden"
      >
        <div class="absolute inset-0 -z-10">
          <div
            class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
          ></div>
          <div
            class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-900/5 blur-3xl"
          ></div>
        </div>

        <div class="p-6 lg:p-8 border-b border-slate-200/60 bg-white/40">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div class="lg:col-span-6">
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"
                >
                  <Search
                    class="w-5 h-5 text-slate-400 group-focus-within:text-red-600 transition-colors"
                  />
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="$t('transport.rentalSection.searchPlaceholder')"
                  class="w-full pl-12 pr-5 py-4 bg-white/70 border border-slate-200/70 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-200 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                />
              </div>
            </div>
            <div class="lg:col-span-6 flex flex-wrap gap-2 lg:justify-end">
              <button
                v-for="opt in availabilityOptions"
                :key="opt.key"
                type="button"
                class="h-11 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all"
                :class="
                  selectedAvailability === opt.key
                    ? 'bg-gradient-to-r from-red-500 to-red-700 text-white border-transparent shadow-lg shadow-red-600/20'
                    : 'bg-white/70 text-slate-700 border-slate-200/70 hover:bg-white'
                "
                @click="selectedAvailability = opt.key"
              >
                <span class="flex items-center gap-2">
                  <span>{{ opt.label }}</span>
                  <span
                    class="h-6 px-2 rounded-xl text-[10px] font-black tracking-widest"
                    :class="
                      selectedAvailability === opt.key
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    "
                  >
                    {{ availabilityCount(opt.key) }}
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between gap-4">
            <div class="text-xs font-bold text-slate-500">
              {{
                $t("transport.rentalSection.showing", {
                  count: filteredTransportations.length,
                })
              }}
            </div>
          </div>
        </div>

        <div v-if="loading" class="p-8">
          <div class="space-y-4">
            <div
              v-for="i in 6"
              :key="i"
              class="animate-pulse flex items-center gap-4"
            >
              <div class="w-16 h-16 rounded-2xl bg-slate-100"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 w-60 bg-slate-100 rounded-xl"></div>
                <div class="h-3 w-40 bg-slate-100 rounded-xl"></div>
              </div>
              <div class="h-10 w-28 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        </div>

        <div v-else-if="errorMessage" class="p-10 text-center">
          <h2 class="text-xl font-black text-slate-900">
            {{ $t("transport.rentalSection.loadErrorTitle") }}
          </h2>
          <p class="text-slate-500 font-bold mt-3">{{ errorMessage }}</p>
          <div class="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              class="h-11 px-6 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
              @click="fetchTransportations"
            >
              {{ $t("transport.rentalSection.retry") }}
            </button>
          </div>
        </div>

        <div
          v-else-if="filteredTransportations.length === 0"
          class="p-12 text-center"
        >
          <h3 class="text-2xl font-black text-slate-900">
            {{ $t("transport.rentalSection.emptyTitle") }}
          </h3>
          <p class="text-slate-500 font-bold mt-2">
            {{ $t("transport.rentalSection.emptyDescription") }}
          </p>
        </div>

        <div v-else class="p-6 lg:p-8">
          <div
            class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
          >
            <article
              v-for="v in filteredTransportations"
              :key="v.id"
              class="group bg-white/90 rounded-[2rem] border border-slate-200/70 shadow-sm hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div class="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  :src="transportationImage(v)"
                  :alt="v.name"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent"
                ></div>
                <div class="absolute top-4 left-4">
                  <span
                    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border backdrop-blur"
                    :class="
                      v.available
                        ? 'bg-emerald-500/15 text-emerald-50 border-emerald-400/30'
                        : 'bg-red-500/15 text-red-50 border-red-400/30'
                    "
                  >
                    <span
                      class="h-2 w-2 rounded-full"
                      :class="v.available ? 'bg-emerald-300' : 'bg-red-300'"
                    ></span>
                    {{
                      v.available
                        ? $t("transport.rentalSection.availability.available")
                        : $t("transport.rentalSection.availability.unavailable")
                    }}
                  </span>
                </div>
                <div
                  class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4"
                >
                  <div class="min-w-0">
                    <div class="text-white text-lg font-black truncate">
                      {{ v.name }}
                    </div>
                    <div class="text-white/80 text-xs font-bold truncate">
                      {{ v.type || "-" }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-6 flex-1 flex flex-col">
                <p
                  class="text-slate-600 font-semibold leading-relaxed line-clamp-3"
                >
                  {{ transportationDescription(v) || "-" }}
                </p>

                <div class="mt-auto pt-6">
                  <button
                    type="button"
                    class="w-full h-12 rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-60"
                    :class="
                      v.available
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-[0.99]'
                        : 'bg-slate-200 text-slate-500'
                    "
                    :disabled="!v.available"
                    @click="openBooking(v)"
                  >
                    {{ $t("transport.rentalSection.bookButton") }}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div
        v-if="isBookingOpen"
        class="fixed inset-0 z-50 flex items-center justify-center px-6"
      >
        <div
          class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          @click="closeBooking"
        ></div>

        <div
          class="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200/70 overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <div class="lg:col-span-2 bg-slate-900">
              <div class="relative h-full">
                <img
                  v-if="selectedTransportation"
                  :src="transportationImage(selectedTransportation)"
                  :alt="selectedTransportation?.name"
                  class="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"
                ></div>
                <div class="relative p-8 h-full flex flex-col justify-end">
                  <div
                    class="text-[10px] font-black uppercase tracking-[0.3em] text-white/70"
                  >
                    {{ $t("transport.booking.title") }}
                  </div>
                  <div class="mt-2 text-2xl font-black text-white">
                    {{ selectedTransportation?.name }}
                  </div>
                  <div class="mt-2 text-white/80 font-semibold">
                    {{ selectedTransportation?.type || "-" }}
                  </div>
                  <div class="mt-5">
                    <span
                      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border backdrop-blur"
                      :class="
                        selectedTransportation?.available
                          ? 'bg-emerald-500/15 text-emerald-50 border-emerald-400/30'
                          : 'bg-red-500/15 text-red-50 border-red-400/30'
                      "
                    >
                      <span
                        class="h-2 w-2 rounded-full"
                        :class="
                          selectedTransportation?.available
                            ? 'bg-emerald-300'
                            : 'bg-red-300'
                        "
                      ></span>
                      {{
                        selectedTransportation?.available
                          ? $t("transport.rentalSection.availability.available")
                          : $t(
                              "transport.rentalSection.availability.unavailable",
                            )
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-3">
              <div class="p-8 border-b border-slate-200/70">
                <div class="flex items-start justify-between gap-6">
                  <div class="min-w-0">
                    <div
                      class="text-xs font-black text-slate-400 uppercase tracking-[0.25em]"
                    >
                      {{ $t("transport.booking.subtitle") }}
                    </div>
                    <h3 class="text-2xl font-black text-slate-900 mt-2">
                      {{ $t("transport.booking.formTitle") }}
                    </h3>
                    <p class="text-slate-500 font-semibold mt-2">
                      {{ $t("transport.booking.helpText") }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="h-10 w-10 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-black"
                    @click="closeBooking"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div class="p-8 space-y-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1"
                      >{{ $t("transport.booking.customerName") }}</label
                    >
                    <div class="relative group">
                      <div
                        class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"
                      >
                        <User
                          class="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                        />
                      </div>
                      <input
                        v-model="bookingForm.customer_name"
                        type="text"
                        class="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-200 outline-none font-semibold text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1"
                      >{{ $t("transport.booking.customerWhatsapp") }}</label
                    >
                    <div class="relative group">
                      <div
                        class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"
                      >
                        <Phone
                          class="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                        />
                      </div>
                      <input
                        v-model="bookingForm.customer_phone"
                        type="tel"
                        class="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-200 outline-none font-semibold text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1"
                      >{{ $t("transport.booking.rentalDate") }}</label
                    >
                    <div class="relative group">
                      <div
                        class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"
                      >
                        <CalendarDays
                          class="w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                        />
                      </div>
                      <input
                        v-model="bookingForm.booking_date"
                        type="date"
                        class="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-200 outline-none font-semibold text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1"
                      >{{ $t("transport.booking.summary") }}</label
                    >
                    <div
                      class="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 font-semibold text-slate-700 space-y-1"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <span class="text-slate-500 font-bold text-xs">{{
                          $t("transport.booking.vehicle")
                        }}</span>
                        <span class="font-black text-slate-900 truncate">
                          {{ selectedTransportation?.name }}
                        </span>
                      </div>
                      <div class="flex items-center justify-between gap-3">
                        <span class="text-slate-500 font-bold text-xs">{{
                          $t("transport.booking.type")
                        }}</span>
                        <span class="font-black text-slate-900 truncate">
                          {{ selectedTransportation?.type || "-" }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1"
                    >{{ $t("transport.booking.notesOptional") }}</label
                  >
                  <textarea
                    v-model="bookingForm.notes"
                    rows="4"
                    class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-200 outline-none font-semibold text-slate-700"
                  ></textarea>
                </div>
              </div>

              <div
                class="p-8 border-t border-slate-200/70 flex flex-col lg:flex-row gap-3 lg:justify-end"
              >
                <button
                  type="button"
                  class="h-12 px-6 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                  @click="closeBooking"
                >
                  {{ $t("transport.booking.cancel") }}
                </button>
                <button
                  type="button"
                  class="h-12 px-6 rounded-2xl bg-emerald-600 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors disabled:opacity-60 shadow-lg shadow-emerald-600/20"
                  :disabled="bookingSubmitting || !canSubmitBooking"
                  @click="submitBookingAndOpenWhatsApp"
                >
                  {{ $t("transport.booking.sendWhatsapp") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 lg:mt-24 mb-12 text-center max-w-3xl mx-auto">
        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur border border-slate-200 shadow-sm"
        >
          <Map class="w-4 h-4 text-red-600" />
          <span
            class="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]"
          >
            {{ $t("transport.section.badge") }}
          </span>
        </div>
        <h2
          class="mt-6 text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
        >
          {{ $t("transport.section.title") }}
        </h2>
        <div class="mt-8 flex items-center justify-center gap-3">
          <div class="h-px w-10 bg-slate-200"></div>
          <div
            class="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
          ></div>
          <div class="h-px w-10 bg-slate-200"></div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <!-- Destination Card -->
        <article
          v-for="(dest, index) in transportDestinations"
          :key="index"
          class="group bg-white/90 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-red-900/10 transition-all duration-500 border border-slate-200/70 flex flex-col items-start text-left"
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-red-50 to-white rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-red-100"
          >
            <Map class="w-6 h-6 text-red-600" />
          </div>

          <h3
            class="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-red-600 transition-colors"
          >
            {{ $t("transport.items." + dest.key) }}
          </h3>

          <p
            class="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-4"
          >
            {{ $t("transport.items." + dest.key + "_desc") }}
          </p>

          <div
            class="mt-auto w-full flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-red-100 transition-colors"
          >
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-red-600 transition-colors"
              >{{ $t("transport.items.explore") }}</span
            >
            <div
              class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <ArrowRight
                class="w-4 h-4 text-slate-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300"
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  Compass,
  Map,
  ArrowRight,
  Search,
  Car,
  User,
  Phone,
  CalendarDays,
} from "lucide-vue-next";
import { transportDestinations } from "@/data/manadoTransport";
import {
  createTransportationBooking,
  getTransportations,
} from "@/services/api";

const { t, locale } = useI18n();

const transportations = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const selectedAvailability = ref("all");

const isBookingOpen = ref(false);
const selectedTransportation = ref(null);
const bookingSubmitting = ref(false);
const bookingForm = ref({
  customer_name: "",
  customer_phone: "",
  booking_date: "",
  notes: "",
});

const availabilityOptions = computed(() => [
  { key: "all", label: t("transport.rentalSection.filters.all") },
  { key: "available", label: t("transport.rentalSection.filters.available") },
  {
    key: "unavailable",
    label: t("transport.rentalSection.filters.unavailable"),
  },
]);

const fetchTransportations = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const params = {};
    if (searchQuery.value.trim()) params.q = searchQuery.value.trim();
    if (selectedAvailability.value === "available") params.available = true;
    if (selectedAvailability.value === "unavailable") params.available = false;

    const res = await getTransportations(params);
    const data = Array.isArray(res.data?.data?.data)
      ? res.data.data.data
      : res.data?.data || [];
    transportations.value = data;
  } catch (e) {
    transportations.value = [];
    errorMessage.value =
      e?.message || t("transport.rentalSection.genericLoadError");
  } finally {
    loading.value = false;
  }
};

const filteredTransportations = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return transportations.value
    .filter((v) => {
      if (!q) return true;
      return (
        String(v.name || "")
          .toLowerCase()
          .includes(q) ||
        String(v.type || "")
          .toLowerCase()
          .includes(q)
      );
    })
    .filter((v) => {
      if (selectedAvailability.value === "available")
        return Boolean(v.available);
      if (selectedAvailability.value === "unavailable")
        return !Boolean(v.available);
      return true;
    });
});

const searchedTransportations = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return transportations.value.filter((v) => {
    if (!q) return true;
    return (
      String(v.name || "")
        .toLowerCase()
        .includes(q) ||
      String(v.type || "")
        .toLowerCase()
        .includes(q)
    );
  });
});

const availabilityCount = (key) => {
  const list = searchedTransportations.value;
  if (key === "available")
    return list.filter((v) => Boolean(v.available)).length;
  if (key === "unavailable")
    return list.filter((v) => !Boolean(v.available)).length;
  return list.length;
};

const formatIdr = (value) => {
  const n = typeof value === "number" ? value : Number(value || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
};

const transportationImage = (v) => {
  const url = String(v?.image_url || "").trim();
  if (url) return url;
  const seed = encodeURIComponent(
    `${v?.name || "car"} ${v?.type || ""}`.trim(),
  );
  return `https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80&sig=${seed}`;
};

const transportationDescription = (v) => {
  const loc = String(locale.value || "id").toLowerCase();
  if (loc.startsWith("en")) return v?.description_en || v?.description || "";
  if (loc.startsWith("ko")) return v?.description_ko || v?.description || "";
  if (loc.startsWith("zh")) return v?.description_zh || v?.description || "";
  return v?.description || "";
};

const normalizeWhatsappNumber = (raw) => {
  const s = String(raw || "").trim();
  if (!s) return "";
  return s.replace(/[^\d]/g, "");
};

const buildWhatsappText = ({ bookingId }) => {
  const v = selectedTransportation.value;
  const date = bookingForm.value.booking_date;
  const lines = [
    t("transport.whatsapp.intro"),
    "",
    `${t("transport.whatsapp.customerName")}: ${bookingForm.value.customer_name}`,
    `${t("transport.whatsapp.customerWhatsapp")}: ${bookingForm.value.customer_phone || "-"}`,
    `${t("transport.whatsapp.rentalDate")}: ${date || "-"}`,
    "",
    `${t("transport.whatsapp.vehicle")}: ${v?.name || "-"}`,
    `${t("transport.whatsapp.type")}: ${v?.type || "-"}`,
    `${t("transport.whatsapp.availability")}: ${
      v?.available
        ? t("transport.rentalSection.availability.available")
        : t("transport.rentalSection.availability.unavailable")
    }`,
  ];

  if (bookingForm.value.notes?.trim()) {
    lines.push(
      "",
      `${t("transport.whatsapp.notes")}: ${bookingForm.value.notes.trim()}`,
    );
  }

  if (bookingId) {
    lines.push("", `${t("transport.whatsapp.bookingId")}: ${bookingId}`);
  }

  return lines.join("\n");
};

const openBooking = (v) => {
  selectedTransportation.value = v;
  bookingForm.value = {
    customer_name: "",
    customer_phone: "",
    booking_date: "",
    notes: "",
  };
  isBookingOpen.value = true;
};

const canSubmitBooking = computed(() => {
  if (bookingSubmitting.value) return false;
  if (!selectedTransportation.value?.id) return false;
  if (!selectedTransportation.value?.available) return false;
  if (!bookingForm.value.customer_name.trim()) return false;
  if (!bookingForm.value.booking_date) return false;
  return true;
});

const closeBooking = () => {
  isBookingOpen.value = false;
  selectedTransportation.value = null;
};

const submitBookingAndOpenWhatsApp = async () => {
  if (!selectedTransportation.value?.id) return;
  if (!bookingForm.value.customer_name.trim()) return;
  if (!bookingForm.value.booking_date) return;

  bookingSubmitting.value = true;
  try {
    const payload = {
      transportation_id: selectedTransportation.value.id,
      customer_name: bookingForm.value.customer_name.trim(),
      customer_phone: bookingForm.value.customer_phone.trim() || null,
      booking_date: bookingForm.value.booking_date,
      notes: bookingForm.value.notes?.trim() || null,
    };

    const res = await createTransportationBooking(payload);
    const bookingId = res.data?.data?.id;

    const number = normalizeWhatsappNumber(
      import.meta.env.VITE_WHATSAPP_NUMBER,
    );
    const text = buildWhatsappText({ bookingId });
    const url = number
      ? `https://wa.me/${number}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
    closeBooking();
  } catch (e) {
    const number = normalizeWhatsappNumber(
      import.meta.env.VITE_WHATSAPP_NUMBER,
    );
    const text = buildWhatsappText({ bookingId: null });
    const url = number
      ? `https://wa.me/${number}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  } finally {
    bookingSubmitting.value = false;
  }
};

let searchTimer = null;
watch([searchQuery, selectedAvailability], () => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => fetchTransportations(), 250);
});

onMounted(fetchTransportations);
</script>
