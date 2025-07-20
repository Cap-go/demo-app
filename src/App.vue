<template>
  <ion-app>
    <ion-alert
      :header="popoutStore.popoutHeader"
      :message="popoutStore.popoutMessage"
      :buttons="['ok']"
      @didDismiss="() => popoutStore.isPopoutOpen = false"
      :is-open="popoutStore.isPopoutOpen"
      cssClass="my-custom-class"
    ></ion-alert>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonAlert } from '@ionic/vue';
import { usePopoutStore } from './popoutStore';
const popoutStore = usePopoutStore()

</script>
