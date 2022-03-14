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
      Version 0.0.3
      <ion-button expand="block" color="primary" @click="reset">Reset now</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { CapacitorUpdater } from 'capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

const reset = async () => {
  // show the splashscreen to let the update happen
  SplashScreen.show()
  await CapacitorUpdater.reset()
  SplashScreen.hide() // in case the set fail, otherwise the new app will have to hide it
}
export default  defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  methods: {
    reset
  }
});
</script>
