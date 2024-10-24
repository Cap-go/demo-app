import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'me.wcaleniewolny.io.ionic.starter.capgo.google.login',
  appName: 'capgoTestVueApp',
  webDir: 'dist',
  plugins: {
    extConfig: {},
    CapacitorUpdater: {
      autoUpdate: true,
      version: '11.3.206'
      // autoUpdate: false,
      // localSupa: 'http://0.0.0.0:54321',
      // localSupaAnon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      // statsUrl: 'http://0.0.0.0:8080/functions/v1/stats',
      // channelUrl: 'http://0.0.0.0:8080/functions/v1/channel_self',
      // updateUrl: 'http://0.0.0.0:8080/functions/v1/updates',
      // cloudflareBaseUrl: 'http://localhost:7777',
      // installMode: 'on_next_restart',
      // signKey: 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA34EOSch39z1c1W4HNYdke7qHM27XkDNtwnFN92HRyjS6ie056LKxl+CYIif3u/1ioi3sGLY3BNtRw2s1DI4F4aT8omj6MD61fDzysAzaYenIkZhj1gwKe/vr72XsyltpYgyuzhJBxxWmewwk0BWrA8PerGmoxIKCcTFsEApqS1qtc2j8UGdM/11B5FWSJuv8TvVzJsGUMHMrLFtETjDLDB1N8onSJhMvZSoGefdWtj2mSbdHMwZusw7RPJPpIKtd+Jag0NkcVRGbzvJu7NoFGCg4Z66JLHuMQh9QjwG7FVAgAv2a9z/brmPKsCTuMKSHqMExXqnWOaUFnpj+XGB5prPqIXHl1Am7FRN5+0IFjFK+5Q2Udbat6/tsPVOjlLkgIcSvZA0SjxJgU1YXmuYDaqgg6YluMgWzYz/vvNIwu5KBeUCH+sXU4XaImNZAh/fM1WTr5Vctykls0y+pDQKuBgGEtcDp6tZp/UDPu4VGlLCnSLV7okz0wdHx8Yd0qTKTFmrcIaCd4HUgUaXbvPPvuSOB7dVDE44EeDGf15n0/KMCF2Ex8+dIPUSX/jBk89tSsYSpDEI47WlZBPAUOGubPmMuA1kF00yFyX/BYk++Knglx7u/45tXZeccmeiOFlRdST7JYQtUsf3rSLj9Gb6olnytOPTMHDIWk3C4ypF+NAsCAwEAAQ==',
    }
  }
};

export default config;
