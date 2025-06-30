<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NativeAudio } from '@capgo/native-audio'
import type { PluginListenerHandle } from '@capacitor/core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons, IonRange } from '@ionic/vue';

const audioStatus = ref('')
const currentVolume = ref(1)
const currentRate = ref(1)
const currentTime = ref(0)
const duration = ref(0)
let completeListener: PluginListenerHandle | null = null
let currentTimeListener: PluginListenerHandle | null = null

onMounted(async () => {
  await configureAudio()
  completeListener = await NativeAudio.addListener('complete', (event) => {
    audioStatus.value = `Audio ${event.assetId} completed`
  })
  currentTimeListener = await NativeAudio.addListener('currentTime', (event) => {
    currentTime.value = event.currentTime
  })
})

onUnmounted(async () => {
  if (completeListener) {
    await completeListener.remove()
  }
  if (currentTimeListener) {
    await currentTimeListener.remove()
  }
})

const configureAudio = async () => {
  try {
    await NativeAudio.configure({
      fade: true,
      focus: true,
      background: true
    })
    audioStatus.value = 'Audio configured'
  } catch (error) {
    audioStatus.value = `Error configuring: ${error}`
  }
}

const preloadLocalAudio = async () => {
  try {
    await NativeAudio.preload({
      assetId: "local",
      assetPath: "public/campfire-1.mp3",
      audioChannelNum: 1,
      volume: currentVolume.value,
      isUrl: false
    })
    duration.value = (await NativeAudio.getDuration({ assetId: "local" })).duration
    audioStatus.value = `Local audio preloaded`
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
      volume: currentVolume.value,
      isUrl: true
    })
    duration.value = (await NativeAudio.getDuration({ assetId: "remote" })).duration
    audioStatus.value = 'Remote audio preloaded'
  } catch (error) {
    audioStatus.value = `Error preloading remote: ${error}`
  }
}

const preloadStreamAudio = async () => {
  try {
    await NativeAudio.preload({
      assetId: "stream",
      assetPath: "https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8",
      audioChannelNum: 1,
      volume: currentVolume.value,
      isUrl: true
    })
    duration.value = (await NativeAudio.getDuration({ assetId: "stream" })).duration
    audioStatus.value = 'Stream audio preloaded'
  } catch (error) {
    audioStatus.value = `Error preloading stream: ${error}`
  }
}

const playAudio = async (id: string) => {
  try {
    const isPreloaded = await NativeAudio.isPreloaded({ assetId: id, assetPath: "" })
    if (!isPreloaded.found) {
      audioStatus.value = `Audio ${id} not preloaded`
      return
    }
    await NativeAudio.play({
      assetId: id,
      time: 0,
      delay: 0
    })
    audioStatus.value = `Playing ${id} audio`
  } catch (error) {
    audioStatus.value = `Error playing ${id}: ${error}`
  }
}

const pauseAudio = async (id: string) => {
  try {
    await NativeAudio.pause({ assetId: id })
    audioStatus.value = `${id} audio paused`
  } catch (error) {
    audioStatus.value = `Error pausing ${id}: ${error}`
  }
}

const resumeAudio = async (id: string) => {
  try {
    await NativeAudio.resume({ assetId: id })
    audioStatus.value = `${id} audio resumed`
  } catch (error) {
    audioStatus.value = `Error resuming ${id}: ${error}`
  }
}

const loopAudio = async (id: string) => {
  try {
    await NativeAudio.loop({ assetId: id })
    audioStatus.value = `${id} audio looping`
  } catch (error) {
    audioStatus.value = `Error looping ${id}: ${error}`
  }
}

const stopAudio = async (id: string) => {
  try {
    await NativeAudio.stop({ assetId: id })
    audioStatus.value = `${id} audio stopped`
  } catch (error) {
    audioStatus.value = `Error stopping ${id}: ${error}`
  }
}

const unloadAudio = async (id: string) => {
  try {
    await NativeAudio.unload({ assetId: id })
    audioStatus.value = `${id} audio unloaded`
  } catch (error) {
    audioStatus.value = `Error unloading ${id}: ${error}`
  }
}

const setVolume = async (id: string) => {
  try {
    await NativeAudio.setVolume({ assetId: id, volume: currentVolume.value })
    audioStatus.value = `${id} volume set to ${currentVolume.value}`
  } catch (error) {
    audioStatus.value = `Error setting volume for ${id}: ${error}`
  }
}

const setRate = async (id: string) => {
  try {
    await NativeAudio.setRate({ assetId: id, rate: currentRate.value })
    audioStatus.value = `${id} rate set to ${currentRate.value}`
  } catch (error) {
    audioStatus.value = `Error setting rate for ${id}: ${error}`
  }
}

const setCurrentTime = async (id: string) => {
  try {
    await NativeAudio.setCurrentTime({ assetId: id, time: currentTime.value })
    audioStatus.value = `${id} time set to ${currentTime.value}`
  } catch (error) {
    audioStatus.value = `Error setting time for ${id}: ${error}`
  }
}

const clearAudioCache = async () => {
  try {
    await NativeAudio.clearCache()
    audioStatus.value = 'Audio cache cleared'
  } catch (error) {
    audioStatus.value = `Error clearing cache: ${error}`
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
      <p class="text-gray-700">{{ audioStatus }}</p>
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <div class="flex flex-col justify-center items-center p-4 space-y-8">
              <h1 class="text-2xl font-bold">Native Audio Test</h1>
              
              <div class="flex flex-col space-y-6 w-full max-w-md">
                <!-- Controls -->
                <div class="space-y-4">
                  <h2 class="text-xl font-semibold">Controls</h2>
                  <div class="space-y-2">
                    <div>
                      <label>Volume ({{ currentVolume }})</label>
                      <ion-range v-model="currentVolume" min="0.1" max="1" step="0.1"></ion-range>
                    </div>
                    <div>
                      <label>Rate ({{ currentRate }})</label>
                      <ion-range v-model="currentRate" min="0.1" max="2" step="0.1"></ion-range>
                    </div>
                    <div>
                      <label>Time ({{ currentTime }}/{{ duration }})</label>
                      <ion-range v-model="currentTime" :min="0" :max="duration" step="1"></ion-range>
                    </div>
                  </div>
                  <ion-button @click="clearAudioCache">Clear Cache</ion-button>
                </div>

                <!-- Local Audio -->
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold">Local Audio</h2>
                  <div class="flex flex-wrap gap-2">
                    <ion-button @click="preloadLocalAudio">Preload</ion-button>
                    <ion-button @click="() => playAudio('local')">Play</ion-button>
                    <ion-button @click="() => pauseAudio('local')">Pause</ion-button>
                    <ion-button @click="() => resumeAudio('local')">Resume</ion-button>
                    <ion-button @click="() => loopAudio('local')">Loop</ion-button>
                    <ion-button @click="() => stopAudio('local')">Stop</ion-button>
                    <ion-button @click="() => unloadAudio('local')">Unload</ion-button>
                    <ion-button @click="() => setVolume('local')">Set Volume</ion-button>
                    <ion-button @click="() => setRate('local')">Set Rate</ion-button>
                    <ion-button @click="() => setCurrentTime('local')">Set Time</ion-button>
                  </div>
                </div>

                <!-- Remote Audio -->
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold">Remote Audio</h2>
                  <div class="flex flex-wrap gap-2">
                    <ion-button @click="preloadRemoteAudio">Preload</ion-button>
                    <ion-button @click="() => playAudio('remote')">Play</ion-button>
                    <ion-button @click="() => pauseAudio('remote')">Pause</ion-button>
                    <ion-button @click="() => resumeAudio('remote')">Resume</ion-button>
                    <ion-button @click="() => loopAudio('remote')">Loop</ion-button>
                    <ion-button @click="() => stopAudio('remote')">Stop</ion-button>
                    <ion-button @click="() => unloadAudio('remote')">Unload</ion-button>
                    <ion-button @click="() => setVolume('remote')">Set Volume</ion-button>
                    <ion-button @click="() => setRate('remote')">Set Rate</ion-button>
                    <ion-button @click="() => setCurrentTime('remote')">Set Time</ion-button>
                  </div>
                </div>

                <!-- Stream Audio -->
                <div class="space-y-2">
                  <h2 class="text-xl font-semibold">Stream Audio (M3U8)</h2>
                  <div class="flex flex-wrap gap-2">
                    <ion-button @click="preloadStreamAudio">Preload</ion-button>
                    <ion-button @click="() => playAudio('stream')">Play</ion-button>
                    <ion-button @click="() => pauseAudio('stream')">Pause</ion-button>
                    <ion-button @click="() => resumeAudio('stream')">Resume</ion-button>
                    <ion-button @click="() => loopAudio('stream')">Loop</ion-button>
                    <ion-button @click="() => stopAudio('stream')">Stop</ion-button>
                    <ion-button @click="() => unloadAudio('stream')">Unload</ion-button>
                    <ion-button @click="() => setVolume('stream')">Set Volume</ion-button>
                    <ion-button @click="() => setRate('stream')">Set Rate</ion-button>
                    <ion-button @click="() => setCurrentTime('stream')">Set Time</ion-button>
                  </div>
                </div>
              </div>

            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template> 
