<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Downloader</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button expand="block" @click="startDownload" :disabled="downloadTask?.state === 'RUNNING'">Start Download</ion-button>
      <ion-button expand="block" @click="pauseDownload" :disabled="downloadTask?.state !== 'RUNNING'">Pause Download</ion-button>
      <ion-button expand="block" @click="resumeDownload" :disabled="downloadTask?.state !== 'PAUSED'">Resume Download</ion-button>
      <ion-button expand="block" @click="stopDownload" :disabled="!downloadTask || downloadTask.state === 'DONE' || downloadTask.state === 'ERROR'">Stop Download</ion-button>
      
      <ion-progress-bar v-if="downloadTask" :value="downloadTask.progress / 100"></ion-progress-bar>
      <p>Status: {{ downloadTask?.state || 'Not started' }}</p>
      <p v-if="downloadTask">Progress: {{ downloadTask.progress.toFixed(2) }}%</p>
      
      <ion-item v-if="fileInfo">
        <ion-label>
          <h2>File Info</h2>
          <p>Size: {{ formatFileSize(fileInfo.size) }}</p>
          <p>Type: {{ fileInfo.type }}</p>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonProgressBar, IonItem, IonLabel } from '@ionic/vue';
import { CapacitorDownloader, DownloadTask, DownloadOptions } from '@capgo/capacitor-downloader';
import type { PluginListenerHandle } from "@capacitor/core";

const downloadTask = ref<DownloadTask | null>(null);
const fileInfo = ref<{ size: number; type: string } | null>(null);

const downloadOptions: DownloadOptions = {
  id: 'large-file-download',
  url: 'https://examplefile.com/file-download/40',
  destination: 'large-file',
  network: 'wifi-only',
  priority: 'normal'
};

const startDownload = async () => {
  try {
    downloadTask.value = await CapacitorDownloader.download(downloadOptions);
  } catch (error) {
    console.error('Download error:', error);
  }
};

const pauseDownload = async () => {
  if (downloadTask.value) {
    await CapacitorDownloader.pause(downloadTask.value.id);
  }
};

const resumeDownload = async () => {
  if (downloadTask.value) {
    await CapacitorDownloader.resume(downloadTask.value.id);
  }
};

const stopDownload = async () => {
  if (downloadTask.value) {
    await CapacitorDownloader.stop(downloadTask.value.id);
  }
};

const getFileInfo = async () => {
  try {
    fileInfo.value = await CapacitorDownloader.getFileInfo(downloadOptions.destination);
  } catch (error) {
    console.error('Error getting file info:', error);
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

let progressListener: PluginListenerHandle;
let completedListener: PluginListenerHandle;
let failedListener: PluginListenerHandle;

onMounted(async () => {
  progressListener = await CapacitorDownloader.addListener('downloadProgress', (progress) => {
    if (downloadTask.value && progress.id === downloadTask.value.id) {
      downloadTask.value.progress = progress.progress;
    }
  });

  completedListener = await CapacitorDownloader.addListener('downloadCompleted', (result) => {
    if (downloadTask.value && result.id === downloadTask.value.id) {
      downloadTask.value.state = 'DONE';
      downloadTask.value.progress = 100;
      getFileInfo();
    }
  });

  failedListener = await CapacitorDownloader.addListener('downloadFailed', (error) => {
    if (downloadTask.value && error.id === downloadTask.value.id) {
      downloadTask.value.state = 'ERROR';
      console.error('Download failed:', error.error);
    }
  });
});

onUnmounted(async () => {
  if (progressListener) await progressListener.remove();
  if (completedListener) await completedListener.remove();
  if (failedListener) await failedListener.remove();
  await CapacitorDownloader.removeAllListeners();
});
</script>
