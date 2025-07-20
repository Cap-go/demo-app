import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.capgo',
  appName: 'capgoTestVueApp',
  webDir: 'dist',
  plugins: {
    extConfig: {},
    EdgeToEdge: {
      backgroundColor: '#ffffff'
    },
    SplashScreen: {
      launchAutoHide: false,
    },
  }
};

export default config;
