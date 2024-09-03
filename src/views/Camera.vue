<template>
  <ion-page>
      <div id="cam-prev" class="flex w-full h-screen bg-transparent">
      <button @click="record">
        <div class="w-16 h-16" :class="{
          'bg-orange-600': isRecording,
          'bg-lime-600': !isRecording,
        }">
        </div>
      </button>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { IonPage } from '@ionic/vue'
  import { CameraPreview } from '@capgo/camera-preview'
  import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


  const isRecording = ref(false)

  async function record() {
    if (!isRecording.value) {
      isRecording.value = true
      await CameraPreview.startRecordVideo({ storeToFile: true })
    } else {
      isRecording.value = false
      const fileUrl = await CameraPreview.stopRecordVideo()
      console.log(fileUrl.videoFilePath)
      const contents = await Filesystem.readFile({
        path: fileUrl.videoFilePath,
      });
      console.log(contents.data.length)
    }
  }

  onMounted(async () => {
    await CameraPreview.start({
      toBack: true,
      parent: 'cam-prev'
    })
  })
</script>