<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Capgo cloud demo (SQL)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%">
        <ion-row class="ion-align-items-center ion-justify-content-center" style="height: 100%;">
          <ion-col size="auto" class="text-center">
            <strong>Ready to test some sql?</strong>
            <p>Start with Capgo SQL test!</p>

            <ion-button @click="() => generateRandomData()">Add random item</ion-button>
            <ion-button @click="() => clearData()">Clear all</ion-button>

            <table class="mx-auto mt-8" v-if="items.length > 0">
              <thead>
                  <tr class="border border-blue-500">
                      <th class="px-2 border border-blue-500 py-z">Name</th>
                      <th class="px-2 py-2 border border-blue-500">Age</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(person, index) in items" :key="index" class="px-2 border border-blue-500 py-2s">
                    <td class="px-2 py-2 border border-blue-500">{{ person.name }}</td>
                    <td class="px-2 py-2 border border-blue-500">{{ person.age }}</td>
                  </tr>
              </tbody>
            </table>
            <!-- <ion-button @click="() => popoutStore.popout('Funny popout', 'I am a funny popout')">Funny popout!</ion-button> -->
          </ion-col>
        </ion-row>
      </ion-grid>
     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonBackButton, IonGrid, IonButtons } from '@ionic/vue';
import { onMounted, ref } from 'vue'
import { usePopoutStore } from './../../popoutStore';
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

const popoutStore = usePopoutStore()
const items = ref([] as { name: string, age: string }[])

onMounted(async () => {
  await CapgoCapacitorDataStorageSqlite.openStore({ database: 'my_db' })
  items.value = JSON.parse((await CapgoCapacitorDataStorageSqlite.get({ key: 'magicItems' })).value) as { name: string, age: string }[]
})

function getRandomName(): string {
  const names = [
    "Alice",
    "Bob",
    "Carol",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hank",
    "Ivy",
    "Jack",
    "Kara",
    "Leo",
    "Mia",
    "Nina",
    "Oscar",
    "Paul",
    "Quinn",
    "Rose",
    "Sam",
    "Tina"
  ];

  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateRandomData() {
  items.value.push({ name: getRandomName(), age: getRandomInt(5, 100).toString() })
  await CapgoCapacitorDataStorageSqlite.set({ key: 'magicItems', value: JSON.stringify(items.value) })
}

async function clearData() {
  items.value.length = 0
  await CapgoCapacitorDataStorageSqlite.set({ key: 'magicItems', value: JSON.stringify(items.value) })
}

</script>
