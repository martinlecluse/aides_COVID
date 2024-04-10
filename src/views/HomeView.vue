<script setup>
const navigate = (path) => {
  window.location.href = path
}
</script>

<template>
  <main class="d-flex flex-column align-items-left">
    <h1>Projet : aides COVID-19</h1>
    <div class="texte-explicatif">
      <p>
        Ce projet a pour but d’améliorer l’accès à l’information des citoyens en ce qui concerne
        l’action des pouvoirs publics. Nous nous sommes intéressés aux aides fournies aux
        entreprises entre mars et septembre 2020, lors de la pandémie de COVID-19.
        <br /><br />
        En cliquant sur “Tableaux de bord”, vous accédez à des tableaux de bord interactifs qui vous
        présentent de manière synthétique et exhaustive l’attribution des aides par l'Etat, mesure par mesure.
        <br /><br />
        En cliquant sur “Aides CPSTI”, à un tableau de bord interactif qui présente le détail de l'aide accordée par le Conseil de la Protection sociale
        des Travailleurs Indépendants (CPSTI).
      </p>
    </div>
    <div class="boutons">
      <button @click="navigate('/dashboard')" class="btn btn-primary me-5 btn-extra-large">
        Tableaux de bord
      </button>
      <button @click="navigate('/aides-cpsti')" class="btn btn-primary btn-extra-large">
        Aides CPSTI
      </button>
    </div>
  </main>
</template>

<style scoped>
h1 {
  margin: 1.5em 0 1em 1em;

  font-family: sans-serif;
  font-size: 400%;
  font-weight: 800;
  text-align: left;
  color: rgb(51, 87, 154);
}

.texte-explicatif {
  margin: 0 3em 3em 3em;

  text-align: justify;
  font-size: 22px;
}

.boutons {
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn-extra-large {
  font-size: 1.5rem; /* Adjust as needed */
  padding: 1rem 2rem; /* Adjust as needed */
  width: 14em;
  background-color: rgb(51, 87, 154);
  border: 1px solid rgb(51, 87, 154);
}
</style>
