<script setup>

 import 'bootstrap/dist/css/bootstrap.css'
 import { computed, onMounted } from 'vue';
 import { convertMilliers } from '@/scripts/utils';
 
 const props = defineProps(['data'])

 const totalReports = computed(() => {
  return props.data.reduce((total, item) => total + item.nombre_reports, 0);
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
	    <th scope="col">Section</th>
	    <th scope="col">Nombre de reports</th>
	    <th scope="col" class="no-crop">Montant total</th>
	</tr>
        </thead>
        <tbody>
	<tr v-for="item in data" class="dt champ">
	    <td>
	        {{
                    item.libelle_section
	        }}
	    </td>
	    <td><p>{{ item.nombre_reports.toLocaleString('fr', {useGrouping:true}) }}</p></td>
	    <td class="no-crop"><p>{{ convertMilliers(item.montant_total).toLocaleString('fr', {useGrouping:true}) }} k€</p></td>
	</tr>
	<tr class="dt total-row">
	    <td>Total</td>
	    <td><p>{{ totalReports.toLocaleString('fr', {useGrouping:true}) }}</p></td>
	    <td class="no-crop"><p>{{ convertMilliers(totalMontant).toLocaleString('fr', {useGrouping:true}) }} k€</p></td>
	</tr>
        </tbody>
    </table>
</template>