<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Capgo cloud demo (updater)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <strong>Update your app</strong>
            <p class="mb-6"></p>

            <ion-button @click="() => hardrestet()">Hard reset!!</ion-button>
            <ion-button @click="() => deleteAll()">Delete all</ion-button>
            <ion-button @click="() => listChannels()">List channels</ion-button>
            <ion-button @click="() => getLatest()">Get latest</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';

async function hardrestet() {
  await CapacitorUpdater.reset()
}

async function deleteAll() {
  const bundles = await CapacitorUpdater.list()
  for (const bundle of bundles.bundles) {
    await CapacitorUpdater.delete({id: bundle.id })
  }
}

async function listChannels() {
  const channels = await CapacitorUpdater.listChannels()
  console.log('channels', channels)
}

async function getLatest() {
  const latest = await CapacitorUpdater.getLatest()
  console.log('latest', latest)
  if (latest.url) {
    const download = await CapacitorUpdater.download({
      url: latest.url,
      version: latest.version,
    })
    console.log('download', download)
    await CapacitorUpdater.set({ id: download.id }).catch(e => console.error(e))
  }
}

</script>
