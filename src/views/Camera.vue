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
      <button class="p-2 text-white bg-blue-500 rounded-md" @click="handleUpload">Upload</button>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { IonPage } from '@ionic/vue'
  import { CameraPreview } from '@capgo/camera-preview'
  // import { Filesystem } from '@capacitor/filesystem';
  import { Uploader } from '@capgo/capacitor-uploader';


  const isRecording = ref(false)
  const videoUrl = ref('')

  async function record() {
    if (!isRecording.value) {
      isRecording.value = true
      await CameraPreview.startRecordVideo({ storeToFile: true })
    } else {
      isRecording.value = false
      const fileUrl = await CameraPreview.stopRecordVideo()
      console.log(fileUrl.videoFilePath)
      videoUrl.value = fileUrl.videoFilePath
    }
  }

  async function uploadVideo() {
    Uploader.addListener('events', (event) => {
      switch (event.name) {
        case 'uploading':
          console.log(`Upload progress: ${event.payload.percent}%`);
          break;
        case 'completed':
          console.log('Upload completed successfully');
          console.log('Server response status code:', event.payload.statusCode);
          break;
        case 'failed':
          console.error('Upload failed:', event.payload.error);
          break;
      }
    });
    try {
      const result = await Uploader.startUpload({
        filePath: videoUrl.value,
        serverUrl: '****', // Replace with your actual upload URL
        method: 'PUT',
        headers: {
          'Content-Type': 'video/mp4',
          // Add any other required headers
        },
        // Add any other required options
      });
      console.log('Video uploaded successfully:', result.id);
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }

  async function handleUpload() {
    if (!isRecording.value) {
        try {
        const uploadedId = await uploadVideo();
        console.log('Video uploaded to:', uploadedId);
      } catch (error) {
        console.error('Failed to upload video:', error);
      }
    }
  }

  onMounted(async () => {
    await CameraPreview.start({
      toBack: true,
      parent: 'cam-prev'
    })
  })
</script>
