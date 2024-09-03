<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { IonApp, IonRouterOutlet } from '@ionic/vue';

CapacitorUpdater.notifyAppReady()

// await new Promise(r => setTimeout(r, 2000));
// await CapacitorUpdater.setMultiDelay({
//   delayConditions: [ { kind: "kill" } ]
// })
// console.log('RESOLVED')
</script>>
