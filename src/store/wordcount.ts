import { defineStore } from 'pinia'

export const useWordcountStore = defineStore('wordCount',{
    state(){
        return {
            wordCount: 0
    }
    }
})