import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';
import posthogPlugin from "../plugins/posthog";  // Adjusted the import path to be relative to this file

// Create the Vue app instance and store it in a variable
const app = createApp(App);

// Use the router and PostHog plugin with the app instance
app.use(router);
app.use(posthogPlugin);

// Mount the app to the DOM
app.mount('#app');
