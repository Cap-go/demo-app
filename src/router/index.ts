import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Camera from '../views/plugins/Camera.vue';
import Clicker from '../views/plugins/Clicker.vue';
import Updater from '@/views/plugins/Updater.vue';
import InAppPurchase from '@/views/plugins/InAppPurchase.vue';
import Web from '@/views/plugins/Web.vue';
import Sql from '@/views/plugins/Sql.vue';
import ScreenRecorder from '@/views/plugins/ScreenRecorder.vue';
import Auth from '@/views/plugins/Auth.vue';
import InMarket from '@/views/plugins/InMarket.vue';
import Downloader from '@/views/Downloader.vue';
import Audio from '@/views/plugins/Audio.vue';
import LocalStorage from '@/views/plugins/LocalStorage.vue';

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
  {
    path: '/web',
    name: 'web',
    component: Web
  },
  {
    path: '/sql',
    name: 'sql',
    component: Sql
  },
  {
    path: '/screen-recorder',
    name: 'screen recorder',
    component: ScreenRecorder
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/inmarket',
    name: 'InMarket',
    component: InMarket
  },
  {
    path: '/downloader',
    name: 'Downloader',
    component: Downloader
  },
  {
    path: '/audio',
    name: 'Audio',
    component: Audio
  },
  {
    path: '/local-storage',
    name: 'Local Storage',
    component: LocalStorage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
