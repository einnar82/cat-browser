<script setup lang="ts">
import { useBreedStore } from '@/stores/useBreedStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const breedStore = useBreedStore();
const { breed } = storeToRefs(breedStore);
const route = useRoute();
const router = useRouter()

const backToIndexPage = (): void => {
    router.replace(`/?breed=${breed?.value.breeds[0].id}`);
}

onMounted(async () => {
    await breedStore.fetchBreedInfo(String(route.params.id));
})
</script>

<template>
    <b-container v-if="breed">
        <b-row>
            <b-col cols="12"> 
                <b-button 
                @click="backToIndexPage" 
                variant="primary">Back</b-button>
            </b-col>
        </b-row>
        <b-row style="padding: 10px 0px">
            <b-col cols="12">
                <CatCard 
                    v-bind="{
                        display: 'none',
                        showDetail: true,
                    }"
                    :cat="breed"/>
            </b-col>
        </b-row>
    </b-container>
</template>