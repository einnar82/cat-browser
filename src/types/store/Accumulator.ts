import type { BreedSearchResult } from "../BreedSearchResult"

export interface Accumulator {
  uniqueJsonArray: BreedSearchResult[]
  addedCount: Number
}
