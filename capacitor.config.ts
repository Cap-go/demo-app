import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.capgo',
  appName: 'capgoTestVueApp',
  webDir: 'dist',
  plugins: {
    EdgeToEdge: {
      backgroundColor: '#ffffff'
    },
    SplashScreen: {
      launchAutoHide: true,
    },
  }
};

export default config;
