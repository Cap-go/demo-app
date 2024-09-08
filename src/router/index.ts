import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Camera from '../views/plugins/Camera.vue';
import Clicker from '../views/plugins/Clicker.vue';
import Updater from '@/views/plugins/Updater.vue';
import InAppPurchase from '@/views/plugins/InAppPurchase.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/camera',
    name: 'Camera',
    component: Camera
  },
  {
    path: '/clicker',
    name: 'Clicker',
    component: Clicker
  },
  {
    path: '/updater',
    name: 'Updater',
    component: Updater
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: InAppPurchase
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
