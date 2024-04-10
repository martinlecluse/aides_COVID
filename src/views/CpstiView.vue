<script>
import cpsti from '@/components/cpsti.vue'

import { themeCPSTI } from '@/config/globals'

export default {
  components: {
    cpsti
  },
  data() {
    return {
      themeCPSTI: themeCPSTI
    }
  }
}
</script>

<template>
  <div>
    <header class="d-flex flex-row justify-content-between algin-items-flex-end">
      <div class="title-dashboards">
        <h2>Aides de la CPSTI</h2>
      </div>
      <nav class="link_homepage">
        <router-link to="/" exact class="text-white">Retour</router-link>
      </nav>
    </header>

    <div class="content-dashboards">
      <div class="texte-presentation-tableaux-bord">
        <p>Cette aide a été créée par le Conseil de la protection sociale des travailleurs indépendants (CPSTI) en faveur des artisans/commerçants et leurs conjoints collaborateurs relevant du Régime Complémentaire des Indépendants (RCI) dans le cadre de la crise du Covid-19.
          Elle s'adresse à tous les artisans/commerçants et leurs conjoints collaborateurs :
        </p>
        <ul>
          <li>relevant du Régime Complémentaire des Indépendants (RCI);</li>
          <li>en activité au 15 mars 2020;</li>
          <li>immatriculés avant le 1er janvier 2019</li>
        </ul>
        <p>Source : <a href="https://open.urssaf.fr/explore/dataset/aide-exceptionnelle-cpsti-covid-19/information/">Acoss-Urssaf</a></p>
      </div>

      <div>
        <cpsti></cpsti>
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

</style>
