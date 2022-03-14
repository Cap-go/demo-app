<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
  // import { CapacitorUpdater } from 'capacitor-updater'
  // import { SplashScreen } from '@capacitor/splash-screen'
  // import { App } from '@capacitor/app'

  // let data = {version: ""}
  // App.addListener('appStateChange', async(state) => {
  //     if (state.isActive) {
  //       // Do the download during user active app time to prevent failed download
  //       data = await CapacitorUpdater.download({
  //       url: 'https://github.com/Forgr-ee/Mimesis/releases/download/0.0.1/dist.zip',
  //       })
  //     }
  //     if (!state.isActive && data.version !== "") {
  //       // Do the switch when user leave app
  //       SplashScreen.show()
  //       try {
  //         await CapacitorUpdater.set(data)
  //       } catch (err) {
  //         console.log(err)
  //         SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
  //       }
  //     }
  // })

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>