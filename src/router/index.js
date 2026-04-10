import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category/:slug",
    name: "Category",
    component: () => import("../views/wisatalokal/Category.vue"),
  },
  {
    path: "/tour/:slug",
    name: "TourDetail",
    component: () => import("../views/wisatalokal/TourDetail.vue"),
  },
  {
    path: "/nasional/:slug",
    name: "NasionalCategory",
    component: () => import("../views/nasional/Category.vue"),
  },
  {
    path: "/nasional/tour/:slug",
    name: "NasionalTourDetail",
    component: () => import("../views/nasional/TourDetail.vue"),
  },
  {
    path: "/internasional",
    name: "InternationalTrips",
    component: () => import("../views/internasional/Trips.vue"),
  },
  {
    path: "/internasional/region/:slug",
    name: "InternationalTripsByRegion",
    component: () => import("../views/internasional/Trips.vue"),
  },
  {
    path: "/internasional/tour/:slug",
    name: "InternationalTourDetail",
    component: () => import("../views/internasional/TourDetail.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/about/About.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/contact/Contact.vue"),
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: () => import("../views/hotels/Hotels.vue"),
  },
  {
    path: "/hotel/:id",
    name: "HotelDetail",
    component: () => import("../views/hotels/HotelDetail.vue"),
  },
  {
    path: "/travel-info",
    name: "TravelInfo",
    component: () => import("../views/travelinfo/TravelInfo.vue"),
  },
  {
    path: "/travel-info/history-culture",
    name: "TravelCulture",
    component: () => import("../views/travelinfo/TravelCulture.vue"),
  },
  {
    path: "/travel-info/transportation",
    name: "TravelTransport",
    component: () => import("../views/travelinfo/TravelTransport.vue"),
  },
  {
    path: "/travel-info/shopping",
    name: "TravelShopping",
    component: () => import("../views/travelinfo/TravelShopping.vue"),
  },
  {
    path: "/travel-info/food-cuisine",
    name: "TravelFood",
    component: () => import("../views/travelinfo/TravelFood.vue"),
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../views/gallery/Gallery.vue"),
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
