<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Capgo cloud demo (recorder)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <strong>Ready to create an app?</strong>
            <p>Start with Capgo Recorder!</p>
            <p class="mb-6">Recording: {{ recording ? 'yes' : 'no'}}!</p>

            <ion-button @click="() => record()">Record!</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton } from '@ionic/vue';
import { onMounted, ref } from 'vue'
import { ScreenRecorder } from '@capgo/capacitor-screen-recorder';

const recording = ref(false)

async function record() {
  if (!recording.value) {
    await ScreenRecorder.start()
    recording.value = true
  } else {
    console.log(`Recorded: ${await ScreenRecorder.stop()}`)
    recording.value = false
  }
}
</script>