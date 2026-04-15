import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { applySeo } from "./utils/seo";

const app = createApp(App);
app.use(router);
app.use(i18n);

router.afterEach((to) => {
  applySeo({
    title: to.meta?.title,
    description: to.meta?.description,
    type: to.meta?.type || "website",
    url: to.fullPath,
  });
});

app.mount("#app");
