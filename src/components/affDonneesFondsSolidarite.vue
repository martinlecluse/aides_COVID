<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import { computed, onMounted } from 'vue';
import { convertMilliers } from '@/scripts/utils';
const props = defineProps(['data'])

const getSortableProperty = (item) => {
  return item.libelle_categorie_juridique
    ? item.libelle_categorie_juridique
    : item.libelle_classe_effectif
      ? item.libelle_classe_effectif
      : item.libelle_section
        ? item.libelle_section
        : item.libelle;
}

const sortedData = computed(() => {
  return [...props.data].sort((a, b) => {
    const aValue = getSortableProperty(a);
    const bValue = getSortableProperty(b);

    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  });
});

const totalAides = computed(() => {
  return props.data.reduce((total, item) => total + item.nombre_aides, 0);
});

const totalEntreprises = computed(() => {
  return props.data.reduce((total, item) => total + item.nombre_entreprises, 0);
});

const totalMontant = computed(() => {
  return props.data.reduce((total, item) => total + item.montant_total, 0);
});

function ajusterLargeurColonnes() {
  const donnees = document.querySelectorAll('.no-crop p');
  let maxWidth = 0;
  console.log(donnees)
  donnees.forEach(d => {
      maxWidth = Math.max(maxWidth, d.offsetWidth);
      console.log(maxWidth)
  });
  maxWidth = maxWidth+40
  // Définir la largeur maximale calculée pour la colonne "Montant"
  document.querySelectorAll('.no-crop').forEach(d => {
      d.style.width = `${maxWidth}px`;
  });
}

//Gestion des colonnes que l'on veut garder sur une ligne
onMounted(() => {
    ajusterLargeurColonnes()
});
</script>

<template>
  <table class="tableau-donnees table table-bordered table-hover">
    <thead>
      <tr>
        <th scope="col">Catégorie</th>
        <th scope="col">Nombre d'aides</th>
        <th scope="col">Nombre d'entreprises</th>
        <th scope="col" class="no-crop">Montant</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="index" class="dt champ">
        <td>
          {{
            item.libelle_categorie_juridique
              ? item.libelle_categorie_juridique
              : item.libelle_classe_effectif
                ? item.libelle_classe_effectif
                : item.libelle_section
                  ? item.libelle_section
                  : item.libelle
          }}
        </td>
        <td><p>{{ item.nombre_aides.toLocaleString('fr', {useGrouping:true}) }}</p></td>
        <td><p>{{ item.nombre_entreprises.toLocaleString('fr', {useGrouping:true}) }}</p></td>
        <td class="no-crop"><p>{{ convertMilliers(item.montant_total).toLocaleString('fr', {useGrouping:true}) }} k€</p></td>
      </tr>
      <tr class="dt total-row">
        <td>Total</td>
        <td><p>{{ totalAides.toLocaleString('fr', {useGrouping:true}) }}</p></td>
        <td><p>{{ totalEntreprises.toLocaleString('fr', {useGrouping:true}) }}</p></td>
        <td class="no-crop"><p>{{ convertMilliers(totalMontant).toLocaleString('fr', {useGrouping:true}) }} k€</p></td>
      </tr>
    </tbody>
  </table>
</template>