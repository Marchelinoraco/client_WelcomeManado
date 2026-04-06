<template>
  <div class="min-h-screen bg-white">
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
          <h2 class="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase italic">{{ $t('about.story.title1') }} <span class="text-red-600">{{ $t('about.story.title2') }}</span></h2>
          <div class="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              {{ $t('about.story.p1') }}
            </p>
            <p>
              {{ $t('about.story.p2') }}
            </p>
          </div>
          <div class="mt-10 grid grid-cols-2 gap-8">
            <div class="border-l-4 border-red-600 pl-4">
              <h4 class="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">{{ $t('about.story.exp_years').split(' ')[0] }}</h4>
              <p class="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">{{ $t('about.story.exp_years').split(' ').slice(1).join(' ') }}</p>
            </div>
            <div class="border-l-4 border-red-600 pl-4">
              <h4 class="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">{{ $t('about.story.happy_travelers').split(' ')[0] }}</h4>
              <p class="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">{{ $t('about.story.happy_travelers').split(' ').slice(1).join(' ') }}</p>
            </div>
          </div>
        </div>
        <div class="relative">
          <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=1000" class="rounded-[2rem] shadow-2xl" alt="Travelers" />
          <div class="absolute -bottom-10 -left-10 bg-red-600 p-8 rounded-[2rem] text-white hidden md:block">
            <p class="text-2xl font-black italic uppercase tracking-tighter">{{ $t('about.story.since') }}</p>
            <p class="text-red-100 text-sm font-bold tracking-widest uppercase mt-1">{{ $t('about.story.pioneering') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-gray-50 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">{{ $t('about.why.title1') }} <span class="text-red-600">{{ $t('about.why.title2') }}</span></h2>
          <div class="w-20 h-1.5 bg-red-600 mx-auto mt-4"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div v-for="(feature, index) in whyChooseUs" :key="index" class="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
            <div class="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <component :is="feature.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('about.why.features.' + feature.key + '.title') }}</h3>
            <p class="text-gray-500 leading-relaxed">{{ $t('about.why.features.' + feature.key + '.desc') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Compass, ShieldCheck, Users } from 'lucide-vue-next';

const whyChooseUs = [
  {
    key: 'expert',
    icon: Compass
  },
  {
    key: 'professional',
    icon: ShieldCheck
  },
  {
    key: 'personalized',
    icon: Users
  }
];
</script>
