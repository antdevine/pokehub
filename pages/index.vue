<template>
  <v-app>
    <v-row align="center" justify="center" dense>
      <v-col cols="8">
    <v-card
      class="pa-4"
      flat
      img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
    >
      <v-toolbar dense floating>
        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          v-model="searchTerm"
          @keyup="search"
        ></v-text-field>
      </v-toolbar>
    </v-card>
    </v-col>
    <v-col cols="3">
      <v-select
  label="Select"
  :items="pokemonTypes.map((item) => item.name)"
  :model-value="selectedType"
  @update:modelValue="onTypeSelected"
></v-select>
</v-col>
<v-col cols="1">
  <v-btn color="primary" @click="clearResults" v-if="searchResults.length > 0">Clear</v-btn>
</v-col>
</v-row>


    <v-row align="center" justify="center" dense>
      <v-col cols="6" md="4" v-if="initialPokemon[0] && initialPokemon.length > 0" v-for="result in (searchResults.length > 0 ? searchResults : initialPokemon)" :key="result.name">
        <NuxtLink :to="`/pokemon/${result.id}`">
        <v-card
          class="ma-4"
          max-width="300"
          outlined
          :image="result.sprites.front_default"
          :title="result.name"
        />
        </NuxtLink>
      </v-col>

      <v-btn color="primary" @click="showMore" v-if="!searchResults.length > 0">Load More</v-btn>
    </v-row>
  </v-app>
</template>

<script>
import { ref, onMounted } from 'vue';
import debounce from 'lodash.debounce';

export default {
  name: 'App',
  setup() {
    const searchTerm = ref("");
    const searchResults = ref([]);
    const initialPokemon = ref([]);
    const pokemonTypes = ref([]);
    const selectedType = ref(null);

    const search = debounce(async () => {
  if (searchTerm.value.trim() === '') {
    searchResults.value = [];
  } else {
    searchResults.value = [];
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.value}`);
    let data = await response.json();
    searchResults.value.push(data);
  }
}, 300);

    const allPokemon = async () => {
  initialPokemon.value = [];
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=0`);
  let data = await response.json();
  for (let pokemon of data.results) {
    let pokemonResponse = await fetch(pokemon.url);
    let pokemonData = await pokemonResponse.json();
    initialPokemon.value.push(pokemonData);
  }
};

const showMore = async () => {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${initialPokemon.value.length}`);
  let data = await response.json();
  for (let pokemon of data.results) {
    let pokemonResponse = await fetch(pokemon.url);
    let pokemonData = await pokemonResponse.json();
    initialPokemon.value.push(pokemonData);
  }
};

const typesResponse = async () => {
  let response = await fetch(`https://pokeapi.co/api/v2/type`);
    let data = await response.json();
    for (let types of data.results) {
      let typesResponse = await fetch(types.url);
      let typesData = await typesResponse.json();
      pokemonTypes.value.push(typesData);
    }
  };

  const onTypeSelected = (value) => {
  selectedType.value = value;
  filterType();
};

  const filterType = async () => {
    searchResults.value = [];
    let response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType.value}`);
    let data = await response.json();
    for (let pokemon of data.pokemon) {
      let filterTypeResponse = await fetch(pokemon.pokemon.url);
      let filterTypeData = await filterTypeResponse.json();
      searchResults.value.push(filterTypeData);
    }
  };

  const clearResults = () => {
    searchResults.value = [];
  };


    onMounted(() => {
      allPokemon();
      typesResponse();
    });

    return {
      searchTerm,
      initialPokemon,
      searchResults,
      search,
      allPokemon,
      showMore,
      pokemonTypes,
      typesResponse,
      filterType,
      selectedType,
      onTypeSelected,
      clearResults
    };
  },
};
</script>