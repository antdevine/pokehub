<template>
    <div>
      <!-- <h1>{{ pokemon.name }}</h1> -->
      <!-- Display other Pokemon data here -->
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({ params, error }) {
      try {
        console.log(params.id);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
        const pokemon = await res.json();
        return { pokemon };
      } catch (err) {
        error({ statusCode: 404, message: 'Pokemon not found' });
      }
    },
  };
  </script>