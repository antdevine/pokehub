<template>
  <v-app>
    <v-card
      class="pa-4"
      flat
      height="300px"
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

    <div>
      <div v-if="searchResults[0]">
        <v-card loading :title="searchResults[0].name" subtitle="Subtitle" text="...">
          <v-card-actions>
            <v-btn>Click me</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="searchResults[0] && searchResults[0].results.length > 0" v-for="result in searchResults[0].results" :key="result.name">
        <v-card loading :title="result.name" subtitle="Subtitle" text="...">
          <v-card-actions>
            <v-btn>Click me</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    searchTerm: "",
    searchResults: [],
  }),
  methods: {
    async search() {
      this.searchResults = [];
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.searchTerm}`);
      let data = await response.json();
      this.searchResults.push(data);
    },
  },
  async mounted() {
    // ...
  },
};
</script>