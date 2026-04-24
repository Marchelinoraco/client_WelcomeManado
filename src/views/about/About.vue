<template>
  <div class="min-h-screen bg-white dark:bg-slate-900">
    <!-- Hero About -->
    <section class="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover" alt="About Hero" />
      <div class="relative z-20 text-center px-4">
        <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic drop-shadow-2xl">{{ $t('about.hero.title1') }} <span class="text-red-500">{{ $t('about.hero.title2') }}</span></h1>
        <p class="text-gray-200 mt-4 text-lg md:text-xl max-w-2xl mx-auto font-light">{{ $t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Mission & Story -->
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 class="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase italic">{{ storyTitleLead }} <span class="text-red-600">{{ storyTitleAccent }}</span></h2>
          <div class="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg about-story-richtext">
            <div v-html="storyParagraphOne"></div>
            <div v-html="storyParagraphTwo"></div>
          </div>
          <div class="mt-10 grid grid-cols-2 gap-8">
            <div class="border-l-4 border-red-600 pl-4">
              <h4 class="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">{{ experienceValue }}</h4>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">{{ experienceLabel }}</p>
            </div>
            <div class="border-l-4 border-red-600 pl-4">
              <h4 class="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">{{ travelersValue }}</h4>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">{{ travelersLabel }}</p>
            </div>
          </div>
        </div>
        <div class="relative">
          <img :src="storyImage" class="rounded-[2rem] shadow-2xl" alt="Travelers" />
          <div class="absolute -bottom-10 -left-10 bg-red-600 p-8 rounded-[2rem] text-white hidden md:block">
            <p class="text-2xl font-black italic uppercase tracking-tighter">{{ storySince }}</p>
            <p class="text-red-100 text-sm font-bold tracking-widest uppercase mt-1">{{ storyPioneering }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-gray-50 dark:bg-slate-800/50 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">{{ $t('about.why.title1') }} <span class="text-red-600">{{ $t('about.why.title2') }}</span></h2>
          <div class="w-20 h-1.5 bg-red-600 mx-auto mt-4"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div v-for="(feature, index) in whyChooseUs" :key="index" class="bg-white dark:bg-slate-800 p-10 rounded-[2rem] shadow-sm hover:shadow-xl dark:shadow-slate-900/50 transition-all group">
            <div class="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <component :is="feature.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('about.why.features.' + feature.key + '.title') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">{{ $t('about.why.features.' + feature.key + '.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- TESTIMONIALS SECTION -->
    <!-- ============================================ -->

    <!-- Customer Quotes Carousel -->
    <section class="py-24 bg-white dark:bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-xs font-black text-red-600 uppercase tracking-[0.3em]">Testimonials</span>
          <h2 class="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic mt-4">
            What Our Customers <span class="text-red-600">Say</span>
          </h2>
          <div class="w-20 h-1.5 bg-red-600 mx-auto mt-4"></div>
        </div>

        <!-- Quote Carousel -->
        <div class="relative max-w-4xl mx-auto">
          <div class="overflow-hidden">
            <transition :name="slideDirection" mode="out-in">
              <div :key="activeQuote" class="text-center px-4 md:px-16">
                <!-- Quote Icon -->
                <div class="flex justify-center mb-8">
                  <div class="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center">
                    <Quote class="w-8 h-8 text-red-600" />
                  </div>
                </div>

                <!-- Stars -->
                <div class="flex justify-center gap-1 mb-6">
                  <Star v-for="s in 5" :key="s" class="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>

                <!-- Quote Text -->
                <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed italic font-light">
                  "{{ testimonials[activeQuote].text }}"
                </p>

                <!-- Author -->
                <div class="mt-10 flex items-center justify-center gap-4">
                  <div class="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-red-200 dark:shadow-red-900/30">
                    {{ testimonials[activeQuote].name.charAt(0) }}
                  </div>
                  <div class="text-left">
                    <p class="font-bold text-gray-900 dark:text-white text-lg">{{ testimonials[activeQuote].name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ testimonials[activeQuote].origin }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Carousel Controls -->
          <div class="flex items-center justify-center gap-3 mt-12">
            <button
              @click="prevQuote"
              class="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>
            <div class="flex gap-2">
              <button
                v-for="(_, idx) in testimonials"
                :key="idx"
                @click="goToQuote(idx)"
                class="w-2.5 h-2.5 rounded-full transition-all duration-500"
                :class="idx === activeQuote ? 'bg-red-600 w-8' : 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400'"
              ></button>
            </div>
            <button
              @click="nextQuote"
              class="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Reviews Section -->
    <section class="py-24 bg-gray-50 dark:bg-slate-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Google Header -->
        <div class="bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-10 shadow-sm dark:shadow-slate-900/30 mb-10">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex items-center gap-6">
              <!-- Google Logo -->
              <div class="flex items-baseline gap-0.5 text-2xl font-bold select-none">
                <span class="text-[#4285F4]">G</span>
                <span class="text-[#EA4335]">o</span>
                <span class="text-[#FBBC05]">o</span>
                <span class="text-[#4285F4]">g</span>
                <span class="text-[#34A853]">l</span>
                <span class="text-[#EA4335]">e</span>
              </div>
              <div>
                <span class="text-xl font-bold text-gray-900 dark:text-white">Reviews</span>
                <div class="flex items-center gap-3 mt-1">
                  <span class="text-3xl font-black text-gray-900 dark:text-white">4.9</span>
                  <div class="flex gap-0.5">
                    <Star v-for="s in 5" :key="s" class="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">(37)</span>
                </div>
              </div>
            </div>
            <a
              href="https://g.page/r/welcomemanado/review"
              target="_blank"
              rel="noopener noreferrer"
              class="px-8 py-4 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 dark:shadow-red-900/30 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              Review us on Google
            </a>
          </div>
        </div>

        <!-- Review Cards -->
        <div class="relative">
          <!-- Scroll Container -->
          <div
            ref="reviewsContainer"
            class="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            <div
              v-for="(review, idx) in googleReviews"
              :key="idx"
              class="min-w-[320px] md:min-w-[380px] max-w-[400px] bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-sm dark:shadow-slate-900/30 hover:shadow-xl transition-all snap-start flex flex-col group"
            >
              <!-- Review Header -->
              <div class="flex items-center gap-4 mb-5">
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-md"
                  :style="{ background: review.color }"
                >
                  {{ review.name.charAt(0) }}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="font-bold text-gray-900 dark:text-white truncate">{{ review.name }}</p>
                    <svg class="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ review.time }}</p>
                </div>
              </div>

              <!-- Stars -->
              <div class="flex gap-0.5 mb-4">
                <Star v-for="s in review.stars" :key="s" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>

              <!-- Review Text -->
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                {{ review.expanded ? review.text : review.text.slice(0, 150) + (review.text.length > 150 ? '...' : '') }}
              </p>
              <button
                v-if="review.text.length > 150"
                @click="review.expanded = !review.expanded"
                class="text-blue-500 text-sm font-medium mt-2 hover:underline self-start"
              >
                {{ review.expanded ? 'Show less' : 'Read more' }}
              </button>

              <!-- Posted on Google -->
              <div class="flex items-center gap-2 mt-6 pt-5 border-t border-gray-100 dark:border-slate-700">
                <svg class="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-400 dark:text-gray-500">Posted on</p>
                  <p class="text-sm font-bold text-blue-600 dark:text-blue-400">Google</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Scroll Buttons -->
          <button
            @click="scrollReviews(-1)"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl dark:shadow-slate-900/50 flex items-center justify-center text-gray-500 hover:text-red-600 transition-all hover:scale-110 active:scale-95 z-10 hidden md:flex border border-gray-100 dark:border-slate-700"
          >
            <ChevronLeft class="w-6 h-6" />
          </button>
          <button
            @click="scrollReviews(1)"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl dark:shadow-slate-900/50 flex items-center justify-center text-gray-500 hover:text-red-600 transition-all hover:scale-110 active:scale-95 z-10 hidden md:flex border border-gray-100 dark:border-slate-700"
          >
            <ChevronRight class="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Compass, ShieldCheck, Users, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { getAboutStorySection } from '@/services/api';

const { t } = useI18n();

const whyChooseUs = [
  { key: 'expert', icon: Compass },
  { key: 'professional', icon: ShieldCheck },
  { key: 'personalized', icon: Users },
];

const storySection = ref(null);
const defaultStoryImage = "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=1000";

const splitLabel = (value = "") => {
  const parts = String(value || "").trim().split(" ");
  return {
    value: parts[0] || "",
    label: parts.slice(1).join(" "),
  };
};

const defaultExperience = computed(() => splitLabel(t('about.story.exp_years')));
const defaultTravelers = computed(() => splitLabel(t('about.story.happy_travelers')));

const storyTitleLead = computed(() => storySection.value?.title_lead || t('about.story.title1'));
const storyTitleAccent = computed(() => storySection.value?.title_accent || t('about.story.title2'));
const storyParagraphOne = computed(() => storySection.value?.paragraph_one || `<p>${t('about.story.p1')}</p>`);
const storyParagraphTwo = computed(() => storySection.value?.paragraph_two || `<p>${t('about.story.p2')}</p>`);
const experienceValue = computed(() => storySection.value?.experience_value || defaultExperience.value.value);
const experienceLabel = computed(() => storySection.value?.experience_label || defaultExperience.value.label);
const travelersValue = computed(() => storySection.value?.travelers_value || defaultTravelers.value.value);
const travelersLabel = computed(() => storySection.value?.travelers_label || defaultTravelers.value.label);
const storySince = computed(() => storySection.value?.since_text || t('about.story.since'));
const storyPioneering = computed(() => storySection.value?.pioneering_text || t('about.story.pioneering'));
const storyImage = computed(() => storySection.value?.image_url || defaultStoryImage);

// ---- Testimonial Quotes Carousel ----
const activeQuote = ref(0);
const slideDirection = ref('slide-left');
let quoteInterval = null;

const testimonials = [
  {
    text: "When I was planned to go to Manado, only one travel in my mind 'Welcome Manado' and so that was go, WM arranged our hotel and land tour at Manado very well.. an excellent service from WM staff, good advise and flexible. I love Manado, esp Bunaken.. a very memorable moment at Manado. Thanks a lot WM, also special thanks to Ms Irene.",
    name: "Rina",
    origin: "Jakarta, Indonesia",
  },
  {
    text: "Terbaik skali.... Makase kak ebi pertama kali urus visa korea langsung approved 🥰😍😍😍🥳🥳🥳 Sukses selalu WM 🥳. Pelayanan ramah, cepat, dan sangat profesional. Recommended banget untuk semua kebutuhan travel!",
    name: "Faith Faith",
    origin: "Manado, Indonesia",
  },
  {
    text: "Sangat puas dengan pelayanan WELCOME MANADO. Kondisi kapal bersih dan terawat, tempat duduk nyaman, crew ramah dan helpful. Snorkeling equipment lengkap dan masih bagus. Lunch box dan welcomedrink juga enak. Pokoknya top deh! Highly recommended!",
    name: "Kasanakamari Sulut",
    origin: "Sulawesi Utara",
  },
  {
    text: "We had an amazing experience with Welcome Manado Tours! The diving at Bunaken was absolutely breathtaking - crystal clear waters and incredible marine life. Our guide was knowledgeable and made us feel safe throughout. Will definitely come back!",
    name: "Kim Joon-Ho",
    origin: "Seoul, South Korea",
  },
  {
    text: "从首尔到美纳多的旅行非常完美。Welcome Manado的服务非常专业，从机场接送到酒店安排，一切都很顺利。布纳肯的潜水体验是一生中最难忘的经历之一！",
    name: "Li Wei",
    origin: "Shanghai, China",
  },
];

const nextQuote = () => {
  slideDirection.value = 'slide-left';
  activeQuote.value = (activeQuote.value + 1) % testimonials.length;
  resetAutoplay();
};

const prevQuote = () => {
  slideDirection.value = 'slide-right';
  activeQuote.value = (activeQuote.value - 1 + testimonials.length) % testimonials.length;
  resetAutoplay();
};

const goToQuote = (idx) => {
  slideDirection.value = idx > activeQuote.value ? 'slide-left' : 'slide-right';
  activeQuote.value = idx;
  resetAutoplay();
};

const startAutoplay = () => {
  quoteInterval = setInterval(() => {
    slideDirection.value = 'slide-left';
    activeQuote.value = (activeQuote.value + 1) % testimonials.length;
  }, 5000);
};

const resetAutoplay = () => {
  clearInterval(quoteInterval);
  startAutoplay();
};

// ---- Google Reviews ----
const reviewsContainer = ref(null);

const googleReviews = reactive([
  {
    name: "Faith Faith",
    time: "26 days ago",
    stars: 5,
    color: "#E91E63",
    text: "Terbaik skali.... Makase kak ebi pertama kali urus visa korea langsung approved 🥰😍😍😍🥳🥳🥳 Sukses selalu WM 🥳. Pelayanan yang sangat memuaskan dan profesional.",
    expanded: false,
  },
  {
    name: "Kasanakamari Sulut",
    time: "1 month ago",
    stars: 5,
    color: "#607D8B",
    text: "Sangat puas dengan pelayanan WELCOME MANADO. Kondisi kapal bersih dan terawat, tempat duduk nyaman, crew ramah dan helpful. Snorkeling equipment lengkap dan masih bagus. Lunch box dan welcomedrink juga enak. Pokoknya top deh!",
    expanded: false,
  },
  {
    name: "Michael Tampi",
    time: "2 months ago",
    stars: 5,
    color: "#4CAF50",
    text: "Best travel agency in Manado! They arranged everything perfectly for our family trip. From Bunaken diving to Tomohon highland tour. The guides are very professional and friendly. Highly recommended!",
    expanded: false,
  },
  {
    name: "Yuri Kim",
    time: "3 months ago",
    stars: 5,
    color: "#9C27B0",
    text: "마나도에서 최고의 여행 경험이었습니다! 부나켄 다이빙은 정말 환상적이었고, 가이드분들이 매우 친절하고 전문적이었습니다. 한국어 통역도 제공해주셔서 의사소통에 전혀 문제가 없었습니다.",
    expanded: false,
  },
  {
    name: "Sarah Johnson",
    time: "3 months ago",
    stars: 5,
    color: "#FF5722",
    text: "Incredible experience! The Lembeh Strait diving was out of this world. Welcome Manado took care of every detail. Our guide knew exactly where to find all the rare macro critters. Can't wait to come back!",
    expanded: false,
  },
  {
    name: "张伟",
    time: "4 months ago",
    stars: 5,
    color: "#2196F3",
    text: "非常满意Welcome Manado的服务！从机场接机到酒店安排，再到每天的行程，一切都安排得井井有条。美纳多的海底世界真的太美了，布纳肯的珊瑚礁让人叹为观止。强烈推荐！",
    expanded: false,
  },
]);

const scrollReviews = (direction) => {
  if (reviewsContainer.value) {
    const scrollAmount = 400;
    reviewsContainer.value.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
};

const fetchStorySection = async () => {
  try {
    const res = await getAboutStorySection();
    storySection.value = res.data?.data || null;
  } catch {
    storySection.value = null;
  }
};

onMounted(() => {
  fetchStorySection();
  startAutoplay();
});

onUnmounted(() => {
  clearInterval(quoteInterval);
});
</script>

<style scoped>
/* Hide scrollbar but keep scroll functionality */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(60px);
}

.about-story-richtext :deep(p) {
  margin: 0;
}

.about-story-richtext :deep(a) {
  color: rgb(220 38 38);
  font-weight: 700;
  text-decoration: underline;
}

.about-story-richtext :deep(ul),
.about-story-richtext :deep(ol) {
  margin: 0;
  padding-left: 1.5rem;
}

.about-story-richtext :deep(li) {
  margin: 0.35rem 0;
}
</style>
