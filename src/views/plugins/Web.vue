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

            <ion-button @click="() => openWeb()">web</ion-button>
            <ion-button @click="() => openWebWithPicker()">web</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { InAppBrowser } from '@capgo/inappbrowser';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';
import { onMounted } from 'vue';

const WEB_URL = "https://capgo.app"

async function openWebWithPicker() {
  const picker = await InAppBrowser.openWebView({
    url: 'https://show-picker.glitch.me/demo.html',
  })
  console.log('picker', picker)
}

async function openWeb() {
  // InAppBrowser.open({ url: WEB_URL, isInspectable: true } as any);
  const script =
  "await import('https://unpkg.com/darkreader@4.9.89/darkreader.js');\n" +
  "DarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 });"
  InAppBrowser.openWebView({ 
    url: WEB_URL, 
    isPresentAfterPageLoad: true, 
    preShowScript: script, 
    buttonNearDone: { 
      ios: { icon: 'monkey', iconType: 'asset' },
      android: { icon: 'public/monkey.svg', iconType: 'asset' }
    } 
  })
}

onMounted(async () => {
  console.log('mounted')
  
  InAppBrowser.addListener('messageFromWebview', async (msg) => {
    console.log('MESSAGE FROM WEB VIEW', msg)

    const message = (msg.detail.message) as string ?? ''
    if (message === 'clear-specific') {
      console.log('magic')
      const cookies = await InAppBrowser.getCookies({ url: WEB_URL })
      if (cookies.magicCount) {
        console.log('del magic count')
        InAppBrowser.clearCookies({ url: WEB_URL })
      }
    }
    if (message === 'clear-all') {
      console.log('magic (clear all)')
      const cookies = await InAppBrowser.getCookies({ url: WEB_URL })
      if (cookies.magicCount) {
        console.log('del magic count')
        InAppBrowser.clearAllCookies()
      }
    }
  })
  InAppBrowser.addListener('buttonNearDoneClick', async (msg) => {
    await InAppBrowser.setUrl({ url: 'https://web.capgo.app/login' })
  })
})
</script>
