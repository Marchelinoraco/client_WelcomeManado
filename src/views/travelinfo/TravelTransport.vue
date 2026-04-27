<template>
  <div
    class="selection:bg-red-100 selection:text-red-700 dark:selection:bg-red-900/40 dark:selection:text-red-200 font-sans min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300"
  >
    <!-- Hero Header -->
    <header
      class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-10 overflow-hidden bg-slate-900 dark:bg-slate-950"
    >
      <div class="absolute inset-0">
        <div class="w-full h-full relative bg-slate-950">
          <template v-for="(img, index) in heroImages" :key="img">
            <div
              class="absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out"
              :class="currentHeroIndex === index ? 'opacity-100' : 'opacity-0'"
            >
              <img
                :src="img"
                class="h-full w-full object-cover opacity-40"
                alt="Hero"
              />
            </div>
          </template>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent dark:from-slate-950 dark:via-slate-950/85"
        ></div>
      </div>

      <div class="absolute inset-0 z-0 opacity-50">
        <div
          class="absolute left-[8%] top-28 h-44 w-44 rounded-full bg-red-500/20 blur-3xl"
        ></div>
        <div
          class="absolute right-[10%] top-16 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl"
        ></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div
          class="inline-flex items-center space-x-3 mb-6 bg-white/10 dark:bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 dark:border-white/10 shadow-lg shadow-black/10"
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

        <div
          class="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-4xl mx-auto"
        >
          <div
            class="rounded-[1.75rem] border border-white/10 bg-white/10 dark:bg-white/5 px-5 py-4 backdrop-blur-xl"
          >
            <div class="text-[11px] font-black uppercase tracking-[0.25em] text-white/50">
              Fleet
            </div>
            <div class="mt-2 text-3xl font-black text-white">
              {{ availabilityCount("all") }}
            </div>
          </div>
          <div
            class="rounded-[1.75rem] border border-emerald-300/15 bg-emerald-400/10 px-5 py-4 backdrop-blur-xl"
          >
            <div class="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-100/70">
              {{ $t("transport.rentalSection.filters.available") }}
            </div>
            <div class="mt-2 text-3xl font-black text-white">
              {{ availabilityCount("available") }}
            </div>
          </div>
          <div
            class="rounded-[1.75rem] border border-red-300/15 bg-red-400/10 px-5 py-4 backdrop-blur-xl"
          >
            <div class="text-[11px] font-black uppercase tracking-[0.25em] text-red-100/70">
              {{ $t("transport.rentalSection.filters.unavailable") }}
            </div>
            <div class="mt-2 text-3xl font-black text-white">
              {{ availabilityCount("unavailable") }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div class="mb-12 text-center max-w-3xl mx-auto">
        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-slate-900/40"
        >
          <Car class="w-4 h-4 text-red-600" />
          <span
            class="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-[0.3em]"
          >
            {{ $t("transport.rentalBadge") }}
          </span>
        </div>
        <h2
          class="mt-6 text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {{ $t("transport.rentalSection.title") }}
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {{ $t("transport.rentalSection.description") }}
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <div class="h-px w-10 bg-slate-200 dark:bg-slate-800"></div>
          <div
            class="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
          ></div>
          <div class="h-px w-10 bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>

      <div
        class="relative rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)] dark:shadow-[0_35px_100px_-55px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        <div class="absolute inset-0 -z-10">
          <div
            class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
          ></div>
          <div
            class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-900/5 dark:bg-sky-400/10 blur-3xl"
          ></div>
        </div>

        <div class="p-6 lg:p-8 border-b border-slate-200/60 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/60">
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
                  class="w-full pl-12 pr-5 py-4 bg-white/80 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-200 dark:focus:border-red-700 outline-none transition-all font-semibold text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
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
                    : 'bg-white/80 dark:bg-slate-950/70 text-slate-700 dark:text-slate-200 border-slate-200/70 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900'
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
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    "
                  >
                    {{ availabilityCount(opt.key) }}
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between gap-4">
            <div class="text-xs font-bold text-slate-500 dark:text-slate-400">
              {{
                $t("transport.rentalSection.showing", {
                  count: filteredTransportations.length,
                })
              }}
            </div>
            <div class="hidden md:flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span class="text-xs font-bold text-slate-500 dark:text-slate-400">
                {{ availabilityCount("available") }} ready
              </span>
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
              <div class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 w-60 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                <div class="h-3 w-40 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
              </div>
              <div class="h-10 w-28 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
            </div>
          </div>
        </div>

        <div v-else-if="errorMessage" class="p-10 text-center">
          <h2 class="text-xl font-black text-slate-900 dark:text-white">
            {{ $t("transport.rentalSection.loadErrorTitle") }}
          </h2>
          <p class="text-slate-500 dark:text-slate-400 font-bold mt-3">{{ errorMessage }}</p>
          <div class="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              class="h-11 px-6 rounded-2xl bg-slate-900 dark:bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-red-500 transition-colors"
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
          <h3 class="text-2xl font-black text-slate-900 dark:text-white">
            {{ $t("transport.rentalSection.emptyTitle") }}
          </h3>
          <p class="text-slate-500 dark:text-slate-400 font-bold mt-2">
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
              class="group bg-white/90 dark:bg-slate-950/80 rounded-[2rem] border border-slate-200/70 dark:border-slate-800 shadow-sm dark:shadow-slate-950/30 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
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
                    <div class="mb-2 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                      Transport
                    </div>
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
                <div class="mb-4 flex items-center gap-2">
                  <span class="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300">
                    {{ v.type || "Vehicle" }}
                  </span>
                  <span
                    class="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em]"
                    :class="
                      v.available
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                        : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-300'
                    "
                  >
                    {{
                      v.available
                        ? $t('transport.rentalSection.availability.available')
                        : $t('transport.rentalSection.availability.unavailable')
                    }}
                  </span>
                </div>
                <p
                  class="text-slate-600 dark:text-slate-300 font-semibold leading-relaxed line-clamp-3"
                >
                  {{ transportationDescription(v) || "-" }}
                </p>

                <div class="mt-auto pt-6">
                  <div class="flex gap-2">
                    <button
                      type="button"
                      class="flex-1 h-12 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      @click="openDetail(v)"
                    >
                      Detail
                    </button>
                    <button
                      type="button"
                      class="flex-1 h-12 rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-60"
                      :class="
                        v.available
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-[0.99]'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      "
                      :disabled="!v.available"
                      @click="openBooking(v)"
                    >
                      {{ $t("transport.rentalSection.bookButton") }}
                    </button>
                  </div>
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
          class="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200/70 dark:border-slate-800 overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <div class="lg:col-span-2 bg-slate-900 dark:bg-slate-950">
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
              <div class="p-8 border-b border-slate-200/70 dark:border-slate-800">
                <div class="flex items-start justify-between gap-6">
                  <div class="min-w-0">
                    <div
                      class="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]"
                    >
                      {{ $t("transport.booking.subtitle") }}
                    </div>
                    <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-2">
                      {{ $t("transport.booking.formTitle") }}
                    </h3>
                    <p class="text-slate-500 dark:text-slate-400 font-semibold mt-2">
                      {{ $t("transport.booking.helpText") }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="h-10 w-10 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 font-black"
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
                        class="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-200 dark:focus:border-emerald-700 outline-none font-semibold text-slate-700 dark:text-slate-100"
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
                        class="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-200 dark:focus:border-emerald-700 outline-none font-semibold text-slate-700 dark:text-slate-100"
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
                        class="w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-200 dark:focus:border-emerald-700 outline-none font-semibold text-slate-700 dark:text-slate-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1"
                      >{{ $t("transport.booking.summary") }}</label
                    >
                    <div
                      class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-100 space-y-1"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <span class="text-slate-500 dark:text-slate-400 font-bold text-xs">{{
                          $t("transport.booking.vehicle")
                        }}</span>
                        <span class="font-black text-slate-900 dark:text-white truncate">
                          {{ selectedTransportation?.name }}
                        </span>
                      </div>
                      <div class="flex items-center justify-between gap-3">
                        <span class="text-slate-500 dark:text-slate-400 font-bold text-xs">{{
                          $t("transport.booking.type")
                        }}</span>
                        <span class="font-black text-slate-900 dark:text-white truncate">
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
                    class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-200 dark:focus:border-emerald-700 outline-none font-semibold text-slate-700 dark:text-slate-100"
                  ></textarea>
                </div>
              </div>

              <div
                class="p-8 border-t border-slate-200/70 dark:border-slate-800 flex flex-col lg:flex-row gap-3 lg:justify-end"
              >
                <button
                  type="button"
                  class="h-12 px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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

      <!-- Detail Modal -->
      <div v-if="isDetailOpen && detailTransportation" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeDetail"></div>
        <div class="flex min-h-full items-center justify-center px-4 py-8">
          <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200/70 dark:border-slate-800 overflow-hidden">

          <!-- Gallery -->
          <div class="relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden" style="min-height: 240px; max-height: 420px;">
            <img
              :src="detailImages[detailImageIndex] || transportationImage(detailTransportation)"
              :alt="detailTransportation.name"
              class="w-full h-full object-contain"
              style="max-height: 420px;"
            />

            <!-- Close -->
            <button type="button" @click="closeDetail"
              class="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-black/30 backdrop-blur text-white font-black hover:bg-black/50 transition-colors flex items-center justify-center z-10">
              ✕
            </button>

            <!-- Availability badge -->
            <div class="absolute top-4 left-4 z-10">
              <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border backdrop-blur"
                :class="detailTransportation.available ? 'bg-emerald-500/20 text-emerald-700 border-emerald-300' : 'bg-red-500/20 text-red-700 border-red-300'">
                <span class="h-2 w-2 rounded-full" :class="detailTransportation.available ? 'bg-emerald-500' : 'bg-red-500'"></span>
                {{ detailTransportation.available ? $t('transport.rentalSection.availability.available') : $t('transport.rentalSection.availability.unavailable') }}
              </span>
            </div>

            <!-- Image nav arrows -->
            <template v-if="detailImages.length > 1">
              <button type="button" @click="detailImageIndex = (detailImageIndex - 1 + detailImages.length) % detailImages.length"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-black/50 transition-colors text-lg font-bold z-10">
                ‹
              </button>
              <button type="button" @click="detailImageIndex = (detailImageIndex + 1) % detailImages.length"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center hover:bg-black/50 transition-colors text-lg font-bold z-10">
                ›
              </button>
            </template>

            <!-- Dot indicators -->
            <div v-if="detailImages.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              <button v-for="(_, idx) in detailImages" :key="idx" type="button"
                @click="detailImageIndex = idx"
                class="h-2 rounded-full transition-all"
                :class="idx === detailImageIndex ? 'bg-white w-6' : 'bg-white/50 w-2'">
              </button>
            </div>
          </div>

          <!-- Thumbnail strip -->
          <div v-if="detailImages.length > 1" class="flex gap-2 px-5 pt-4 overflow-x-auto">
            <button v-for="(img, idx) in detailImages" :key="idx" type="button"
              @click="detailImageIndex = idx"
              class="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all"
              :class="idx === detailImageIndex ? 'border-red-600' : 'border-transparent opacity-50 hover:opacity-100'">
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 class="text-xl font-black text-slate-900 dark:text-white">{{ detailTransportation.name }}</h2>
                <p class="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">{{ detailTransportation.type || '-' }}</p>
              </div>
              <div v-if="detailTransportation.price" class="text-right flex-shrink-0">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Harga</div>
                <div class="text-lg font-black text-red-600 mt-0.5">{{ formatIdr(detailTransportation.price) }}</div>
                <div class="text-[10px] text-slate-400 font-bold">/ hari</div>
              </div>
            </div>

            <p v-if="transportationDescription(detailTransportation)" class="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-sm">
              {{ transportationDescription(detailTransportation) }}
            </p>
          </div>

          <!-- Footer -->
          <div class="px-6 pb-6 flex gap-3">
            <button type="button" @click="closeDetail"
              class="flex-1 h-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Tutup
            </button>
            <button type="button"
              class="flex-1 h-12 rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-60"
              :class="detailTransportation.available ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'"
              :disabled="!detailTransportation.available"
              @click="() => { closeDetail(); openBooking(detailTransportation); }">
              {{ $t('transport.rentalSection.bookButton') }}
            </button>
          </div>
        </div>
        </div>
      </div>

      <div class="mt-20 lg:mt-24 mb-12 text-center max-w-3xl mx-auto">
        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-slate-900/40"
        >
          <Map class="w-4 h-4 text-red-600" />
          <span
            class="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-[0.3em]"
          >
            {{ $t("transport.section.badge") }}
          </span>
        </div>
        <h2
          class="mt-6 text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {{ $t("transport.section.title") }}
        </h2>
        <div class="mt-8 flex items-center justify-center gap-3">
          <div class="h-px w-10 bg-slate-200 dark:bg-slate-800"></div>
          <div
            class="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
          ></div>
          <div class="h-px w-10 bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <!-- Destination Card -->
        <article
          v-for="(dest, index) in transportDestinations"
          :key="index"
          class="group bg-white/90 dark:bg-slate-900/80 rounded-[2rem] p-6 shadow-sm dark:shadow-slate-950/30 hover:shadow-xl hover:shadow-red-900/10 dark:hover:shadow-black/40 transition-all duration-500 border border-slate-200/70 dark:border-slate-800 flex flex-col items-start text-left"
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-red-50 to-white dark:from-red-500/10 dark:to-slate-900 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-red-100 dark:border-red-900/30"
          >
            <Map class="w-6 h-6 text-red-600" />
          </div>

          <h3
            class="text-xl font-black text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-red-600 transition-colors"
          >
            {{ $t("transport.items." + dest.key) }}
          </h3>

          <p
            class="text-slate-500 dark:text-slate-300 text-sm font-medium leading-relaxed mb-6 line-clamp-4"
          >
            {{ $t("transport.items." + dest.key + "_desc") }}
          </p>

          <div
            class="mt-auto w-full flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 group-hover:border-red-100 dark:group-hover:border-red-900/30 transition-colors"
          >
            <span
              class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:text-red-600 transition-colors"
              >{{ $t("transport.items.explore") }}</span
            >
            <div
              class="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <ArrowRight
                class="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300"
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
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
  getHeroImages,
} from "@/services/api";
import { stripHtml } from "@/utils/htmlText";

const { t, locale } = useI18n();

const transportations = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const selectedAvailability = ref("all");

const heroImages = ref(['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80'])
const currentHeroIndex = ref(0)
let heroInterval = null

const fetchHeroImages = async () => {
  try {
    const res = await getHeroImages()
    const data = res.data?.data || []
    if (data.length > 0) heroImages.value = data.map(item => item.image_url)
  } catch { /* keep default */ }
}

const isBookingOpen = ref(false);
const selectedTransportation = ref(null);
const bookingSubmitting = ref(false);

// Detail modal
const isDetailOpen = ref(false);
const detailTransportation = ref(null);
const detailImageIndex = ref(0);

const detailImages = computed(() => {
  const v = detailTransportation.value;
  if (!v) return [];
  const imgs = Array.isArray(v.images) && v.images.length ? v.images : [];
  if (imgs.length) return imgs;
  const single = transportationImage(v);
  return single ? [single] : [];
});

const openDetail = (v) => {
  detailTransportation.value = v;
  detailImageIndex.value = 0;
  isDetailOpen.value = true;
};

const closeDetail = () => {
  isDetailOpen.value = false;
  detailTransportation.value = null;
};
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
  const description = loc.startsWith("en")
    ? v?.description_en || v?.description || ""
    : loc.startsWith("ko")
      ? v?.description_ko || v?.description || ""
      : loc.startsWith("zh")
        ? v?.description_zh || v?.description || ""
        : v?.description || "";
  return stripHtml(description);
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

onMounted(() => {
  fetchTransportations()
  fetchHeroImages()
  heroInterval = setInterval(() => {
    if (heroImages.value.length > 1) {
      currentHeroIndex.value = (currentHeroIndex.value + 1) % heroImages.value.length
    }
  }, 5000)
})

onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval)
})
</script>
