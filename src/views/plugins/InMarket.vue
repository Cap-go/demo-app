<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Capgo cloud demo (inmarket)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <strong>Ready to use InMarket?</strong>
            <ion-button @click="() => setUserID()">setUserID</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';
// import { CapacitorInMarket } from '@primeinsightsgroupllc/capacitor-inmarket';


async function setUserID() {
  try {
    // await CapacitorInMarket.setUserId({ userId: '1234567890' });
    // await CapacitorInMarket.startMonitoring();
  } catch (e) {
    console.log('INMARKET error:', e);
  }
}

async function main() {

console.log('Ready to test INMARKET:::');

try {
  console.log('Before INMARKET checkPermissions');
  // const status = await CapacitorInMarket.checkPermissions();
  // console.log('INMARKET permissions status:', status);
} catch (e) {
  console.log('INMARKET checkPermissions error:', e);
}

try {
  console.log('Before INMARKET requestPermissions');
  // const permissions = await CapacitorInMarket.requestPermissions();
  // console.log('INMARKET permissions:', permissions);
  // if (permissions.location === 'granted') {
  //   console.log('INMARKET permissions granted');
  //   await CapacitorInMarket.startMonitoring();
  // } else {
  //   console.log('INMARKET permissions not granted');
  // }
} catch (e) {
  console.log('INMARKET requestPermissions error:', e);
  }
  console.log('INMARKET inited done !!');
}

main();

</script>
