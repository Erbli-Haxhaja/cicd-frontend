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
      headline: Math.random() < 0.5 ? 'Join Us Today!' : 'Become a Member!',
      buttonClass: Math.random() < 0.5 ? 'button-style-a' : 'button-style-b'
    }
  },
  methods: {
    async register() {
      try {
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

button:hover {
  opacity: 0.9;
}
</style>
