import { defineStore } from 'pinia';
import { ref } from 'vue'

export const usePopoutStore = defineStore('popout', {
  state: () => {
    return {
      isPopoutOpen: false,
      popoutHeader: '',
      popoutMessage: ''
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    popout(header: string, message: string) {
      this.popoutHeader = header
      this.popoutMessage = message
      this.isPopoutOpen = true
    },
  },
})