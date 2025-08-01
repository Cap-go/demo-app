<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Device Info Test</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <strong>Device Information</strong>
            <p>Test Device.getInfo() functionality</p>
            
            <ion-button @click="getDeviceInfo" expand="block" class="mb-4">
              Get Device Info
            </ion-button>

            <template v-if="deviceInfo">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Device Details</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-list>
                    <ion-item>
                      <ion-label>
                        <h3>Model</h3>
                        <p>{{ deviceInfo.model }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Platform</h3>
                        <p>{{ deviceInfo.platform }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Operating System</h3>
                        <p>{{ deviceInfo.operatingSystem }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>OS Version</h3>
                        <p>{{ deviceInfo.osVersion }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Manufacturer</h3>
                        <p>{{ deviceInfo.manufacturer }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Is Virtual</h3>
                        <p>{{ deviceInfo.isVirtual ? 'Yes' : 'No' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Memory Used</h3>
                        <p>{{ deviceInfo.memUsed ? `${Math.round(deviceInfo.memUsed / 1024 / 1024)} MB` : 'N/A' }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <h3>Web View Version</h3>
                        <p>{{ deviceInfo.webViewVersion || 'N/A' }}</p>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                </ion-card-content>
              </ion-card>
            </template>

            <template v-if="error">
              <ion-card color="danger">
                <ion-card-header>
                  <ion-card-title>Error</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  {{ error }}
                </ion-card-content>
              </ion-card>
            </template>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonCol, 
  IonRow, 
  IonBackButton, 
  IonGrid, 
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
import { ref } from 'vue';
import { Device, DeviceInfo } from '@capacitor/device';

const deviceInfo = ref<DeviceInfo | null>(null);
const error = ref<string | null>(null);

async function getDeviceInfo() {
  try {
    error.value = null;
    const info = await Device.getInfo();
    deviceInfo.value = info;
    console.log('Device info:', info);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error getting device info:', err);
  }
}
</script> 
