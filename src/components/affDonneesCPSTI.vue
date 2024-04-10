<script setup>
import { convertMilliers } from '@/scripts/utils'
import 'bootstrap/dist/css/bootstrap.css'
import { computed, onMounted } from 'vue'
const props = defineProps(['data'])

console.log(props.data)
const getSortableProperty = (item) => {
  return item.secteur_NA21
}

const sortedData = computed(() => {
  return [...props.data].sort((a, b) => {
    const aValue = getSortableProperty(a)
    const bValue = getSortableProperty(b)

    if (aValue < bValue) {
      return -1
    }
    if (aValue > bValue) {
      return 1
    }
    return 0
  })
})

const totalBeneficiaires = computed(() => {
  return props.data.reduce((total, item) => total + item.nombre_de_beneficiaires, 0)
})

const totalMontant = computed(() => {
  return props.data.reduce((total, item) => total + item.montant_total, 0)
})

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
})
</script>

<template>
  <table class="tableau-donnees table table-bordered table-hover">
    <thead>
      <tr>
        <th scope="col">Catégorie</th>
        <th scope="col">Nombre de bénéficiaires</th>
        <th scope="col" class="no-crop">Montant</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="index" class="dt champ">
        <td>
          {{ item.secteur_NA21 }}
        </td>
        <td>
          <p>{{ item.nombre_de_beneficiaires.toLocaleString('fr', { useGrouping: true }) }}</p>
        </td>
        <td class="no-crop">
          <p>
            {{ convertMilliers(item.montant_total).toLocaleString('fr', { useGrouping: true }) }} k€
          </p>
        </td>
      </tr>
      <tr class="dt total-row">
        <td>Total</td>
        <td>
          <p>{{ totalBeneficiaires.toLocaleString('fr', { useGrouping: true }) }}</p>
        </td>
        <td class="no-crop">
          <p>{{ convertMilliers(totalMontant).toLocaleString('fr', { useGrouping: true }) }} k€</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>
