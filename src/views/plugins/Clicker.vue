<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Capgo cloud demo (clicker)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <strong>Ready to create an app?</strong>
            <p>Start with Capgo Cloud!</p>
            <p class="mb-6">Count v0: {{ count }}!</p>

            <ion-button @click="() => count += 1">Click me!</ion-button>
            <ion-button @click="() => popoutStore.popout('Funny popout', 'I am a funny popout')">Funny popout!</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';
import { onMounted, ref } from 'vue'
import { usePopoutStore } from '@/popoutStore';
import { CapacitorShake } from '@capgo/capacitor-shake';

const popoutStore = usePopoutStore()
const count = ref(0)

onMounted(() => {
  CapacitorShake.addListener('shake', () => {
    console.log('shake!!')
    popoutStore.popout('Phone has been shaken', 'You have shaken your device!')
  })
})
</script>
