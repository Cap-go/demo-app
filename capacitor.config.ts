import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.capgo',
  appName: 'capgoTestVueApp',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: true
    },
    CapacitorUpdater: {
      version: '0.0.1-beta1',
      appId: 'com.demo.capgo.new',
      autoUpdate: true
    }
  }
};

export default config;
