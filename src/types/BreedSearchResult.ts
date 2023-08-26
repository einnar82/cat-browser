import type { Breed } from "./Breed"

export interface BreedSearchResult {
    id: string
    url: string
    width: number
    height: number,
    breeds: Breed[]
}
  