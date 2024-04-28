<template>
  <div>
    <h1 v-if="pokemon?.name">{{ pokemon.name }}</h1>

    <div v-if="pokemon">
      <img :src="pokemon.sprites.front_default" class="pokemon-sprite" />
    </div>
    
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemon = ref(null)

watchEffect(async () => {
  const id = route.params.id
  if (id) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      pokemon.value = await res.json()
    } catch (err) {
      console.error('Pokemon not found', err)
    }
  }
})
</script>

<style scoped>
.pokemon-sprite {
  width: 200px;
  height: 200px;
}
</style>