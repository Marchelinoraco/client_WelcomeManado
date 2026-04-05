import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Home.vue";
import Category from "../views/wisatalokal/Category.vue";
import TourDetail from "../views/wisatalokal/TourDetail.vue";
import NasionalCategory from "../views/nasional/Category.vue";
import NasionalTourDetail from "../views/nasional/TourDetail.vue";
import InternationalTrips from "../views/internasional/Trips.vue";
import InternationalTourDetail from "../views/internasional/TourDetail.vue";
import About from "../views/about/About.vue";
import Contact from "../views/contact/Contact.vue";
import Hotels from "../views/hotels/Hotels.vue";
import HotelDetail from "../views/hotels/HotelDetail.vue";
import TravelInfo from "../views/travelinfo/TravelInfo.vue";
import TravelCulture from "../views/travelinfo/TravelCulture.vue";
import TravelTransport from "../views/travelinfo/TravelTransport.vue";
import TravelShopping from "../views/travelinfo/TravelShopping.vue";
import TravelFood from "../views/travelinfo/TravelFood.vue";

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
    path: "/nasional/:slug",
    name: "NasionalCategory",
    component: NasionalCategory,
  },
  {
    path: "/nasional/tour/:slug",
    name: "NasionalTourDetail",
    component: NasionalTourDetail,
  },
  {
    path: "/internasional",
    name: "InternationalTrips",
    component: InternationalTrips,
  },
  {
    path: "/internasional/region/:slug",
    name: "InternationalTripsByRegion",
    component: InternationalTrips,
  },
  {
    path: "/internasional/tour/:slug",
    name: "InternationalTourDetail",
    component: InternationalTourDetail,
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
