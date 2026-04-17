<template>
  <div class="selection:bg-red-100 selection:text-red-700 font-sans">
    <!-- Hero Section -->
    <header
      class="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      <!-- Premium Background Effects -->
      <div
        class="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/80"
      ></div>
      <div class="absolute inset-0 z-0">
        <transition-group
          name="fade"
          tag="div"
          class="w-full h-full relative bg-slate-900"
        >
          <div
            v-for="(img, index) in heroImages"
            :key="img"
            v-show="currentHeroImageIndex === index"
            class="absolute inset-0 w-full h-full"
          >
            <img
              :src="img"
              class="w-full h-full object-cover opacity-80 scale-110 animate-subtle-zoom"
              :alt="'Manado Hero ' + (index + 1)"
            />
          </div>
        </transition-group>
      </div>

      <!-- Animated Decorative Elements -->
      <div
        class="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse"
      ></div>
      <div
        class="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse delay-1000"
      ></div>

      <div class="relative z-20 text-center px-6 max-w-6xl mx-auto mt-20">
        <div
          class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mb-8 animate-fade-in-up"
        >
          <div class="w-2 h-2 rounded-full bg-red-500 mr-3 animate-ping"></div>
          <span
            class="text-[10px] font-black text-white uppercase tracking-[0.3em]"
            >Premium Travel Experience</span
          >
        </div>

        <h1
          class="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] animate-fade-in-up delay-100"
        >
          {{ $t("hero.title") }} <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
            >{{ $t("hero.subtitle") }}</span
          >
        </h1>

        <p
          class="text-lg md:text-xl text-white/70 mb-14 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-200"
        >
          {{ $t("hero.description") }}
        </p>

        <div
          class="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-300"
        >
          <a
            href="#manado-tours"
            class="group px-10 py-5 bg-red-600 text-white font-black rounded-[2rem] hover:bg-red-700 transition-all shadow-2xl shadow-red-600/30 flex items-center justify-center space-x-3 active:scale-95"
          >
            <span class="uppercase tracking-widest text-xs">{{
              $t("hero.explore")
            }}</span>
            <ArrowRight
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#national-tours"
            class="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 font-black rounded-[2rem] hover:bg-white hover:text-slate-900 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-xs"
          >
            {{ $t("hero.nationalTours") }}
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="bg-slate-50">
      <!-- Section 1: Manado -->
      <section
        id="manado-tours"
        class="pt-24 pb-28 lg:pt-32 lg:pb-44 px-6 lg:px-10 overflow-hidden relative"
      >
        <div class="max-w-7xl mx-auto">
          <div
            class="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10"
          >
            <div class="max-w-2xl">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-1 bg-red-600 rounded-full"></div>
                <span
                  class="text-xs font-black text-red-600 uppercase tracking-[0.4em]"
                  >{{ $t("home.local.badge") }}</span
                >
              </div>
              <h2
                class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6"
              >
                {{ $t("home.local.title1") }} <br />
                <span class="text-red-600">{{ $t("home.local.title2") }}</span>
              </h2>
              <p class="text-slate-500 text-lg font-medium leading-relaxed">
                {{ $t("home.local.description") }}
              </p>
            </div>
            <router-link
              to="/category/manado-city-tour"
              class="group inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95"
            >
              {{ $t("home.local.allPackages") }}
              <ChevronRight
                class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </router-link>
          </div>

          <div
            v-if="loading"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <div
              v-for="i in 3"
              :key="i"
              class="h-[30rem] bg-slate-50 rounded-[2.5rem] animate-pulse"
            ></div>
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <TourCard v-for="tour in localTours" :key="tour.id" :tour="tour" />
          </div>
        </div>
      </section>

      <!-- Why Choose Us Section -->
      <section
        class="py-32 lg:py-56 bg-slate-50 px-6 lg:px-10 overflow-hidden relative"
      >
        <!-- Background Patterns -->
        <div
          class="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
          style="
            background-image: radial-gradient(#2563eb 1px, transparent 1px);
            background-size: 40px 40px;
          "
        ></div>

        <div class="max-w-7xl mx-auto relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <!-- Left: Text Content -->
            <div class="lg:col-span-5">
              <div
                class="inline-flex items-center px-4 py-1.5 bg-red-50 text-red-600 rounded-full mb-8"
              >
                <ShieldCheck class="w-4 h-4 mr-2" />
                <span
                  class="text-[10px] font-black uppercase tracking-[0.2em]"
                  >{{ $t("home.whychooseus.badge") }}</span
                >
              </div>
              <h2
                class="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.9] uppercase"
              >
                {{ $t("home.whychooseus.title1") }} <br />
                <span class="text-red-600 italic">{{
                  $t("home.whychooseus.title2")
                }}</span>
              </h2>
              <p
                class="text-slate-500 text-xl font-medium leading-relaxed mb-12"
              >
                {{ $t("home.whychooseus.description") }}
              </p>
              <div class="flex items-center space-x-6">
                <div class="flex -space-x-4">
                  <img
                    v-for="i in 4"
                    :key="i"
                    :src="`https://i.pravatar.cc/100?img=${i + 10}`"
                    class="w-12 h-12 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <p
                  class="text-sm font-bold text-slate-900"
                  v-html="$t('home.whychooseus.happyTravelers')"
                ></p>
              </div>
            </div>

            <!-- Right: Feature Cards -->
            <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(feature, idx) in features"
                :key="idx"
                class="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] group hover:-translate-y-2 transition-all duration-700 border border-slate-100/50 flex flex-col items-start"
                :class="idx === 1 ? 'md:translate-y-12' : ''"
              >
                <div
                  class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:rotate-[15deg] transition-all duration-700 ease-spring"
                >
                  <component
                    :is="feature.icon"
                    class="w-8 h-8 text-red-600 group-hover:text-white transition-colors"
                  />
                </div>
                <h3
                  class="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase"
                >
                  {{ feature.title }}
                </h3>
                <p class="text-slate-500 font-medium leading-relaxed text-sm">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: National - Premium Dark Section -->
      <section
        id="national-tours"
        class="bg-slate-900 py-32 lg:py-48 px-6 lg:px-10 relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 w-1/2 h-full bg-red-600/10 blur-[150px] rounded-full -mr-32 -mt-32"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-1/2 h-full bg-red-600/5 blur-[150px] rounded-full -ml-32 -mb-32"
        ></div>

        <div class="max-w-7xl mx-auto relative z-10">
          <div
            class="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10"
          >
            <div class="max-w-2xl">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-1 bg-red-500 rounded-full"></div>
                <span
                  class="text-xs font-black text-red-400 uppercase tracking-[0.4em]"
                  >{{ $t("home.national.badge") }}</span
                >
              </div>
              <h2
                class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 uppercase"
              >
                {{ $t("home.national.title1") }} <br />
                <span class="text-red-500 italic">{{
                  $t("home.national.title2")
                }}</span>
              </h2>
              <p class="text-white/60 text-lg font-medium leading-relaxed">
                {{ $t("home.national.description") }}
              </p>
            </div>
            <router-link
              to="/nasional/bali-lombok"
              class="group inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              {{ $t("home.national.exploreArchipelago") }}
              <ChevronRight
                class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </router-link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TourCard
              v-for="tour in nationalTours"
              :key="tour.id"
              :tour="tour"
              detailBasePath="/nasional/tour"
            />
          </div>
        </div>
      </section>

      <!-- Section 3: International -->
      <section id="international-tours" class="py-32 lg:py-48 px-6 lg:px-10">
        <div class="max-w-7xl mx-auto">
          <div
            class="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10"
          >
            <div class="max-w-2xl">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-1 bg-slate-900 rounded-full"></div>
                <span
                  class="text-xs font-black text-slate-400 uppercase tracking-[0.4em]"
                  >{{ $t("home.international.badge") }}</span
                >
              </div>
              <h2
                class="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6"
              >
                {{ $t("home.international.title1") }} <br />
                <span
                  class="text-red-600 underline decoration-4 underline-offset-8"
                  >{{ $t("home.international.title2") }}</span
                >
              </h2>
              <p class="text-slate-500 text-lg font-medium leading-relaxed">
                {{ $t("home.international.description") }}
              </p>
            </div>
            <router-link
              to="/internasional"
              class="group inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95"
            >
              {{ $t("home.international.goInternational") }}
              <ChevronRight
                class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </router-link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TourCard
              v-for="tour in internationalTours"
              :key="tour.id"
              :tour="tour"
              detailBasePath="/internasional/tour"
            />
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="pb-32 px-6 lg:px-10">
        <div
          class="max-w-7xl mx-auto bg-red-600 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-red-600/40"
        >
          <div class="relative z-10">
            <h2
              class="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-tight"
              v-html="$t('home.cta.title')"
            ></h2>
            <p class="text-red-100 text-lg font-medium mb-12 max-w-xl mx-auto">
              {{ $t("home.cta.description") }}
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-6">
              <router-link
                to="/contact"
                class="px-12 py-5 bg-white text-red-600 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-xl uppercase tracking-widest text-xs"
              >
                {{ $t("home.cta.bookNow") }}
              </router-link>
              <a
                href="https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20paket%20tour."
                target="_blank"
                class="px-12 py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 uppercase tracking-widest text-xs flex items-center justify-center"
              >
                <MessageCircle class="w-5 h-5 mr-2" />
                {{ $t("home.cta.chatWA") }}
              </a>
            </div>
          </div>
          <Palmtree
            class="absolute -right-20 -bottom-20 w-80 h-80 text-white/10 rotate-12"
          />
          <Globe
            class="absolute -left-20 -top-20 w-64 h-64 text-white/5 -rotate-12"
          />
        </div>
      </section>

      <!-- Floating WhatsApp Button -->
      <a
        href="https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20ingin%20bertanya%20tentang%20paket%20tour."
        target="_blank"
        class="fixed bottom-10 right-10 z-[99] w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-600/40 hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-slow"
        title="Chat on WhatsApp"
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
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import TourCard from "@/components/TourCard.vue";
import { getTours } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { stripHtml } from "@/utils/htmlText";
import {
  ArrowRight,
  ChevronRight,
  Palmtree,
  Globe,
  MessageCircle,
  ShieldCheck,
  Users,
  Calendar,
  Award,
  Zap,
  Star,
  Clock,
} from "lucide-vue-next";

const stats = [
  { label: "Happy Travelers", value: "10K+", icon: Users },
  { label: "Destinations", value: "50+", icon: Globe },
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "Tour Guides", value: "25+", icon: Palmtree },
];

const { locale, t } = useI18n();

const features = computed(() => [
  {
    title: t("home.whychooseus.features.instantBooking.title"),
    description: t("home.whychooseus.features.instantBooking.description"),
    icon: Zap,
  },
  {
    title: t("home.whychooseus.features.bestPrice.title"),
    description: t("home.whychooseus.features.bestPrice.description"),
    icon: Star,
  },
  {
    title: t("home.whychooseus.features.support.title"),
    description: t("home.whychooseus.features.support.description"),
    icon: Clock,
  },
]);
const tours = ref({
  local: [],
  national: [],
  international: [],
});
const loading = ref(true);

// === Hero Carousel Logic ===
const currentHeroImageIndex = ref(0);
let heroCarouselInterval = null;

// Ganti URL gambar di bawah ini dengan gambar asli (Tarsius, Bunaken, Yesus Memberkati, dll).
// Saat ini saya cantumkan sebagai gambaran (proxy).
const heroImages = [
  "https://live.staticflickr.com/1952/30570720147_cd23c2b225_h.jpg", // Simbol Manado Proxy
  "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=2400", // Proxy Tarsius / Macaque (Tangkoko)
  "https://asset.kompas.com/crops/JKmVlp4tEmfKRlPM3q28A4uEimc=/0x27:1000x693/1200x800/data/photo/2020/04/20/5e9d07ee9089f.jpg", // Manado City / Sea
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2400", // Bunaken / Coral Reef
  "https://ik.imagekit.io/tvlk/blog/2024/08/shutterstock_1814394446.jpg?tr=q-70,c-at_max,w-1000,h-600", // Danau Linow Proxy / Landscape
];

const localTours = computed(() => tours.value.local?.slice(0, 3) || []);
const nationalTours = computed(() => tours.value.national?.slice(0, 3) || []);
const internationalTours = computed(
  () => tours.value.international?.slice(0, 3) || [],
);

const fetchTours = async () => {
  loading.value = true;
  try {
    const response = await getTours();
    const rawData = response.data.data;

    if (locale.value !== "id") {
      // Translate all categories
      const translatedData = {};
      for (const category in rawData) {
        translatedData[category] = await Promise.all(
          rawData[category].map(async (tour) => {
            const [translatedTitle, translatedDescription] = await Promise.all([
              autoTranslate(tour.title, locale.value),
              autoTranslate(stripHtml(tour.description), locale.value),
            ]);
            return {
              ...tour,
              title: translatedTitle,
              description: translatedDescription,
            };
          }),
        );
      }
      tours.value = translatedData;
    } else {
      tours.value = rawData;
    }
  } catch (error) {
    console.error("Error fetching tours:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTours();

  // Memulai slideshow ganti gambar hero setiap 5 detik
  heroCarouselInterval = setInterval(() => {
    currentHeroImageIndex.value =
      (currentHeroImageIndex.value + 1) % heroImages.length;
  }, 5000);
});

onUnmounted(() => {
  if (heroCarouselInterval) clearInterval(heroCarouselInterval);
});

watch(locale, fetchTours);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes subtle-zoom {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}
.animate-subtle-zoom {
  animation: subtle-zoom 20s ease-out forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
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
