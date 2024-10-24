<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Downloader</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button expand="block" @click="startDownload">Start Download</ion-button>
      <ion-progress-bar v-if="downloadProgress > 0" :value="downloadProgress / 100"></ion-progress-bar>
      <p v-if="downloadStatus">{{ downloadStatus }}</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonProgressBar } from '@ionic/vue';
import { CapacitorDownloader } from '@capgo/capacitor-downloader';

const downloadProgress = ref(0);
const downloadStatus = ref('');

const startDownload = async () => {
  try {
    downloadStatus.value = 'Starting download...';
    const result = await CapacitorDownloader.download({
      url: 'https://github.com/szalony9szymek/large/releases/download/free/large',
      fileName: 'large-file',
    });

    // CapacitorDownloader.addListener('progress', (data) => {
    //   downloadProgress.value = data.percent;
    // });

    // CapacitorDownloader.addListener('completed', () => {
    //   downloadStatus.value = 'Download completed!';
    //   downloadProgress.value = 100;
    // });

    console.log('Download started:', result);
  } catch (error) {
    console.error('Download error:', error);
    downloadStatus.value = 'Download failed. Please try again.';
  }
};
</script>
