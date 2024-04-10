<script setup lang="ts">
 import { ref, watch, reactive } from 'vue'

 import { PATH_REPORTS_ECHEANCES_FISCALES_NAF_REG, PATH_REPORTS_ECHEANCES_FISCALES_NAF_DEPT } from '../config/path_data'
 import {
     CODES_DEPT,
     CODES_REG,
     donneesRepEchFiscDept,
     donneesRepEchFiscReg,
     agregInfosZonesTab,
     echelleCouleurRouge
 } from '@/config/globals'

 import { chargerCSV } from '../scripts/csv.js'
 // import { setHandlers, setColors } from "../scripts/maps";
 import { RgbToStr } from '@/scripts/utils'

 import affDonneesRepEchFisc from './affDonneesRepEchFisc.vue'
 import carteFrance from './carte/carteFrance.vue'
 import { onMounted } from 'vue'

 //stockage des données issues des csv
 let donneesRepEchFiscDept: donneesRepEchFiscDept[]
 let donneesRepEchFiscReg: donneesRepEchFiscReg[]
 let infosRegions: agregInfosZonesTab = reactive([])
 let infosDept: agregInfosZonesTab = reactive([])

 let echelleCouleur = echelleCouleurRouge
 let mesure="Montant total des reports"
 
 let tabDonneesRegionCliquee: donneesRepEchFiscReg[]
 let tabDonneesDeptCliquee: donneesRepEchFiscDept[]
 
 //stocke le retour de setColors -> min et max des valeurs transmises
 let minMaxValeursRegion: number[] = reactive([])
 let minMaxValeursDept: number[] = reactive([])


 //dynamique d'affichage
 const affPage = ref(false) //affichage après chargement des données
 const affCarte = ref(false)
 const affDonnees = ref(false)
 const errDonnees = ref(false) //contrôle du chargement sans erreur des données
 const isLoading = ref(false)

 //initialisation du tableau qui contiendra les infos par région
 function initTableauInfosRegions() {
     CODES_REG.forEach((element) => {
         infosRegions.push({ zoneGeo: element, value: 0 })

         //on récupère tous les montants du tableau des prêts
         let tabValeursRegion = donneesRepEchFiscReg.filter(
	 (infos) => infos.reg == element
         )

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

 //initialisation du tableau qui contiendra les infos par departement
 function initTableauInfosDept() {
     CODES_DEPT.forEach((element) => {
         infosDept.push({ zoneGeo: element, value: 0 })

         //on récupère tous les montants du tableau des prêts
         let tabValeursDept = donneesRepEchFiscDept.filter(
	 (infos) => infos.dep == element
         )

         tabValeursDept.forEach((item) => {
	 infosDept[infosDept.length - 1].value += +item.montant_total
         })
     })

     //on cherche le min et max dans le tableau
     let tabValeurs: number[] = infosDept.map((item) => item.value)
     let max = Math.max(...tabValeurs)
     let min = Math.min(...tabValeurs)

     return [min, max]
 }
 
 //lors du clic sur une région
 function afficherInfosRegions(noRegion: string) {
     affDonnees.value = false

     //recherche des données correspondant à la région
     tabDonneesRegionCliquee = donneesRepEchFiscReg.filter((item) => item.reg == noRegion)
     tabDonneesDeptCliquee = []

     affDonnees.value = true
 }

 //lors du clic sur un departement
 function afficherInfosDept(noDept: string) {
     affDonnees.value = false

     //recherche des données correspondant au département
     tabDonneesDeptCliquee = donneesRepEchFiscDept.filter((item) => item.dep == noDept)
     tabDonneesRegionCliquee = []

     affDonnees.value = true
 }

 async function loadData() {
     if (isLoading.value) {
         return
     }
     isLoading.value = true
     donneesRepEchFiscDept = []
     donneesRepEchFiscReg = []
     infosRegions.splice(0, infosRegions.length)
     infosDept.splice(0, infosDept.length)

     try {
         const [dataRegion, dataDep] = await Promise.all([
	 chargerCSV(PATH_REPORTS_ECHEANCES_FISCALES_NAF_REG),
	 chargerCSV(PATH_REPORTS_ECHEANCES_FISCALES_NAF_DEPT)
         ])

         //enregistrement des données
         donneesRepEchFiscReg = dataRegion
         donneesRepEchFiscDept = dataDep

         //conversion des champs en number
         donneesRepEchFiscReg.forEach((donnee) => {
	 donnee.nombre_reports = +donnee.nombre_reports
	 donnee.montant_total = +donnee.montant_total
         })

         donneesRepEchFiscDept.forEach((donnee) => {
	 donnee.nombre_reports = +donnee.nombre_reports
	 donnee.montant_total = +donnee.montant_total
         })

         minMaxValeursRegion.splice(0, minMaxValeursRegion.length)
         const newValuesRegion = initTableauInfosRegions()
         newValuesRegion.forEach((value) => minMaxValeursRegion.push(value))

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
 })

</script>

<template>
    <div class="dashboard title">
        <h1><span class="dashboard point">⦿</span> Reports d'échéances fiscales</h1>
    </div>

    <!-- On affiche la page uniquement si les données à l'échelle régionale sont chargées, sinon on considère que c'est inutile -->
    <div v-if="affPage">
        <div class="dashboard content" v-if="!errDonnees">
            <div class="dashboard map" v-if="affCarte">
                <carteFrance
                    :mesure="mesure"
                    :echelleCouleur='echelleCouleur'
                    :existeInfosDepts="true"
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
                        Le Gouvernement a annoncé le report des principales échéances fiscales des professionnels afin de tenir compte de leurs difficultés liées à la crise sanitaire du coronavirus.
                    </p>
                    <p>Le report d'échéance fiscale concerne :</p>
                    <ul>
                        <li>Les entreprises ou les experts-comptables qui interviennent pour des clients, pour qui il est possible de demander au service des impôts des entreprises le report sans pénalité du règlement de leurs prochaines échéances d'impôts directs (acompte d'impôt sur les sociétés, taxe sur les salaires).</li>
                        <li>Les travailleurs indépendants qui peuvent moduler à tout moment le taux et les acomptes de prélèvement à la source. Il est aussi possible de reporter le paiement des acomptes de prélèvement à la source sur les revenus professionnels d’un mois sur l’autre, jusqu’à trois fois si les acomptes sont mensuels, ou d’un trimestre sur l’autre si les acomptes sont trimestriels.</li>
                    </ul>
                    <p>Afin d'apporter une aide financière aux entreprises en difficulté, une procédure accélérée de remboursement des créances d'impôt sur les sociétés restituables en 2020 est mise en œuvre.
                        Enfin, la Commission des chefs de services financiers (CCSF) peut accorder aux entreprises qui rencontrent des difficultés financières des délais de paiement pour s’acquitter de leurs dettes fiscales et sociales en toute confidentialité.
                    </p>
                    <p>Source : <a href="https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-reports-decheances-fiscales-accordes-dans-le-cadre-de-lepidemie-de-covid-19/">data.gouv.fr</a></p>

                </div>

                
                <div class="dashboard donnees">
                    <h2 v-if="affDonnees">
                        Données
                        {{
                        tabDonneesRegionCliquee[0]
                                ? tabDonneesRegionCliquee[0].libelle_region
                                : tabDonneesDeptCliquee[0].libelle_departement
                        }}
                    </h2>
                    <div class="donnees-region" v-if="affDonnees">
                        <affDonneesRepEchFisc v-if="tabDonneesDeptCliquee[0]"
                            :data ="tabDonneesDeptCliquee"
                        ></affDonneesRepEchFisc>
                        <affDonneesRepEchFisc v-if="tabDonneesRegionCliquee[0]"
                            :data ="tabDonneesRegionCliquee"
                        ></affDonneesRepEchFisc>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

 .point {
    color: v-bind('RgbToStr(echelleCouleur[1])');
 }
</style>
