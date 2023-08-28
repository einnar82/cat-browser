<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBreedStore } from '@/stores/useBreedStore'
import type { Nullable } from '@/types/common/Nullable'
import { storeToRefs } from 'pinia';
const breedStore = useBreedStore();
const { getBreedNames, breedSearchResults, newAddedBreeds, selectedBreedId, isDropdownToggled } = storeToRefs(breedStore);
import { useRoute, useRouter } from "vue-router"
const router = useRouter();
const route = useRoute();

const goToPage = (id: string) => {
  breedStore.toggleDropdown()
  return router.replace(`/${id}`)
}

const pageNumber = ref(1)
const isBrowsing = ref(true)

const loadBreedData = async (breedId?: Nullable<String>, pageNumber: number = 1) => {
  await breedStore.fetchBreedSearchResult(breedId, pageNumber);
  breedStore.toggleDropdown()
  isBrowsing.value = !isBrowsing.value
}

const display = computed(() => {
  return newAddedBreeds.value === 0 && pageNumber.value != 1 ? 'none' : 'inherit';
})

onMounted(async () => {
  await breedStore.fetchBreeds();

  const breedQuery = route.query.breed;
  if(breedQuery)  {
    await loadBreedData(String(breedQuery))
  }
})

</script>

<template>
    <b-container>
      <b-row style="padding: 10px 0px">
        <b-col>
          <h1>Cat Browser</h1>
        </b-col>
      </b-row>
      <b-row style="padding: 10px 0px">
        <b-col md="3" sm="6" cols="12">
          <b-form-group
            id="fieldset-horizontal"
            label="Breed"
            label-for="cat-dropdown"
          >
          <b-form-select
              v-model="selectedBreedId" 
              @change="loadBreedData">
            <b-form-select-option :value="null">Select breed</b-form-select-option>
            <b-form-select-option 
                v-for="(breed, index) in getBreedNames"
                :key="index"
                :value="breed.value">{{ breed.text }}
              </b-form-select-option>
          </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="breedSearchResults.length === 0">
        <b-col cols="12">
          No cats available
        </b-col>
      </b-row>
      <b-row style="padding: 10px 0px">
        <b-col md="3" sm="6" cols="12"
          v-for="(searchResult, index) in breedSearchResults"
          v-show="breedSearchResults.length !== 0"
          :key="index">
          <CatCard 
            v-if="searchResult" 
            v-bind="{
              cat: searchResult,
              buttonAction: () => goToPage(searchResult.id)
          }"/>
        </b-col>
      </b-row>
      <b-row :style="{'display': display, 'padding': '10px 0px' }">
        <b-col md="3" sm="6" cols="12">
          <b-button variant="success" 
                  @click="loadBreedData(selectedBreedId, ++pageNumber)"
                  :disabled="newAddedBreeds === 0 && pageNumber != 1 || isDropdownToggled === false">Load more</b-button>
        </b-col>
      </b-row>
    </b-container>
</template>
