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
            <div class="flex flex-col items-center justify-center p-4 space-y-8">
              <h1 class="text-2xl font-bold">Screen Recorder Test</h1>
              
              <div class="flex flex-col w-full max-w-md space-y-6">
                <!-- Recording Controls -->
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold">Recording Controls</h2>
                  <div class="flex flex-wrap gap-2">
                    <ion-button 
                      @click="record" 
                      color="success"
                    >
                      {{ recording ? 'Stop Recording' : 'Start Recording' }}
                    </ion-button>
                  </div>
                </div>
              </div>

              <p class="text-gray-700">{{ recorderStatus }}</p>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';
import { ref } from 'vue'
import { ScreenRecorder } from '@capgo/capacitor-screen-recorder';

const recording = ref(false)
const recorderStatus = ref('')

const record = async () => {
  try {
    if (!recording.value) {
      await ScreenRecorder.start()
      recording.value = true
      recorderStatus.value = 'Recording started'
    } else {
      await ScreenRecorder.stop()
      recording.value = false
      recorderStatus.value = 'Recording stopped'
    }
  } catch (error) {
    recorderStatus.value = `Error: ${error}`
  }
}
</script>
