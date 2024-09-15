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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
