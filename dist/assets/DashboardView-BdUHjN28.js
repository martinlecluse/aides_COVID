import{d as ne,u as X,a as t,o as J,b as s,c as n,e,t as D,f as A,g as S,F as H,p as Y,h as ee,_ as te,r as g,i as W,j as se,k as ae,l as B,m as F,w as xe,n as ye,q as Ve,s as Ie}from"./index-sfIzfdUg.js";import{v as _e,c as U,a as le,R as re,e as ke,C as ie,P as Te,b as Ae,d as K,f as we,g as fe,h as he,i as Pe,j as Le,k as Ne,l as Me,m as Ge,n as Fe,o as qe,p as Oe,q as je,r as He,s as Re,t as ze,u as Be,w as We,x as Ue,y as Je,z as Ze,A as Qe,B as Ke}from"./carteFrance-BRH0lLrC.js";const de=l=>(Y("data-v-28addb0d"),l=l(),ee(),l),Xe={class:"title"},Ye={class:"champs-donnees"},et={class:"champ"},tt=de(()=>e("h2",null,[e("span",{class:"point"},"⦿"),A(" Nombre")],-1)),st={key:0},at={class:"refNational"},nt={class:"champ"},ot=de(()=>e("h2",null,[e("span",{class:"point"},"⦿"),A(" Effectif")],-1)),lt={key:0},rt={class:"refNational"},it={class:"champ"},ut=de(()=>e("h2",null,[e("span",{class:"point"},"⦿"),A(" Montant")],-1)),ct={key:0},dt={class:"refNational"},pt=ne({__name:"affDonneesPretsDirects",props:{type_aide:{},nombre:{},effectif:{},montant:{},refNational:{},couleur:{}},setup(l){X(p=>({"7ed1d612":t(v)}));const a=l;let v;return J(()=>{v=_e(1,0,1,a.couleur),_e(1,0,0,a.couleur)}),(p,b)=>(s(),n(H,null,[e("div",Xe,[e("h1",null,D(p.type_aide),1)]),e("div",Ye,[e("div",et,[tt,e("p",null,D(p.nombre),1),p.refNational?(s(),n("p",st,[A(" / "),e("span",at,D(p.refNational.nombre_dossiers),1)])):S("",!0)]),e("div",nt,[ot,e("p",null,D(p.effectif),1),p.refNational?(s(),n("p",lt,[A(" / "),e("span",rt,D(p.refNational.effectifs),1)])):S("",!0)]),e("div",it,[ut,e("p",null,D(p.montant/1e3)+" k€",1),p.refNational?(s(),n("p",ct,[A(" / "),e("span",dt,D(p.refNational.montant/1e3)+" k€",1)])):S("",!0)])])],64))}}),me=te(pt,[["__scopeId","data-v-28addb0d"]]),ue=l=>(Y("data-v-047a5d14"),l=l(),ee(),l),_t=ue(()=>e("div",{class:"dashboard title"},[e("h1",null,[e("span",{class:"dashboard point"},"⦿"),A(" Prêts directs")])],-1)),ft={key:0},ht={key:0,class:"dashboard content"},mt={key:0,class:"dashboard map"},bt={class:"dashboard aff-donnees"},vt=ue(()=>e("p",null," Des mesures spécifiques, sous forme de crédits d’intervention directs de l’Etat, ont été prévues afin de soutenir les entreprises pour lesquelles le recours aux autres dispositifs exceptionnels (Fonds de solidarité, PGE, report des échéances fiscales et sociales, activité partielle, etc.) se révèle inopérant ou insuffisant. ",-1)),gt=ue(()=>e("p",null," Ces prêts visent le sauvetage d’une entreprise présentant un intérêt stratégique en raison notamment de son impact territorial ou de son positionnement industriel. ",-1)),Dt={key:0},Et={key:1},$t={key:0,class:"text-center"},Rt=ue(()=>e("p",null,[A("Source : "),e("a",{href:"https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-prets-directs-de-letat-mis-en-place-dans-le-cadre-de-lepidemie-de-covid-19/"},"data.gouv.fr")],-1)),St={class:"dashboard donnees"},Ct={key:0},xt={key:1,class:"donnees-region"},yt={key:2},Vt={key:3,class:"donnees-agregees"},It={key:1},kt="...",be=0,Tt=ne({__name:"pretsDirects",setup(l){X(_=>({"5182c880":t(re)(t(d)[1])}));let a,v,p=[],b,d=ke,h="Montant total des prêts directs",i,o=g("Ils s’adressent : aux PME de 50 à 250 salariés, ou à titre dérogatoire pour les moins de 50 salariés, qui nécessitent un soutien en trésorerie et une restructuration de leur bilan et opérations, et qui ne sont pas ou plus soutenus par leurs financeurs privés ou bancaireset aux PME qui font état de perspectives réelles de redressement ou retour à la rentabilité, démontrées par un plan d’affaires, éventuellement audité.Les aides sont accordées après avoir recherché une contribution équilibrée des différents partenaires financiers de l’entreprise : apurement du passif auprès des créanciers publics (CCSF) et privés, apport des actionnaires.");const r=g(!1),m=g(!1),T=g(!1),M=g(!1),R=g(!1),P=g(!1),q=g(""),G=g(!1),O=()=>{P.value=!P.value},L=()=>{q.value=o.value.slice(0,be),G.value=o.value.length>be};function j(){ie.forEach(C=>{p.push({zoneGeo:C,value:0}),a.filter(E=>E.reg==C).forEach(E=>{p[p.length-1].value+=+E.montant})});let _=p.map(C=>C.value),f=Math.max(..._);return[Math.min(..._),f]}L();function z(_){T.value=!1,b=a.filter(f=>f.reg==_),b.forEach(f=>{f.type_aide==""&&(f.type_aide="Non renseigné")}),T.value=!0}return J(()=>{U(Te).then(_=>{a=_,a.forEach(f=>{f.effectifs=+f.effectifs,f.nombre_dossiers=+f.nombre_dossiers,f.montant=+f.montant}),i=j(),r.value=!0,m.value=!0},_=>{console.log("Erreur chargement données : ",_),R.value=!0}),U(Ae).then(_=>{v=_,v.forEach(f=>{f.effectifs=+f.effectifs,f.nombre_dossiers=+f.nombre_dossiers,f.montant=+f.montant}),M.value=!0},_=>{console.log("Erreur chargement données : ",_),R.value=!0})}),(_,f)=>(s(),n(H,null,[_t,r.value?(s(),n("div",ft,[R.value?(s(),n("div",It)):(s(),n("div",ht,[m.value?(s(),n("div",mt,[W(le,{mesure:t(h),echelleCouleur:t(d),existeInfosDepts:!1,tabDonneesAfficheesRegion:t(p),minMaxValeursRegion:t(i),onClicZoneGeo:f[0]||(f[0]=(V,C)=>{C&&z(V)})},null,8,["mesure","echelleCouleur","tabDonneesAfficheesRegion","minMaxValeursRegion"])])):S("",!0),e("div",bt,[e("div",null,[vt,gt,e("p",null,[P.value||!G.value?(s(),n("span",Dt,D(t(o)),1)):(s(),n("span",Et,D(q.value)+D(kt),1))]),G.value?(s(),n("div",$t,[e("button",{onClick:O,class:"btn btn-primary custom-btn"},D(P.value?"Voir moins":"Voir plus"),1)])):S("",!0),Rt]),e("div",St,[T.value?(s(),n("h2",Ct,"Données "+D(t(b)[0].libelle),1)):S("",!0),T.value?(s(),n("div",xt,[(s(!0),n(H,null,se(t(b),V=>(s(),ae(me,{couleur:t(d),type_aide:V.type_aide,nombre:V.nombre_dossiers,effectif:V.effectifs,montant:V.montant,refNational:t(v).filter(C=>C.type_aide==V.type_aide).at(0)},null,8,["couleur","type_aide","nombre","effectif","montant","refNational"]))),256))])):S("",!0),M.value?(s(),n("h2",yt,"Données nationales")):S("",!0),M.value?(s(),n("div",Vt,[(s(!0),n(H,null,se(t(v),V=>(s(),ae(me,{couleur:t(d),type_aide:V.type_aide,nombre:V.nombre_dossiers,effectif:V.effectifs,montant:V.montant},null,8,["couleur","type_aide","nombre","effectif","montant"]))),256))])):S("",!0)])])]))])):S("",!0)],64))}}),At=te(Tt,[["__scopeId","data-v-047a5d14"]]),wt={class:"tableau-donnees table table-bordered table-hover"},Pt=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"Catégorie"),e("th",{scope:"col"},"Nombre d'aides"),e("th",{scope:"col"},"Nombre d'entreprises"),e("th",{scope:"col",class:"no-crop"},"Montant")])],-1),Lt={class:"no-crop"},Nt={class:"dt total-row"},Mt=e("td",null,"Total",-1),Gt={class:"no-crop"},ve={__name:"affDonneesFondsSolidarite",props:["data"],setup(l){const a=l,v=o=>o.libelle_categorie_juridique?o.libelle_categorie_juridique:o.libelle_classe_effectif?o.libelle_classe_effectif:o.libelle_section?o.libelle_section:o.libelle,p=B(()=>[...a.data].sort((o,r)=>{const m=v(o),T=v(r);return m<T?-1:m>T?1:0})),b=B(()=>a.data.reduce((o,r)=>o+r.nombre_aides,0)),d=B(()=>a.data.reduce((o,r)=>o+r.nombre_entreprises,0)),h=B(()=>a.data.reduce((o,r)=>o+r.montant_total,0));function i(){const o=document.querySelectorAll(".no-crop p");let r=0;console.log(o),o.forEach(m=>{r=Math.max(r,m.offsetWidth),console.log(r)}),r=r+40,document.querySelectorAll(".no-crop").forEach(m=>{m.style.width=`${r}px`})}return J(()=>{i()}),(o,r)=>(s(),n("table",wt,[Pt,e("tbody",null,[(s(!0),n(H,null,se(p.value,(m,T)=>(s(),n("tr",{key:T,class:"dt champ"},[e("td",null,D(m.libelle_categorie_juridique?m.libelle_categorie_juridique:m.libelle_classe_effectif?m.libelle_classe_effectif:m.libelle_section?m.libelle_section:m.libelle),1),e("td",null,[e("p",null,D(m.nombre_aides.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",null,[e("p",null,D(m.nombre_entreprises.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",Lt,[e("p",null,D(t(K)(m.montant_total).toLocaleString("fr",{useGrouping:!0}))+" k€",1)])]))),128)),e("tr",Nt,[Mt,e("td",null,[e("p",null,D(b.value.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",null,[e("p",null,D(d.value.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",Gt,[e("p",null,D(t(K)(h.value).toLocaleString("fr",{useGrouping:!0}))+" k€",1)])])])]))}},oe=l=>(Y("data-v-e98804c4"),l=l(),ee(),l),Ft=oe(()=>e("div",{class:"dashboard title"},[e("h1",null,[e("span",{class:"dashboard point"},"⦿"),A(" Fonds de solidarité")])],-1)),qt={key:0},Ot={key:0,class:"dashboard content"},jt={key:0,class:"dashboard map"},Ht={class:"dashboard aff-donnees"},zt=oe(()=>e("div",null,[e("p",null," Dans le contexte de l'épidémie de COVID-19, l’Etat a mis en place, avec les Régions, un fonds de solidarité doté d’1,7 milliard d’euros pour le mois de mars 2020 qui permettra le versement d’une aide défiscalisée allant jusqu’à 1500 euros aux plus petites entreprises, aux indépendants, aux micro-entrepreneurs et aux professions libérales touchés par la crise du coronavirus. Ce fonds sera maintenu autant que durera l’urgence sanitaire. "),e("p",null,[A(" Pour obtenir d’autres informations relatives au fonds de solidarité, il est possible de consulter la page d’information disponible ici : "),e("a",{href:"https://www.impots.gouv.fr/portail/"},"portail impots.gouv"),A(". ")]),e("p",null,[A("Source : "),e("a",{href:"https://www.data.gouv.fr/fr/datasets/donnees-relatives-au-fonds-de-solidarite-mis-en-place-dans-le-cadre-de-lepidemie-de-covid-19/"},"data.gouv.fr")])],-1)),Bt={class:"filtres"},Wt=oe(()=>e("h2",null,"Sélectionner les aides",-1)),Ut={class:"boutons-volet"},Jt=oe(()=>e("p",null,"Volet :",-1)),Zt={class:"btn-group",role:"group"},Qt={class:"boutons-filtre-categorie"},Kt=oe(()=>e("p",null,"Catégorie :",-1)),Xt={class:"btn-group btn-group-toggle",role:"group","data-toggle":"buttons"},Yt={key:0},es={key:1},ts={class:"donnees"},ss={key:0,class:"donnees-region"},as={key:1,class:"donnees-agregees"},ns={key:1},os=ne({__name:"fondsSolidarite",setup(l){X(u=>({eaeda292:t(re)(t(i)[1])}));let a,v,p,b=F([]),d=F([]),h,i=we,o="Montant total",r=F([]),m=F([]);const T=g(!1),M=g(!1),R=g(!1),P=g(!1),q=g(!1),G=g(1),O=g(1),L=g(fe),j=g(he),z=g(!1),_=g(!0);function f(){ie.forEach(I=>{b.push({zoneGeo:I,value:0}),a.filter(Q=>Q.reg==I).forEach(Q=>{b[b.length-1].value+=+Q.montant_total})});let u=b.map(I=>I.value),c=Math.max(...u);return[Math.min(...u),c]}function V(){new Set(v.map($=>$.dep)).forEach($=>{d.push({zoneGeo:$,value:0}),v.filter(ce=>ce.dep==$).forEach(ce=>{d[d.length-1].value+=+ce.montant_total})});let c=d.map($=>$.value),x=Math.max(...c);return[Math.min(...c),x]}function C(){let u=a[0].libelle_categorie_juridique?"libelle_categorie_juridique":a[0].libelle_classe_effectif?"libelle_classe_effectif":"libelle_section";p=a.reduce((x,I)=>{let $=x.find(Q=>Q.libelle===I[u]);return $?($.montant_total+=I.montant_total,$.nombre_aides+=I.nombre_aides,$.nombre_entreprises+=I.nombre_entreprises):x.push({libelle:I[u],montant_total:I.montant_total,nombre_aides:I.nombre_aides,nombre_entreprises:I.nombre_entreprises}),x},[]),console.log("données nationales : ",p),P.value=!0}function k(u){R.value=!1,h=a.filter(c=>c.reg==u),R.value=!0}function E(u){R.value=!1,h=v.filter(c=>c.dep==u),console.log(h),R.value=!0}function w(u,c){this.volet=u,c.target.parentNode.childNodes.forEach(I=>{I.setAttribute("id","not-selected")}),c.target.setAttribute("id","selected")}function N(u,c){this.categorie=u,c.target.parentNode.childNodes.forEach(I=>{I.setAttribute("id","not-selected")}),c.target.setAttribute("id","selected")}async function y(){if(!z.value){z.value=!0,a=[],v=[],b.splice(0,b.length),d.splice(0,d.length);try{const[u,c]=await Promise.all([U(L.value),U(j.value)]);a=u,a.forEach($=>{$.nombre_aides=+$.nombre_aides,$.nombre_entreprises=+$.nombre_entreprises,$.montant_total=+$.montant_total}),r.splice(0,r.length),f().forEach($=>r.push($)),v=c,v.forEach($=>{$.nombre_aides=+$.nombre_aides,$.nombre_entreprises=+$.nombre_entreprises,$.montant_total=+$.montant_total}),m.splice(0,m.length),V().forEach($=>m.push($)),T.value=!0,M.value=!0}catch(u){console.log("Erreur chargement données : ",u),q.value=!0}finally{z.value=!1}}}return J(async()=>{await y(),C()}),xe([G,O],async()=>{switch(O.value){case 1:switch(G.value){case 1:L.value=fe,j.value=he,_.value=!0;break;case 2:L.value=qe,_.value=!1;break}break;case 2:switch(G.value){case 1:L.value=Ge,j.value=Fe,_.value=!0;break;case 2:L.value=Me,_.value=!1;break}break;case 3:switch(G.value){case 1:L.value=Le,j.value=Ne,_.value=!0;break;case 2:L.value=Pe,_.value=!1;break}break}R.value=!1,P.value=!1,await y(),C()}),(u,c)=>(s(),n(H,null,[Ft,T.value?(s(),n("div",qt,[q.value?(s(),n("div",ns)):(s(),n("div",Ot,[M.value?(s(),n("div",jt,[W(le,{mesure:t(o),echelleCouleur:t(i),existeInfosDepts:_.value,tabDonneesAfficheesRegion:t(b),minMaxValeursRegion:t(r),tabDonneesAfficheesDep:t(d),minMaxValeursDep:t(m),onClicZoneGeo:c[0]||(c[0]=(x,I)=>{I?k(x):E(x)})},null,8,["mesure","echelleCouleur","existeInfosDepts","tabDonneesAfficheesRegion","minMaxValeursRegion","tabDonneesAfficheesDep","minMaxValeursDep"])])):S("",!0),e("div",Ht,[zt,e("div",Bt,[Wt,e("div",Ut,[Jt,e("div",Zt,[e("button",{class:"btn btn-primary",id:"selected",onClick:c[1]||(c[1]=x=>w(1,x))},"Volet 1"),e("button",{class:"btn btn-primary",id:"not-selected",onClick:c[2]||(c[2]=x=>w(2,x))},"Volet 2")])]),e("div",Qt,[Kt,e("div",Xt,[e("button",{class:"btn btn-primary",id:"selected",onClick:c[3]||(c[3]=x=>N(1,x))},"Catégorie juridique"),e("button",{class:"btn btn-primary",id:"not-selected",onClick:c[4]||(c[4]=x=>N(2,x))},"Classe effectif"),e("button",{class:"btn btn-primary",id:"not-selected",onClick:c[5]||(c[5]=x=>N(3,x))},"NAF")])])]),R.value?(s(),n("h2",Yt," Données "+D(t(h)[0].libelle_departement?t(h)[0].libelle_departement:t(h)[0].libelle_region),1)):S("",!0),P.value&&!R.value?(s(),n("h2",es,"Données Nationales")):S("",!0),e("div",ts,[R.value?(s(),n("div",ss,[W(ve,{data:t(h)},null,8,["data"])])):S("",!0),P.value&&!R.value?(s(),n("div",as,[W(ve,{data:t(p)},null,8,["data"])])):S("",!0)])])]))])):S("",!0)],64))}}),ls=te(os,[["__scopeId","data-v-e98804c4"]]),rs={class:"table table-bordered table-hover"},is=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"Section"),e("th",{scope:"col"},"Nombre de prêts"),e("th",{scope:"col",class:"no-crop"},"Montant"),e("th",null,"Date de mise à jour")])],-1),us={class:"no-crop"},cs={class:"dt total-row"},ds=e("td",null,"Total",-1),ps={class:"no-crop"},_s=e("td",null,null,-1),ge={__name:"affDonneesPretsGarantis",props:["data"],setup(l){const a=l,v=i=>i.libelle_section,p=B(()=>[...a.data].sort((i,o)=>{const r=v(i),m=v(o);return r<m?-1:r>m?1:0})),b=B(()=>a.data.reduce((i,o)=>i+o.nombre_pge,0)),d=B(()=>a.data.reduce((i,o)=>i+o.montant_total,0));function h(){const i=document.querySelectorAll(".no-crop p");let o=0;console.log(i),i.forEach(r=>{o=Math.max(o,r.offsetWidth),console.log(r.offsetWidth),console.log(o)}),o=o+40,document.querySelectorAll(".no-crop").forEach(r=>{r.style.width=`${o}px`})}return J(()=>{h()}),(i,o)=>(s(),n("table",rs,[is,e("tbody",null,[(s(!0),n(H,null,se(p.value,(r,m)=>(s(),n("tr",{key:m,class:"dt champ"},[e("td",null,D(r.libelle_section),1),e("td",null,[e("p",null,D(r.nombre_pge.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",us,[e("p",null,D(t(K)(r.montant_total).toLocaleString("fr",{useGrouping:!0}))+" k€",1)]),e("td",null,[e("p",null,D(r.date_maj.toLocaleString("fr",{useGrouping:!0})),1)])]))),128)),e("tr",cs,[ds,e("td",null,[e("p",null,D(b.value.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",ps,[e("p",null,D(t(K)(d.value).toLocaleString("fr",{useGrouping:!0}))+" k€",1)]),_s])])]))}},Se=l=>(Y("data-v-3278cc5f"),l=l(),ee(),l),fs=Se(()=>e("div",{class:"dashboard title"},[e("h1",null,[e("span",{class:"dashboard point"},"⦿"),A(" Prêts garantis")])],-1)),hs={key:0},ms={key:0,class:"dashboard content"},bs={key:0,class:"dashboard map"},vs={class:"dashboard aff-donnees"},gs=Se(()=>e("div",null,[e("p",null," Le Gouvernement met en œuvre un dispositif exceptionnel de garanties permettant de soutenir le financement bancaire des entreprises, à hauteur de 300 milliards d’euros. "),e("p",null," Jusqu’au 31 décembre prochain, les entreprises de toute taille, quelle que soit la forme juridique de l’entreprise (notamment sociétés, commerçants, artisans, exploitants agricoles, professions libérales, micro-entrepreneurs, associations et fondations ayant une activité économique ), à l’exception des sociétés civiles immobilières, des établissements de crédit et des sociétés de financement, pourront demander à leur banque habituelle un prêt garanti par l’État pour soutenir leur trésorerie. "),e("p",null,[A(" Source : "),e("a",{href:"https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-prets-garantis-par-letat-dans-le-cadre-de-lepidemie-de-covid-19/"},"data.gouv.fr")])],-1)),Ds={key:0},Es={key:1},$s={class:"dashboard donnees"},Rs={key:0,class:"donnees-region"},Ss={key:1,class:"donnees-agregees"},Cs={key:1},xs=ne({__name:"pretsGarantis",setup(l){X(E=>({"31096aaf":t(re)(t(r)[1])}));let a,v,p,b=F([]),d=F([]),h,i=F([]),o=F([]),r=Oe,m="Montant total des prêts garantis";const T=g(!1),M=g(!1),R=g(!1),P=g(!1),q=g(je),G=g(He),O=g(!1),L=g(!1),j=g(!0);function z(){ie.forEach(y=>{b.push({zoneGeo:y,value:0}),v.filter(c=>c.reg==y).forEach(c=>{b[b.length-1].value+=+c.montant_total})});let E=b.map(y=>y.value),w=Math.max(...E);return[Math.min(...E),w]}function _(){Re.forEach(y=>{d.push({zoneGeo:y,value:0}),a.filter(c=>c.dep==y).forEach(c=>{d[d.length-1].value+=+c.montant_total})});let E=d.map(y=>y.value),w=Math.max(...E);return[Math.min(...E),w]}function f(){let E="libelle_section";p=a.reduce((N,y)=>{let u=N.find(c=>c.libelle_section===y[E]);return u?(u.montant_total+=y.montant_total,u.nombre_pge+=y.nombre_pge):N.push({libelle_section:y[E],montant_total:y.montant_total,nombre_pge:y.nombre_pge,date_maj:y.date_maj}),N},[]),console.log("données nationales : ",p),O.value=!0}function V(E){R.value=!1,h=v.filter(w=>w.reg==E),R.value=!0}function C(E){R.value=!1,h=a.filter(w=>w.dep==E),R.value=!0}async function k(){if(!L.value){L.value=!0,v=[],a=[],b.splice(0,b.length),d.splice(0,d.length);try{const[E,w]=await Promise.all([U(q.value),U(G.value)]);v=E,v.forEach(u=>{u.nombre_pge=+u.nombre_pge,u.montant_total=+u.montant_total}),i.splice(0,i.length),z().forEach(u=>i.push(u)),a=w,a.forEach(u=>{u.nombre_pge=+u.nombre_pge,u.montant_total=+u.montant_total}),o.splice(0,o.length),_().forEach(u=>o.push(u)),T.value=!0,M.value=!0}catch(E){console.log("Erreur chargement données : ",E),P.value=!0}finally{L.value=!1}}}return J(async()=>{await k(),f()}),(E,w)=>{var N,y,u,c;return s(),n(H,null,[fs,T.value?(s(),n("div",hs,[P.value?(s(),n("div",Cs)):(s(),n("div",ms,[M.value?(s(),n("div",bs,[W(le,{mesure:t(m),echelleCouleur:t(r),existeInfosDepts:j.value,tabDonneesAfficheesRegion:t(b),minMaxValeursRegion:t(i),tabDonneesAfficheesDep:t(d),minMaxValeursDep:t(o),onClicZoneGeo:w[0]||(w[0]=(x,I)=>{I?V(x):C(x)})},null,8,["mesure","echelleCouleur","existeInfosDepts","tabDonneesAfficheesRegion","minMaxValeursRegion","tabDonneesAfficheesDep","minMaxValeursDep"])])):S("",!0),e("div",vs,[gs,R.value?(s(),n("h2",Ds," Données "+D((N=t(h)[0])!=null&&N.libelle_departement?(y=t(h)[0])==null?void 0:y.libelle_departement:(u=t(h)[0])!=null&&u.libelle_region?(c=t(h)[0])==null?void 0:c.libelle_region:"manquantes"),1)):S("",!0),O.value&&!R.value?(s(),n("h2",Es,"Données Nationales")):S("",!0),e("div",$s,[R.value?(s(),n("div",Rs,[W(ge,{data:t(h)},null,8,["data"])])):S("",!0),O.value&&!R.value?(s(),n("div",Ss,[W(ge,{data:t(p)},null,8,["data"])])):S("",!0)])])]))])):S("",!0)],64)}}}),ys=te(xs,[["__scopeId","data-v-3278cc5f"]]),Vs={class:"tableau-donnees table table-bordered table-hover"},Is=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"Section"),e("th",{scope:"col"},"Nombre de reports"),e("th",{scope:"col",class:"no-crop"},"Montant total")])],-1),ks={class:"dt champ"},Ts={class:"no-crop"},As={class:"dt total-row"},ws=e("td",null,"Total",-1),Ps={class:"no-crop"},De={__name:"affDonneesRepEchFisc",props:["data"],setup(l){const a=l,v=B(()=>a.data.reduce((d,h)=>d+h.nombre_reports,0)),p=B(()=>a.data.reduce((d,h)=>d+h.montant_total,0));function b(){const d=document.querySelectorAll(".no-crop p");let h=0;console.log(d),d.forEach(i=>{h=Math.max(h,i.offsetWidth),console.log(h)}),h=h+40,document.querySelectorAll(".no-crop").forEach(i=>{i.style.width=`${h}px`})}return J(()=>{b()}),(d,h)=>(s(),n("table",Vs,[Is,e("tbody",null,[(s(!0),n(H,null,se(l.data,i=>(s(),n("tr",ks,[e("td",null,D(i.libelle_section),1),e("td",null,[e("p",null,D(i.nombre_reports.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",Ts,[e("p",null,D(t(K)(i.montant_total).toLocaleString("fr",{useGrouping:!0}))+" k€",1)])]))),256)),e("tr",As,[ws,e("td",null,[e("p",null,D(v.value.toLocaleString("fr",{useGrouping:!0})),1)]),e("td",Ps,[e("p",null,D(t(K)(p.value).toLocaleString("fr",{useGrouping:!0}))+" k€",1)])])])]))}},Ce=l=>(Y("data-v-5950f4ff"),l=l(),ee(),l),Ls=Ce(()=>e("div",{class:"dashboard title"},[e("h1",null,[e("span",{class:"dashboard point"},"⦿"),A(" Reports d'échéances fiscales")])],-1)),Ns={key:0},Ms={key:0,class:"dashboard content"},Gs={key:0,class:"dashboard map"},Fs={class:"dashboard aff-donnees"},qs=Ce(()=>e("div",null,[e("p",null," Le Gouvernement a annoncé le report des principales échéances fiscales des professionnels afin de tenir compte de leurs difficultés liées à la crise sanitaire du coronavirus. "),e("p",null,"Le report d'échéance fiscale concerne :"),e("ul",null,[e("li",null,"Les entreprises ou les experts-comptables qui interviennent pour des clients, pour qui il est possible de demander au service des impôts des entreprises le report sans pénalité du règlement de leurs prochaines échéances d'impôts directs (acompte d'impôt sur les sociétés, taxe sur les salaires)."),e("li",null,"Les travailleurs indépendants qui peuvent moduler à tout moment le taux et les acomptes de prélèvement à la source. Il est aussi possible de reporter le paiement des acomptes de prélèvement à la source sur les revenus professionnels d’un mois sur l’autre, jusqu’à trois fois si les acomptes sont mensuels, ou d’un trimestre sur l’autre si les acomptes sont trimestriels.")]),e("p",null,"Afin d'apporter une aide financière aux entreprises en difficulté, une procédure accélérée de remboursement des créances d'impôt sur les sociétés restituables en 2020 est mise en œuvre. Enfin, la Commission des chefs de services financiers (CCSF) peut accorder aux entreprises qui rencontrent des difficultés financières des délais de paiement pour s’acquitter de leurs dettes fiscales et sociales en toute confidentialité. "),e("p",null,[A("Source : "),e("a",{href:"https://www.data.gouv.fr/fr/datasets/donnees-relatives-aux-reports-decheances-fiscales-accordes-dans-le-cadre-de-lepidemie-de-covid-19/"},"data.gouv.fr")])],-1)),Os={class:"dashboard donnees"},js={key:0},Hs={key:1,class:"donnees-region"},zs=ne({__name:"reportsEcheancesFiscales",setup(l){X(_=>({"74b96353":t(re)(t(d)[1])}));let a,v,p=F([]),b=F([]),d=ze,h="Montant total des reports",i,o,r=F([]),m=F([]);const T=g(!1),M=g(!1),R=g(!1),P=g(!1),q=g(!1);function G(){ie.forEach(C=>{p.push({zoneGeo:C,value:0}),v.filter(E=>E.reg==C).forEach(E=>{p[p.length-1].value+=+E.montant_total})});let _=p.map(C=>C.value),f=Math.max(..._);return[Math.min(..._),f]}function O(){Re.forEach(C=>{b.push({zoneGeo:C,value:0}),a.filter(E=>E.dep==C).forEach(E=>{b[b.length-1].value+=+E.montant_total})});let _=b.map(C=>C.value),f=Math.max(..._);return[Math.min(..._),f]}function L(_){R.value=!1,i=v.filter(f=>f.reg==_),o=[],R.value=!0}function j(_){R.value=!1,o=a.filter(f=>f.dep==_),i=[],R.value=!0}async function z(){if(!q.value){q.value=!0,a=[],v=[],p.splice(0,p.length),b.splice(0,b.length);try{const[_,f]=await Promise.all([U(Be),U(We)]);v=_,a=f,v.forEach(k=>{k.nombre_reports=+k.nombre_reports,k.montant_total=+k.montant_total}),a.forEach(k=>{k.nombre_reports=+k.nombre_reports,k.montant_total=+k.montant_total}),r.splice(0,r.length),G().forEach(k=>r.push(k)),m.splice(0,m.length),O().forEach(k=>m.push(k)),T.value=!0,M.value=!0}catch(_){console.log("Erreur chargement données : ",_),P.value=!0}finally{q.value=!1}}}return J(async()=>{await z()}),(_,f)=>(s(),n(H,null,[Ls,T.value?(s(),n("div",Ns,[P.value?S("",!0):(s(),n("div",Ms,[M.value?(s(),n("div",Gs,[W(le,{mesure:t(h),echelleCouleur:t(d),existeInfosDepts:!0,tabDonneesAfficheesRegion:t(p),minMaxValeursRegion:t(r),tabDonneesAfficheesDep:t(b),minMaxValeursDep:t(m),onClicZoneGeo:f[0]||(f[0]=(V,C)=>{C?L(V):j(V)})},null,8,["mesure","echelleCouleur","tabDonneesAfficheesRegion","minMaxValeursRegion","tabDonneesAfficheesDep","minMaxValeursDep"])])):S("",!0),e("div",Fs,[qs,e("div",Os,[R.value?(s(),n("h2",js," Données "+D(t(i)[0]?t(i)[0].libelle_region:t(o)[0].libelle_departement),1)):S("",!0),R.value?(s(),n("div",Hs,[t(o)[0]?(s(),ae(De,{key:0,data:t(o)},null,8,["data"])):S("",!0),t(i)[0]?(s(),ae(De,{key:1,data:t(i)},null,8,["data"])):S("",!0)])):S("",!0)])])]))])):S("",!0)],64))}}),Bs=te(zs,[["__scopeId","data-v-5950f4ff"]]),pe={data(){return{currentTab:1,themeCPSTI:Ue,themeFondsSolidarite:Je,themePretsDirects:Ze,themePretsGarantis:Qe,themeReportsEcheances:Ke}},computed:{currentTabComponent(){switch(this.currentTab){case 1:return ls;case 2:return At;case 3:return ys;case 4:return Bs;default:return null}}},methods:{changeTab(l){this.currentTab=l}}},Ee=()=>{X(l=>({"4839294f":l.themeFondsSolidarite,"57de362a":l.themePretsDirects,"3e4a0658":l.themePretsGarantis,bd71d566:l.themeReportsEcheances,"725041f8":l.themeCPSTI}))},$e=pe.setup;pe.setup=$e?(l,a)=>(Ee(),$e(l,a)):Ee;const Z=l=>(Y("data-v-5b759a85"),l=l(),ee(),l),Ws={class:"d-flex flex-row justify-content-between algin-items-flex-end"},Us=Z(()=>e("div",{class:"title-dashboards"},[e("h2",null,"Tableaux de bord - aides COVID-19")],-1)),Js={class:"link_homepage"},Zs={class:"content-dashboards"},Qs=Z(()=>e("div",{class:"texte-presentation-tableaux-bord"},[e("p",null," La pandémie de Covid-19 a été à l’origine d’une contraction notoire du PIB français en 2020 (8,0%). Face à ce choc économique, le gouvernement a mis en place des mesures d’urgence à destination des entreprises et des salariés impactés, pour un total de 470 milliards €. "),e("p",null," Ces aides se sont notamment déclinées en 4 mesures : fonds de solidarité aux entreprises, prêts directs de l’Etat, prêts garantis par l’Etat et reports d’échéances de dettes. "),e("p",null," Nous avons également reporté les montants accordés par le Conseil de la protection sociale des travailleurs indépendants (CPSTI) en faveur des artisans et commerçants, complémentaires aux fonds de solidarité de l’Etat. "),e("p",null," Ces tableaux interactifs permettent de consulter l’application des aides selon le département ou la région, ainsi que d’autres indicateurs selon les mesures. ")],-1)),Ks={class:"nav nav-tabs",id:"nav",role:"tablist"},Xs=Z(()=>e("p",null,"Fonds de solidarité",-1)),Ys=[Xs],ea=Z(()=>e("p",null,"Prêts directs",-1)),ta=[ea],sa=Z(()=>e("p",null,"Prêts garantis",-1)),aa=[sa],na=Z(()=>e("p",null,"Reports d'échéances fiscales",-1)),oa=[na],la=Z(()=>e("div",{class:"tab-content",id:"tabContent"},[e("div",{class:"tab-pane fade show active",id:"fonds",role:"tabpanel","aria-labelledby":"fonds-solidarite"}),e("div",{class:"tab-pane fade",id:"prets-directs",role:"tabpanel","aria-labelledby":"prets-directs"}),e("div",{class:"tab-pane fade",id:"prets-garantis",role:"tabpanel","aria-labelledby":"prets-garantis"}),e("div",{class:"tab-pane fade",id:"reports-echeances",role:"tabpanel","aria-labelledby":"reports-echeances"})],-1));function ra(l,a,v,p,b,d){const h=ye("router-link");return s(),n("div",null,[e("header",Ws,[Us,e("nav",Js,[W(h,{to:"/",exact:"",class:"text-white"},{default:Ve(()=>[A("Retour")]),_:1})])]),e("div",Zs,[Qs,e("nav",null,[e("div",Ks,[e("a",{class:"nav-item nav-link active show",id:"fonds-solidarite","data-toggle":"tab",role:"tab","aria-controls":"fonds","aria-selected":"true",onClick:a[0]||(a[0]=i=>d.changeTab(1))},Ys),e("a",{class:"nav-item nav-link",id:"prets-directs","data-toggle":"tab",role:"tab","aria-controls":"pretsDirects","aria-selected":"false",onClick:a[1]||(a[1]=i=>d.changeTab(2))},ta),e("a",{class:"nav-item nav-link",id:"prets-garantis","data-toggle":"tab",role:"tab","aria-controls":"pretsGarantis","aria-selected":"false",onClick:a[2]||(a[2]=i=>d.changeTab(3))},aa),e("a",{class:"nav-item nav-link",id:"reports-echeances","data-toggle":"tab",role:"tab","aria-controls":"reportsEcheances","aria-selected":"false",onClick:a[3]||(a[3]=i=>d.changeTab(4))},oa)])]),la,e("div",null,[(s(),ae(Ie(d.currentTabComponent)))])])])}const ca=te(pe,[["render",ra],["__scopeId","data-v-5b759a85"]]);export{ca as default};
