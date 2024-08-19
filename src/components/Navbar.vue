<template>
  <nav>
    <div class="navbar-left">
      <span v-if="username">Welcome, {{ username }}</span>
    </div>
    <div class="navbar-right">
      <ul>
        <li v-if="!username"><router-link to="/login">Login</router-link></li>
        <li v-if="!username"><router-link to="/register">Register</router-link></li>
        <li v-if="username"><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      username: ''
    };
  },
  created() {
    // Get the logged-in username from localStorage
    this.username = localStorage.getItem('username');
  },
  methods: {
    logout() {
      // Remove the username from localStorage and update the component state
      localStorage.removeItem('username');
      this.username = '';
      this.$router.push('/login'); // Redirect to login page after logout
    }
  }
};
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  z-index: 1000; /* Ensure the navbar is on top of other content */
}

.navbar-left {
  flex: 1;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar-right {
  display: flex;
  align-items: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-left: 20px;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
