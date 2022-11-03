<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { BundleInfo, CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'

CapacitorUpdater.notifyAppReady()
let data: BundleInfo | null = null
App.addListener('appStateChange', async(state) => {
    if (state.isActive) {
      // Do the download during user active app time to prevent failed download
      data = await CapacitorUpdater.download({
        url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.3-v4/dist.zip',
        version: '0.0.3',
      })
    }
    if (!state.isActive && data) {
      // Do the switch when user leave app
      SplashScreen.show()
      try {
        await CapacitorUpdater.set({id: data.version})
      } catch (err) {
        console.log(err)
        SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
      }
    }
})

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>
