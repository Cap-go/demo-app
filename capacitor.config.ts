import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'capgoTestVueApp',
  webDir: 'dist',
  plugins: {
    extConfig: {},
    CapacitorUpdater: {
      autoUpdate: true,
      localSupa: 'http://0.0.0.0:54321',
      localSupaAnon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      statsUrl: 'http://0.0.0.0:8080/functions/v1/stats',
      channelUrl: 'http://0.0.0.0:8080/functions/v1/channel_self',
      updateUrl: 'http://0.0.0.0:8080/functions/v1/updates',
      signKey: 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxm0oyAlwyI+/LPIkXeJh/4QrRW8YzDhY0oV2QAhVbRRDmM3qR/mD2WPOBNJ3mCoJRkbU66KedZ/bFIQyCzj6fBmbnrnqfOR6gnj/EwH0ZAFkDY//0VxqtgdITl4YAcka1pGNlLRIQGR4PY0naARl3VGesdi0O9JPRITr7J+VUxzKBvXl6/oeO97UNLp402nD1DCJsxgFL5+VSC9C+Xndpf7xp0OBjVinGZXvUgzB/j7YFL022kpEysQINRUbjzOUtAkbcnSViNFQph5L1q1LVpZo0VdzFqpImQKBD3T4QV3e3mIYPFjuEdZ5ZW+/wKnLIi2uFyjCVX8P/WKa2XuI4Kt6ef9IvQYe1tGLPwCxG9enZ8L5ZVLWrX56ovMuh6Vp4BXPt2CvIvx4ZH12IeyOniqeRbomWB/HgbVC1AevWvh2AVTDPfRwqsUvkVg2lYX+aHSGDLDVUzTU3YUftO8UfTLu7YyG7WYSUlpmbLxQtOCUFDgulqgRMv11W+YbImfTq5NmU1L9+ZlL7R5Cjtlg+bBwMZzhawOT6lISQ4ou4YvEq2DFu0hrKE0CZc5T5Y7BHYNLfhWdnQSwWNqV02FEk6tdfVKvwUzVhwg1lELJhaNOkznPhb+hii99q+niyr4uLtMhEfku7SXFTd97AXVoVDZphCR7N6DHpCQ1WD1sRuECAwEAAQ=='
    }
  }
};

export default config;
