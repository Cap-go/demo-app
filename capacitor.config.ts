import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
		SplashScreen: {
			launchAutoHide: false
		},
		CapacitorUpdater: {
			autoUpdate: false
		}
	}
};

export default config;
