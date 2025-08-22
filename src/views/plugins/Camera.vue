<template>
  <ion-page>
    <div id="cam-prev" class="relative w-full h-screen bg-transparent">
      <!-- Top Controls -->
      <div class="absolute top-0 right-0 left-0 z-10 p-4">
        <div class="flex justify-between items-center">
          <button @click="goBack" class="flex justify-center items-center w-12 h-12 text-white rounded-full bg-black/50">
            <ion-icon name="arrow-back" size="large"></ion-icon>
          </button>
          <div class="flex gap-2">
            <button @click="switchCamera" class="flex justify-center items-center w-12 h-12 text-white rounded-full bg-black/50">
              <ion-icon name="camera-reverse" size="large"></ion-icon>
            </button>
            <button @click="toggleFlash" class="flex justify-center items-center w-12 h-12 text-white rounded-full bg-black/50">
              <ion-icon :name="flashIcon" size="large"></ion-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Photo Gallery Preview -->
      <div v-if="capturedPhotos.length > 0" class="absolute right-4 left-4 top-16 z-10">
        <div class="flex overflow-x-auto gap-2 pb-2">
          <div
            v-for="(photo, index) in capturedPhotos"
            :key="index"
            class="overflow-hidden flex-shrink-0 w-16 h-16 rounded-lg border-2 border-white"
          >
            <img :src="photo" class="object-cover w-full h-full" />
          </div>
        </div>
      </div>

      <!-- Camera Info -->
      <div class="absolute left-4 top-32 z-10 p-3 text-sm text-white rounded-lg bg-black/50">
        <div>Camera: {{ currentCamera }}</div>
        <div>Flash: {{ flashMode }}</div>
        <div>Zoom: {{ zoomLevel }}x</div>
        <div>Photos: {{ capturedPhotos.length }}</div>
      </div>

      <!-- Bottom Controls -->
      <div class="absolute right-0 bottom-0 left-0 z-10 p-6">
        <!-- Zoom Slider -->
        <div class="mb-6">
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            v-model="zoomLevel"
            @input="setZoom"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div class="mt-1 text-sm text-center text-white">{{ zoomLevel }}x</div>
        </div>

        <!-- Main Action Buttons -->
        <div class="flex gap-4 justify-center items-center">
          <!-- Photo Gallery Button -->
          <button
            @click="showGallery = !showGallery"
            class="flex justify-center items-center w-14 h-14 text-white rounded-full bg-white/20"
          >
            <ion-icon name="images" size="large"></ion-icon>
          </button>

          <!-- Take Photo Button -->
          <button
            @click="takePhoto"
            :disabled="isCapturing"
            class="flex justify-center items-center w-20 h-20 rounded-full border-4 border-white"
            :class="{
              'bg-white/30': !isCapturing,
              'bg-red-500/50': isCapturing
            }"
          >
            <div class="w-16 h-16 bg-white rounded-full"></div>
          </button>

          <!-- Record Video Button -->
          <button @click="record" class="flex justify-center items-center w-14 h-14 rounded-full">
            <div
              class="w-12 h-12 rounded-full"
              :class="{
                'bg-red-600': isRecording,
                'bg-white': !isRecording,
              }"
            ></div>
          </button>
        </div>

        <!-- Settings Panel -->
        <div class="p-4 mt-6 text-white rounded-lg bg-black/70">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 text-xs">Quality</label>
              <select v-model="photoQuality" class="p-2 w-full text-sm text-white bg-gray-800 rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="max">Max</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 text-xs">Format</label>
              <select v-model="photoFormat" class="p-2 w-full text-sm text-white bg-gray-800 rounded">
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Full Screen Gallery -->
      <div
        v-if="showGallery"
        class="flex absolute inset-0 z-20 justify-center items-center bg-black"
        @click="showGallery = false"
      >
        <div class="p-4 w-full h-full" @click.stop>
          <div class="grid overflow-y-auto grid-cols-3 gap-2 h-full">
            <div
              v-for="(photo, index) in capturedPhotos"
              :key="index"
              class="overflow-hidden rounded-lg aspect-square"
            >
              <img :src="photo" class="object-cover w-full h-full" />
            </div>
          </div>
          <button
            @click="clearGallery"
            class="flex absolute top-4 right-4 justify-center items-center w-12 h-12 text-white bg-red-500 rounded-full"
          >
            <ion-icon name="trash" size="large"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, computed } from 'vue';
  import { IonPage, useIonRouter } from '@ionic/vue'
  import { CameraPreview } from '@capgo/camera-preview'
  import { Uploader } from '@capgo/capacitor-uploader';
  import { Capacitor } from '@capacitor/core';

  // Camera state
  const isRecording = ref(false)
  const isCapturing = ref(false)
  const currentCamera = ref('back')
  const flashMode = ref('off')
  const zoomLevel = ref(1)
  const capturedPhotos = ref<string[]>([])
  const showGallery = ref(false)
  const photoQuality = ref('high')
  const photoFormat = ref('jpeg')

  const ionRouter = useIonRouter();

  // Computed properties
  const flashIcon = computed(() => {
    switch (flashMode.value) {
      case 'on': return 'flash'
      case 'off': return 'flash-off'
      case 'auto': return 'flash-auto'
      default: return 'flash-off'
    }
  })

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

  // Camera Controls
  async function switchCamera() {
    try {
      const newCamera = currentCamera.value === 'back' ? 'front' : 'back'
      // Note: Camera switching might need to restart preview with new camera
      await CameraPreview.stop()
      await CameraPreview.start({
        toBack: true,
        parent: 'cam-prev',
        storeToFile: true
      })
      currentCamera.value = newCamera
    } catch (error) {
      console.error('Failed to switch camera:', error)
    }
  }

  async function toggleFlash() {
    try {
      const modes = ['off', 'on', 'auto']
      const currentIndex = modes.indexOf(flashMode.value)
      const nextMode = modes[(currentIndex + 1) % modes.length]

      await CameraPreview.setFlashMode({ flashMode: nextMode })
      flashMode.value = nextMode
    } catch (error) {
      console.error('Failed to toggle flash:', error)
    }
  }

  async function setZoom() {
    try {
      // Note: Zoom functionality might be limited in this plugin version
      console.log('Zoom set to:', zoomLevel.value)
    } catch (error) {
      console.error('Failed to set zoom:', error)
    }
  }

  // Photo Capture
  async function takePhoto() {
    if (isCapturing.value) return

    try {
      isCapturing.value = true

      const options = {
        quality: getQualityValue(),
        width: 1920,
        height: 1080
      }

      const photo = await CameraPreview.capture(options)
      console.log('Photo captured:', photo)

      // Convert file path to displayable URL
      if (photo.value) {
        const photoUrl = Capacitor.convertFileSrc(photo.value)
        capturedPhotos.value.unshift(photoUrl)
      }

    } catch (error) {
      console.error('Failed to take photo:', error)
    } finally {
      isCapturing.value = false
    }
  }

  function getQualityValue(): number {
    switch (photoQuality.value) {
      case 'low': return 30
      case 'medium': return 60
      case 'high': return 85
      case 'max': return 100
      default: return 85
    }
  }

  // Video Recording
  async function record() {
    try {
      if (!isRecording.value) {
        isRecording.value = true
        await CameraPreview.startRecordVideo({
          storeToFile: true
        })
      } else {
        isRecording.value = false
        const fileUrl = await CameraPreview.stopRecordVideo()
        console.log('Video recorded:', fileUrl.videoFilePath)

        // Optional: Upload video
        await uploadFile(fileUrl.videoFilePath, 'mp4')
      }
    } catch (error) {
      console.error('Failed to record video:', error)
      isRecording.value = false
    }
  }

  // Gallery Management
  function clearGallery() {
    capturedPhotos.value = []
  }

  // File Upload
  async function uploadFile(filePath: string, extension: string) {
    try {
      const randomId = makeid(8)
      console.log(`Attempt to upload ${randomId}`)

      const urlReq = await fetch(`https://capacitor-uploader-test-bucket-upload.digitalshift-ee.workers.dev/${randomId}.${extension}`, {
        headers: {
          'Authorization': 'Bearer [removed]'
        },
        method: 'GET'
      })

      const uploadUrl = (await urlReq.json() as any).url as string
      console.log('upload url', uploadUrl)

      const { id } = await Uploader.startUpload({
        filePath: filePath,
        serverUrl: uploadUrl,
        method: 'PUT',
        headers: {},
      });

      console.log(`Plugin returned ${id}`)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  // Camera Preview Setup
  onMounted(async () => {
    try {
      await CameraPreview.start({
        toBack: true,
        parent: 'cam-prev',
        storeToFile: true
      })

      // Set up uploader listener
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

    } catch (error) {
      console.error('Failed to start camera preview:', error)
    }
  })

  // Style injection for transparent background
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
    // Cleanup camera
    CameraPreview.stop()

    // Cleanup styles
    const element = document.getElementById('magic_61652e0d-6530-4015-aa6d-7686e0038bc5');

    if (element) {
      element.remove();
    } else {
      console.log(`No element found with ID "magic_61652e0d-6530-4015-aa6d-7686e0038bc5".`);
    }
  })
</script>
