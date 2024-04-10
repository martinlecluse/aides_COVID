<script>
import pretsDirects from '../components/pretsDirects.vue'
import fondsSolidarite from '../components/fondsSolidarite.vue'
import pretsGarantis from '../components/pretsGarantis.vue'
import reportsEcheancesFiscales from '../components/reportsEcheancesFiscales.vue'

import {
  themeCPSTI,
  themeFondsSolidarite,
  themePretsDirects,
  themePretsGarantis,
  themeReportsEcheances
} from '@/config/globals'

export default {
  data() {
    return {
      currentTab: 1,
      themeCPSTI: themeCPSTI,
      themeFondsSolidarite: themeFondsSolidarite,
      themePretsDirects: themePretsDirects,
      themePretsGarantis: themePretsGarantis,
      themeReportsEcheances: themeReportsEcheances
    }
  },
  computed: {
    // Dynamiquement résoudre le composant en fonction de l'onglet actif
    currentTabComponent() {
      switch (this.currentTab) {
        case 1:
          return fondsSolidarite
          break
        case 2:
          return pretsDirects
          break
        case 3:
          return pretsGarantis
        case 4:
          return reportsEcheancesFiscales
        default:
          return null
      }
    }
  },
  methods: {
    // Changer l'onglet actif
    changeTab(tab) {
      this.currentTab = tab
    }
  }
}
</script>

<template>
  <div>
    <header class="d-flex flex-row justify-content-between algin-items-flex-end">
      <div class="title-dashboards">
        <h2>Tableaux de bord - aides COVID-19</h2>
      </div>
      <nav class="link_homepage">
        <router-link to="/" exact class="text-white">Retour</router-link>
      </nav>
    </header>

    <div class="content-dashboards">
      <div class="texte-presentation-tableaux-bord">
        <p>
          La pandémie de Covid-19 a été à l’origine d’une contraction notoire du PIB français en
          2020 (8,0%). Face à ce choc économique, le gouvernement a mis en place des mesures
          d’urgence à destination des entreprises et des salariés impactés, pour un total de 470
          milliards €.
        </p>
        <p>
          Ces aides se sont notamment déclinées en 4 mesures : fonds de solidarité aux entreprises,
          prêts directs de l’Etat, prêts garantis par l’Etat et reports d’échéances de dettes.
        </p>
        <p>
          Nous avons également reporté les montants accordés par le Conseil de la protection sociale
          des travailleurs indépendants (CPSTI) en faveur des artisans et commerçants,
          complémentaires aux fonds de solidarité de l’Etat.
        </p>
        <p>
          Ces tableaux interactifs permettent de consulter l’application des aides selon le
          département ou la région, ainsi que d’autres indicateurs selon les mesures.
        </p>
      </div>

      <nav>
        <div class="nav nav-tabs" id="nav" role="tablist">
          <a
            class="nav-item nav-link active show"
            id="fonds-solidarite"
            data-toggle="tab"
            role="tab"
            aria-controls="fonds"
            aria-selected="true"
            @click="changeTab(1)"
            ><p>Fonds de solidarité</p></a
          >
          <a
            class="nav-item nav-link"
            id="prets-directs"
            data-toggle="tab"
            role="tab"
            aria-controls="pretsDirects"
            aria-selected="false"
            @click="changeTab(2)"
            ><p>Prêts directs</p></a
          >
          <a
            class="nav-item nav-link"
            id="prets-garantis"
            data-toggle="tab"
            role="tab"
            aria-controls="pretsGarantis"
            aria-selected="false"
            @click="changeTab(3)"
            ><p>Prêts garantis</p></a
          >
          <a
            class="nav-item nav-link"
            id="reports-echeances"
            data-toggle="tab"
            role="tab"
            aria-controls="reportsEcheances"
            aria-selected="false"
            @click="changeTab(4)"
            ><p>Reports d'échéances fiscales</p></a
          >
        </div>
      </nav>

      <div class="tab-content" id="tabContent">
        <div
          class="tab-pane fade show active"
          id="fonds"
          role="tabpanel"
          aria-labelledby="fonds-solidarite"
        ></div>
        <div
          class="tab-pane fade"
          id="prets-directs"
          role="tabpanel"
          aria-labelledby="prets-directs"
        ></div>
        <div
          class="tab-pane fade"
          id="prets-garantis"
          role="tabpanel"
          aria-labelledby="prets-garantis"
        ></div>
        <div
          class="tab-pane fade"
          id="reports-echeances"
          role="tabpanel"
          aria-labelledby="reports-echeances"
        ></div>
      </div>

      <div>
        <!-- Affichage du composant actif en fonction de l'onglet sélectionné -->
        <component :is="currentTabComponent"></component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.d-flex {
  width: 100%;
}

header {
  height: 8em;

  align-items: flex-end;
  padding-bottom: 1em;

  font-family: sans-serif;
  color: white;
  background-color: rgb(51, 87, 154);
}

.title-dashboards h2 {
  margin-left: 1em;
  font-size: 230%;
  font-weight: 600;
}

.link_homepage {
  margin: 0 5em 1em 0;
  font-size: 100%;
}

.content-dashboards {
  width: 90%;
  height: 100%;
  margin: 3em auto;
}

.texte-presentation-tableaux-bord {
  margin-bottom: 30px;
  font-size: 110%;
  text-align: justify;
}

.navbar {
  width: 100%;
  height: 80px;
  padding: 0px;

  background-color: #b3b3b3;
  font-family: Arial;
}

.nav-item {
  width: 25%;
  height: 70px;
  color: black;
}

.nav-item p {
  pointer-events: none;

  margin: 0 0 0.5em 0.5em;

  font-size: 120%;
  font-weight: 700;
  text-decoration: none;
}

.nav-item :hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px -3px 3px -3px inset;
}

#fonds-solidarite.nav-link.active p {
  text-decoration: underline;
  text-decoration-color: v-bind('themeFondsSolidarite');
  text-decoration-thickness: 0.2em;
  text-underline-position: under right;
}

#prets-directs.nav-link.active p {
  text-decoration: underline;
  text-decoration-color: v-bind('themePretsDirects');
  text-decoration-thickness: 5px;
  text-underline-position: under right;
}

#prets-garantis.nav-link.active p {
  text-decoration: underline;
  text-decoration-color: v-bind('themePretsGarantis');
  text-decoration-thickness: 5px;
  text-underline-position: under right;
}

#reports-echeances.nav-link.active p {
  text-decoration: underline;
  text-decoration-color: v-bind('themeReportsEcheances');
  text-decoration-thickness: 5px;
  text-underline-position: under right;
}

#CPSTI {
  background-color: v-bind('themeCPSTI');
}
</style>
