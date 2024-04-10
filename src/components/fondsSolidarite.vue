<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

import {
  PATH_FONDS_SOLIDARITE_VOL1_DEPT_CATEGORIE_JURIDIQUE,
  PATH_FONDS_SOLIDARITE_VOL1_DEPT_CLASSE_EFFECTIF,
  PATH_FONDS_SOLIDARITE_VOL1_DEPT_NAF,
  PATH_FONDS_SOLIDARITE_VOL1_REG_CATEGORIE_JURIDIQUE,
  PATH_FONDS_SOLIDARITE_VOL1_REG_CLASSE_EFFECTIF,
  PATH_FONDS_SOLIDARITE_VOL1_REG_NAF,
  PATH_FONDS_SOLIDARITE_VOL2_REG_CATEGORIE_JURIDIQUE,
  PATH_FONDS_SOLIDARITE_VOL2_REG_CLASSE_EFFECTIF,
  PATH_FONDS_SOLIDARITE_VOL2_REG_NAF
} from '../config/path_data'

import {
  CODES_REG,
  donneesFondsSolidariteRegion,
  donneesFondsSolidariteDep,
  DonneesFondsSolidaritePays,
  agregInfosZonesTab,
  echelleCouleurVert
} from '@/config/globals'

import { chargerCSV } from '../scripts/csv.js'
// import { setHandlers, setColors } from "../scripts/maps";
import { RgbToStr } from '@/scripts/utils'

import affDonneesFondsSolidarite from './affDonneesFondsSolidarite.vue'
import carteFrance from './carte/carteFrance.vue'
import { onMounted } from 'vue'

//stockage des données issues des csv
let donneesFondsSolidariteRegional: donneesFondsSolidariteRegion[]
let donneesFondsSolidariteDepartement: donneesFondsSolidariteDep[]
let donneesFondsSolidariteNational: DonneesFondsSolidaritePays[]
let infosRegions: agregInfosZonesTab = reactive([])
let infosDeps: agregInfosZonesTab = reactive([])

let tabDonneesCliquee: donneesFondsSolidariteRegion[]

let echelleCouleur = echelleCouleurVert
let legende_carte = "Montant total"

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
const pathRegion = ref(PATH_FONDS_SOLIDARITE_VOL1_REG_CATEGORIE_JURIDIQUE)
const pathDep = ref(PATH_FONDS_SOLIDARITE_VOL1_DEPT_CATEGORIE_JURIDIQUE)
const isLoading = ref(false)
const showInfosDep = ref(true)

//initialisation du tableau qui contiendra les infos par région
function initTableauInfosRegions() {
  CODES_REG.forEach((element) => {
    infosRegions.push({ zoneGeo: element, value: 0 })

    //on récupère tous les montants du tableau des prêts
    let tabValeursRegion = donneesFondsSolidariteRegional.filter((infos) => infos.reg == element)

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
  let depSet = new Set(donneesFondsSolidariteDepartement.map((item) => item.dep))
  depSet.forEach((element) => {
    infosDeps.push({ zoneGeo: element, value: 0 })

    //on récupère tous les montants du tableau des prêts
    let tabValeursDep = donneesFondsSolidariteDepartement.filter((infos) => infos.dep == element)

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
  let libelle = donneesFondsSolidariteRegional[0].libelle_categorie_juridique
    ? 'libelle_categorie_juridique'
    : donneesFondsSolidariteRegional[0].libelle_classe_effectif
      ? 'libelle_classe_effectif'
      : 'libelle_section'
  let result = donneesFondsSolidariteRegional.reduce((acc, item) => {
    let found = acc.find((x) => x.libelle === item[libelle])
    if (!found) {
      acc.push({
        libelle: item[libelle],
        montant_total: item.montant_total,
        nombre_aides: item.nombre_aides,
        nombre_entreprises: item.nombre_entreprises
      })
    } else {
      found.montant_total += item.montant_total
      found.nombre_aides += item.nombre_aides
      found.nombre_entreprises += item.nombre_entreprises
    }
    return acc
  }, [] as DonneesFondsSolidaritePays[])

  donneesFondsSolidariteNational = result
  console.log('données nationales : ', donneesFondsSolidariteNational)
  affDonneesAgregees.value = true
}

//lors du clic sur une région
function afficherInfosRegions(noRegion: string) {
  affDonnees.value = false

  //recherche des données correspondant à la région
  tabDonneesCliquee = donneesFondsSolidariteRegional.filter((item) => item.reg == noRegion)

  affDonnees.value = true
}

function afficherInfosDepartements(noDep: string) {
  affDonnees.value = false

  //recherche des données correspondant au département
  tabDonneesCliquee = donneesFondsSolidariteDepartement.filter((item) => item.dep == noDep)
  console.log(tabDonneesCliquee)
  affDonnees.value = true
}

//Intercation avec les boutons
function switchvolet(volet: number, event) {
  this.volet = volet;
  let siblings = event.target.parentNode.childNodes
  siblings.forEach(s => {
    s.setAttribute('id', 'not-selected')
  });
  event.target.setAttribute('id', 'selected');
}

function switchcateg(categ: number, event) {
  this.categorie = categ;
  let siblings = event.target.parentNode.childNodes
  siblings.forEach(s => {
    s.setAttribute('id', 'not-selected')
  });
  event.target.setAttribute('id', 'selected');
}

async function loadData() {
  if (isLoading.value) {
    return
  }
  isLoading.value = true
  donneesFondsSolidariteRegional = []
  donneesFondsSolidariteDepartement = []
  infosRegions.splice(0, infosRegions.length)
  infosDeps.splice(0, infosDeps.length)

  try {
    const [dataRegion, dataDep] = await Promise.all([
      chargerCSV(pathRegion.value),
      chargerCSV(pathDep.value)
    ])

    // Process dataRegion
    donneesFondsSolidariteRegional = dataRegion
    donneesFondsSolidariteRegional.forEach((donnee) => {
      donnee.nombre_aides = +donnee.nombre_aides
      donnee.nombre_entreprises = +donnee.nombre_entreprises
      donnee.montant_total = +donnee.montant_total
    })
    minMaxValeursRegion.splice(0, minMaxValeursRegion.length)
    const newValuesRegion = initTableauInfosRegions()
    newValuesRegion.forEach((value) => minMaxValeursRegion.push(value))

    // Process dataDep
    donneesFondsSolidariteDepartement = dataDep
    donneesFondsSolidariteDepartement.forEach((donnee) => {
      donnee.nombre_aides = +donnee.nombre_aides
      donnee.nombre_entreprises = +donnee.nombre_entreprises
      donnee.montant_total = +donnee.montant_total
    })
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

watch([volet, categorie], async () => {
  switch (categorie.value) {
    case 1:
      switch (volet.value) {
        case 1:
          pathRegion.value = PATH_FONDS_SOLIDARITE_VOL1_REG_CATEGORIE_JURIDIQUE
          pathDep.value = PATH_FONDS_SOLIDARITE_VOL1_DEPT_CATEGORIE_JURIDIQUE
          showInfosDep.value = true
          break
        case 2:
          pathRegion.value = PATH_FONDS_SOLIDARITE_VOL2_REG_CATEGORIE_JURIDIQUE
          showInfosDep.value = false
          break
      }
      break
    case 2:
      switch (volet.value) {
        case 1:
          pathRegion.value = PATH_FONDS_SOLIDARITE_VOL1_REG_CLASSE_EFFECTIF
          pathDep.value = PATH_FONDS_SOLIDARITE_VOL1_DEPT_CLASSE_EFFECTIF
          showInfosDep.value = true
          break
        case 2:
          pathRegion.value = PATH_FONDS_SOLIDARITE_VOL2_REG_CLASSE_EFFECTIF
          showInfosDep.value = false
          break
      }
      break
    case 3:
      switch (volet.value) {
        case 1:
          pathRegion.value = PATH_FONDS_SOLIDARITE_VOL1_REG_NAF
          pathDep.value = PATH_FONDS_SOLIDARITE_VOL1_DEPT_NAF
          showInfosDep.value = true
          break
        case 2:
          pathRegion.value = PATH_FONDS_SOLIDARITE_VOL2_REG_NAF
          showInfosDep.value = false
          break
      }
      break
  }
  affDonnees.value = false
  affDonneesAgregees.value = false
  await loadData()
  calculerDonneesNationales()
})
</script>

<template>
  <div class="dashboard title">
    <h1><span class="dashboard point">⦿</span> Fonds de solidarité</h1>
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
        <div>
          <p>
          Dans le contexte de l'épidémie de COVID-19, l’Etat a mis en place, avec les Régions, un fonds de solidarité doté d’1,7 milliard d’euros pour le mois de mars 2020 qui permettra le versement d’une aide défiscalisée allant jusqu’à 1500 euros aux plus petites entreprises, aux indépendants, aux micro-entrepreneurs et aux professions libérales touchés par la crise du coronavirus. Ce fonds sera maintenu autant que durera l’urgence sanitaire.
          </p>
          <p>
          Pour obtenir d’autres informations relatives au fonds de solidarité, il est possible de consulter la page d’information disponible ici : <a href="https://www.impots.gouv.fr/portail/">portail impots.gouv</a>.
          </p>
          <p>Source : <a href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-au-fonds-de-solidarite-mis-en-place-dans-le-cadre-de-lepidemie-de-covid-19/">data.gouv.fr</a></p>
        </div>

        <div class="filtres">
          <h2>Sélectionner les aides</h2>

          <div class="boutons-volet">
            <p>Volet :</p>
            <div class="btn-group" role="group">
              <button class="btn btn-primary" id="selected" @click="switchvolet(1, $event)">Volet 1</button>
              <button class="btn btn-primary" id="not-selected" @click="switchvolet(2, $event)">Volet 2</button>
            </div>
        </div>


          <div class="boutons-filtre-categorie">
            <p>Catégorie :</p>
            <div class="btn-group btn-group-toggle" role="group" data-toggle="buttons">
              <button class="btn btn-primary" id="selected" @click="switchcateg(1, $event)">Catégorie juridique</button>
              <button class="btn btn-primary" id="not-selected" @click="switchcateg(2, $event)">Classe effectif</button>
              <button class="btn btn-primary" id="not-selected" @click="switchcateg(3, $event)">NAF</button>
            </div>
          </div>
      </div>

        <h2 v-if="affDonnees">
          Données
          {{
            tabDonneesCliquee[0].libelle_departement
              ? tabDonneesCliquee[0].libelle_departement
              : tabDonneesCliquee[0].libelle_region
          }}
        </h2>
        <h2 v-if="affDonneesAgregees && !affDonnees">Données Nationales</h2>
        <div class="donnees">
          <div class="donnees-region" v-if="affDonnees">
            <affDonneesFondsSolidarite
              :data="tabDonneesCliquee"
            ></affDonneesFondsSolidarite>
          </div>

          <div class="donnees-agregees" v-if="affDonneesAgregees && !affDonnees">
            <affDonneesFondsSolidarite
              :data="donneesFondsSolidariteNational"
            ></affDonneesFondsSolidarite>
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
  color: v-bind('RgbToStr(echelleCouleur[1])');
  border: 1px solid v-bind('RgbToStr(echelleCouleur[1])');
}

.filtres #selected.btn.btn-primary {
  background-color: v-bind('RgbToStr(echelleCouleur[1])');
  color: white;
  border: 1px solid v-bind('RgbToStr(echelleCouleur[1])');
}

.point {
  color: v-bind('RgbToStr(echelleCouleur[1])');
}
</style>
