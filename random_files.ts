import { readdirSync, unlinkSync, lstatSync, rmSync, writeFileSync } from "node:fs";
import { spawn } from 'node:child_process'
import * as crypto from "node:crypto";
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer'

const FILE_NUMBER = 1
const FILE_SIZE_IN_KB = 200

const ONE_KB_TO_BYTES = 1000



async function main() {
  const csvWriter = createCsvWriter({
    path: 'output.csv', // Specify the output file path
    header: [
      { id: 'fileNum', title: 'File number' },
      { id: 'speed', title: 'Speed (in MS)' },
    ]
  });

  const records: { fileNum: string, speed: string }[] = []

  for (let i = 10; i <= 300 ; i += 10) {
    console.log(`Start run for file num: ${i}`)
    generateFiles(i)

    let timeTot = 0
    for (let z = 0; z < 3 ; z += 1) {
      const time = await runCli()
      console.log(`Files: ${i}, iter: ${z}, time: ${time}`)
      timeTot += time
    }

    records.push({
      fileNum: i.toString(),
      speed: (timeTot / 3).toFixed(4).toString()
    })

    csvWriter.writeRecords(records)
    .then(() => {
      console.log('CSV file was written successfully');
    })
    .catch(err => {
      console.error('Error writing CSV file', err);
    });
  }
}

await main()

async function runCli(): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [
      '../CLI/dist/index.js',
      'bundle',
      'upload',
      '-c',
      'two_default',
      '-a',
      'ae6e7458-c46d-4c00-aa3b-153b0b8520ea',
      '--ignore-checksum-check',
      '--no-code-check',
      '-b',
      `1.0.128-${crypto.randomBytes(20).toString('hex')}`
    ]);
  
    let output = '';
  
    // Listen for data on the stdout stream.
    child.stdout.on('data', (data) => {
        output += data.toString();
    });
  
    // Handle the standard error output.
    child.stderr.on('data', (data) => {
        console.error(`Standard Error: ${data.toString()}`);
    });
  
    // Listen for process to exit.
    child.on('close', (code) => {
        if (code !== 0) {
            console.error(`Child process exited with code ${code}`);
        } else {
          const ver = output.split('\n').find(ver => ver.includes('$MAGIC'))?.trim().match(/\{([^)]+)\}/)?.[0]
          console.log(ver)
          if (!ver) {
            console.error('Cannot find version\n', output)
            reject('cannot find output')
            return
          }
          // writeFileSync(`./dist/yes`, ver)
          const verFin = JSON.parse(ver).time as number
          resolve(verFin)
        }
    });
  })
}

function generateFiles(fileNum: number) {
  readdirSync('./dist').forEach(file => {
    if (file.includes('index.html')) {
      return
    }
  
    const path = `./dist/${file}`
  
    if (lstatSync(path).isDirectory()) {
      rmSync(path, { recursive: true, force: true });
      return
    }
  
    unlinkSync(path)
  })
  
  for (let i = 0; i < fileNum; i++) {
    const fileName = `${crypto.randomBytes(20).toString('hex')}`
    const buff = crypto.randomBytes(FILE_SIZE_IN_KB * ONE_KB_TO_BYTES)
    writeFileSync(`./dist/${fileName}`, buff)
  }
}