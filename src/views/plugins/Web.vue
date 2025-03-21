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

            <ion-button @click="() => openWeb()">web simple open</ion-button>
            <ion-button @click="() => openWebDarkMode()">web with script dark reader</ion-button>
            <ion-button @click="() => openWebWithPicker()">web with picker</ion-button>
            <ion-button @click="() => openWebWithHeaders()">web with headers</ion-button>
            <ion-button @click="() => openWebWithCredentials()">web with credentials</ion-button>
            <ion-button @click="() => openWebWithCustomToolbar()">web with custom toolbar</ion-button>
            <ion-button @click="() => openWebWithoutNativeNav()">web without native nav</ion-button>
            <ion-button @click="() => openWebWithReload()">web with reload</ion-button>
            <ion-button @click="() => openWebWithCloseModal()">web with close modal</ion-button>
            <ion-button @click="() => openWebWithCustomButton()">web with custom button</ion-button>
            <ion-button @click="() => openWebWithMediaCapture()">web with media capture</ion-button>
            <ion-button @click="() => openWebWithMicrophone()">web with microphone</ion-button>
            <ion-button @click="() => openWebWithMultipleUpload()">web with multiple upload</ion-button>
            <ion-button @click="() => openWebWithSingleUpload()">web with single upload</ion-button>
            <ion-button @click="() => openWebWithWebcam()">web with webcam test</ion-button>
            <ion-button @click="() => openWebWithActivityToolbar()">web with activity toolbar</ion-button>
            <ion-button @click="() => openWebWithNavigationToolbar()">web with navigation toolbar</ion-button>
            <ion-button @click="() => openWebWithBlankToolbar()">web with blank toolbar</ion-button>
            <ion-button @click="() => openWebWithDefaultToolbar()">web with default toolbar</ion-button>
            <ion-button @click="() => openWebWithShareSubject()">web with share subject</ion-button>
            <ion-button @click="() => openWebWithDisclaimer()">web share with disclaimer</ion-button>
            <ion-button @click="() => openWebWithAllOptions()">web with all options</ion-button>
            <ion-button @click="() => openSimple()">open simple</ion-button>
            <ion-button @click="() => openWithOptions()">open with options</ion-button>
            <ion-button @click="() => openWithInspectable()">open inspectable</ion-button>
            <ion-button @click="() => openWithShowArrow()">web with just arrow</ion-button>
            <ion-button @click="() => openBlankWithCloseButton()">blank with floating close button</ion-button>
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
import { ToolBarType } from '@capgo/inappbrowser';

const WEB_URL = "https://capgo.app"

async function openWebWithPicker() {
  const picker = await InAppBrowser.openWebView({
    url: 'https://show-picker.glitch.me/demo.html',
  })
  console.log('picker', picker)
}


async function openWeb() {
  InAppBrowser.openWebView({ 
    url: WEB_URL, 
  })
}

async function openWebDarkMode() {
  // InAppBrowser.open({ url: WEB_URL, isInspectable: true } as any);
  const script =
  "await import('https://unpkg.com/darkreader@4.9.89/darkreader.js');\n" +
  "DarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 });"
  InAppBrowser.openWebView({ 
    url: WEB_URL, 
    isPresentAfterPageLoad: true, 
    preShowScript: script, 
  })
}

async function openWebWithHeaders() {
  InAppBrowser.openWebView({
    url: 'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending/',
    headers: {
      'Custom-Header': 'test-value',
      'Authorization': 'Bearer test-token'
    }
  })
}

async function openWebWithCredentials() {
  InAppBrowser.openWebView({
    url: 'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending/',
    credentials: {
      username: 'test-user',
      password: 'test-pass'
    }
  })
}

async function openWebWithDisclaimer() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    shareSubject: 'Share this website',
    shareDisclaimer: {
      title: 'Disclaimer',
      message: 'This is a test disclaimer',
      confirmBtn: 'Accept',
      cancelBtn: 'Decline'
    }
  })
}

async function openWebWithCustomToolbar() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    toolbarType: ToolBarType.ACTIVITY,
    toolbarColor: '#FF5733',
    toolbarTextColor: '#B9FFC6',
    showArrow: true
  })
}

async function openWebWithoutNativeNav() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    activeNativeNavigationForWebview: false,
    disableGoBackOnNativeApplication: true
  })
}

async function openWebWithReload() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    showReloadButton: true
  })
}

async function openWebWithCloseModal() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    closeModal: true,
    closeModalTitle: 'Close Window',
    closeModalDescription: 'Are you sure you want to close?',
    closeModalOk: 'Yes, close',
    closeModalCancel: 'No, stay'
  })
}

async function openWebWithCustomButton() {
  InAppBrowser.addListener('buttonNearDoneClick', async (msg) => {
    console.log('buttonNearDoneClick', msg)
    await InAppBrowser.setUrl({ url: 'https://google.com' })
  })
  InAppBrowser.openWebView({
    url: WEB_URL,
    buttonNearDone: {
      ios: {
        iconType: 'sf-symbol',
        icon: 'star.fill'
      },
      android: {
        iconType: 'asset',
        icon: 'public/monkey.svg',
        width: 24,
        height: 24
      }
    }
  })
}

async function openWebWithMediaCapture() {
  await InAppBrowser.openWebView({
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture',
    title: 'Camera Test'
  });
}

async function openWebWithMicrophone() {
  InAppBrowser.openWebView({
    url: 'https://webcammictest.com/check-mic.html',
    title: 'Microphone Test'
  })
}

async function openWebWithMultipleUpload() {
  InAppBrowser.openWebView({
    url: 'https://www.patternfly.org/components/file-upload/multiple-file-upload',
    title: 'Multiple File Upload Test'
  })
}

async function openWebWithSingleUpload() {
  InAppBrowser.openWebView({
    url: 'https://www.patternfly.org/components/file-upload/simple-file-upload',
    title: 'Single File Upload Test'
  })
}

async function openWebWithWebcam() {
  InAppBrowser.openWebView({
    url: 'https://webcammictest.com/',
    title: 'Webcam Test'
  })
}

async function openWebWithActivityToolbar() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    toolbarType: ToolBarType.ACTIVITY,
    title: 'Activity Toolbar Test'
  })
}

async function openWebWithNavigationToolbar() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    toolbarType: ToolBarType.NAVIGATION,
    title: 'Navigation Toolbar Test'
  })
}

async function openWebWithBlankToolbar() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    toolbarType: ToolBarType.BLANK,
    title: 'Blank Toolbar Test'
  })
}

async function openWebWithDefaultToolbar() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    toolbarType: ToolBarType.DEFAULT,
    title: 'Default Toolbar Test'
  })
}

async function openWebWithShareSubject() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    shareSubject: 'Check out Capgo!',
    title: 'Share Subject Test'
  })
}

async function openWebWithAllOptions() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    toolbarColor: '#FF5733',
    toolbarTextColor: '#B9FFC6',
    showArrow: true,
    showReloadButton: true,
    closeModal: true,
    closeModalTitle: 'Close Window',
    closeModalDescription: 'Are you sure you want to close?',
    closeModalOk: 'Yes, close',
    closeModalCancel: 'No, stay',
    buttonNearDone: {
      ios: {
        iconType: 'sf-symbol',
        icon: 'star.fill'
      },
      android: {
        iconType: 'asset',
        icon: 'public/monkey.svg',
        width: 24,
        height: 24
      }
    }
  })
}

async function openSimple() {
  InAppBrowser.open({ url: WEB_URL })
}

async function openWithOptions() {
  InAppBrowser.open({ 
    url: WEB_URL,
    isPresentAfterPageLoad: true,
    preShowScript: "console.log('pre show script')"
  } as any)
}

async function openWithInspectable() {
  InAppBrowser.open({ 
    url: WEB_URL,
    isPresentAfterPageLoad: true
  } as any)
}

async function openWithShowArrow() {
  InAppBrowser.openWebView({
    url: WEB_URL,
    showArrow: true,
    title: 'Show Arrow Only Test'
  })
}

async function openBlankWithCloseButton() {
  await InAppBrowser.openWebView({
    url: WEB_URL,
    toolbarType: ToolBarType.BLANK,
    title: 'Blank With Close Button'
  })
  
  // Wait for page to load before injecting the button
  const listener = await InAppBrowser.addListener('browserPageLoaded', async () => {
    // Inject a floating close button in the top right corner
    await InAppBrowser.executeScript({
      code: `
        // Create the button element
        const closeBtn = document.createElement('div');
        closeBtn.id = 'capgo-close-btn';
        
        // Style it as a round red button with white cross
        closeBtn.style.position = 'fixed';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.width = '40px';
        closeBtn.style.height = '40px';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.backgroundColor = 'red';
        closeBtn.style.display = 'flex';
        closeBtn.style.justifyContent = 'center';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        closeBtn.style.zIndex = '2147483647'; // Maximum z-index value
        closeBtn.style.cursor = 'pointer';
        
        // Add the cross icon
        closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        
        // Add click event to close the webview
        closeBtn.addEventListener('click', () => {
          window.mobileApp.close();
        });
        
        // Add the button to the document root to ensure highest level
        document.documentElement.appendChild(closeBtn);
        
        // Create a MutationObserver to ensure the button isn't removed
        const observer = new MutationObserver(() => {
          if (!document.getElementById('capgo-close-btn')) {
            document.documentElement.appendChild(closeBtn);
          }
        });
        
        // Start observing the document for changes
        observer.observe(document.documentElement, { 
          childList: true, 
          subtree: true 
        });
      `
    });
    listener.remove()
  });
  
  // Also inject immediately in case the page is already loaded
  await InAppBrowser.executeScript({
    code: `
      // Create the button element
      const closeBtn = document.createElement('div');
      closeBtn.id = 'capgo-close-btn';
      
      // Style it as a round red button with white cross
      closeBtn.style.position = 'fixed';
      closeBtn.style.top = '20px';
      closeBtn.style.right = '20px';
      closeBtn.style.width = '40px';
      closeBtn.style.height = '40px';
      closeBtn.style.borderRadius = '50%';
      closeBtn.style.backgroundColor = 'red';
      closeBtn.style.display = 'flex';
      closeBtn.style.justifyContent = 'center';
      closeBtn.style.alignItems = 'center';
      closeBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      closeBtn.style.zIndex = '2147483647'; // Maximum z-index value
      closeBtn.style.cursor = 'pointer';
      
      // Add the cross icon
      closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      
      // Add click event to close the webview
      closeBtn.addEventListener('click', () => {
        window.mobileApp.close();
      });
      
      // Add the button to the document root to ensure highest level
      document.documentElement.appendChild(closeBtn);
    `
  });
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

  InAppBrowser.addListener('urlChangeEvent', (event) => {
    console.log('URL changed:', event.url)
  })

  InAppBrowser.addListener('browserPageLoaded', () => {
    console.log('Page loaded')
  })

  InAppBrowser.addListener('pageLoadError', () => {
    console.log('Page load error')
  })

  InAppBrowser.addListener('confirmBtnClicked', (event) => {
    console.log('Confirm button clicked:', event.url)
  })
})
</script>
