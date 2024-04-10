<script setup lang="ts">
import { ref } from 'vue'

import { PATH_PRETS_DIRECTS_REGIONAL, PATH_PRETS_DIRECTS_NATIONAL } from '../config/path_data'
import {
  CODES_REG,
  donneesPretsDirectsPays,
  donneesPretsDirectsRegions,
  agregInfosZonesTab,
  echelleCouleurJaune
} from '@/config/globals'

import { chargerCSV } from '../scripts/csv.js'
// import { setHandlers, setColors } from "../scripts/maps";
import { RgbToStr } from '@/scripts/utils'

import affDonneesPretsDirects from './affDonneesPretsDirects.vue'
import carteFrance from './carte/carteFrance.vue'
import { onMounted } from 'vue'

//stockage des données issues des csv
let donneesPretsDirectsRegional: donneesPretsDirectsRegions[]
let donneesPretsDirectsNational: donneesPretsDirectsPays[]
let infosRegions: agregInfosZonesTab = []

let tabDonneesRegionCliquee: donneesPretsDirectsRegions[]

let echelleCouleur = echelleCouleurJaune
let legende_carte = "Montant total des prêts directs"

//stocke le retour de setColors -> min et max des valeurs transmises
let minMaxValeurs: number[]
let description = ref(
  'Ils s’adressent : aux PME de 50 à 250 salariés, ou à titre dérogatoire pour les moins de 50 salariés, qui nécessitent un soutien en trésorerie et une restructuration de leur bilan et opérations, et qui ne sont pas ou plus soutenus par leurs financeurs privés ou bancaires'+
  'et aux PME qui font état de perspectives réelles de redressement ou retour à la rentabilité, démontrées par un plan d’affaires, éventuellement audité.'+
  'Les aides sont accordées après avoir recherché une contribution équilibrée des différents partenaires financiers de l’entreprise : apurement du passif auprès des créanciers publics (CCSF) et privés, apport des actionnaires.'
)

//dynamique d'affichage
const affPage = ref(false) //affichage après chargement des données
const affCarte = ref(false)
const affDonneesRegion = ref(false)
const affDonneesAgregees = ref(false) //fichier différent -> on prévoit un cas d'erreur
const errDonnees = ref(false) //contrôle du chargement sans erreur des données
const showFullText = ref(false)
const truncatedText = ref('')
const ellipsisText = '...'
const isTextLongEnough = ref(false)
const truncatedLength = 0
const toggleText = () => {
  showFullText.value = !showFullText.value
}

const updateTruncatedText = () => {
  truncatedText.value = description.value.slice(0, truncatedLength)
  isTextLongEnough.value = description.value.length > truncatedLength
}

//initialisation du tableau qui contiendra les infos par région
function initTableauInfosRegions() {
  CODES_REG.forEach((element) => {
    infosRegions.push({ zoneGeo: element, value: 0 })

    //on récupère tous les montants du tableau des prêts
    let tabValeursRegion = donneesPretsDirectsRegional.filter(
      (infosPrets) => infosPrets.reg == element
    )

    tabValeursRegion.forEach((item) => {
      infosRegions[infosRegions.length - 1].value += +item.montant
    })
  })

  //on cherche le min et max dans le tableau
  let tabValeurs: number[] = infosRegions.map((item) => item.value)
  let max = Math.max(...tabValeurs)
  let min = Math.min(...tabValeurs)

  return [min, max]
}
updateTruncatedText()

//lors du clic sur une région
function afficherInfosRegions(noRegion: string) {
  affDonneesRegion.value = false

  //recherche des données correspondant à la région
  tabDonneesRegionCliquee = donneesPretsDirectsRegional.filter((item) => item.reg == noRegion)

  //certaines régions ont un champ "type d'aide" vide, on le remplace par une indication
  tabDonneesRegionCliquee.forEach((item) => {
    if (item.type_aide == '') {
      item.type_aide = 'Non renseigné'
    }
  })

  affDonneesRegion.value = true
}

onMounted(() => {
  //chargement des données relatives aux prêts directs à l'échelle régionale
  chargerCSV(PATH_PRETS_DIRECTS_REGIONAL).then(
    (data) => {
      //enregistrement des données
      donneesPretsDirectsRegional = data

      //conversion des champs en number
      donneesPretsDirectsRegional.forEach((donnee) => {
        donnee.effectifs = +donnee.effectifs
        donnee.nombre_dossiers = +donnee.nombre_dossiers
        donnee.montant = +donnee.montant
      })

      minMaxValeurs = initTableauInfosRegions()
      affPage.value = true
      affCarte.value = true
    },
    (reason) => {
      console.log('Erreur chargement données : ', reason)
      errDonnees.value = true
    }
  )

  //chargement des données relatives aux prêts directs de l'état à l'échelle nationale
  chargerCSV(PATH_PRETS_DIRECTS_NATIONAL).then(
    (data) => {
      //enregistrement des données
      donneesPretsDirectsNational = data

      //conversion des champs en number
      donneesPretsDirectsNational.forEach((donnee) => {
        donnee.effectifs = +donnee.effectifs
        donnee.nombre_dossiers = +donnee.nombre_dossiers
        donnee.montant = +donnee.montant
      })

      affDonneesAgregees.value = true
    },
    (reason) => {
      console.log('Erreur chargement données : ', reason)
      errDonnees.value = true
    }
  )
})
</script>

<template>
  <div class="dashboard title">
    <h1><span class="dashboard point">⦿</span> Prêts directs</h1>
  </div>

  <!-- On affiche la page uniquement si les données à l'échelle régionale sont chargées, sinon on considère que c'est inutile -->
  <div v-if="affPage">
    <div class="dashboard content" v-if="!errDonnees">
      <div class="dashboard map" v-if="affCarte">
        <carteFrance
          :mesure="legende_carte"
          :echelleCouleur="echelleCouleur"
          :existeInfosDepts="false"
          :tabDonneesAfficheesRegion="infosRegions"
          :minMaxValeursRegion="minMaxValeurs"
          @clicZoneGeo="
            (number, isRegion) => {
              if (isRegion) {
                afficherInfosRegions(number)
              }
            }
          "
        ></carteFrance>
      </div>

      <div class="dashboard aff-donnees">
        <div>
          <p>
          Des mesures spécifiques, sous forme de crédits d’intervention directs de l’Etat, ont été prévues afin de soutenir les entreprises pour lesquelles le recours aux autres dispositifs exceptionnels (Fonds de solidarité, PGE, report des échéances fiscales et sociales, activité partielle, etc.) se révèle inopérant ou insuffisant.
          </p>
          <p>
          Ces prêts visent le sauvetage d’une entreprise présentant un intérêt stratégique en raison notamment de son impact territorial ou de son positionnement industriel.
          </p>
          <p>
            <span v-if="showFullText || !isTextLongEnough">{{ description }}</span>
            <span v-else>{{ truncatedText }}{{ ellipsisText }}</span>
          </p>
          <div v-if="isTextLongEnough" class="text-center">
            <button @click="toggleText" class="btn btn-primary custom-btn">
              {{ showFullText ? 'Voir moins' : 'Voir plus' }}
            </button>
          </div>
          <p>Source : <a href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-prets-directs-de-letat-mis-en-place-dans-le-cadre-de-lepidemie-de-covid-19/">data.gouv.fr</a></p>
        </div>

        <div class="dashboard donnees">
          <h2 v-if="affDonneesRegion">Données {{ tabDonneesRegionCliquee[0].libelle }}</h2>
          <div class="donnees-region" v-if="affDonneesRegion">
            <affDonneesPretsDirects
              v-for="item in tabDonneesRegionCliquee"
              :couleur="echelleCouleur"
              :type_aide="item.type_aide"
              :nombre="item.nombre_dossiers"
              :effectif="item.effectifs"
              :montant="item.montant"
              :refNational="
                donneesPretsDirectsNational
                  .filter((donnee) => donnee.type_aide == item.type_aide)
                  .at(0)
              "
            ></affDonneesPretsDirects>
          </div>
          <!-- Les données à l'échelle nationale sont dans un fichier à part, il faut le prendre en compte
              Si ce fichier ne charge pas correctement, on affiche quand même la page -->
          <h2 v-if="affDonneesAgregees">Données nationales</h2>
          <div class="donnees-agregees" v-if="affDonneesAgregees">
            <affDonneesPretsDirects
              v-for="item in donneesPretsDirectsNational"
              :couleur="echelleCouleur"
              :type_aide="item.type_aide"
              :nombre="item.nombre_dossiers"
              :effectif="item.effectifs"
              :montant="item.montant"
            ></affDonneesPretsDirects>
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

.custom-btn {
  border: 1px solid v-bind('RgbToStr(echelleCouleur[1])');
  background-color: v-bind('RgbToStr(echelleCouleur[1])');
}

.refNational {
  color: v-bind('RgbToStr(echelleCouleur[1])');
}
</style>
