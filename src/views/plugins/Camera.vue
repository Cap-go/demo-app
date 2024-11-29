<template>
  <ion-page>
      <div id="cam-prev" class="flex flex-row w-full h-screen bg-transparent">
      <button @click="goBack" class="w-16 h-16 my-auto bg-blue-500"></button>
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
  import { onMounted, onUnmounted, ref } from 'vue';
  import { IonPage, useIonRouter } from '@ionic/vue'
  import { CameraPreview } from '@capgo/camera-preview'
  import { Uploader } from '@capgo/capacitor-uploader';

  const isRecording = ref(false)
  const ionRouter = useIonRouter();

  function goBack() {
    ionRouter.back()
  }

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
      // const contents = await Filesystem.readFile({
      //   path: fileUrl.videoFilePath,
      // });
      // console.log(contents.data.length)

      const randomId = makeid(8)
      console.log(`Attempt to upload ${randomId}`)

      const urlReq = await fetch(`https://capacitor-uploader-test-bucket-upload.digitalshift-ee.workers.dev/${randomId}.mp4`, {
        headers: {
          'Authorization': 'Bearer [removed]'
        },
        method: 'GET'
      })

      const uploadUrl = (await urlReq.json() as any).url as string
      console.log('upload url', uploadUrl)

      const { id } = await Uploader.startUpload({
        filePath: fileUrl.videoFilePath,
        serverUrl: uploadUrl,
        method: 'PUT',
        // parameters: fields,
        headers: {},
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

  onMounted(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = 
  `:root {
    --ion-background-color: transparent !important;
  }`;
    styleElement.id = 'magic_61652e0d-6530-4015-aa6d-7686e0038bc5'
    document.head.appendChild(styleElement)
  })

  onUnmounted(() => {
    const element = document.getElementById('magic_61652e0d-6530-4015-aa6d-7686e0038bc5');
  
  // Check if the element exists
  if (element) {
    // Remove the element from the DOM
    element.remove();
  } else {
    console.log(`No element found with ID "magic_61652e0d-6530-4015-aa6d-7686e0038bc5".`);
  }
  })
</script>
