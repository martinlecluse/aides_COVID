<script setup lang="ts">
//INPUTS :
// - mesure : nom de la donnée affichée
// - min/max : valeurs extrêmes
// - couleurs : pour faire le gradient

const props = defineProps<{
  mesure?: string
  min?: number
  max?: number
  minCouleur?: string
  maxCouleur?: string
}>()
</script>

<template>
  <h1 class="titre-legende">{{ mesure }}</h1>
  <div class="indic">
    <div class="d-flex flex-row justify-content-between">
      <p>{{ props.min.toLocaleString('fr', {useGrouping:true}) }} €</p>
      <p>{{ props.max.toLocaleString('fr', {useGrouping:true})}} €</p>
    </div>
    <div class="gradient"></div>
  </div>
</template>

<style scoped>
.titre-legende {
  font-size: x-large;
  margin-top: 1em;
}

.indic {
  width: 20em;
  height: 1em;
  margin-left: 5em;
}

.gradient {
  width: 100%;
  height: 1em;
  background: linear-gradient(to right, v-bind('props.minCouleur'), v-bind('props.maxCouleur'));
  border: 1px solid black;
}
</style>
