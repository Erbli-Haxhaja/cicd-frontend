<script setup>
import TodoList from "@/components/TodoList.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view></router-view>
</template>

<style scoped>
main {
  padding: 20px;
}
</style>
