import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.app', // 'me.wcaleniewolny.test.ionic.vue',
  appName: 'capgoTestVueApp',
  webDir: 'dist',
  plugins: {
    extConfig: {},
    CapacitorUpdater: {
      localSupa: 'http://localhost:54321',
      localSupaAnon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      statsUrl: 'http://0.0.0.0:8080/functions/v1/stats',
      channelUrl: 'http://0.0.0.0:8080/functions/v1/channel_self',
      updateUrl: 'http://0.0.0.0:8080/functions/v1/updates',
      publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAz340EsqzefE62MogqQ/oK9dwgyIpLXNiek9WeUNemJMP4XCFmQut\n12ndMBvfuw9yeU4cwgz8HzKjWjCL3PLjuKHXgqh0Ee9a4v0MkCh6DelmzwK+0xDV\nRWHcWIjOMJ5F8GiY/5wwB14BAEueoSOrYtMuDqBUIvvIdnUvqU3QFj3ZcYt4eCNl\nA8aRS2A8M8w2B1znJuahItCRBAQOE6lk+oeOP4Reh72uMIhYgAzzsxSobp+n4+qt\njxWYppZZBfb/onqxUx0fq/vS5xZrWCTtfXMJJjQ20KQWaXLwvQEpTT8QPjohZdRn\nHheXbZpYb95g3mVUKj74UiJ2IXgmx4a/8wIDAQAB\n-----END RSA PUBLIC KEY-----\n'
    }
  }
};

export default config;
