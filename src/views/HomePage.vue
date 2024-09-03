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
            <ion-button @click="() => hardrestet()">Hard reset!!</ion-button>
            <ion-button @click="() => questionMark()">??</ion-button>
            <ion-button @click="() => openWeb()">web</ion-button>
            <ion-button @click="() => openCamera()">camera</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { InAppBrowser } from '@capgo/inappbrowser'
import { useIonRouter } from '@ionic/vue';

const ionRouter = useIonRouter();

// const WEB_URL = "https://capacitor-inappbrowser-test-webapp.wcaleniewolny.me/"
const WEB_URL = "https://capgo.app"

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
})

async function questionMark() {
  const bundles = await CapacitorUpdater.list()
  for (const bundle of bundles.bundles) {
    await CapacitorUpdater.delete({id: bundle.id })
  }
}

async function hardrestet() {
  await CapacitorUpdater.reset()
}

async function openWeb() {
  // InAppBrowser.open({ url: WEB_URL, isInspectable: true } as any);
  const script =
  "await import('https://unpkg.com/darkreader@4.9.89/darkreader.js');\n" +
  "DarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 });"
  InAppBrowser.openWebView({ url: WEB_URL, isPresentAfterPageLoad: true, preShowScript: script, buttonNearDone: { ios: { icon: 'monkey', iconType: 'resource' } } })
}

async function openCamera() {
  ionRouter.push('/camera')
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
