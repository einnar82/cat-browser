import type { Breed } from '../Breed'
import type { BreedSearchResult } from '../BreedSearchResult'

export interface BreedStore {
  breeds: Breed[]
  breedSearchResults: BreedSearchResult[]
  newAddedBreeds: Number
  selectedBreedId?: String | null
  breed?: BreedSearchResult | null
  isFetchingBreeds: Boolean
}
