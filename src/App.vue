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
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { IonApp, IonRouterOutlet, IonAlert } from '@ionic/vue';
import { usePopoutStore } from './popoutStore';
const popoutStore = usePopoutStore()

CapacitorUpdater.notifyAppReady()

// await new Promise(r => setTimeout(r, 2000));
// await CapacitorUpdater.setMultiDelay({
//   delayConditions: [ { kind: "kill" } ]
// })
// console.log('RESOLVED')
</script>>
