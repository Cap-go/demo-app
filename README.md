# DEMO app

Use `pnpm i` to install the dependencies

This is a demo app, you can build it to see how it works.

By default the app will auto update when the app is resumed from background and an update is detected. 

If you want to trigger an app update on first open i.e. update the app to the latest version immediately while the app is open, you must set both `autoUpdate` and `directUpdate` to `true` in `capacitor.config.ts`.

If you want to disable auto update, you can set `autoUpdate` to `false` in `capacitor.config.ts`

