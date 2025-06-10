<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>LocalStorage Test</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="chevronBackOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="p-4 space-y-6">
      <!-- Set Item Section -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Set LocalStorage Item</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input
              v-model="newKey"
              placeholder="Key"
              fill="outline"
            />
          </ion-item>
          <ion-item>
            <ion-input
              v-model="newValue"
              placeholder="Value"
              fill="outline"
            />
          </ion-item>
          <ion-button
            @click="setItem"
            :disabled="!newKey || !newValue"
            expand="block"
            color="primary"
            class="mt-4"
          >
            Set Item
          </ion-button>
        </ion-card-content>
      </ion-card>

      <!-- Get Item Section -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Get LocalStorage Item</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input
              v-model="searchKey"
              placeholder="Enter key to search"
              fill="outline"
            />
          </ion-item>
          <ion-button
            @click="getItem"
            :disabled="!searchKey"
            expand="block"
            color="success"
            class="mt-4"
          >
            Get Item
          </ion-button>
          <ion-card v-if="searchResult !== null" class="mt-4">
            <ion-card-content>
              <ion-text color="medium">
                <p>Result:</p>
              </ion-text>
              <ion-text>
                <p class="font-mono text-sm break-all">{{ searchResult }}</p>
              </ion-text>
            </ion-card-content>
          </ion-card>
        </ion-card-content>
      </ion-card>

      <!-- All Items Section -->
      <ion-card>
        <ion-card-header>
          <div class="flex items-center justify-between">
            <ion-card-title>All LocalStorage Items</ion-card-title>
            <ion-button
              @click="loadAllItems"
              fill="outline"
              size="small"
            >
              <ion-icon :icon="refreshOutline" slot="start" />
              Refresh
            </ion-button>
          </div>
        </ion-card-header>
        <ion-card-content>
          <ion-text v-if="allItems.length === 0" color="medium" class="block py-8 text-center">
            No items in localStorage
          </ion-text>
          
          <div v-else class="space-y-2 overflow-y-auto max-h-64">
            <ion-item
              v-for="item in allItems"
              :key="item.key"
              class="border rounded-lg"
            >
              <div class="flex-1 min-w-0">
                <ion-label>
                  <h3 class="font-semibold">{{ item.key }}</h3>
                  <p class="text-sm break-all">{{ item.value }}</p>
                </ion-label>
              </div>
              <ion-button
                @click="removeItem(item.key)"
                fill="clear"
                color="danger"
                slot="end"
              >
                <ion-icon :icon="trashOutline" />
              </ion-button>
            </ion-item>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Actions Section -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Actions</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button
            @click="clearAll"
            expand="block"
            color="danger"
            class="mb-4"
          >
            <ion-icon :icon="trashOutline" slot="start" />
            Clear All localStorage
          </ion-button>
          <ion-text color="medium" class="block text-sm text-center">
            Total items: {{ allItems.length }}
          </ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonText, IonLabel, useIonRouter } from '@ionic/vue';
import { chevronBackOutline, refreshOutline, trashOutline } from 'ionicons/icons';

const ionRouter = useIonRouter();

// Reactive state
const newKey = ref('');
const newValue = ref('');
const searchKey = ref('');
const searchResult = ref<string | null>(null);
const allItems = ref<Array<{ key: string; value: string }>>([]);

function goBack() {
  ionRouter.back();
}

function setItem() {
  if (!newKey.value || !newValue.value) return;
  
  try {
    localStorage.setItem(newKey.value, newValue.value);
    newKey.value = '';
    newValue.value = '';
    loadAllItems();
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
}

function getItem() {
  if (!searchKey.value) return;
  
  try {
    const value = localStorage.getItem(searchKey.value);
    searchResult.value = value;
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    searchResult.value = 'Error reading item';
  }
}

function removeItem(key: string) {
  try {
    localStorage.removeItem(key);
    loadAllItems();
  } catch (error) {
    console.error('Error removing localStorage item:', error);
  }
}

function clearAll() {
  try {
    localStorage.clear();
    loadAllItems();
    searchResult.value = null;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

function loadAllItems() {
  try {
    const items: Array<{ key: string; value: string }> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        items.push({ key, value: value || '' });
      }
    }
    allItems.value = items.sort((a, b) => a.key.localeCompare(b.key));
  } catch (error) {
    console.error('Error loading localStorage items:', error);
  }
}

onMounted(() => {
  loadAllItems();
});
</script> 
