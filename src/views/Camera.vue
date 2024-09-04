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
  import { Filesystem } from '@capacitor/filesystem';
  import { Uploader } from '@capgo/capacitor-uploader';

  const isRecording = ref(false)

  function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

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

      const randomId = makeid(8)
      console.log(`Attempt to upload ${randomId}`)
      const { id } = await Uploader.startUpload({
        filePath: fileUrl.videoFilePath,
        serverUrl: `https://capacitor-uploader-test-bucket-upload.digitalshift-ee.workers.dev/${randomId}.mp4`,
        method: 'PUT',
        // parameters: fields,
        headers: {
          'Authorization': 'Bearer 50b411b4-0f97-4240-afe3-e5a452b2daff'
        },
        // notificationTitle: 'Uploading to S3'
      });

      console.log(`Plugin returned ${id}`)

    }
  }

  onMounted(async () => {
    await CameraPreview.start({
      toBack: true,
      parent: 'cam-prev'
    })

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
  })
</script>