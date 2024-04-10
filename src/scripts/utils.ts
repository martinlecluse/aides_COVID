//TRIPLET RGB -> STR
export function RgbToStr(rgb: number[]) {
  return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'
}

//Conversion € -> k€
export function convertMilliers(n: number) {
  return Math.floor(n/1000)
}