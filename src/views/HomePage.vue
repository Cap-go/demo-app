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
            <strong>Ready to test some plugins?</strong>
            <p>Click the buttons!</p>

            <ion-button router-link="/clicker">Clicker</ion-button>
            <ion-button router-link="/updater">Updater</ion-button>
            <ion-button router-link="/camera">Camera</ion-button>
            <ion-button router-link="/subscriptions">Subscriptions</ion-button>
            <ion-button router-link="/web">Web</ion-button>
            <ion-button router-link="/sql">Sql</ion-button>
            <ion-button router-link="/screen-recorder">Screen recorder</ion-button>
            <ion-button router-link="/auth">Auth</ion-button>
            <ion-button router-link="/inmarket">InMarket</ion-button>
            <ion-button router-link="/local-storage">Local Storage</ion-button>
            <ion-button expand="block" router-link="/downloader">Downloader</ion-button>
            <ion-button expand="block" router-link="/audio">Audio</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonGrid } from '@ionic/vue';
import { onMounted } from 'vue';
import { InAppBrowser } from '@capgo/inappbrowser'


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
