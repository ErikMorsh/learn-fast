// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";
import BaseModal from "./components/Base/BaseModal.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);

// Global Components
app.component("base-modal", BaseModal);

app.mount("#app");
