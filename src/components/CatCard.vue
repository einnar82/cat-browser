<script setup lang="ts">
defineProps({
  cat: {
    type: Object,
    required: true,
  },
  buttonAction: {
    type: Function,
    required: false,
    default: () => ({})
  },
  display: {
    type: String,
    required: false,
    default: 'inherit'
  },
  showDetail: {
    type: Boolean,
    default: false,
    required: false
  },
})
</script>

<template>
    <div>
        <b-card
            :img-src="cat.url"
            img-alt="Image"
            img-top
            class="mb-2"
        >
            <b-card-text>
                <h4 v-show="showDetail">{{ cat.breeds[0].name }}</h4>
                <h5 v-show="showDetail">Origin: {{ cat.breeds[0].origin }}</h5>
                <h6 v-show="showDetail">{{ cat.breeds[0].temperament }}</h6>
                <p v-show="showDetail">{{ cat.breeds[0].description }}.</p>
            </b-card-text>

            <b-button 
              @click="buttonAction" 
              variant="primary"
              :style="{'display': display}"
              block>View Details</b-button>
        </b-card>
    </div>
</template>
