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
            <template v-if="!!userdataRef">
              <p>Email: {{ userdataRef.email }}</p>
              <p>ID: {{ userdataRef.id}}</p>
              <p>First name: {{ userdataRef.first_name }}</p>
              <p>Last name: {{ userdataRef.last_name }}</p>
            </template>
            <p class="mb-6"></p>

            <ion-button @click="() => logincapgoApple()">Login Apple!</ion-button>
            <ion-button @click="() => logincapgoGoogle()">Login Google!</ion-button>
            <ion-button @click="() => logincapgoFacebook()">Login Facebook!</ion-button>
            <ion-button @click="() => actBackend()">Act with backend!</ion-button>
            <ion-button @click="() => logout()">Logout!</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton } from '@ionic/vue';
import { onMounted, Ref, ref } from 'vue'
import { usePopoutStore } from '@/popoutStore';
import { SocialLogin } from '@capgo/capacitor-social-login';

const userdataRef = ref(null) as Ref<{ id: string, email: string, first_name: string, last_name: string } | null>

const popoutStore = usePopoutStore()

onMounted(async () => {
  SocialLogin.addListener('loginResult', (async (result) => {
    console.log(result)

    if (result.status === 'success') {
      await actBackend()    
    }
  }))

  const isLogged = (await SocialLogin.isLoggedIn({ provider: 'apple' })).isLoggedIn

  if (isLogged) {
    await actBackend()
  }
})

async function logincapgoApple() {
  await SocialLogin.initialize({
    apple: {
        clientId: 'ee.forgr.io.ionic.starter.service',
          redirectUrl: 'https://applelogin.wcaleniewolny.me/login/callback'
    }
  })
  await SocialLogin.login({
    provider: 'apple',
    options: {}
  })
}

async function logincapgoGoogle() {
  await SocialLogin.initialize({
    google: {
      clientId: 'ee.forgr.io.ionic.starter.service',
    }
  })
  await SocialLogin.login({
    provider: 'google',
    options: {}
  })
}

async function logincapgoFacebook() {
  await SocialLogin.initialize({
    facebook: {
      appId: '145053606307062',
      
    }
  })
  await SocialLogin.login({
    provider: 'facebook',
    options: {}
  })
}


async function logout() {
  const isLogged = (await SocialLogin.isLoggedIn({ provider: 'apple' })).isLoggedIn
  if (!isLogged) {
    popoutStore.popout("Not logged in", "Cannot logout if you are not logged in")
    return
  }

  await SocialLogin.logout({ provider: 'apple' })
}

async function actBackend() {
  const authorizationCode = (await SocialLogin.getAuthorizationCode({ provider: 'apple' })).jwt

  const res = await fetch('https://applelogin.wcaleniewolny.me/userdata', {
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
