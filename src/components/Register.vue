<template>
  <div class="register-container">
    <h1>{{ headline }}</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" placeholder="Username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" placeholder="Password" required>
      </div>
      <button :class="buttonClass" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from "@/api";

export default {
  name: "Register",
  data() {
    return {
      username: '',
      password: '',
      headline: 'Welcome!', // Default headline, will be overridden by feature flag
      buttonClass: 'button-style-default' // Default button style, will be overridden by feature flag
    }
  },
  async created() {
    await this.setupFeatures();
  },
  methods: {
    async setupFeatures() {
  try {
    // Access PostHog instance from global properties
    const posthog = this.$posthog;

    if (!posthog) {
      throw new Error("PostHog instance is not available.");
    }

    // Fetch headline variation feature flag
    const headlineVariant = posthog.getFeatureFlag('headline_variation');
    if (headlineVariant === 'variant-a') {
      this.headline = 'Join Us Today!';
    } else if (headlineVariant === 'variant-b') {
      this.headline = 'Become a Member!';
    }

    // Fetch button color variation feature flag
    const buttonVariant = posthog.getFeatureFlag('register_button');
    if (buttonVariant === 'variant-a') {
      this.buttonClass = 'button-style-a'; // Blue button
    } else if (buttonVariant === 'variant-b') {
      this.buttonClass = 'button-style-b'; // Green button
    }

    // Track which variant the user is seeing
    posthog.capture('view_register_page', {
      headline_variant: this.headline,
      button_color_variant: this.buttonClass,
    });

  } catch (error) {
    console.error("Error setting up features:", error);
  }
},
    async register() {
      try {
        // Track the registration attempt
        this.$posthog.capture('click_register_button', {
          button_color: this.buttonClass,
          headline: this.headline,
        });

        await registerUser(this.username, this.password);
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: black;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: black;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-style-a {
  background-color: blue;
}

.button-style-b {
  background-color: green;
}

.button-style-default {
  background-color: gray;
}

button:hover {
  opacity: 0.9;
}
</style>
