//LISTE CODES REGIONS
export const CODES_REG = [
  '01',
  '02',
  '03',
  '04',
  '06',
  '11',
  '24',
  '27',
  '28',
  '32',
  '44',
  '52',
  '53',
  '75',
  '76',
  '84',
  '93',
  '94'
]

//LISTE CODES DEPARTEMENT
export const CODES_DEPT = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '2A',
  '2B',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69D',
  '69M',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '971',
  '972',
  '973',
  '974',
  '975',
  '976',
  '977',
  '978',
  '984',
  '986',
  '987',
  '988',
  '989'
]

//ECHELLES DE COULEUR
export const echelleCouleurJaune: number[][] = [
  [247, 221, 146],
  [111, 95, 17]
]

export const echelleCouleurBleu: number[][] = [
  [135, 206, 235],
  [70, 130, 180]
]

export const echelleCouleurVert: number[][] = [
  [131, 192, 140],
  [39, 88, 41]
];

export const echelleCouleurRouge: number[][] = [
    [255, 192, 203],
    [116, 0, 0]
];

//THEMES DES TABLEAUX DE BORD
export const themeFondsSolidarite: string = 'rgb(0, 128, 0)'
export const themePretsDirects: string = 'rgb(255, 219, 88)'
export const themePretsGarantis: string = 'rgb(9, 72, 167)'
export const themeReportsEcheances: string = 'rgb(170, 0, 0)'
export const themeCPSTI: string = 'rgb(0, 170, 167)'

//STRUCTURES DE DONNEES

//Permet de calculer l'échelle de couleur sur cahque page
interface agregInfosZones {
  zoneGeo: string
  value: number
}

export interface agregInfosZonesTab extends Array<agregInfosZones> {}

export interface donneesPretsDirectsRegions {
  reg: string
  libelle: string
  type_aide: string
  effectifs: number
  montant: number
  nombre_dossiers: number
}

export interface donneesPretsDirectsPays {
  type_aide: string
  montant: number
  effectifs: number
  nombre_dossiers: number
}

export interface donneesFondsSolidariteRegion {
  dispositif: string
  volet: string
  nombre_aides: number
  nombre_entreprises: number
  montant_total: number
  reg: string
  libelle_region: string
  code_categorie: string
  libelle_categorie: string
  code_section: string
  libelle_section: string
  code_categorie_juridique: string
  libelle_categorie_juridique: string
  classe_effectif: string
  libelle_classe_effectif: string
}

export interface donneesFondsSolidariteDep extends donneesFondsSolidariteRegion {
  dep: string
  libelle_departement: string
}

export interface DonneesFondsSolidaritePays {
  libelle: string
  montant_total: number
  nombre_aides: number
  nombre_entreprises: number
}

export interface DonneesCPSTIPays {
  secteur_NA21: string
  montant_total: number
  nombre_de_beneficiaires: number
}

  export interface DonneesPgePays {
  libelle_section: string
  montant_total: number
  nombre_pge: number,
    date_maj: string
}

export interface donneesPgeRegion {
  dispositif: string
  nombre_pge: number
  montant_total: number
  reg: string
  libelle_region: string
  code_section: string
  libelle_section: string
  date_maj: string
}

export interface donneesPgeDept {
  dispositif: string
  nombre_pge: number
  montant_total: number
  reg: string
  libelle_region: string
  dep: string
  libelle_departement: string
  code_section: string
  libelle_section: string
  date_maj: string
}

export interface donneesRepEchFiscReg {

    dispositif: string,
    nombre_reports: number,
    montant_total: number,
    reg: string,
    libelle_region: string,
    code_section:string,
    libelle_section: string,
    date_maj: string

}


export interface donneesRepEchFiscDept {

    dispositif: string,
    nombre_reports: number,
    montant_total: number,
    reg: string,
    libelle_region: string,
    dep: string,
    libelle_departement: string
    code_section:string,
    libelle_section: string,
    date_maj: string

}

export interface donneesCPSTI {
  dispositif: string
  code_region: string
  region: string
  code_ancienne_region: string
  ancienne_region: string
  code_departement: string
  departement: string
  code_NA21: string
  secteur_NA21: string
  nombre_de_beneficiaires: number
  montant_total: number
  montant_total_en_millions: number
  geo_point: string
}
