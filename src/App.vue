<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { IonApp, IonRouterOutlet } from '@ionic/vue';

CapacitorUpdater.notifyAppReady()

await CapacitorUpdater.setMultiDelay({
  delayConditions: [ { kind: "kill" } ]
})
</script>>
