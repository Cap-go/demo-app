<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      Version 0.0.2
      <ion-button expand="block" color="danger" @click="updateNow">Downgrade now</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, isPlatform } from '@ionic/vue';
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

const updateNow = async () => {
  if(!isPlatform('capacitor'))
    return
  CapacitorUpdater.addListener('download', (res) => {
    console.log('download', res)
  })
  const res = await CapacitorUpdater.download({
    url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.3-v4/dist.zip',
    versionName: '0.0.3',
  })
  console.log('res download', res)
  console.log('list', await CapacitorUpdater.list())
  // show the splashscreen to let the update happen
  SplashScreen.show()
  await CapacitorUpdater.set(res)
  SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
}
export default  defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  methods: {
    updateNow
  }
});
</script>
