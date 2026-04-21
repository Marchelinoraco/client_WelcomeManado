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
          class="text-6xl md:text-8xl lg:text-[7rem] font-black text-white mb-8 tracking-tighter leading-[0.85] animate-fade-in-up delay-100"
        >
          {{ $t("hero.title") }} <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 drop-shadow-lg"
            >{{ $t("hero.subtitle") }}</span
          >
        </h1>

        <p
          class="text-lg md:text-2xl text-white/80 mb-14 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-200"
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
        class="pt-24 pb-28 lg:pt-32 lg:pb-44 px-6 lg:px-10 overflow-hidden relative reveal-element"
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
        class="py-32 lg:py-56 bg-slate-50 px-6 lg:px-10 overflow-hidden relative reveal-element"
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
                class="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.9] uppercase"
              >
                {{ $t("home.whychooseus.title1") }} <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 italic">{{
                  $t("home.whychooseus.title2")
                }}</span>
              </h2>
              <p
                class="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-12"
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

            <!-- Right: Feature Cards (Bento Grid) -->
            <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 lg:mt-0">
              <div
                v-for="(feature, idx) in features"
                :key="idx"
                class="rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/30 group hover:-translate-y-2 transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col items-start relative overflow-hidden h-full"
                :class="idx === 0 ? 'md:col-span-2 bg-gradient-to-br from-red-600 via-red-700 to-red-900 min-h-[300px]' : 'bg-white dark:bg-slate-800'"
              >
                <!-- Decorative element for first card -->
                <div v-if="idx === 0" class="absolute -right-10 -bottom-10 opacity-10 mix-blend-overlay pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                  <component :is="feature.icon" class="w-64 h-64" />
                </div>
                
                <div
                  class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 relative z-10"
                  :class="idx === 0 ? 'bg-white/20 text-white backdrop-blur-sm group-hover:bg-white group-hover:text-red-600 group-hover:rotate-12 shadow-lg' : 'bg-red-50 dark:bg-red-900/20 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-[15deg]'"
                >
                  <component
                    :is="feature.icon"
                    class="w-8 h-8 transition-colors"
                  />
                </div>
                
                <h3
                  class="text-2xl md:text-3xl font-black mb-4 tracking-tight uppercase relative z-10"
                  :class="idx === 0 ? 'text-white drop-shadow-md' : 'text-slate-900 dark:text-white'"
                >
                  {{ feature.title }}
                </h3>
                
                <p class="font-medium leading-relaxed text-sm md:text-base relative z-10"
                   :class="idx === 0 ? 'text-red-100 max-w-lg' : 'text-slate-500 dark:text-slate-400'"
                >
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
        class="bg-slate-900 py-32 lg:py-48 px-6 lg:px-10 relative overflow-hidden reveal-element"
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
      <section id="international-tours" class="py-32 lg:py-48 px-6 lg:px-10 reveal-element">
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

      <!-- Google Reviews & TripAdvisor Section -->
      <section class="py-24 bg-slate-50 dark:bg-slate-800/50 reveal-element">
        <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <!-- Header block: Google & TA -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            <!-- Google Review Card -->
            <div class="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-8 transform hover:-translate-y-2 transition-all duration-500 border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group">
              <!-- Animated Background Glow -->
              <div class="absolute -inset-20 bg-blue-50 dark:bg-blue-900/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <!-- Google Logo & Score -->
              <div class="flex flex-col items-center md:items-start gap-4 relative z-10 w-full">
                <div class="flex items-baseline gap-0.5 text-4xl font-bold select-none mb-2">
                  <span class="text-[#4285F4]">G</span>
                  <span class="text-[#EA4335]">o</span>
                  <span class="text-[#FBBC05]">o</span>
                  <span class="text-[#4285F4]">g</span>
                  <span class="text-[#34A853]">l</span>
                  <span class="text-[#EA4335]">e</span>
                </div>
                <div class="flex flex-col items-center md:items-start">
                  <span class="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{{ $t("home.reviews.title") }}</span>
                  <div class="flex items-center gap-3 mt-2">
                    <span class="text-4xl font-black text-slate-900 dark:text-white">4.9</span>
                    <div class="flex gap-1">
                      <Star v-for="s in 5" :key="s" class="w-6 h-6 text-[#FBBC05] fill-[#FBBC05]" />
                    </div>
                  </div>
                  <span class="text-slate-500 text-sm font-bold mt-1 tracking-widest uppercase">(37 {{ $t("home.reviews.ratings") }})</span>
                </div>
              </div>
              
              <a
                href="https://g.page/r/welcomemanado/review"
                target="_blank"
                rel="noopener noreferrer"
                class="px-8 py-4 bg-white dark:bg-slate-900 text-[#4285F4] border-2 border-[#4285F4]/20 hover:border-[#4285F4] font-black uppercase tracking-widest rounded-2xl hover:bg-[#4285F4] hover:text-white transition-all shadow-lg active:scale-95 whitespace-nowrap relative z-10"
              >
                {{ $t("home.reviews.reviewUs") }}
              </a>
            </div>

            <!-- TripAdvisor Widget Card -->
            <div class="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/40 flex flex-col items-center justify-center transform hover:-translate-y-2 transition-all duration-500 border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group">
              <!-- Animated Background Glow -->
              <div class="absolute -inset-20 bg-green-50 dark:bg-green-900/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <span class="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 relative z-10">{{ $t("home.reviews.tripadvisorBadge") }}</span>
              
              <div class="relative z-10 transform transition-transform duration-500 group-hover:scale-105" id="TA_excellent588" style="min-height: 100px;">
                <ul id="H6kFP8sS" class="TA_links T23CqtiXc7Qf text-center w-full flex justify-center">
                  <li id="fbQpxWJwrV" class="d23e9X">
                    <a target="_blank" href="https://www.tripadvisor.co.id/Attraction_Review-g297721-d34101092-Reviews-Welcome_Manado-Manado_North_Sulawesi_Sulawesi.html">
                      <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" class="widEXCIMG" id="CDSWIDEXCLOGO"/>
                    </a>
                  </li>
                </ul>
              </div>
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
                class="min-w-[320px] md:min-w-[380px] max-w-[400px] bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-sm dark:shadow-slate-900/30 hover:shadow-xl transition-all snap-start flex flex-col group border border-slate-100 dark:border-slate-800"
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
                      <p class="font-bold text-slate-900 dark:text-white truncate">{{ review.name }}</p>
                      <svg class="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <p class="text-xs text-slate-400">{{ review.time }}</p>
                  </div>
                </div>

                <!-- Stars -->
                <div class="flex gap-0.5 mb-4">
                  <Star v-for="s in review.stars" :key="s" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>

                <!-- Review Text -->
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1">
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
                <div class="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
                  <svg class="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                  </svg>
                  <div>
                    <p class="text-xs text-slate-400">Posted on</p>
                    <p class="text-sm font-bold text-blue-600 dark:text-blue-400">Google</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scroll Buttons -->
            <button
              @click="scrollReviews(-1)"
              class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl dark:shadow-slate-900/50 flex items-center justify-center text-slate-500 hover:text-red-600 transition-all hover:scale-110 active:scale-95 z-10 hidden md:flex border border-slate-100 dark:border-slate-700"
            >
              <ChevronLeft class="w-6 h-6" />
            </button>
            <button
              @click="scrollReviews(1)"
              class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl dark:shadow-slate-900/50 flex items-center justify-center text-slate-500 hover:text-red-600 transition-all hover:scale-110 active:scale-95 z-10 hidden md:flex border border-slate-100 dark:border-slate-700"
            >
              <ChevronRight class="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <!-- Mini Gallery Section -->
      <section class="py-32 bg-white px-6 lg:px-10 relative overflow-hidden reveal-element">
        <!-- Floating decors -->
        <div class="absolute top-1/4 left-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50"></div>
        <div class="absolute bottom-1/4 right-10 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
            <div>
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-1 bg-red-600 rounded-full"></div>
                <span class="text-xs font-black text-red-600 uppercase tracking-[0.4em]">{{ $t("home.gallery.badge") }}</span>
              </div>
              <h2 class="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                {{ $t("home.gallery.title1") }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 italic">{{ $t("home.gallery.title2") }}</span>
              </h2>
              <p class="text-slate-500 text-lg font-medium max-w-xl">
                {{ $t("home.gallery.description") }}
              </p>
            </div>
            <router-link
              to="/gallery"
              class="group inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95"
            >
              {{ $t("home.gallery.viewAll") }}
              <ChevronRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>

          <!-- Gallery Grid -->
          <div v-if="loadingGallery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="`skel-${i}`" class="h-72 rounded-[2rem] bg-slate-100 animate-pulse"></div>
          </div>
          <div v-else-if="miniGalleryItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <GalleryItemCard
              v-for="item in miniGalleryItems"
              :key="`home-gal-${item.id}`"
              :item="item"
              @open="openGalleryItem"
            />
          </div>
          <div v-else class="text-center py-20 bg-slate-50 rounded-[3rem] border border-slate-100">
            <Camera class="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <p class="text-slate-500 font-medium">{{ $t("home.gallery.empty") }}</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="pb-32 pt-10 px-6 lg:px-10 reveal-element">
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

      <!-- Gallery Item Modal -->
      <Teleport to="body">
        <div v-if="activeGalleryItem" class="fixed inset-0 z-[1100]">
          <div
            class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            @click="closeGalleryModal"
          ></div>
          <div class="absolute inset-0 flex items-center justify-center p-5">
            <div
              class="w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 transform animate-fade-in-up"
            >
              <div class="px-7 py-6 border-b border-slate-100 flex items-start">
                <div class="flex-1 min-w-0">
                  <div class="text-xl font-black text-slate-900 truncate">
                    {{ activeGalleryItem.title }}
                  </div>
                  <div
                    v-if="activeGalleryItem.video_name || activeGalleryItem.youtube_url"
                    class="text-sm font-bold text-slate-500 mt-1 truncate"
                  >
                    {{
                      activeGalleryItem.video_name ||
                      $t("galleryPage.modal.youtubeFallback")
                    }}
                  </div>
                </div>
                <button
                  class="w-11 h-11 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-all shrink-0"
                  @click="closeGalleryModal"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>

              <div class="p-6">
                <div
                  v-if="activeYoutubeId"
                  class="relative aspect-video rounded-2xl overflow-hidden bg-slate-900"
                >
                  <iframe
                    class="absolute inset-0 w-full h-full"
                    :src="`https://www.youtube.com/embed/${activeYoutubeId}`"
                    :title="$t('galleryPage.modal.youtubeFallback')"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>

                <div v-else class="rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    v-if="activeCoverSrc"
                    :src="activeCoverSrc"
                    :alt="activeGalleryItem.title"
                    class="w-full h-auto object-cover max-h-[70vh]"
                  />
                </div>

                <div class="mt-5 flex items-center justify-between gap-3">
                  <a
                    v-if="activeGalleryItem.youtube_url"
                    :href="activeGalleryItem.youtube_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center px-5 py-3 rounded-2xl bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95"
                  >
                    <Play class="w-4 h-4 mr-2" />
                    {{ $t("galleryPage.modal.watchYoutube") }}
                  </a>
                  <div class="text-xs font-bold text-slate-400">
                    {{ $t("galleryPage.modal.clickOutsideClose") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import TourCard from "@/components/TourCard.vue";
import GalleryItemCard from "@/components/GalleryItemCard.vue";
import { getTours, getHeroImages, getGalleryItems } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { stripHtml } from "@/utils/htmlText";
import {
  ArrowRight,
  ChevronLeft,
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
  Image as ImageIcon,
  X,
  Play,
  Camera
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

const heroImages = ref([
  "https://live.staticflickr.com/1952/30570720147_cd23c2b225_h.jpg", 
  "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=2400", 
  "https://asset.kompas.com/crops/JKmVlp4tEmfKRlPM3q28A4uEimc=/0x27:1000x693/1200x800/data/photo/2020/04/20/5e9d07ee9089f.jpg", 
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2400", 
  "https://ik.imagekit.io/tvlk/blog/2024/08/shutterstock_1814394446.jpg?tr=q-70,c-at_max,w-1000,h-600", 
]);

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

const fetchHeroImages = async () => {
  try {
    const response = await getHeroImages();
    const data = response.data.data;
    if (data && data.length > 0) {
      heroImages.value = data.map(item => item.image_url);
    }
  } catch (error) {
    console.error("Error fetching hero images:", error);
  }
};

// === Google Reviews Logic ===
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

// === Mini Gallery Logic ===
const miniGalleryItems = ref([]);
const loadingGallery = ref(true);
const activeGalleryItem = ref(null);

const fetchMiniGallery = async () => {
  loadingGallery.value = true;
  try {
    const res = await getGalleryItems({ active: 1, per_page: 6 });
    let dataList = [];
    if (res?.data?.data && Array.isArray(res.data.data)) {
        dataList = res.data.data;
    } else if (res?.data?.data?.data && Array.isArray(res.data.data.data)) {
        dataList = res.data.data.data;
    }
    miniGalleryItems.value = dataList.slice(0, 6);
  } catch (e) {
    console.error("Gallery fetch failed", e);
  } finally {
    loadingGallery.value = false;
  }
};

const openGalleryItem = (it) => {
  activeGalleryItem.value = it;
};

const closeGalleryModal = () => {
  activeGalleryItem.value = null;
};

const extractYoutubeId = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    return null;
  } catch {
    return null;
  }
};

const activeYoutubeId = computed(() => extractYoutubeId(activeGalleryItem.value?.youtube_url));
const activeCoverSrc = computed(() => {
  if (activeGalleryItem.value?.image_path) return activeGalleryItem.value.image_path;
  const id = activeYoutubeId.value;
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
});

onMounted(() => {
  fetchTours();
  fetchHeroImages();
  fetchMiniGallery();

  // Scroll Animations intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  nextTick(() => {
    document.querySelectorAll('.reveal-element').forEach(sec => {
      observer.observe(sec);
    });
  });

  // Memulai slideshow ganti gambar hero setiap 5 detik
  heroCarouselInterval = setInterval(() => {
    if (heroImages.value.length > 0) {
      currentHeroImageIndex.value =
        (currentHeroImageIndex.value + 1) % heroImages.value.length;
    }
  }, 5000);

  // Load TripAdvisor Script dynamically
  const taScript = document.createElement("script");
  taScript.async = true;
  taScript.src = "https://www.jscache.com/wejs?wtype=excellent&uniq=588&locationId=34101092&lang=in&display_version=2";
  taScript.setAttribute("data-loadtrk", "");
  taScript.onload = function() { this.loadtrk = true; };
  document.body.appendChild(taScript);
});

onUnmounted(() => {
  if (heroCarouselInterval) clearInterval(heroCarouselInterval);
});

watch(locale, fetchTours);
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

/* Scroll Reveal Classes */
.reveal-element {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.reveal-element.is-visible {
  opacity: 1;
  transform: translateY(0);
}

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
