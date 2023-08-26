import type { Breed } from '@/types/Breed';
import type { BreedSearchResult } from '@/types/BreedSearchResult';
import axios, { Axios } from 'axios';

const httpRequest: Axios = axios.create({
    baseURL: import.meta.env.VITE_CATS_API_BASE_URL,
    headers: {
        'x-api-key': import.meta.env.VITE_CATS_API_KEY,
        'Accept': 'application/json',
    }
})

const getBreeds = async (): Promise<Breed[]> => {
    const { data } = await httpRequest.get<Breed[]>('/breeds');
    return data;
}

const getImageInfo = async (catId: string): Promise<BreedSearchResult> => {
    const { data } = await httpRequest.get<BreedSearchResult>(`/images/${catId}`);
    return data;
}

const searchBreeds = async (breedId?: string, pageNumber: number = 1): Promise<BreedSearchResult[]> => {
    const { data } = await httpRequest
      .get<BreedSearchResult[]>
      (`/images/search?page=${pageNumber}&limit=10&breed_id=${breedId}`);

    return data;
}

export {
  getBreeds,
  getImageInfo,
  searchBreeds
}