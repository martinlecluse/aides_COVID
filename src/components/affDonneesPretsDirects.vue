<script setup lang="ts">
import { donneesPretsDirectsPays, echelleCouleurJaune } from '@/config/globals'
import { onMounted } from 'vue'
import { valeursVersRGB } from '@/scripts/maps'

const props = defineProps<{
  type_aide?: string
  nombre?: number
  effectif?: number
  montant?: number
  refNational?: donneesPretsDirectsPays
  couleur?: number[][]
}>()

let couleurClaire: string
let couleurSombre: string

onMounted(() => {
  couleurClaire = valeursVersRGB(1, 0, 1, props.couleur)
  couleurSombre = valeursVersRGB(1, 0, 0, props.couleur)
})
</script>

<template>
  <div class="title">
    <h1>{{ type_aide }}</h1>
  </div>

  <div class="champs-donnees">
    <div class="champ">
      <h2><span class="point">⦿</span> Nombre</h2>
      <p>{{ nombre }}</p>
      <p v-if="refNational">
        / <span class="refNational">{{ refNational.nombre_dossiers }}</span>
      </p>
    </div>
    <div class="champ">
      <h2><span class="point">⦿</span> Effectif</h2>
      <p>{{ effectif }}</p>
      <p v-if="refNational">
        / <span class="refNational">{{ refNational.effectifs }}</span>
      </p>
    </div>
    <div class="champ">
      <h2><span class="point">⦿</span> Montant</h2>
      <p>{{ montant / 1000 }} k€</p>
      <p v-if="refNational">
        / <span class="refNational">{{ refNational.montant / 1000 }} k€</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 650;
  font-size: 28px;
}

.champs-donnees {
  display: flex;
  align-items: left;
  width: 100%;
}

.champ {
  width: 28%;
  margin: 0% 4% 0% 4%;
}

.champ h2 {
  font-size: 22px;
  font-weight: 600;
}

.champ p {
  text-align: right;
  margin-right: 20px;
}

.point {
  color: v-bind('couleurClaire');
  margin-right: 5px;
}

.refNational {
  color: v-bind('couleurClaire');
}
</style>
