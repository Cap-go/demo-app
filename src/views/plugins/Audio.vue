<script setup lang="ts">
import { ref } from 'vue'
import { NativeAudio } from '@capgo/native-audio'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';

const audioStatus = ref('')

const preloadLocalAudio = async () => {
  try {
    await NativeAudio.preload({
      assetId: "local",
      assetPath: "public/campfire-1.mp3",
      audioChannelNum: 1,
      isUrl: false
    })
    audioStatus.value = 'Local audio preloaded'
  } catch (error) {
    audioStatus.value = `Error preloading local: ${error}`
  }
}

const preloadRemoteAudio = async () => {
  try {
    await NativeAudio.preload({
      assetId: "remote",
      assetPath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      audioChannelNum: 1,
      isUrl: true
    })
    audioStatus.value = 'Remote audio preloaded'
  } catch (error) {
    audioStatus.value = `Error preloading remote: ${error}`
  }
}

const preloadStreamAudio = async () => {
  try {
    await NativeAudio.preload({
      assetId: "stream",
      assetPath: "https://stream.radiomaria.pt:8443/porto-64.aac",
      audioChannelNum: 1,
      isUrl: true
    })
    audioStatus.value = 'Stream audio preloaded'
  } catch (error) {
    audioStatus.value = `Error preloading stream: ${error}`
  }
}

const playAudio = async (id: string) => {
  try {
    await NativeAudio.play({
      assetId: id,
      time: 0
    })
    audioStatus.value = `Playing ${id} audio`
  } catch (error) {
    audioStatus.value = `Error playing ${id}: ${error}`
  }
}

const stopAudio = async (id: string) => {
  try {
    await NativeAudio.stop({
      assetId: id
    })
    audioStatus.value = `${id} audio stopped`
  } catch (error) {
    audioStatus.value = `Error stopping ${id}: ${error}`
  }
}

const unloadAudio = async (id: string) => {
  try {
    await NativeAudio.unload({
      assetId: id
    })
    audioStatus.value = `${id} audio unloaded`
  } catch (error) {
    audioStatus.value = `Error unloading ${id}: ${error}`
  }
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Capgo cloud demo (audio)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <div class="flex flex-col items-center justify-center p-4 space-y-8">
              <h1 class="text-2xl font-bold">Native Audio Test</h1>
              
              <div class="flex flex-col w-full max-w-md space-y-6">
                <!-- Local Audio -->
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold">Local Audio</h2>
                  <div class="flex space-x-2">
                    <ion-button @click="preloadLocalAudio">Preload</ion-button>
                    <ion-button @click="() => playAudio('local')">Play</ion-button>
                    <ion-button @click="() => stopAudio('local')">Stop</ion-button>
                    <ion-button @click="() => unloadAudio('local')">Unload</ion-button>
                  </div>
                </div>

                <!-- Remote Audio -->
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold">Remote Audio</h2>
                  <div class="flex space-x-2">
                    <ion-button @click="preloadRemoteAudio">Preload</ion-button>
                    <ion-button @click="() => playAudio('remote')">Play</ion-button>
                    <ion-button @click="() => stopAudio('remote')">Stop</ion-button>
                    <ion-button @click="() => unloadAudio('remote')">Unload</ion-button>
                  </div>
                </div>

                <!-- Stream Audio -->
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold">Stream Audio (M3U8)</h2>
                  <div class="flex space-x-2">
                    <ion-button @click="preloadStreamAudio">Preload</ion-button>
                    <ion-button @click="() => playAudio('stream')">Play</ion-button>
                    <ion-button @click="() => stopAudio('stream')">Stop</ion-button>
                    <ion-button @click="() => unloadAudio('stream')">Unload</ion-button>
                  </div>
                </div>
              </div>

              <p class="text-gray-700">{{ audioStatus }}</p>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template> 
