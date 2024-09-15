<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Capgo cloud demo (auth)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" style="text-align: center;">
            <strong>Ready to auth?</strong>
            <p>Login via the plugin!</p>
            <p class="mb-6"></p>

            <ion-button @click="() => logincapgo()">Login!</ion-button>
            <ion-button @click="() => actBackend()">Act with backend!</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton } from '@ionic/vue';
import { onMounted, ref } from 'vue'
import { usePopoutStore } from '@/popoutStore';
import { SocialLogin } from '@capgo/capacitor-social-login';

onMounted(async () => {
  await SocialLogin.initialize({
    apple: {
      android: {
        clientId: 'ee.forgr.io.ionic.starter.service',
        redirectUrl: 'https://applelogin.wcaleniewolny.me/login/callback'
      }
    }
  })

  SocialLogin.addListener('loginResult', (async (result) => {
    console.log(result)
  }))
})

async function logincapgo() {
  await SocialLogin.login({
    provider: 'apple',
    options: {}
  })
}

async function actBackend() {
  const authorizationCode = (await SocialLogin.getAuthorizationCode({ provider: 'apple' }))
  console.log(authorizationCode)
}

</script>