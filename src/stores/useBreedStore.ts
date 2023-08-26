import { defineStore } from 'pinia'
import type { Breed } from '@/types/Breed'
import type { BreedSearchResult } from '@/types/BreedSearchResult'
import { getBreeds, getImageInfo, searchBreeds } from '@/client'
import type { BreedStore } from '@/types/store/BreedStore'
import type { Accumulator } from '@/types/store/Accumulator'

export const useBreedStore = defineStore('breeds', {
  state: (): BreedStore => ({
    breeds: [],
    breed: null,
    breedSearchResults: [],
    newAddedBreeds: 0,
    selectedBreedId: null,
    isFetchingBreeds: false
  }),
  getters: {
    getBreedNames: (state) =>
      state.breeds.map((breed) => {
        return {
          value: breed.id,
          text: breed.name
        }
      })
  },
  actions: {
    async fetchBreeds() {
      let breeds: Breed[] = []
      try {
        breeds = await getBreeds()
      } catch (error) {
        alert("Apologies but we could not load new cats for you at this time! Miau!")
        this.breeds = [];
        return;
      }

      this.breeds = breeds
    },
    async fetchBreedSearchResult(breedId?: string, pageNumber: number = 1) {
      this.selectedBreedId = breedId ?? null

      let breedSearchResults: BreedSearchResult[] = []
      try {
        breedSearchResults = await searchBreeds(breedId, pageNumber)
      } catch (error) {
        alert("Apologies but we could not load new cats for you at this time! Miau!")
        this.breedSearchResults = [];
        this.newAddedBreeds = 0
        return;
      }
     
      // Create a map to track unique ids and corresponding items
      const uniqueMap = new Map()

      if (this.breedSearchResults.length === 0 
        || (this.breedSearchResults[0].breeds[0].id !== this.selectedBreedId)) {
        this.breedSearchResults = breedSearchResults

        this.newAddedBreeds = breedSearchResults.length
      } else {
        const { uniqueJsonArray, addedCount } = breedSearchResults.reduce(
          (accumulator: Accumulator, item: BreedSearchResult) => {
            const id = item.id

            // Check if the id is already in the map
            if (!uniqueMap.has(id)) {
              uniqueMap.set(id, true)
              accumulator.uniqueJsonArray.push(item)
            }

            return accumulator
          },
          { uniqueJsonArray: [], addedCount: 0 }
        )

        this.breedSearchResults = uniqueJsonArray
        this.newAddedBreeds = addedCount
      }
    },
    async fetchBreedInfo(cardId: string) {
      const breed = await getImageInfo(cardId)
      this.breed= breed
    }
  }
})
