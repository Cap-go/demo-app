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
            <p>Login via the plugin! (Provider: {{ currentProvider }})</p>
            <template v-if="!!userdataRef">
              <p>Email: {{ userdataRef.email }}</p>
              <p>ID: {{ userdataRef.id}}</p>
              <p>First name: {{ userdataRef.first_name }}</p>
              <p>Last name: {{ userdataRef.last_name }}</p>
            </template>
            <p class="mb-6"></p>

            <ion-button @click="() => logincapgoApple()">Login Apple!</ion-button>
            <ion-button @click="() => logincapgoGoogle()">Login Google!</ion-button>
            <ion-button @click="() => logincapgoStandardGoogle()">Login Standard Google!</ion-button>
            <ion-button @click="() => logincapgoFacebook()">Login Facebook!</ion-button>
            <ion-button @click="() => actBackend()">Act with backend!</ion-button>
            <ion-button @click="() => logoutApple()">Logout Apple!</ion-button>
            <ion-button @click="() => logoutGoogle()">Logout Google!</ion-button>
            <ion-button @click="() => logoutFacebook()">Logout Facebook!</ion-button>
            <ion-button @click="() => swapProviders()">Change providers</ion-button> 
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';
import { onMounted, Ref, ref } from 'vue'
import { usePopoutStore } from '@/popoutStore';
import { SocialLogin, GoogleLoginResponseOnline } from '@capgo/capacitor-social-login';

const userdataRef = ref(null) as Ref<{ id: string, email: string, first_name: string, last_name: string } | null>
const popoutStore = usePopoutStore()
const currentProvider = ref<'apple' | 'google' | 'facebook'>('apple') 

const possibleProviders = ['apple', 'google', 'facebook'] as ('apple' | 'google' | 'facebook')[]

onMounted(async () => {

  const isLogged = (await SocialLogin.isLoggedIn({ provider: 'apple' })).isLoggedIn

  if (isLogged) {
    await actBackend()
  }
})

async function logincapgoApple() {
  await SocialLogin.initialize({
    apple: {
        clientId: 'ee.forgr.io.ionic.starter.service',
        // redirectUrl: 'https://appleloginvps.wcaleniewolny.me/login/callback'
    }
  })
  const response = await SocialLogin.login({
    provider: 'apple',
    options: {}
  })
  currentProvider.value = 'apple'
  console.log('logincapgoApple', response)
  userdataRef.value = {
    id: response.result.profile.user,
    email: response.result.profile.email ?? '',
    first_name: response.result.profile.givenName ?? '',
    last_name: response.result.profile.familyName ?? ''
  }
  // const isLogged = (await SocialLogin.isLoggedIn({ provider: 'apple' })).isLoggedIn

  // if (isLogged) {
  //   await actBackend()
  // } 
}

function swapProviders() {
  const currentIndex = possibleProviders.findIndex(val => val === currentProvider.value)
  if (currentIndex + 1 === possibleProviders.length) {
    currentProvider.value = possibleProviders[0]
  } else {
    currentProvider.value = possibleProviders[currentIndex + 1]
  }
}

async function logincapgoGoogle() {
  await SocialLogin.initialize({
    google: {
      iOSClientId: '1038081411966-cnlcoi2u208vhucriodt8g2ouctja62o.apps.googleusercontent.com',
      webClientId: '1038081411966-8q4qgeam3d4itku0r43qkginl9cljc5a.apps.googleusercontent.com',
      // mode: 'offline',
    }
  })
  const response = await SocialLogin.login({
    provider: 'google',
    options: { 
      // newUI: true,
      style: 'bottom',
      // scopes: ['email', 'profile'] 
    }
  })
  const res = response.result as GoogleLoginResponseOnline
  currentProvider.value = 'google'
  userdataRef.value = {
    id: res.profile.id ?? '',
    email: res.profile.email ?? '',
    first_name: res.profile.givenName ?? '',
    last_name: res.profile.familyName ?? ''
  }

  console.log('logincapgoGoogle', response)
}

async function logincapgoStandardGoogle() {
  await SocialLogin.initialize({
    google: {
      iOSClientId: '1038081411966-cnlcoi2u208vhucriodt8g2ouctja62o.apps.googleusercontent.com',
      webClientId: '1038081411966-8q4qgeam3d4itku0r43qkginl9cljc5a.apps.googleusercontent.com',
      // mode: 'offline',
    }
  })
  const response = await SocialLogin.login({
    provider: 'google',
    options: { 
      scopes: ['email', 'profile'] 
    }
  })
  const res = response.result as GoogleLoginResponseOnline
  currentProvider.value = 'google'
  userdataRef.value = {
    id: res.profile.id ?? '',
    email: res.profile.email ?? '',
    first_name: res.profile.givenName ?? '',
    last_name: res.profile.familyName ?? ''
  }

  console.log('logincapgoGoogle', response)
}

async function logincapgoFacebook() {
  await SocialLogin.initialize({
    facebook: {
      appId: '1640177526775785',
      clientToken: '621ef94157c7a8e58a0343918e9b6615'
    }
  })
  currentProvider.value = 'facebook'
  const response = await SocialLogin.login({
    provider: 'facebook',
    options: {
      permissions: ['email', 'public_profile']
    }
  })
  userdataRef.value = {
    id: response.result.profile.userID,
    email: response.result.profile.email ?? '',
    first_name: response.result.profile.name ?? '',
    last_name: ''
  }
}


async function logoutApple() {
  const isLogged = (await SocialLogin.isLoggedIn({ provider: 'apple' })).isLoggedIn
  if (!isLogged) {
    popoutStore.popout("Not logged in", "Cannot logout if you are not logged in")
    return
  }

  await SocialLogin.logout({ provider: 'apple' })
  userdataRef.value = null
}

async function logoutGoogle() {
  const isLogged = (await SocialLogin.isLoggedIn({ provider: 'google' })).isLoggedIn
  if (!isLogged) {
    popoutStore.popout("Not logged in", "Cannot logout if you are not logged in")
    return
  }

  await SocialLogin.logout({ provider: 'google' })
}

async function logoutFacebook() {
  const isLogged = (await SocialLogin.isLoggedIn({ provider: 'facebook' })).isLoggedIn
  if (!isLogged) {
    popoutStore.popout("Not logged in", "Cannot logout if you are not logged in")
    return
  }

  await SocialLogin.logout({ provider: 'facebook' })
}

async function actBackend() {
  const authorizationCode = (await SocialLogin.getAuthorizationCode({ provider: 'apple' })).jwt

  const res = await fetch('https://appleloginvps.wcaleniewolny.me/userdata', {
    headers: {
      'Authorization': `Bearer ${authorizationCode}`
    }
  })

  if (res.status != 200) {
    console.log(await res.text(), res.status)
    popoutStore.popout("Error while calling backend", "Cannot fetch user data")
    return
  }

  const data = await res.json()
  userdataRef.value = data as any
}

</script>
