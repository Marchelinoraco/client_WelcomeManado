<template>
  <div
    class="min-h-screen bg-gray-50 selection:bg-red-100 selection:text-red-700"
  >
    <!-- Contact Hero -->
    <section class="relative bg-[#1e293b] pt-40 pb-32 overflow-hidden">
      <!-- Decorative background elements -->
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -mr-48 -mt-48"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -ml-48 -mb-48"
      ></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div
          class="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-8"
        >
          <MessageCircle class="w-4 h-4 text-red-400 mr-2" />
          <span
            class="text-[10px] font-black text-white uppercase tracking-[0.3em]"
            >{{ $t("contactPage.hero.badge") }}</span
          >
        </div>
        <h1
          class="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
        >
          {{ $t("contactPage.hero.title1") }}
          <span class="text-red-500">{{ $t("contactPage.hero.title2") }}</span>
        </h1>
        <p
          class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
        >
          {{ $t("contactPage.hero.description") }}
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-6 lg:px-10 -mt-16 pb-32 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Contact Info Cards -->
        <div class="lg:col-span-4 space-y-6">
          <div
            v-for="(info, index) in contactInfo"
            :key="index"
            class="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group border border-slate-50"
          >
            <div
              class="w-16 h-16 bg-slate-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-[15deg] ease-spring"
            >
              <component :is="info.icon" class="w-7 h-7" />
            </div>
            <h3
              class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3"
            >
              {{ $t(info.labelKey) }}
            </h3>
            <a
              v-if="info.href"
              :href="info.href"
              class="text-xl font-black text-slate-900 leading-tight hover:text-red-600 transition-colors"
            >
              {{ info.valueKey ? $t(info.valueKey) : info.value }}
            </a>
            <div v-else class="space-y-1">
              <p class="text-xl font-black text-slate-900 leading-tight">
                {{ info.valueKey ? $t(info.valueKey) : info.value }}
              </p>
              <a
                v-if="info.value2"
                :href="info.href2"
                class="text-sm font-black text-slate-600 hover:text-red-600 transition-colors"
              >
                {{ info.value2 }}
              </a>
            </div>
          </div>

          <!-- Social Links Card -->
          <div
            class="bg-red-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-red-600/30 relative overflow-hidden group"
          >
            <Palmtree
              class="absolute -right-10 -bottom-10 w-40 h-40 text-white/10 rotate-12"
            />
            <div class="relative z-10">
              <h3 class="text-sm font-black uppercase tracking-widest mb-8">
                {{ $t("contactPage.social.title") }}
              </h3>
              <div class="flex space-x-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 rounded-xl bg-white/10 hover:bg-white text-white hover:text-red-600 flex items-center justify-center transition-all duration-300"
                >
                  <component :is="getSocialIcon(social.name)" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="lg:col-span-8 bg-white rounded-[3rem] p-10 md:p-20 shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-[80px] -mr-32 -mt-32"
          ></div>

          <div class="relative z-10">
            <h2
              class="text-4xl md:text-5xl font-black text-slate-900 mb-12 tracking-tighter uppercase"
            >
              {{ $t("contactPage.form.title1") }}
              <span class="text-red-600">{{
                $t("contactPage.form.title2")
              }}</span>
            </h2>

            <form
              @submit.prevent="handleSubmit"
              class="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              <div class="space-y-4">
                <label
                  class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2"
                  >{{ $t("contactPage.form.fields.fullName.label") }}</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  :placeholder="
                    $t('contactPage.form.fields.fullName.placeholder')
                  "
                  class="w-full bg-slate-50 border-2 border-transparent focus:border-red-600/20 rounded-2xl px-8 py-5 focus:ring-0 transition-all placeholder:text-slate-300 font-bold text-slate-900"
                  required
                />
              </div>
              <div class="space-y-4">
                <label
                  class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2"
                  >{{ $t("contactPage.form.fields.email.label") }}</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  :placeholder="$t('contactPage.form.fields.email.placeholder')"
                  class="w-full bg-slate-50 border-2 border-transparent focus:border-red-600/20 rounded-2xl px-8 py-5 focus:ring-0 transition-all placeholder:text-slate-300 font-bold text-slate-900"
                  required
                />
              </div>
              <div class="space-y-4 md:col-span-2">
                <label
                  class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2"
                  >{{ $t("contactPage.form.fields.subject.label") }}</label
                >
                <input
                  v-model="form.subject"
                  type="text"
                  :placeholder="
                    $t('contactPage.form.fields.subject.placeholder')
                  "
                  class="w-full bg-slate-50 border-2 border-transparent focus:border-red-600/20 rounded-2xl px-8 py-5 focus:ring-0 transition-all placeholder:text-slate-300 font-bold text-slate-900"
                  required
                />
              </div>
              <div class="space-y-4 md:col-span-2">
                <label
                  class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2"
                  >{{ $t("contactPage.form.fields.message.label") }}</label
                >
                <textarea
                  v-model="form.message"
                  rows="6"
                  :placeholder="
                    $t('contactPage.form.fields.message.placeholder')
                  "
                  class="w-full bg-slate-50 border-2 border-transparent focus:border-red-600/20 rounded-[2rem] px-8 py-5 focus:ring-0 transition-all placeholder:text-slate-300 font-bold text-slate-900 resize-none"
                  required
                ></textarea>
              </div>
              <div class="md:col-span-2 pt-6">
                <button
                  type="submit"
                  class="group w-full md:w-auto px-16 py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-red-600/30 active:scale-95 flex items-center justify-center"
                >
                  {{ $t("contactPage.form.submit") }}
                  <ArrowRight
                    class="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  Palmtree,
  Facebook,
  Instagram,
} from "lucide-vue-next";

const getSocialIcon = (name) => {
  const icons = { Facebook, Instagram };
  return icons[name];
};

const { t } = useI18n();

const contactInfo = [
  {
    icon: Mail,
    labelKey: "contactPage.info.email",
    value: "info@welcomemanado.com",
    href: "mailto:info@welcomemanado.com",
    value2: "tour.welcomemanado@gmail.com",
    href2: "mailto:tour.welcomemanado@gmail.com",
  },
  {
    icon: Phone,
    labelKey: "contactPage.info.phone",
    value: "+62 821-7373-8822",
    href: "tel:+6282173738822",
  },
  {
    icon: MapPin,
    labelKey: "contactPage.info.office",
    valueKey: "contactPage.info.officeValue",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/welcomemanadotours",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/welcomemanadotours",
  },
];

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleSubmit = () => {
  const subject = encodeURIComponent(form.value.subject || "");
  const body = encodeURIComponent(
    `Nama: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`,
  );
  window.location.href = `mailto:info@welcomemanado.com?subject=${subject}&body=${body}`;
  form.value = { name: "", email: "", subject: "", message: "" };
};
</script>
