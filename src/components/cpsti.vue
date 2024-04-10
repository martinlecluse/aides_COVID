<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

import { PATH_AIDE_EXCEPTIONNELLE_CPSTI } from '../config/path_data'

import {
  CODES_REG,
  CODES_DEPT,
  donneesCPSTI,
  DonneesCPSTIPays,
  agregInfosZonesTab,
  echelleCouleurBleu
} from '@/config/globals'

import { chargerCSV } from '../scripts/csv.js'
import { RgbToStr } from '@/scripts/utils'
import affDonneesCPSTI from './affDonneesCPSTI.vue'

import carteFrance from './carte/carteFrance.vue'
import { onMounted } from 'vue'

//stockage des données issues des csv
let donneesCPSTIFrance: donneesCPSTI[]
let donneesCPSTIRegions: donneesCPSTI[]
let donneesCPSTIDeps: donneesCPSTI[]
let donneesCPSTINation: DonneesCPSTIPays[]
let infosRegions: agregInfosZonesTab = reactive([])
let infosDeps: agregInfosZonesTab = reactive([])

let tabDonneesCliquee: donneesCPSTI[]
let mesure: string = "Montant total de l'aide"

//stocke le retour de setColors -> min et max des valeurs transmises
let minMaxValeursRegion: number[] = reactive([])
let minMaxValeursDep: number[] = reactive([])

//dynamique d'affichage
const affPage = ref(false) //affichage après chargement des données
const affCarte = ref(false)
const affDonnees = ref(false)
const affDonneesAgregees = ref(false) //fichier différent -> on prévoit un cas d'erreur
const errDonnees = ref(false) //contrôle du chargement sans erreur des données
const volet = ref(1)
const categorie = ref(1)
const filePath = ref(PATH_AIDE_EXCEPTIONNELLE_CPSTI)
const isLoading = ref(false)
const showInfosDep = ref(true)

//initialisation du tableau qui contiendra les infos par région
function initTableauInfosRegions() {
  CODES_REG.forEach((element) => {
    infosRegions.push({ zoneGeo: element, value: 0 })

    //on récupère tous les montants du tableau des prêts
    let tabValeursRegion = donneesCPSTIRegions.filter((infos) => infos.code_region == element)

    tabValeursRegion.forEach((item) => {
      infosRegions[infosRegions.length - 1].value += +item.montant_total
    })
  })

  //on cherche le min et max dans le tableau
  let tabValeurs: number[] = infosRegions.map((item) => item.value)
  let max = Math.max(...tabValeurs)
  let min = Math.min(...tabValeurs)

  return [min, max]
}

//initialisation du tableau qui contiendra les infos par département
function initTableauInfosDeps() {
  CODES_DEPT.forEach((element) => {
    infosDeps.push({ zoneGeo: element, value: 0 })

    //on récupère tous les montants du tableau des prêts
    let tabValeursDep = donneesCPSTIDeps.filter((infos) => infos.code_departement == element)

    tabValeursDep.forEach((item) => {
      infosDeps[infosDeps.length - 1].value += +item.montant_total
    })
  })

  //on cherche le min et max dans le tableau
  let tabValeurs: number[] = infosDeps.map((item) => item.value)
  let max = Math.max(...tabValeurs)
  let min = Math.min(...tabValeurs)

  return [min, max]
}

function calculerDonneesNationales() {
  let result = donneesCPSTIFrance.reduce((acc, item) => {
    let found = acc.find((x) => x.secteur_NA21 === item.secteur_NA21)
    if (!found) {
      acc.push({
        secteur_NA21: item.secteur_NA21,
        montant_total: item.montant_total,
        nombre_de_beneficiaires: item.nombre_de_beneficiaires
      })
    } else {
      found.montant_total += item.montant_total
      found.nombre_de_beneficiaires += item.nombre_de_beneficiaires
    }
    return acc
  }, [] as DonneesCPSTIPays[])

  donneesCPSTINation = result
  console.log('données nationales : ', donneesCPSTINation)
  affDonneesAgregees.value = true
}

//lors du clic sur une région
function afficherInfosRegions(noRegion: string) {
  affDonnees.value = false

  //recherche des données correspondant à la région
  tabDonneesCliquee = donneesCPSTIRegions.filter((item) => item.code_region == noRegion)

  affDonnees.value = true
}

function afficherInfosDepartements(noDep: string) {
  affDonnees.value = false

  //recherche des données correspondant au département
  tabDonneesCliquee = donneesCPSTIDeps.filter((item) => item.code_departement == noDep)
  console.log(tabDonneesCliquee)
  affDonnees.value = true
}

async function loadData() {
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  donneesCPSTIFrance = []
  infosRegions.splice(0, infosRegions.length)
  infosDeps.splice(0, infosDeps.length)

  try {
    const [data] = await Promise.all([chargerCSV(filePath.value, ';')])
    console.log(data)

    // Process dataRegion
    donneesCPSTIFrance = data
    let groupedDataReg = {}
    let groupedDataDep = {}
    donneesCPSTIFrance.forEach((donnee) => {
      donnee.montant_total = +donnee.montant_total
      donnee.nombre_de_beneficiaires = +donnee.nombre_de_beneficiaires
      donnee.montant_total_en_millions = +donnee.montant_total_en_millions
      donnee.secteur_NA21 = donnee.secteur_NA21.substring(1 + donnee.code_NA21.length)

      let keyRegion = `${donnee.code_region}-${donnee.secteur_NA21}`
      let keyDep = `${donnee.code_departement}-${donnee.secteur_NA21}`

      // If the group doesn't exist, create it
      let { geo_point, code_departement, departement, ...donneeFiltreeReg } = donnee

      if (!groupedDataReg[keyRegion]) {
        groupedDataReg[keyRegion] = {
          ...donneeFiltreeReg,
          nombre_de_beneficiaires: donnee.nombre_de_beneficiaires,
          montant_total: donnee.montant_total,
          montant_total_en_millions: donnee.montant_total_en_millions
        }
      } else {
        // Add the values to the group
        groupedDataReg[keyRegion].nombre_de_beneficiaires += donnee.nombre_de_beneficiaires
        groupedDataReg[keyRegion].montant_total += donnee.montant_total
        groupedDataReg[keyRegion].montant_total_en_millions += donnee.montant_total_en_millions
      }

      if (!groupedDataDep[keyDep]) {
        groupedDataDep[keyDep] = {
          ...donnee,
          nombre_de_beneficiaires: donnee.nombre_de_beneficiaires,
          montant_total: donnee.montant_total,
          montant_total_en_millions: donnee.montant_total_en_millions
        }
      } else {
        // Add the values to the group
        groupedDataDep[keyDep].nombre_de_beneficiaires += donnee.nombre_de_beneficiaires
        groupedDataDep[keyDep].montant_total += donnee.montant_total
        groupedDataDep[keyDep].montant_total_en_millions += donnee.montant_total_en_millions
      }
    })
    donneesCPSTIRegions = Object.values(groupedDataReg)
    donneesCPSTIDeps = Object.values(groupedDataDep)

    minMaxValeursRegion.splice(0, minMaxValeursRegion.length)
    const newValuesRegion = initTableauInfosRegions()
    newValuesRegion.forEach((value) => minMaxValeursRegion.push(value))

    minMaxValeursDep.splice(0, minMaxValeursDep.length)
    const newValuesDep = initTableauInfosDeps()
    newValuesDep.forEach((value) => minMaxValeursDep.push(value))

    affPage.value = true
    affCarte.value = true
  } catch (error) {
    console.log('Erreur chargement données : ', error)
    errDonnees.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadData()
  calculerDonneesNationales()
})
</script>

<template>
  <!-- On affiche la page uniquement si les données à l'échelle régionale sont chargées, sinon on considère que c'est inutile -->
  <div v-if="affPage">
    <div class="dashboard content" v-if="!errDonnees">
      <div class="dashboard map" v-if="affCarte">
        <carteFrance
          :mesure="mesure"
          :echelleCouleur="echelleCouleurBleu"
          :existeInfosDepts="showInfosDep"
          :tabDonneesAfficheesRegion="infosRegions"
          :minMaxValeursRegion="minMaxValeursRegion"
          :tabDonneesAfficheesDep="infosDeps"
          :minMaxValeursDep="minMaxValeursDep"
          @clicZoneGeo="
            (number, isRegion) => {
              if (isRegion) {
                afficherInfosRegions(number)
              } else {
                afficherInfosDepartements(number)
              }
            }
          "
        ></carteFrance>
      </div>

      <div class="dashboard aff-donnees">
        <h2 v-if="affDonnees">
          Données
          {{
            tabDonneesCliquee[0]?.departement
              ? tabDonneesCliquee[0]?.departement
              : tabDonneesCliquee[0]?.region
                ? tabDonneesCliquee[0]?.region
                : 'manquantes'
          }}
        </h2>
        <h2 v-if="affDonneesAgregees && !affDonnees">Données Nationales</h2>
        <div class="dashboard donnees">
          <div class="donnees-region" v-if="affDonnees">
            <affDonneesCPSTI :data="tabDonneesCliquee"></affDonneesCPSTI>
          </div>

          <div class="donnees-agregees" v-if="affDonneesAgregees && !affDonnees">
            <affDonneesCPSTI :data="donneesCPSTINation"></affDonneesCPSTI>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- MESSAGE D'ERREUR -->
    </div>
  </div>
</template>

<style scoped>

.filtres {
  width: 100%;
  margin-bottom: 2em;
}

.filtres p {
  font-weight: 700;
  font-size: large;
  margin-top: 1em;
}

.filtres #not-selected.btn.btn-primary {
  background-color: white;
  color: rgb(39, 88, 41);
  border: 1px solid rgb(39, 88, 41);
}

.filtres #selected.btn.btn-primary {
  background-color: rgb(39, 88, 41);
  color: white;
}
</style>
