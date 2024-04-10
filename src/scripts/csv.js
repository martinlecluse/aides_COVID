import * as d3 from 'd3'

//charge un fichier csv
export const chargerCSV = async function (cheminFichier, separator = ',') {
  const parseCsv = d3.dsvFormat(separator).parse;
  return await d3.text(cheminFichier).then(
    (data) => {
      const parsedData = parseCsv(data);
      return parsedData
    },
    (reason) => {
      console.log('Erreur lors du chargement du fichier : ' + cheminFichier, reason)
    }
  )
}
