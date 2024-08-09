<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Capgo cloud demo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <strong>Ready to create an app?</strong>
            <p>Start with Capgo Cloud!</p>
            <p>Count v0: {{ count }}!</p>

            <ion-button @click="() => count += 1">Click me!</ion-button>
            <ion-button @click="() => CapacitorUpdater.reset()">Hard reset!!</ion-button>
            <ion-button @click="() => questionMark()">??</ion-button>

          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow } from '@ionic/vue';
import { ref } from 'vue';
import { CapacitorUpdater } from '@capgo/capacitor-updater'

function questionMark() {

}


const count = ref(0)
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
