# Capgo demo app

This is a simple demo app for the `@capgo/capacitor-updater` package 
using `autoUpdate` (using `capgo cloud`)

## Package.json scripts

 - `swap-config` swaps capacitorConfig. Useful for local testing
 - `swap-package-json` - sets `@capgo/capacitor-updater` to `link:@capgo/capacitor-updater`. You can run `bun link` in the capacitor updater plugin to link it with this demo app.
 - `proxy` - sets up MITM proxy. Both Android and IOS will use this proxy. This allows for easier debugging
 - `reverse-ports-android` - Allows android to contact the proxy

## Old demo app

There exists an old version of the demo app, stored [here](https://github.com/Cap-go/demo-app/tree/main_old)