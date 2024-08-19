<template>
  <div class="login-container">
    <h1 style="color: black">Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { loginUser } from "@/api";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginUser(this.username, this.password);
        // Store the logged-in user's name in localStorage
        localStorage.setItem('username', response.username);
        this.$router.push('/').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 100); // Delay of 100 milliseconds to ensure the navigation completes
        });
      } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid username or password');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
label {
  display: block;
  margin-bottom: 8px;
  color: black
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: black
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
