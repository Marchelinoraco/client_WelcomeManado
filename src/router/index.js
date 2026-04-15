import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Tour, Hotel, dan Paket Wisata Manado",
      description:
        "Temukan paket wisata Manado, hotel, tour lokal, perjalanan nasional, dan international trip bersama WelcomeManado.",
    },
  },
  {
    path: "/category/:slug",
    name: "Category",
    component: () => import("../views/wisatalokal/Category.vue"),
    meta: {
      title: "Kategori Tour Lokal Manado",
      description:
        "Jelajahi kategori tour lokal Manado, Bunaken, Tomohon, Likupang, dan destinasi menarik lainnya bersama WelcomeManado.",
    },
  },
  {
    path: "/tour/:slug",
    name: "TourDetail",
    component: () => import("../views/wisatalokal/TourDetail.vue"),
    meta: {
      title: "Detail Tour Lokal Manado",
      description:
        "Lihat detail paket tour lokal Manado lengkap dengan itinerary, durasi, dan informasi penting lainnya.",
      type: "article",
    },
  },
  {
    path: "/nasional/:slug",
    name: "NasionalCategory",
    component: () => import("../views/nasional/Category.vue"),
    meta: {
      title: "Destinasi Nasional",
      description:
        "Temukan pilihan paket wisata nasional terbaik dari WelcomeManado untuk perjalanan Anda di Indonesia.",
    },
  },
  {
    path: "/nasional/tour/:slug",
    name: "NasionalTourDetail",
    component: () => import("../views/nasional/TourDetail.vue"),
    meta: {
      title: "Detail Tour Nasional",
      description:
        "Lihat detail paket tour nasional lengkap dengan itinerary, harga, dan durasi perjalanan.",
      type: "article",
    },
  },
  {
    path: "/internasional",
    name: "InternationalTrips",
    component: () => import("../views/internasional/Trips.vue"),
    meta: {
      title: "International Tours",
      description:
        "Eksplor pilihan tour internasional dari WelcomeManado dengan itinerary, harga, dan region terbaik.",
    },
  },
  {
    path: "/internasional/region/:slug",
    name: "InternationalTripsByRegion",
    component: () => import("../views/internasional/Trips.vue"),
    meta: {
      title: "International Tours by Region",
      description:
        "Temukan paket tour internasional berdasarkan region pilihan Anda bersama WelcomeManado.",
    },
  },
  {
    path: "/internasional/tour/:slug",
    name: "InternationalTourDetail",
    component: () => import("../views/internasional/TourDetail.vue"),
    meta: {
      title: "Detail Tour Internasional",
      description:
        "Lihat detail tour internasional lengkap dengan itinerary, durasi, harga, dan informasi perjalanan.",
      type: "article",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/about/About.vue"),
    meta: {
      title: "Tentang WelcomeManado",
      description:
        "Kenal lebih dekat dengan WelcomeManado, travel agency yang menghadirkan pengalaman wisata terbaik di Manado dan sekitarnya.",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/contact/Contact.vue"),
    meta: {
      title: "Kontak WelcomeManado",
      description:
        "Hubungi WelcomeManado untuk informasi tour, hotel, itinerary, dan kebutuhan perjalanan Anda.",
    },
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: () => import("../views/hotels/Hotels.vue"),
    meta: {
      title: "Hotel di Manado dan Sekitarnya",
      description:
        "Temukan pilihan hotel di Manado, Tomohon, Bunaken, dan destinasi sekitar bersama WelcomeManado.",
    },
  },
  {
    path: "/hotel/:id",
    name: "HotelDetail",
    component: () => import("../views/hotels/HotelDetail.vue"),
    meta: {
      title: "Detail Hotel",
      description:
        "Lihat detail hotel, lokasi, fasilitas, dan informasi pemesanan hotel di WelcomeManado.",
      type: "article",
    },
  },
  {
    path: "/travel-info",
    name: "TravelInfo",
    component: () => import("../views/travelinfo/TravelInfo.vue"),
    meta: {
      title: "Informasi Perjalanan Manado",
      description:
        "Panduan perjalanan Manado dari WelcomeManado, mulai dari tips, budaya, transportasi, hingga kuliner.",
    },
  },
  {
    path: "/travel-info/history-culture",
    name: "TravelCulture",
    component: () => import("../views/travelinfo/TravelCulture.vue"),
    meta: {
      title: "Budaya dan Sejarah Manado",
      description:
        "Pelajari budaya dan sejarah Manado untuk membantu Anda merencanakan perjalanan yang lebih bermakna.",
    },
  },
  {
    path: "/travel-info/transportation",
    name: "TravelTransport",
    component: () => import("../views/travelinfo/TravelTransport.vue"),
    meta: {
      title: "Transportasi di Manado",
      description:
        "Temukan informasi transportasi di Manado untuk perjalanan yang lebih nyaman dan efisien.",
    },
  },
  {
    path: "/travel-info/shopping",
    name: "TravelShopping",
    component: () => import("../views/travelinfo/TravelShopping.vue"),
    meta: {
      title: "Shopping Guide Manado",
      description:
        "Panduan belanja di Manado untuk menemukan pusat oleh-oleh dan pengalaman shopping terbaik.",
    },
  },
  {
    path: "/travel-info/food-cuisine",
    name: "TravelFood",
    component: () => import("../views/travelinfo/TravelFood.vue"),
    meta: {
      title: "Kuliner Manado",
      description:
        "Jelajahi ragam kuliner khas Manado dan rekomendasi makanan terbaik untuk wisata Anda.",
    },
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../views/gallery/Gallery.vue"),
    meta: {
      title: "Galeri WelcomeManado",
      description:
        "Lihat galeri foto dan video perjalanan bersama WelcomeManado untuk mendapatkan inspirasi wisata.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
