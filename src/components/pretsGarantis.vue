<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.css'
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'

import { PATH_PGE_DEPT_NAF, PATH_PGE_REG_NAF } from '../config/path_data'
import {
  CODES_REG,
  CODES_DEPT,
  donneesPgeDept,
  donneesPgeRegion,
  agregInfosZonesTab,
  donneesFondsSolidariteRegion,
  echelleCouleurBleu,
  DonneesFondsSolidaritePays,
  DonneesPgePays
} from '@/config/globals'

import { chargerCSV } from '../scripts/csv.js'
// import { setHandlers, setColors } from "../scripts/maps";
import { RgbToStr } from '@/scripts/utils'

import affDonneesPretsGarantis from './affDonneesPretsGarantis.vue'
import carteFrance from './carte/carteFrance.vue'

//stockage des données issues des csv
let donneesPgeDept: donneesPgeDept[]
let donneesPgeRegion: donneesPgeRegion[]
let donnesPgeNationnal: DonneesPgePays[]
let infosRegions: agregInfosZonesTab = reactive([])
let infosDept: agregInfosZonesTab = reactive([])

let tabDonneesCliquee: donneesPgeRegion[]

//stocke le retour de setColors -> min et max des valeurs transmises
let minMaxValeursRegion: number[] = reactive([])
let minMaxValeursDept: number[] = reactive([])

let echelleCouleur = echelleCouleurBleu
let legende_carte = 'Montant total des prêts garantis'

//dynamique d'affichage
const affPage = ref(false) //affichage après chargement des données
const affCarte = ref(false)
const affDonnees = ref(false)
const errDonnees = ref(false) //contrôle du chargement sans erreur des données
const pathRegion = ref(PATH_PGE_REG_NAF)
const pathDep = ref(PATH_PGE_DEPT_NAF)
const affDonneesAgregees = ref(false) //fichier différent -> on prévoit un cas d'erreur
const isLoading = ref(false)
const showInfosDep = ref(true)

//initialisation du tableau qui contiendra les infos par région
function initTableauInfosRegions() {
  CODES_REG.forEach((element) => {
    infosRegions.push({ zoneGeo: element, value: 0 })

    //on récupère tous les montants du tableau des prêts
    let tabValeursRegion = donneesPgeRegion.filter((infos) => infos.reg == element)

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

function initTableauInfosDept() {
  CODES_DEPT.forEach((element) => {
    infosDept.push({ zoneGeo: element, value: 0 })

    //on récupère tous les montants du tableau des prêts
    let tabValeursDep = donneesPgeDept.filter((infos) => infos.dep == element)

    tabValeursDep.forEach((item) => {
      infosDept[infosDept.length - 1].value += +item.montant_total
    })
  })

  //on cherche le min et max dans le tableau
  let tabValeurs: number[] = infosDept.map((item) => item.value)
  let max = Math.max(...tabValeurs)
  let min = Math.min(...tabValeurs)

  return [min, max]
}

function calculerDonneesNationales() {
  let libelle = 'libelle_section'

  let result = donneesPgeDept.reduce((acc, item) => {
    let found = acc.find((x) => x.libelle_section === item[libelle])
    if (!found) {
      acc.push({
        libelle_section: item[libelle],
        montant_total: item.montant_total,
        nombre_pge: item.nombre_pge,
        date_maj: item.date_maj
      })
    } else {
      found.montant_total += item.montant_total
      found.nombre_pge += item.nombre_pge
    }
    return acc
  }, [] as DonneesPgePays[])

  donnesPgeNationnal = result
  console.log('données nationales : ', donnesPgeNationnal)
  affDonneesAgregees.value = true
}

//lors du clic sur une région
function afficherInfosRegions(noRegion: string) {
  affDonnees.value = false

  //recherche des données correspondant à la région
  tabDonneesCliquee = donneesPgeRegion.filter((item) => item.reg == noRegion)

  affDonnees.value = true
}

//lors du clic sur un departement
function afficherInfosDept(noDept: string) {
  affDonnees.value = false

  //recherche des données correspondant à la région
  tabDonneesCliquee = donneesPgeDept.filter((item) => item.dep == noDept)

  affDonnees.value = true
}

async function loadData() {
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  donneesPgeRegion = []
  donneesPgeDept = []
  infosRegions.splice(0, infosRegions.length)
  infosDept.splice(0, infosDept.length)

  try {
    const [dataRegion, dataDep] = await Promise.all([
      chargerCSV(pathRegion.value),
      chargerCSV(pathDep.value)
    ])

    // Process dataRegion
    donneesPgeRegion = dataRegion
    donneesPgeRegion.forEach((donnee) => {
      donnee.nombre_pge = +donnee.nombre_pge
      donnee.montant_total = +donnee.montant_total
    })
    minMaxValeursRegion.splice(0, minMaxValeursRegion.length)
    const newValuesRegion = initTableauInfosRegions()
    newValuesRegion.forEach((value) => minMaxValeursRegion.push(value))

    // Process dataDep
    donneesPgeDept = dataDep
    donneesPgeDept.forEach((donnee) => {
      donnee.nombre_pge = +donnee.nombre_pge
      donnee.montant_total = +donnee.montant_total
    })
    minMaxValeursDept.splice(0, minMaxValeursDept.length)
    const newValuesDep = initTableauInfosDept()
    newValuesDep.forEach((value) => minMaxValeursDept.push(value))

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
  <div class="dashboard title">
    <h1><span class="dashboard point">⦿</span> Prêts garantis</h1>
  </div>

  <!-- On affiche la page uniquement si les données à l'échelle régionale sont chargées, sinon on considère que c'est inutile -->
  <div v-if="affPage">
    <div class="dashboard content" v-if="!errDonnees">
      <div class="dashboard map" v-if="affCarte">
        <carteFrance
          :mesure="legende_carte"
          :echelleCouleur="echelleCouleur"
          :existeInfosDepts="showInfosDep"
          :tabDonneesAfficheesRegion="infosRegions"
          :minMaxValeursRegion="minMaxValeursRegion"
          :tabDonneesAfficheesDep="infosDept"
          :minMaxValeursDep="minMaxValeursDept"
          @clicZoneGeo="
            (number, isRegion) => {
              if (isRegion) {
                afficherInfosRegions(number)
              } else {
                afficherInfosDept(number)
              }
            }
          "
        ></carteFrance>
      </div>

      <div class="dashboard aff-donnees">
        <div>
          <p>
            Le Gouvernement met en œuvre un dispositif exceptionnel de garanties permettant de
            soutenir le financement bancaire des entreprises, à hauteur de 300 milliards d’euros.
          </p>
          <p>
            Jusqu’au 31 décembre prochain, les entreprises de toute taille, quelle que soit la forme
            juridique de l’entreprise (notamment sociétés, commerçants, artisans, exploitants
            agricoles, professions libérales, micro-entrepreneurs, associations et fondations ayant
            une activité économique ), à l’exception des sociétés civiles immobilières, des
            établissements de crédit et des sociétés de financement, pourront demander à leur banque
            habituelle un prêt garanti par l’État pour soutenir leur trésorerie.
          </p>
          <p>
            Source :
            <a
              href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-prets-garantis-par-letat-dans-le-cadre-de-lepidemie-de-covid-19/"
              >data.gouv.fr</a
            >
          </p>
        </div>
        <h2 v-if="affDonnees">
          Données
          {{
            tabDonneesCliquee[0]?.libelle_departement
              ? tabDonneesCliquee[0]?.libelle_departement
              : tabDonneesCliquee[0]?.libelle_region
                ? tabDonneesCliquee[0]?.libelle_region
                : 'manquantes'
          }}
        </h2>
        <h2 v-if="affDonneesAgregees && !affDonnees">Données Nationales</h2>
        <div class="dashboard donnees">
          <div class="donnees-region" v-if="affDonnees">
            <aff-donnees-prets-garantis :data="tabDonneesCliquee"></aff-donnees-prets-garantis>
          </div>

          <div class="donnees-agregees" v-if="affDonneesAgregees && !affDonnees">
            <aff-donnees-prets-garantis :data="donnesPgeNationnal"></aff-donnees-prets-garantis>
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
.point {
  color: v-bind('RgbToStr(echelleCouleur[1])');
}
</style>
