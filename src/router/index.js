import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import TourDetail from "../views/TourDetail.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import Hotels from "../views/Hotels.vue";
import HotelDetail from "../views/HotelDetail.vue";
import TravelInfo from "../views/TravelInfo.vue";
import TravelCulture from "../views/TravelCulture.vue";
import TravelTransport from "../views/TravelTransport.vue";
import TravelShopping from "../views/TravelShopping.vue";
import TravelFood from "../views/TravelFood.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category/:slug",
    name: "Category",
    component: Category,
  },
  {
    path: "/tour/:slug",
    name: "TourDetail",
    component: TourDetail,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/hotels",
    name: "Hotels",
    component: Hotels,
  },
  {
    path: "/hotel/:id",
    name: "HotelDetail",
    component: HotelDetail,
  },
  {
    path: "/travel-info",
    name: "TravelInfo",
    component: TravelInfo,
  },
  {
    path: "/travel-info/history-culture",
    name: "TravelCulture",
    component: TravelCulture,
  },
  {
    path: "/travel-info/transportation",
    name: "TravelTransport",
    component: TravelTransport,
  },
  {
    path: "/travel-info/shopping",
    name: "TravelShopping",
    component: TravelShopping,
  },
  {
    path: "/travel-info/food-cuisine",
    name: "TravelFood",
    component: TravelFood,
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
