import { createApp } from "vue"
import App from "./App.vue"
import axios from "axios"

axios.defaults.baseURL = "api";

axios.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params["app_id"] = import.meta.env.VITE_APP_ID;
    config.params["app_key"] = import.meta.env.VITE_APP_KEY;
    config.params["type"] = "public";
    return config;
});

createApp(App).mount("#app")
