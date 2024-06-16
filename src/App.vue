<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/films">Films</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/add">Add Film</router-link>
      <router-link to="/delete">Delete Film</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  display: inline-flex;
  gap: 1rem;
  background-color: #f0f0f0;
  padding: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>