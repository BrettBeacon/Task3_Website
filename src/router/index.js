// src/router/index.js

// Router for each page
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Films from '../pages/Films.vue'
import Search from '../pages/Search.vue'
import Add from '../pages/Add.vue'
import Delete from '../pages/Delete.vue'

// Routes
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/films', component: Films },
  { path: '/search', component: Search },
  { path: '/add', component: Add },
  { path: '/delete', component: Delete }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router