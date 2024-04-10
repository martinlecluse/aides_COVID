//COLORATION DES ZONES GEOGRAPHIQUES

//Renvoie le triplet RGB qui correspond à la valeur et à l'échelle de couleur choisie
export function valeursVersRGB(max: number, min: number, value: number, couleurs: number[][]) {
  let red = couleurs[0][0] + ((value - min) / (max - min)) * (couleurs[1][0] - couleurs[0][0])
  let green = couleurs[0][1] + ((value - min) / (max - min)) * (couleurs[1][1] - couleurs[0][1])
  let blue = couleurs[0][2] + ((value - min) / (max - min)) * (couleurs[1][2] - couleurs[0][2])

  return 'rgb(' + red + ',' + green + ',' + blue + ')'
}
