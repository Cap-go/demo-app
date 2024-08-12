
import { unlinkSync } from "node:fs";

async function main() {
  const packageJson = Bun.file('./package.json')
  const packageJsonText = await packageJson.json()

  console.log('ys', packageJsonText.dependencies['@capgo/capacitor-updater'])
  if (packageJsonText.dependencies['@capgo/capacitor-updater'] === 'link:@capgo/capacitor-updater') {
    packageJsonText.dependencies['@capgo/capacitor-updater'] = '^6.0.0'
    console.log('swap to prod')
  } else if (packageJsonText.dependencies['@capgo/capacitor-updater'] === '^6.0.0') {
    packageJsonText.dependencies['@capgo/capacitor-updater'] = 'link:@capgo/capacitor-updater'
    console.log('swap to local')
  }

  await Bun.write(packageJson, JSON.stringify(packageJsonText, null, 2))
}

await main()