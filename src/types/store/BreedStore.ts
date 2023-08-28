import type { Breed } from '../Breed'
import type { BreedSearchResult } from '../BreedSearchResult'
import type { Nullable } from '../common/Nullable'

export interface BreedStore {
  breeds: Breed[]
  breedSearchResults: BreedSearchResult[]
  newAddedBreeds: Number
  selectedBreedId?: Nullable<String>
  breed?: Nullable<BreedSearchResult>
  isFetchingBreeds: Boolean,
  isDropdownToggled: Boolean
}
