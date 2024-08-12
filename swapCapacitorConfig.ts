
import { unlinkSync } from "node:fs";

async function main() {
  const currentConfig = Bun.file('./capacitor.config.ts')
  const prodConfig = Bun.file('./capacitor.config.ts.prod')
  const localConfig = Bun.file('./capacitor.config.ts.local')

  const currentConfigText = await currentConfig.text()

  if (await prodConfig.exists()) {
    console.log('Swap prod with current')
    await Bun.write(localConfig, currentConfigText)
    await Bun.write(currentConfig, await prodConfig.text())
    unlinkSync('./capacitor.config.ts.prod')
  } else if (await localConfig.exists()) {
    console.log('Swap local with current')
    await Bun.write(prodConfig, currentConfigText)
    await Bun.write(currentConfig, await localConfig.text())
    unlinkSync('./capacitor.config.ts.local')
  }
}

await main()