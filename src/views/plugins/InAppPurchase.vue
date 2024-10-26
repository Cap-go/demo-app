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
            <p>Spend some money!</p>
            <p class="mb-6"></p>

            <ion-button @click="() => buyHappiness()">buy happiness</ion-button>
            <ion-button @click="() => buySkiPass()">buy skipass</ion-button>
            <ion-button @click="() => useSkiPass()">useSkiPass</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { usePopoutStore } from '@/popoutStore';
import { NativePurchases } from '@capgo/native-purchases';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';
import { ref } from 'vue'

const popoutStore = usePopoutStore()

async function buyHappiness() {
  await NativePurchases.purchaseProduct({ productIdentifier: 'me.wcaleniewolny.testapp.happines' })
}

async function buySkiPass() {
  await NativePurchases.purchaseProduct({ productIdentifier: 'me.wcaleniewolny.testapp.skipass' })
}

async function useSkiPass() {
  const prod = (await NativePurchases.getProducts({ productIdentifiers: ['me.wcaleniewolny.testapp.skipass'] })).products.at(0)
  popoutStore.popout('product', JSON.stringify(prod))
}

const count = ref(0)
</script>
