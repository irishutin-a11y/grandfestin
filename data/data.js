// Centralized data for the Festin website.
window.FESTIN_DATA = {
  brand: {
    name: "Festin",
    tagline: "Le goût d'avancer ensemble",
    logo: "images/logo-festin.png",
    logoWhite: "images/logo-academie-festin-blanc.png",
    logoGold: "images/logo-festin-jaune.png",
    qualiopi: "images/logo-qualiopi.png",
    site: "https://www.grandfestin.com",
  },
  catalogPdf: "https://drive.google.com/file/d/1c8ueQMkTpjb1KmjJPV3nQ9djTLOmN8yC/view?usp=sharing",
  contact: {
    email: "contact@grandfestin.com",
    altEmail: "armand.hurault@associationfestin.com",
    referent: "Armand Hurault",
    referentRole: "Directeur général — relations restaurateurs et engagement",
    address: "21 rue Grignan, 13006 Marseille",
    nda: "93132168513",
    siret: "379 756 026 00074",
    legalForm: "Association loi 1901",
    rna: "W133012740",
    legalMention: "Ce site est édité par l’association Festin, association loi 1901 à but non lucratif et d’intérêt général, agréée ESUS. N° RNA : W133012740. SIRET : 379 756 026 00074.",
  },
  // Stats (About, accueil) — chiffres 2025, source : Rapport d'activité Festin 2025 (version 441 / 83 %)
  stats: [
    { value: "441", unit: "",   label: "personnes accompagnées en 2025" },
    { value: "83",  unit: "%",  label: "de sorties en emploi ou formation" },
    { value: "14",  unit: "",   label: "territoires d'intervention" },
    { value: "1987", unit: "",     label: "l'année de création de l'association" },
  ],
  // Ticker — defile bandeau sur la home
  ticker: [
    "441 personnes accompagnées en 2025",
    "83 % de sorties en emploi ou formation",
    "14 territoires d'intervention",
    "L'insertion par la cuisine depuis 1987",
    "Académie Festin, organisme de formation certifié Qualiopi",
    "Le goût d'avancer ensemble",
  ],
  // 3 pillars on the home Festin section
  pillars: [
    {
      icon: "heart-handshake",
      title: "Insertion",
      desc: "Un métier de cuisine, un diplôme reconnu et un accompagnement social complet, de l'entrée en parcours jusqu'à l'emploi.",
    },
    {
      icon: "graduation-cap",
      title: "Formation",
      desc: "Des parcours diplômants pour les personnes en insertion, des formations courtes pour les équipes déjà en poste.",
    },
    {
      icon: "megaphone",
      title: "Transformation",
      desc: "Le programme Restaure réunit 35 structures pour prévenir les violences en cuisine et changer les pratiques du secteur.",
    },
  ],
  // Two clearly distinct audiences (preserved)
  publics: [
    {
      key: "pros",
      audience: "Audience 1",
      tag: "Professionnels de la restauration",
      title: "Restaurateurs, managers et équipes",
      desc: "Des formations courtes pour changer les pratiques en salle et en cuisine : prévention des violences, management juste, accueil de la diversité.",
      cta: "Voir les formations continues",
      img: "images/photo-chapeau-cuisine.jpg",
      formations: ["vss", "management"],
    },
    {
      key: "insertion",
      audience: "Audience 2",
      tag: "Parcours d'insertion",
      title: "Apprendre un métier de cuisine",
      desc: "Des parcours diplômants pour les femmes (Des Étoiles et des Femmes, TFP et CAP) et pour les personnes réfugiées ou primo-arrivantes (Tournesol).",
      cta: "Voir les parcours d'insertion",
      img: "images/photo-tabliers-violets.jpg",
      formations: ["tfp", "cap", "tournesol"],
    },
  ],
  // Écosystème Festin — 5 projets pour la home + 5 one-pagers
  projets: [
    {
      id: "des-etoiles-et-des-femmes",
      icon: "star",
      eyebrow: "Depuis 2015",
      title: "Des Étoiles",
      accent: "et des Femmes",
      shortTitle: "Des Étoiles et des Femmes",
      tagline: "Le programme national qui forme des femmes aux métiers de la cuisine",
      subtitle: "Un diplôme de cuisine, des stages dans des restaurants gastronomiques, un accompagnement social complet",
      short: "Depuis 2015, Des Étoiles et des Femmes forme des femmes aux métiers de la cuisine. Un diplôme. Des stages dans des restaurants gastronomiques. Un accompagnement social complet. 13 antennes, 91 % de réussite aux diplômes en 2025.",
      stats: [
        { value: "13",    label: "antennes partout en France" },
        { value: "336",   label: "femmes accompagnées en 2025" },
        { value: "91 %",  label: "de réussite aux diplômes en 2025" },
        { value: "1 200", unit: "+", label: "femmes accompagnées en 10 ans" },
      ],
      description: "Des Étoiles et des Femmes naît en 2015, à Marseille. Sa conviction : l’exigence de la haute gastronomie peut changer la trajectoire de femmes éloignées de l’emploi. Dix ans plus tard, le programme compte 13 antennes en France. Plus de 1 200 femmes ont été accompagnées vers une qualification en cuisine, une stabilité retrouvée, un emploi durable. Chaque promotion suit un parcours complet : une formation diplômante (CAP cuisine ou titre à finalité professionnelle), un accompagnement social global, des stages dans des restaurants engagés. En 2025, Julia Sedefdjian devient marraine nationale. Le 3 octobre, le Grand Festin réunit 13 brigades, 550 convives et plus de 100 bénévoles sur le Vieux-Port de Marseille, pour les dix ans du programme.",
      ctaLabel: "Visiter desetoilesetdesfemmes.org",
      ctaUrl: "https://www.desetoilesetdesfemmes.org",
      quote: {
        text: "Je suis fière, indépendante, heureuse.",
        author: "Hafida",
        role: "alumna Lille",
      },
      logo: "images/logo%20projets/logo-def.png",
      siteUrl: "https://www.desetoilesetdesfemmes.org",
      siteName: "desetoilesetdesfemmes.org",
      heroImages: [
        "images/images-def/hero-promo-cuisine.jpg",
        "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg",
        "images/images-def/HOTELERIE-035.jpg",
        "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg",
      ],
      presentationTitle: "Le programme national qui forme des femmes aux métiers de la cuisine",
      mediaType: "youtube",
      mediaId: "VhIdcTx6GYQ",
      projetPhrase: "Depuis 2015, Des Étoiles et des Femmes forme des femmes aux métiers de la cuisine : un diplôme, des stages, un suivi social complet.",
      projetPoints: [
        "Une formation diplômante : CAP cuisine ou titre à finalité professionnelle",
        "Accompagnement social global tout au long du parcours",
        "Stages de qualité dans des restaurants engagés",
      ],
      projetCtaLabel: "Découvrir les formations",
      projetCtaHref: "#/formations",
      implicationTitle: "Vous êtes restaurateur ?",
      implicationText: "Accueillir une stagiaire Des Étoiles et des Femmes, c’est confier un binôme et un tutorat à une personne formée à vos standards. Pour 155 à 490 heures de stage.",
      implicationCtaLabel: "Devenir restaurant partenaire",
      implicationCtaHref: "#/contact",
      // Portraits & témoignages authentiques (4 femmes formées) — exposition photo Des Étoiles et des Femmes
      temoignages: [
        {
          prenom: "Hafida",
          ville: "Lille",
          promo: "Promotion lilloise 2023-2024",
          accroche: "Je suis fière, indépendante, heureuse",
          extrait: "Aujourd’hui, je travaille au restaurant L’Annexe à Lille, où j’ai effectué mes stages grâce au programme. Je suis fière de mon parcours, indépendante et heureuse d’avoir su franchir toutes ces étapes.",
          texte: "Je suis originaire du Maroc, de nationalité espagnole, et j’ai rejoint la France en 2012 après avoir tenu un restaurant familial en Espagne avec ma sœur.\n\nEn 2023, j’ai intégré la formation Des Étoiles et des Femmes. J’y ai découvert la gastronomie française et participé à des ateliers enrichissants comme la sophrologie ou des visites métiers inspirantes. Nous étions un groupe multiculturel et cette expérience m’a appris à vivre avec les autres.\n\nAujourd’hui, je travaille dans le restaurant L’Annexe à Lille où j’ai effectué mes stages grâce au programme. Je suis fière de mon parcours, indépendante et heureuse d’avoir su franchir toutes ces étapes.",
          photo: "images/images-def/portrait-hafida.jpg",
          objPos: "center 18%",
          variant: "teal",
          bw: false,
        },
        {
          prenom: "Idène",
          ville: "Toulouse",
          promo: "Promotion 2023-2024",
          accroche: "Être une femme en cuisine n’est pas une faiblesse, mais une force",
          extrait: "Intégrer Des Étoiles et des Femmes à Toulouse a été une évidence. Ce programme m’a permis de légitimer ma place dans un secteur encore très masculin, avec des valeurs fortes : inclusion, sororité, égalité des chances.",
          texte: "Originaire de Saint-Martin, j’ai grandi entre les casseroles de mes parents : mon père, chef cuisinier, et ma mère, traiteur. Après un parcours dans l’aéronautique, j’ai décidé de revenir à ma passion de toujours : la cuisine.\n\nIntégrer Des Étoiles et des Femmes à Toulouse a été une évidence. Ce programme m’a permis de légitimer ma place dans un secteur encore très masculin, avec des valeurs fortes : inclusion, sororité, égalité des chances.\n\nMon apprentissage auprès du chef Jean-Baptiste Rivière a été marquant. Sa vision artistique, sa bienveillance et sa rigueur m’ont donné l’élan pour continuer à apprendre.\n\nAujourd’hui ma priorité est de continuer à me former, à enrichir ma technique et à affiner ma sensibilité culinaire aux côtés de chefs passionnés dans l’univers de la gastronomie française. À terme, mon objectif est de reprendre un jour l’entreprise familiale et de lui donner un nouveau souffle, en y apportant une touche de modernité.",
          photo: "images/images-def/portrait-idene.jpg",
          objPos: "center 14%",
          variant: "cream",
          bw: false,
        },
        {
          prenom: "Avotra",
          ville: "Île-de-France — Antony",
          promo: "Promotion 2024-2025",
          accroche: "Pourquoi les autres, pourquoi pas moi ?",
          extrait: "Intégrer le CAP Cuisine avec Des Étoiles et des Femmes a été une chance. Aujourd’hui, je crée mon entreprise de traiteur malgache. Être femme dans la cuisine, c’est savoir s’imposer.",
          texte: "Je suis maman seule de deux enfants de 7 et 11 ans. Passionnée de cuisine depuis mon enfance aux côtés de ma grand-mère, j’ai toujours rêvé de faire découvrir mes plats d’origine malgache.\n\nJ’ai travaillé comme commise de cuisine et employée polyvalente dans une cantine scolaire, mais il me manquait un vrai tremplin pour concrétiser mon projet professionnel. Intégrer la formation CAP Cuisine avec Des Étoiles et des Femmes a été une chance. Elle m’a permis de renforcer mes savoir-faire et de croire en mon avenir comme auto-entrepreneuse.\n\nAujourd’hui, je crée mon entreprise de traiteur malgache et j’espère, d’ici à la fin d’année, pouvoir commencer les prestations.\n\nÊtre maman et construire sa carrière est un vrai défi, mais mes enfants me soutiennent. Être femme dans la cuisine, c’est savoir s’imposer. Pourquoi les autres, pourquoi pas moi ?",
          photo: "images/images-def/portrait-avotra.jpg",
          objPos: "center 12%",
          variant: "violet",
          bw: true,
        },
        {
          prenom: "Pina",
          ville: "Nice",
          promo: "Promotion 2018-2019",
          accroche: "Si tu veux, tu peux",
          extrait: "Aujourd’hui, je travaille à Èze Village dans un complexe de villas de luxe, où je gère la cuisine et l’organisation. Cette formation m’a permis de gagner en assurance, de structurer mon chemin et d’y croire.",
          texte: "J’ai participé au programme Des Étoiles et des Femmes en 2018 à Nice.\n\nAujourd’hui, je travaille à Èze Village dans un complexe de villas de luxe, où je gère à la fois la cuisine et l’organisation des villas.\n\nCe que je préfère, ce sont les échanges humains avec mes clients : des petits morceaux de vie, pleins de richesse. Cette formation m’a permis de gagner en assurance, de structurer mon chemin et d’y croire.\n\nÀ toutes celles qui hésitent, je dis : « si tu veux, tu peux. »",
          photo: "images/images-def/portrait-pina.jpg",
          objPos: "center 22%",
          variant: "teal",
          bw: false,
        },
        {
          prenom: "Najat",
          ville: "Marseille",
          promo: "Promotion 2023-2024",
          accroche: "Cette formation ouvre plein de portes",
          extrait: "Ce n’est pas un CAP comme les autres, il donne la possibilité d’avoir son propre projet et de faire ce qu’on aime.",
          photo: "",
          variant: "violet",
          bw: false,
        },
        // Slot en attente — portrait et témoignage à recueillir
        {
          prenom: "Julia Sedefdjian",
          role: "Marraine nationale — Des Étoiles et des Femmes",
          citation: "[AJOUTER TÉMOIGNAGE]",
          photo: "",
          variant: "deep",
          placeholder: true,
        },
      ],
      temoignagesCredit: "Portraits : Des Étoiles et des Femmes",
      presseFilter: ["Des Étoiles et des Femmes", "Etoiles et des Femmes"],
      // Les 13 antennes du réseau, avec l'année d'ouverture et la structure qui
      // porte le programme localement. Source : tableau réseau Des Étoiles et
      // des Femmes. Le Pays Basque a fermé, il n'y figure plus.
      antennes: [
        { ville: "Marseille",            annee: "2015", porteur: "Festin" },
        { ville: "Montpellier",          annee: "2016", porteur: "La Table de Cana" },
        { ville: "Nice",                 annee: "2017", porteur: "Forum Jorge François" },
        { ville: "Bordeaux",             annee: "2017", porteur: "La Table de Cana" },
        { ville: "Arles",                annee: "2018", porteur: "Petit à Petit" },
        { ville: "Strasbourg",           annee: "2018", porteur: "Les Jardins de la Montagne Verte" },
        { ville: "Hauts-de-Seine",       annee: "2018", porteur: "La Table de Cana" },
        { ville: "Paris",                annee: "2019", porteur: "La Table de Cana" },
        { ville: "Lyon",                 annee: "2021", porteur: "Weavers" },
        { ville: "Lille",                annee: "2021", porteur: "À Table Citoyens" },
        { ville: "Seine-Saint-Denis",    annee: "2021", porteur: "La Table de Cana" },
        { ville: "Toulouse",             annee: "2022", porteur: "Égalitère et Sororitère" },
        { ville: "Hauts-de-Seine Sud",   annee: "2023", porteur: "La Table de Cana" },
      ],
      // --- Champs page projet dédiée (extraits de description / formations, sinon [XX]) ---
      godmother: { name: "Julia Sedefdjian", role: "Marraine nationale — depuis 2025" },
      parcours: [
        { tab: "Se former", title: "Un diplôme reconnu",
          text: "CAP Cuisine sur 11 mois, avec le lycée hôtelier Jean-Paul Passedat et le Greta-CFA Marseille Méditerranée. Ou titre à finalité professionnelle de commis de cuisine sur 4 mois. Techniques, remise à niveau, préparation à l’examen.",
          stat: "600 h à 1 476 h", statL: "de formation selon le parcours",
          img: "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg" },
        { tab: "Pratiquer", title: "En restaurant, sur le terrain",
          text: "Des stages dans des restaurants engagés : Les Grandes Tables, Sofitel, Les Bords de Mer… On y apprend le métier en brigade.",
          stat: "155 à 490 h", statL: "de stage en restaurant",
          img: "images/images-def/HOTELERIE-035.jpg" },
        { tab: "Être accompagnée", title: "Lever les freins",
          text: "Un accompagnement social tout au long du parcours : mobilité, garde d’enfants, logement, soutien linguistique.",
          stat: "100 %", statL: "des parcours avec accompagnement social",
          img: "images/images-def/chaudbouillon-045.jpg" },
        { tab: "Travailler", title: "Jusqu’à l’emploi",
          text: "Coaching emploi, préparation aux entretiens, accès au réseau des restaurants partenaires, et suivi après la formation.",
          stat: "91 %", statL: "de réussite aux diplômes en 2025",
          img: "images/images-def/HOTELERIE-097.jpg" }
      ],
      // Vidéo de présentation du dispositif — bande pleine largeur (poster + lecture au clic)
      video: {
        eyebrow: "En vidéo",
        title: "Le dispositif en mouvement",
        poster: "images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg",
      },
      candidater: {
        pitch: "Depuis 2015, Des Étoiles et des Femmes forme des femmes aux métiers de la cuisine : un diplôme, des stages, un suivi social complet.",
        eligibility: "Le parcours s’adresse aux femmes majeures qui maîtrisent le français au niveau B1 (B2 pour le CAP) et souhaitent entrer dans la cuisine.",
        sessions: "Recrutement chaque année en mai. La réunion d’information collective est obligatoire pour candidater. Prochaine session du titre à finalité professionnelle : du 9 novembre 2026 au 13 avril 2027.",
        cost: "Formation entièrement gratuite, financée par les pouvoirs publics et les mécènes. Une indemnisation est possible selon la situation.",
        antennes: "La liste ville par ville et les dates d’information collective sont sur desetoilesetdesfemmes.org.",
        applyLabel: "Déposer une candidature",
        applyHref: "https://www.desetoilesetdesfemmes.org",
      },
      accueil: {
        title: "Accueillir une stagiaire",
        text: "Accueillir une stagiaire, c’est confier un binôme et un tutorat à quelqu’un de votre brigade, le temps d’un stage. C’est aussi rencontrer de futurs profils formés à votre carte, et prendre part à une restauration plus inclusive.",
        stat: "155 à 490 h", statL: "de stage par promotion",
        ctaLabel: "Devenir restaurant partenaire", ctaHref: "#/accompagnement/professionnels",
        img: "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg"
      },
      grandFestin: {
        eyebrow: "Temps fort",
        title: "Le Grand Festin",
        text: "Le 3 octobre 2025, pour les dix ans du programme, tout le réseau envoie sa brigade sur le Vieux-Port. Alumnis, chefs engagés, chefs marseillais. Une exposition en plein air. Des grandes tablées. 550 convives et plus de 100 bénévoles.",
        stats: [
          { value: "14",   label: "brigades réunies" },
          { value: "600", unit: "+", label: "convives" },
          { value: "100",  label: "bénévoles" }
        ],
        images: [
          "images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg",
          "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg"
        ]
      },
      soutenir: {
        title: "Soutenir une promotion",
        text: "Le parcours est gratuit pour les femmes qui le suivent. Les pouvoirs publics et des mécènes financent chaque promotion. Un don paie de la formation, des stages et un accompagnement social. Jusqu’à l’emploi.",
        donLabel: "Faire un don",
        contactLabel: "Parler mécénat",
        contactHref: "#/contact"
      },
    },
    {
      id: "les-beaux-mets",
      icon: "utensils",
      eyebrow: "Depuis 2022",
      title: "Les Beaux",
      accent: "Mets",
      shortTitle: "Les Beaux Mets",
      tagline: "Le premier restaurant en prison ouvert au public en France",
      subtitle: "Le premier restaurant en prison ouvert au public en France",
      short: "Ouvert en 2022 dans la prison des Baumettes, à Marseille, Les Beaux Mets accompagne des personnes détenues ou récemment libérées vers l’emploi en restauration. 86 % de sorties dynamiques. Plus de 12 000 convives depuis l’ouverture.",
      stats: [
        { value: "48",     label: "personnes accompagnées en 2025" },
        { value: "86 %",   label: "de sorties dynamiques" },
        { value: "12 000", unit: "+", label: "convives depuis l’ouverture" },
        { value: "+25 %",  label: "de chiffre d’affaires en 2025" },
      ],
      description: "Les Beaux Mets ouvre en 2022 dans la maison d’arrêt des Baumettes, à Marseille. C’est une première en France : un restaurant bistronomique ouvert au public, dont la brigade est composée de personnes détenues ou récemment libérées. Depuis l’ouverture, 119 personnes placées sous main de justice y ont travaillé. La troisième année, en 2025, est riche. Un documentaire de 45 minutes sur M6. Six masterclass de chefs reconnus. Trois Cafés Emploi en prison. Des biscuits à emporter, fabriqués par la brigade.",
      ctaLabel: "Visiter lesbeauxmets-marseille.fr",
      ctaUrl: "https://www.lesbeauxmets-marseille.fr",
      quote: {
        text: "Je n’avais jamais travaillé avant. Aux Beaux Mets, j’ai appris à cuisiner, à dresser une assiette, à me tenir en cuisine. Aujourd’hui, j’ai ma première fiche de paie. Ça me donne de la fierté.",
        author: "Jason",
        role: "22 ans, cuisinier 2025",
      },
      logo: "images/logo%20projets/logo-beauxmets.png",
      siteUrl: "https://www.lesbeauxmets-marseille.fr",
      siteName: "lesbeauxmets-marseille.fr",
      heroImages: [
        "images/beauxmets-images/LBM_cdutrey_071122-7264.jpg",
        "images/beauxmets-images/LBM_cdutrey_071122-7922.jpg",
        "images/beauxmets-images/LBM_carte%20printemps25_cdutrey_080425-1661.jpg",
        "images/beauxmets-images/Copie%20de%20LBM_masterclass_chloeCharles_cdutrey_030325-7735.jpg",
      ],
      presentationTitle: "Le premier restaurant en prison ouvert au public en France",
      mediaType: "youtube",
      mediaId: "PxuhWFzpmII",
      projetPhrase: "Ouvert en 2022 aux Baumettes, Les Beaux Mets accompagne des personnes détenues vers l’emploi en restauration bistronomique.",
      projetPoints: [
        "Seul restaurant en prison ouvert au public en France",
        "Formation bistronomique encadrée par des chefs reconnus",
        "Parcours continu : dedans vers dehors, jusqu’à l’emploi durable",
      ],
      projetCtaLabel: "Réserver une table",
      projetCtaHref: "https://www.lesbeauxmets-marseille.fr",
      implicationTitle: "Soutenir Les Beaux Mets",
      implicationText: "En venant déjeuner ou en soutenant le projet, vous contribuez directement à l’insertion de personnes placées sous main de justice.",
      implicationCtaLabel: "Faire un don",
      implicationCtaHref: "#/contact",
      temoignages: [
        { prenom: "Valentin Majan", role: "Chef de cuisine — Les Beaux Mets", citation: "Ce n’est pas tous les jours évident. On doit apprendre à mélanger les temps de mise en place et d’accompagnement social. Même si ça fait perdre du temps de production, ça rend notre travail plus humain.", placeholder: false },
        { prenom: "Jason", role: "Cuisinier, 22 ans — promotion 2025", citation: "Je n’avais jamais travaillé avant. Aux Beaux Mets, j’ai appris à cuisiner, à dresser une assiette, à me tenir en cuisine. Aujourd’hui, j’ai ma première fiche de paie. Ça me donne de la fierté.", placeholder: false },
        { prenom: "Chef Davin", role: "Chef — Intercontinental Marseille", citation: "Sami s’est très vite intégré à l’équipe. Il a été très bien formé aux Beaux Mets et avait également l’attitude qui correspondait à une cuisine.", placeholder: false },
      ],
      presseFilter: ["Les Beaux Mets", "Beaux Mets", "Baumettes"],
      // --- Champs page projet dédiée (sourcés du dossier de présentation LBM, janv. 2026) ---
      parcours: [
        { tab: "La brigade", title: "Une brigade en cuisine, une vraie",
          text: "16 personnes détenues composent 2 brigades, encadrées par le Chef Valentin Majan et son Second Boris Ruel en cuisine, le Maître d’hôtel Marc Balthazard en salle. Elles apprennent le métier sur un vrai service, carte incluse.",
          stat: "16", statL: "commis en poste, répartis en 2 brigades" },
        { tab: "L’accompagnement", title: "Un accompagnement sur mesure",
          text: "Du recrutement à la sortie, puis six mois après, chaque commis est suivi individuellement. Entretiens, stages, ateliers collectifs, projet professionnel : la conseillère en insertion professionnelle Nissa Boudhabhay l’accompagne.",
          stat: "6 mois", statL: "de suivi après la détention" },
        { tab: "La sortie", title: "Une passerelle vers l’emploi",
          text: "L’objectif : accompagner 40 personnes par an vers une sortie durable. Le secteur peine à recruter : 200 000 postes restent à pourvoir en France.",
          stat: "40", statL: "personnes accompagnées par an, c’est l’objectif" },
        { tab: "Hors les murs", title: "Le restaurant sort de la prison",
          text: "Street Food Festival, KoussKouss Festival, Grand Festin, Climat Libé Tour : en 2025, les commis montrent leur travail hors les murs. Trois Cafés Emploi réunissent des entreprises en prison. Le restaurant lance aussi des biscuits à emporter, navettes et croquants, fabriqués par la brigade.",
          stat: "16", statL: "stages à l’extérieur en 2025" },
        { tab: "Les masterclass", title: "Six chefs devant la brigade",
          text: "Laëtitia Visse, Éloi Spinnler, Elsa Leblanc, Chloé Charles, Justine Audoin et Hyacinthe Lescoët ont chacun animé une masterclass aux Beaux Mets en 2025.",
          stat: "6", statL: "masterclass de chefs reconnus en 2025" },
      ],
      video: {
        poster: "images/beauxmets-images/lbm-masterclass-brigade-plating.jpg",
      },
    },
    {
      id: "la-table-de-cana",
      icon: "chef-hat",
      eyebrow: "Depuis 1993",
      title: "La Table",
      accent: "de Cana",
      shortTitle: "La Table de Cana",
      tagline: "Traiteur et restauration collective en insertion, depuis 1993",
      subtitle: "Traiteur et restauration collective en insertion à Marseille",
      short: "Premier projet de Festin, La Table de Cana Marseille forme des personnes en insertion au traiteur et à la restauration collective. 45 salariés en insertion accompagnés en 2025, 89 % de sorties dynamiques, plus de 400 000 convives régalés.",
      stats: [
        { value: "45",      label: "salariés en insertion en 2025" },
        { value: "89 %",    label: "de sorties dynamiques" },
        { value: "400 000", unit: "+", label: "convives régalés" },
        { value: "≈ 500",   label: "prestations traiteur" },
      ],
      description: "La Table de Cana Marseille est le premier projet de Festin. Elle naît en 1993. Depuis plus de 30 ans, ce traiteur et cette restauration collective forment des personnes en insertion à un métier, dans un cadre structurant et exigeant. En 2025, elle obtient le label LUCIE Progress (848 sur 1 000) et renouvelle le label Empl’itude. Elle organise la deuxième édition du Club des Talents, un réseau d’anciens salariés en insertion inspiré des réseaux alumni. Elle lance le collectif EPICES, un espace de coopération entre acteurs de l’insertion par la cuisine. Elle sert aussi plus de 15 000 repas d’aide alimentaire à des personnes hébergées en hôtel d’urgence à Marseille.",
      ctaLabel: "Visiter latabledecana-marseille.com",
      ctaUrl: "https://www.latabledecana-marseille.com",
      quote: {
        text: "J’ai passé deux ans à La Table de Cana. Ça m’a vraiment aidé à savoir m’organiser et à avoir confiance en mes compétences. Aujourd’hui, j’ai un CDI chez Compass à la Tour CMA-CGM. Je suis fièr du chemin parcouru !",
        author: "Oumar",
        role: "ancien salarié en insertion",
      },
      logo: "images/logo%20projets/logo-latbaledecana.png",
      siteUrl: "https://www.latabledecana-marseille.com",
      siteName: "latabledecana-marseille.com",
      heroImages: [
        "images/latable%20de%20cana/tabledecana_cdutrey_160124-4393.jpg",
        "images/latable%20de%20cana/tabledecana_cdutrey_160124-5010.jpg",
        "images/latable%20de%20cana/TABLECANA_EVENT_cdutrey_230625-5158.jpg",
        "images/latable%20de%20cana/tabledecana_cdutrey_230124-7705.jpg",
      ],
      presentationTitle: "Traiteur et restauration collective en insertion, depuis 1993",
      mediaType: "youtube",
      mediaId: "RUpAD7u0Khs",
      projetPhrase: "Premier projet de Festin, La Table de Cana forme des personnes en insertion au traiteur et à la restauration collective depuis plus de 30 ans.",
      projetPoints: [
        "Traiteur professionnel et restauration collective avec des salariés en insertion",
        "Accompagnement individualisé de chaque salarié en insertion : coaching, formation, accès au réseau",
        "Labels LUCIE Progress (848/1000) et Empl’itude — engagement RSE reconnu",
      ],
      projetCtaLabel: "Faire appel à notre traiteur",
      projetCtaHref: "https://www.latabledecana-marseille.com",
      implicationTitle: "Organiser un événement engagé",
      implicationText: "Choisir La Table de Cana pour votre prochain événement, c’est allier gastronomie et impact social.",
      implicationCtaLabel: "Demander un devis",
      implicationCtaHref: "#/contact",
      temoignages: [
        { prenom: "Oumar", role: "Ancien salarié en insertion", citation: "J’ai passé deux ans à La Table de Cana. Ça m’a vraiment aidé à savoir m’organiser et à avoir confiance en mes compétences. Aujourd’hui, j’ai un CDI chez Compass à la Tour CMA-CGM.", placeholder: false },
        { prenom: "Jean Claude", role: "Ancien commis de cuisine — La Table de Cana", citation: "J’ai pu prendre confiance en moi grâce aux différentes tâches.", placeholder: false },
        { prenom: "Pierre", role: "RRH insertion — La Table de Cana", citation: "Chaque sortie positive, c’est une victoire pour la personne et pour toute l’équipe. Ça montre que notre accompagnement fonctionne !", placeholder: false },
      ],
      presseFilter: ["La Table de Cana", "Table de Cana"],
      // --- Champs page projet dédiée (source : latabledecana-marseille.com/insertion-professionnelle) ---
      parcours: [
        { tab: "Révélateur de talents", title: "Former et accompagner",
          text: "La Table de Cana forme et accompagne chaque année des personnes éloignées de l'emploi, pour transformer le « vouloir » en « pouvoir » et retrouver une stabilité sociale et professionnelle.",
          stat: "40+", statL: "personnes formées chaque année" },
        { tab: "Pourvoyeur de talents", title: "Vers l'emploi durable",
          text: "Une fois formés, les candidats qualifiés sont orientés vers des entreprises partenaires — Compass, Sodexo, Accor, Newrest, le restaurant Le Grand Pin, l'École de la 2e Chance. Lassana, diplômé du CAP cuisine en 2021, est aujourd'hui en CDI au Sofitel Marseille ; Zaky, titulaire du CQP cuisinier, travaille chez Newrest.",
          stat: "89 %", statL: "de sorties dynamiques en 2025" },
        { tab: "Le Club des Talents", title: "Une communauté d'anciens et actuels salariés",
          text: "Le Club des Talents réunit anciens et actuels salariés : construire une communauté engagée, favoriser le parrainage des nouveaux arrivants, créer un réseau d'opportunités avec les entreprises partenaires.",
          stat: "2ᵉ", statL: "édition organisée en 2025" },
        { tab: "Solidarité alimentaire", title: "Des repas pour l’hébergement d’urgence",
          text: "Plus de 15 000 repas d’aide alimentaire pour des personnes hébergées en hôtel d’urgence à Marseille. MediaPerformances est devenu financeur de cette aide en 2025.",
          stat: "15 000+", statL: "repas d’aide alimentaire" },
        { tab: "Outils d’accompagnement", title: "Coacher, filmer, mettre en réseau",
          text: "Trois outils. Les Tutos du Chef : des vidéos pédagogiques pour les salariés en insertion, et pour toute personne qui veut apprendre les bases. Les Vendredis de l’emploi : du coaching et de la préparation à la recherche d’emploi. Le collectif EPICES : un espace de coopération entre acteurs de l’insertion par la cuisine.",
          stat: "3", statL: "outils lancés ou renforcés en 2025" },
      ],
      partenaires: ["Compass", "Sodexo", "Accor", "Newrest", "Le Grand Pin", "École de la 2e Chance", "MediaPerformances", "Culture du Cœur"],
      video: {
        poster: "images/latable de cana/tabledecana_cdutrey_170124-6293-B-2048x1365.jpg",
      },
    },
    {
      id: "restaure",
      icon: "megaphone",
      eyebrow: "Depuis 2024",
      title: "Le programme",
      accent: "Restaure",
      shortTitle: "Le programme Restaure",
      tagline: "Un programme national pour transformer le secteur",
      subtitle: "Un programme national pour transformer le secteur de la restauration",
      short: "Restaure réunit 35 structures engagées. Objectif : prévenir les violences en cuisine, promouvoir un management juste, imaginer une restauration durable. 700 signataires du manifeste. Plus de 2 millions de vues.",
      stats: [
        { value: "35",  label: "structures engagées" },
        { value: "700", label: "signataires du manifeste" },
        { value: "2 M", unit: "+", label: "de vues" },
        { value: "5",   label: "groupes de travail" },
      ],
      description: "Restaure est un programme national. Il réunit des acteurs de la restauration pour changer les pratiques du secteur, prévenir les violences en cuisine et promouvoir un management plus juste. Quatre structures le pilotent : Yes We Camp, Les Petites Cantines, La Communauté Ecotable et Festin. En 2025, il franchit plusieurs étapes. La gouvernance se consolide. Cinq groupes de travail se lancent. Cinq tables rondes se tiennent à Marseille, Toulouse et Lille. Une formation « Management juste » voit le jour. Les vidéos de prévention des violences en cuisine dépassent deux millions de vues.",
      ctaLabel: "Visiter mouvement-restaure.com",
      ctaUrl: "https://www.mouvement-restaure.com",
      quote: {
        text: "Pour réussir à vraiment changer les choses, je suis persuadé qu’il faut avancer collectivement.",
        author: "Eloi Spinnler",
        role: "chef engagé",
      },
      logo: "images/logo%20projets/logo-%20restaure.png",
      siteUrl: "https://www.mouvement-restaure.com",
      siteName: "mouvement-restaure.com",
      heroImages: [
        "images/restaure%20%3A%20formation%20pro/Lancement_Restaure_Photo.CarolineDutrey%20(1).jpg",
        "images/restaure%20%3A%20formation%20pro/FESTIN_TOAST_12%20FEVRIER_FEED-25.jpg",
        "images/restaure%20%3A%20formation%20pro/WhatsApp%20Image%202025-12-09%20at%2008.53.58.jpg",
        "images/restaure%20%3A%20formation%20pro/TASTING_RFF_CLOSING-FEED-34%20(1).JPG",
      ],
      presentationTitle: "Un programme national pour transformer le secteur",
      mediaType: "instagram",
      mediaUrl: "https://www.instagram.com/reel/DJ9kq6iIb5j/",
      projetPhrase: "Restaure réunit 35 structures engagées pour changer les pratiques de la restauration. Prévenir les violences. Promouvoir un management juste.",
      projetPoints: [
        "Un manifeste pour une restauration juste et durable, porté collectivement par des structures engagées à travers la France",
        "Tables rondes et groupes de travail thématiques organisés à Marseille, Toulouse, Lille et au-delà",
        "Formations Management juste et inclusif et Prévention des violences sexistes et sexuelles déployées auprès des professionnels du secteur",
      ],
      projetCtaLabel: "Signer le manifeste",
      projetCtaHref: "https://www.mouvement-restaure.com",
      implicationTitle: "Rejoindre Restaure",
      implicationText: "Restaurateurs, chefs, responsables RH : si vous croyez qu’une restauration plus juste est possible, rejoignez les 35 structures déjà engagées.",
      implicationCtaLabel: "Nous rejoindre",
      implicationCtaHref: "#/contact",
      temoignages: [
        { prenom: "Eloi Spinnler", role: "Chef engagé — membre Restaure", citation: "Pour réussir à vraiment changer les choses, je suis persuadé qu’il faut avancer collectivement.", placeholder: false },
      ],
      presseFilter: ["Restaure", "Mouvement Restaure"],
      // --- Repositionnement stratégique Restaure (2026) : mission + 3 axes de transformation ---
      mission: "Restaure aura réussi s’il a transformé durablement les pratiques du secteur de la restauration. Objectif : améliorer les conditions humaines et l’impact écologique, par la sensibilisation et la formation des professionnels.",
      transformation: [
        { title: "Renforcer l’équité et l’inclusion",
          text: "Créer un secteur plus inclusif et équitable en intégrant des pratiques favorisant la diversité, l’horizontalité et une meilleure représentativité à tous les niveaux.",
          indicateurs: [
            "Accès aux opportunités pour les femmes, les personnes réfugiées et les personnes en insertion",
            "Onboarding inclusif",
            "Pratiques RH confortables pour toutes et tous",
          ] },
        { title: "Améliorer les conditions de travail et l’attractivité du secteur",
          text: "Faire de la restauration un environnement de travail sûr, valorisant et attractif, où les talents peuvent s’épanouir et contribuer à la pérennité économique.",
          indicateurs: [
            "70 % de satisfaction des équipes visés dans les restaurants signataires du manifeste",
            "Turnover réduit de moitié, fin de la pénurie RH visée",
            "Management formé, prévention des violences sexistes et sexuelles effective",
          ] },
        { title: "Accélérer la transition écologique",
          subtitle: "Avec la Communauté Ecotable",
          text: "Positionner les restaurants comme acteurs moteurs de la durabilité, en favorisant un sourcing responsable et en sensibilisant le secteur à l’urgence climatique.",
          indicateurs: [
            "70 % des aliments sourcés localement et durablement, l’objectif pour les restaurants signataires",
            "Réduction des déchets et de la consommation d’énergie",
            "Trajectoire de progression auditée",
          ] },
      ],
      groupes: [
        { title: "Actions transformatrices", pilote: "La Communauté Ecotable" },
        { title: "Événements fédérateurs", pilote: "Yes We Camp" },
        { title: "Contre les violences en cuisine", pilote: "La Source et Éloi Spinnler" },
        { title: "Plaidoyer", pilote: "La Communauté Ecotable, Les Bouillonantes" },
        { title: "Formations", pilote: "Des Étoiles et des Femmes, Refugee Food" },
      ],
      gouvernance: ["Yes We Camp", "Les Petites Cantines", "La Communauté Ecotable", "Festin"],
      toast: "Les Toast : des apéros inspirants organisés par Restaure avec La Communauté Ecotable. Les restaurateurs s’y rencontrent, échangent leurs pratiques et repartent avec l’envie d’agir.",
      perspectives: [
        "Ancrer l’expertise du programme dans le réel grâce à l’ouverture du lieu Sadi Carnot",
        "Intégrer un volet de sensibilisation du grand public : programmation Alimentation durable",
        "Explorer la complémentarité avec le label Peace & Work",
      ],
    },
    {
      id: "tournesol",
      icon: "sun",
      eyebrow: "En partenariat avec Refugee Food",
      title: "Formation",
      accent: "Tournesol",
      shortTitle: "Tournesol",
      tagline: "Formation diplômante pour personnes réfugiées et primo-arrivantes",
      subtitle: "Un parcours diplômant pour les personnes réfugiées et primo-arrivantes",
      short: "Imaginée par Refugee Food et portée par Festin, la formation Tournesol prépare en 5 mois au titre à finalité professionnelle de commis de cuisine et au DCL. Elle est gratuite et rémunérée. Diplôme, accompagnement socio-professionnel, accès à l’emploi.",
      stats: [
        { value: "5",     label: "mois de formation" },
        { value: "TFP",   label: "Commis de cuisine" },
        { value: "0 €",   label: "Gratuite et rémunérée" },
        { value: "100 %", label: "accompagnement inclus" },
      ],
      description: "Refugee Food imagine Tournesol. Festin la porte depuis 2025, avec Estello Formation. La formation s’adresse aux personnes réfugiées ou primo-arrivantes autorisées à travailler en France. En cinq mois, elle prépare au titre à finalité professionnelle de commis de cuisine et au diplôme de compétence en langue (DCL). Elle est gratuite et rémunérée. Chaque personne bénéficie d’un accompagnement socio-professionnel individuel, jusqu’à l’emploi. Un an après la formation, 86 % des personnes de la promotion marseillaise sont en insertion.",
      ctaLabel: "En savoir plus sur refugee-food.org",
      ctaUrl: "https://refugee-food.org",
      quote: null,
      logo: "images/logo%20projets/logo-%20tournesol.png",
      siteUrl: "https://refugee-food.org",
      siteName: "refugee-food.org",
      heroImages: [
        "images/tournesol%3Aformation/festin_tournesol_cdutrey_0124-3645.jpg",
        "images/tournesol%3Aformation/Formation-Tournesol_RefugeeFood_%C2%A9Aglae-Bory-67.jpg",
        "images/photo-tabliers-violets.jpg",
        "images/photo-promo-groupe.jpg",
      ],
      presentationTitle: "Un parcours diplômant pour les personnes réfugiées et primo-arrivantes",
      mediaType: "carousel",
      carouselImages: [
        "images/tournesol%3Aformation/festin_tournesol_cdutrey_0124-3645.jpg",
        "images/tournesol%3Aformation/Formation-Tournesol_RefugeeFood_%C2%A9Aglae-Bory-67.jpg",
        "images/photo-tabliers-violets.jpg",
      ],
      projetPhrase: "Imaginée par Refugee Food et portée par Festin, Tournesol prépare en 5 mois au titre à finalité professionnelle de commis de cuisine.",
      projetPoints: [
        "Une formation gratuite et rémunérée de 5 mois : titre à finalité professionnelle de commis de cuisine et DCL",
        "Destinée aux personnes réfugiées ou primo-arrivantes autorisées à travailler",
        "Combine diplôme, accompagnement socio-professionnel et accès à l’emploi",
      ],
      projetCtaLabel: "En savoir plus — Refugee Food",
      projetCtaHref: "https://refugee-food.org",
      implicationTitle: "Orienter une personne",
      implicationText: "Vous accompagnez des personnes réfugiées ? Contactez-nous pour connaître les prochaines sessions et les critères d’éligibilité.",
      implicationCtaLabel: "Nous contacter",
      implicationCtaHref: "#/contact",
      temoignages: [
        { prenom: "Ancien apprenant", role: "Promotion Tournesol", citation: "Avant de commencer la formation, j’avais un bon travail et j’ai démissionné pour me former et pour trouver mieux. Au début, j’avais peur de ne pas avoir fait le bon choix. Mais maintenant, à la fin de la formation, je me rends compte que j’ai beaucoup appris et que c’était finalement une très bonne chose pour moi.", placeholder: false },
        { prenom: "Ancien apprenant", role: "Promotion Tournesol", citation: "L’accompagnement socio-professionnel a été essentiel pour moi. Il m’a offert du soutien moral, des conseils pratiques, une meilleure compréhension de mes droits et opportunités, et m’a aidé à croire davantage en mes capacités professionnelles.", placeholder: false },
        { prenom: "Ancien apprenant", role: "Promotion Tournesol", citation: "Merci de m’avoir donné l’opportunité d’apprendre la langue et de me former pour entrer dans le monde du travail.", placeholder: false },
      ],
      presseFilter: ["Tournesol", "Refugee Food"],
      // --- Champs page projet dédiée (source : refugee-food.org/formation-tournesol-a-marseille) ---
      parcours: [
        { tab: "Le français", title: "Cours de français appliqués à la restauration",
          text: "Un apprentissage du français centré sur le vocabulaire et les situations du métier, pour lever la première barrière à l'emploi." },
        { tab: "La formation technique", title: "Formation technique en cuisine",
          text: "Dispensée par AFC Groupe, cette formation prépare au métier de commis de cuisine." },
        { tab: "Le stage en entreprise", title: "Une mise en pratique chez Compass Group",
          text: "Les stagiaires sont rémunérés par France Travail tout au long de la formation, stage compris." },
        { tab: "Le diplôme", title: "Examens et remise des diplômes",
          text: "Le parcours se termine par les examens du titre à finalité professionnelle et du DCL. Vient ensuite la remise des diplômes. Un accompagnement individuel suit, pour une insertion socio-professionnelle durable." },
      ],
      prochaineSession: "Prochaine session : du 30 novembre 2026 au 22 avril 2027.",
      galerie: {
        title: "Refugee Food Festival 2026",
        lede: "Le festival de Refugee Food, partenaire de la formation Tournesol, a réuni des restaurants à Lille et à Lyon en 2026.",
        photos: [
          { src: "images/refugee-food-festival/rff-lille-1.jpg", alt: "Refugee Food Festival 2026 à Lille, restaurant L’Annexe", caption: "Lille, restaurant L’Annexe", credit: "@monsieurhuman" },
          { src: "images/refugee-food-festival/rff-lille-2.jpg", alt: "Refugee Food Festival 2026 à Lille, restaurant L’Annexe", caption: "Lille, restaurant L’Annexe", credit: "@monsieurhuman" },
          { src: "images/refugee-food-festival/rff-lyon-3.jpg", alt: "Refugee Food Festival 2026, soirée de clôture à Lyon", caption: "Lyon, soirée de clôture", credit: "Agathe Waechter" },
          { src: "images/refugee-food-festival/rff-lyon-4.jpg", alt: "Refugee Food Festival 2026, soirée de clôture à Lyon", caption: "Lyon, soirée de clôture", credit: "Agathe Waechter" },
        ],
      },
      bilan: {
        eyebrow: "Bilan de la promotion 2025-2026",
        title: "Ce que la promotion marseillaise a obtenu",
        source: "Formation du 27 novembre 2025 au 12 mai 2026, centre Corot Formation, Marseille. Source : bilan de fin de promotion Tournesol.",
        items: [
          { value: "14", label: "personnes entrées en formation" },
          { value: "12", label: "l’ont suivie jusqu’au bout" },
          { value: "9 sur 11", label: "ont obtenu le titre à finalité professionnelle en totalité" },
          { value: "11 sur 11", label: "ont obtenu le DCL, diplôme de compétence en langue" },
          { value: "150 h", label: "de stage en restaurant" },
          { value: "86 %", label: "d’insertion globale un an après la formation" },
        ],
      },
      partenaires: ["AFC Groupe", "Compass Group", "France Travail", "AKTO", "Ville de Marseille", "Préfecture des Bouches-du-Rhône", "Fondation RAJA-Danièle Marcovici"],
    },
  ],
  formations: [
    {
      id: "vss",
      cat: "Professionnels",
      audienceKey: "pros",
      title: "Prévention des violences sexistes et sexuelles en restauration",
      desc: "Identifier, prévenir et agir contre les violences sexistes et sexuelles en milieu professionnel.",
      img: "images/photo-service-restaurant.jpg",
      duration: "Inter (3h) ou Intra (3h ou 1 jour / 7h)",
      format: "Présentiel — inter-restaurants ou intra-entreprise",
      price: "Inter 180 € HT/pers · Intra 800 € (3h) ou 1 500 € (1 jour)",
      publicLabel: "Tout professionnel de la restauration",
      objectives: [
        "Identifier les violences sexistes et sexuelles sur le lieu de travail",
        "Comprendre le cadre légal et les obligations de l'employeur",
        "Mettre en place un protocole de prévention adapté",
        "Réagir avec justesse face à un signalement",
      ],
      programme: [
        "Définitions, cadre légal, statistiques sectorielles",
        "Cas pratiques issus de situations réelles en cuisine et en salle",
        "Construction d'un protocole de signalement",
        "Atelier de mise en situation : posture du référent",
      ],
      tariff: "Inter-restaurants (3h) : 180 € HT / personne. Intra-entreprise : 800 € HT pour 3h, ou 1 500 € HT pour 1 journée (7h, jusqu'à 12 personnes). Prise en charge OPCO possible.",
    },
    {
      id: "management",
      cat: "Professionnels",
      audienceKey: "pros",
      title: "Management juste & inclusif",
      desc: "Recruter, fidéliser et manager autrement. Construire un environnement de travail respectueux.",
      img: "images/photo-cuisine-action.jpg",
      duration: "1 journée (7h) + 2 demi-journées (2 × 3h)",
      format: "Présentiel — option : 3 h dédiées aux violences sexistes et sexuelles",
      price: "600 € / salarié (2 jours) · 3 000 € / organisation (groupe)",
      publicLabel: "Cheffes, chefs, managers, responsables RH",
      objectives: [
        "Comprendre ce qui fait rester une équipe en restauration",
        "Recruter au-delà des CV et ouvrir le recrutement à la diversité",
        "Animer une équipe avec un management non-toxique",
        "Construire un cadre clair sur les conditions de travail",
      ],
      programme: [
        "État des lieux du secteur : tensions RH et nouvelles attentes",
        "Recrutement inclusif : sourcing, entretien, intégration",
        "Posture managériale : feedback, conflits, droit à l'erreur",
        "Plan d'action personnalisé pour son établissement",
      ],
      tariff: "600 € HT pour 1 salarié sur les 2 jours · 3 000 € HT pour une organisation (le groupe complet). Option : module complémentaire de 3h dédiées à la prévention des violences sexistes et sexuelles. Éligible OPCO et FNE.",
    },
    {
      id: "tfp",
      cat: "Insertion",
      audienceKey: "insertion",
      title: "Des Étoiles et des Femmes — TFP",
      desc: "Titre à finalité professionnelle de commis de cuisine en 4 mois, gratuit, pour des femmes.",
      img: "images/photo-tabliers-violets.jpg",
      duration: "4 mois — 600h (245h cuisine · 155h stage · 70h remise à niveau · 131h transverses)",
      format: "Présentiel — Corot Formations (13014)",
      price: "Gratuit — financement France Travail / Région",
      publicLabel: "Femmes majeures, niveau de français B1 minimum",
      objectives: [
        "Obtenir le titre à finalité professionnelle de commis de cuisine",
        "Acquérir une expérience en restaurant partenaire (155h de stage)",
        "Construire un projet professionnel viable et choisi",
        "Bénéficier d'un accompagnement social global pendant le parcours",
      ],
      programme: [
        "Bases techniques de la cuisine : taillage, cuissons, sauces (245h)",
        "Remise à niveau et compétences transverses (70h + 131h)",
        "Stage en restaurant partenaire (155h — Les Grandes Tables, Sofitel, Bords de Mer…)",
        "Coaching emploi et préparation aux entretiens",
      ],
      tariff: "Formation 100% prise en charge. Indemnisation pendant le parcours selon situation.",
    },
    {
      id: "cap",
      cat: "Insertion",
      audienceKey: "insertion",
      title: "Des Étoiles et des Femmes — CAP",
      desc: "CAP Cuisine en 11 mois pour des femmes, en alternance avec un restaurant partenaire.",
      img: "images/photo-patisserie.jpg",
      duration: "11 mois — 986h de cours + 490h de stage",
      format: "Lycée Hôtelier Jean-Paul Passedat (13008)",
      price: "Gratuit",
      publicLabel: "Femmes majeures, niveau de français B2 minimum",
      objectives: [
        "Obtenir le CAP Cuisine (diplôme Éducation nationale)",
        "Construire une expérience professionnelle solide (490h de stage)",
        "Sécuriser durablement son insertion dans le secteur",
      ],
      programme: [
        "Programme officiel CAP Cuisine (986h de cours)",
        "Stages longs en restaurant (490h)",
        "Suivi social, soutien linguistique si besoin",
        "Suivi post-formation pendant 12 mois",
      ],
      tariff: "Formation 100% prise en charge. Indemnisation possible.",
    },
    {
      id: "tournesol",
      cat: "Insertion",
      audienceKey: "insertion",
      title: "Tournesol",
      desc: "Parcours diplômant pour personnes réfugiées ou primo-arrivantes : technique, langue, terrain.",
      img: "images/photo-rouleaux.jpg",
      duration: "5 mois — 600h (252h cuisine · 155h stage · 154h FLE · 39h transverses)",
      format: "Corot Formations (13014)",
      price: "Gratuit",
      publicLabel: "Personnes réfugiées ou primo-arrivantes, majeures, niveau A2 minimum",
      objectives: [
        "Acquérir les bases du métier de commis de cuisine (252h)",
        "Progresser en français (FLE — 154h)",
        "Découvrir la diversité des métiers de la restauration en stage (155h)",
        "Construire un projet d'insertion durable",
      ],
      programme: [
        "Cuisine : techniques, hygiène, organisation (252h)",
        "Français Langue Étrangère — FLE (154h)",
        "Stage en restaurant partenaire (155h — Refugee Food, Small Group…)",
        "Compétences transverses et accompagnement social (39h)",
      ],
      tariff: "Formation 100% prise en charge dans le cadre du Plan d'Investissement Compétences.",
    },
  ],
  testimonials: [
    // Témoignage financeur — source : Solidarity AccorHotels, partenaire depuis 2015
    {
      quote: "Les chefs de cuisine de Sofitel, Pullman ou Mama Shelter à Marseille ont accueilli dans leurs brigades ces femmes dont les horizons professionnels étaient inexistants. Quelle richesse, quels partages.",
      author: "Christine de Longevialle",
      role: "Déléguée générale, Solidarity AccorHotels",
      kind: "financeur",
    },
    // Témoignages réels — source : Rapport d'activité 2025
    {
      quote: "Je suis fière, indépendante, heureuse d'avoir su franchir toutes ces étapes.",
      author: "Hafida",
      role: "Promotion Des Étoiles et des Femmes, Lille",
      tone: "light",
    },
    {
      quote: "Je n'avais jamais travaillé avant. Aux Beaux Mets, j'ai appris à cuisiner, à dresser une assiette, à me tenir en cuisine. Aujourd'hui, j'ai ma première fiche de paie. Ça me donne de la fierté.",
      author: "Jason, 22 ans",
      role: "Cuisinier — Les Beaux Mets, 2025",
      tone: "light",
    },
    {
      quote: "J'ai passé deux ans à La Table de Cana. Ça m'a vraiment aidé à savoir m'organiser et à avoir confiance en mes compétences. Aujourd'hui, j'ai un CDI chez Compass à la Tour CMA-CGM. Je suis fier du chemin parcouru !",
      author: "Oumar",
      role: "Ancien salarié en insertion — La Table de Cana",
      tone: "dark",
    },
    {
      quote: "Pour réussir à vraiment changer les choses, je suis persuadé qu'il faut avancer collectivement.",
      author: "Eloi Spinnler",
      role: "Chef engagé — Restaure",
      tone: "dark",
    },
  ],
  presse: [
    // ── Les Beaux Mets ────────────────────────────────────────────────
    { dispositif:"Les Beaux Mets", source:"Impact Story", title:"On donne des couteaux aux détenues pour leur offrir une 2nde chance", type:"Reportage", date:"2026-05-13", href:"https://www.instagram.com/reel/DYSYQ77sfO1/" },
    { dispositif:"Les Beaux Mets", source:"Courrier International", title:"Les Beaux Mets à Marseille, restaurant de réinsertion", type:"Article", date:"2026-04-02", href:"https://www.courrierinternational.com/long-format/vu-d-espagne-au-restaurant-des-beaux-mets-a-marseille-des-detenus-mitonnent-leur-reinsertion_239702" },
    { dispositif:"Les Beaux Mets", source:"France 3 PACA", title:"En prison à Marseille, un restaurant bistronomique où l'on est servis par des détenus", type:"Reportage TV", date:"2026-03-25", href:"https://www.youtube.com/watch?v=6qyo6RXsqjI" },
    { dispositif:"Les Beaux Mets", source:"El País", title:"La prison la plus célèbre de Marseille ouvre ses portes à un restaurant unique en son genre", type:"Article", date:"2026-01-11", href:"https://elpais.com/eps/2026-01-09/la-carcel-mas-famosa-de-marsella-abre-sus-puertas-a-un-restaurante-unico.html" },
    { dispositif:"Les Beaux Mets", source:"M6 — Un jour, un doc", title:"Un restaurant dans une prison", type:"Reportage TV", date:"2025-11-10", href:"https://www.m6.fr/un-jour-un-doc-p_22196/un-restaurant-dans-une-prison-c_13151161" },
    { dispositif:"Les Beaux Mets", source:"Les Échos Weekend", title:"Les détenus s'en sortent par la cuisine", type:"Article", date:"2025-11-07", href:"https://www.lesechos.fr/weekend/business-story/les-clients-sont-sympas-ils-font-des-bons-retours-dans-la-prison-des-baumettes-les-detenus-sen-sortent-par-la-cuisine-2196595" },
    { dispositif:"Les Beaux Mets", source:"Revue du barreau", title:"Les Beaux Mets — pages 62-63 de la revue du Barreau", type:"Article Print", date:"2025-12-01", href:"https://drive.google.com/file/d/1jPCV9VGW6BKNubRWoh_FGg4hIs-Is7_u/view" },
    { dispositif:"Les Beaux Mets", source:"Le Monde", title:"Armand Hurault, directeur de Festin : « La restauration m'est apparue comme l'un des rares secteurs où l'origine étrangère peut être une valeur ajoutée »", type:"Article", date:"2025-02-14", href:"https://www.lemonde.fr/m-styles/article/2025/02/14/armand-hurault-directeur-de-festin-la-restauration-m-est-apparue-comme-l-un-des-rares-secteurs-d-activite-ou-l-origine-etrangere-peut-etre-une-valeur-ajoutee_6546308_4497319.html" },
    { dispositif:"Les Beaux Mets", source:"Le Figaro", title:"15 Marseillais de moins de 40 ans qui vont changer la ville", type:"Article", date:"2025-01-14", href:"https://www.lefigaro.fr/marseille/ils-ont-moins-de-40-ans-et-vont-changer-la-ville-decouvrez-notre-palmares-des-15-marseillais-les-plus-prometteurs-20250114" },
    { dispositif:"Les Beaux Mets", source:"France Inter — On va déguster", title:"Après la prison, la cuisine", type:"Sujet Radio", date:"2025-03-02", href:"https://www.radiofrance.fr/franceinter/podcasts/on-va-deguster/on-va-deguster-du-dimanche-02-mars-2025-7190244" },
    { dispositif:"Les Beaux Mets", source:"Zig Zag Paris", title:"À Marseille, ce restaurant insolite aux conditions d'accès sécurisées est le premier en France à se trouver dans une prison", type:"Article", date:"2025-02-20", href:"https://www.pariszigzag.fr/marseille/restaurant-prison-baumettes" },
    { dispositif:"Les Beaux Mets", source:"Made in Marseille", title:"Le restaurant en prison Les Beaux Mets décroche un macaron Écotable", type:"Article", date:"2024-09-20", href:"https://madeinmarseille.net/167722-le-restaurant-en-prison-les-beaux-mets-decroche-un-macaron-ecotable/" },
    { dispositif:"Les Beaux Mets", source:"France TV Info", title:"« Ça nous rapproche de la sortie, de la vie normale » : le restaurant des Baumettes rencontre un franc succès", type:"Article", date:"2024-03-12", href:"https://www.francetvinfo.fr/societe/prisons/reportage-ca-nous-rapproche-de-la-sortie-de-la-vie-normale-a-marseille-le-restaurant-de-la-prison-des-beaumettes-rencontre-un-franc-succes-depuis-un-an_6417697.html" },
    { dispositif:"Les Beaux Mets", source:"Le Monde — M le Mag", title:"À Marseille, un restaurant bistronomique derrière les barreaux", type:"Article", date:"2022-11-15", href:"https://www.lemonde.fr/m-le-mag/article/2022/11/15/a-marseille-un-restaurant-bistronomique-derriere-les-barreaux_6149880_4500055.html" },
    { dispositif:"Les Beaux Mets", source:"Libération", title:"Dans la prison des Baumettes, un restaurant met la réinsertion à la carte", type:"Article", date:"2022-11-12", href:"https://www.liberation.fr/lifestyle/gastronomie/dans-la-prison-des-baumettes-un-restaurant-met-la-reinsertion-a-la-carte-20221112_FBYPQVSQH5E5TFUJ7GMTINAEVY/" },
    { dispositif:"Les Beaux Mets", source:"Télérama", title:"Cuisine et réinsertion : j'ai déjeuné à la prison des Baumettes", type:"Article", date:"2022-12-04", href:"https://www.telerama.fr/sortir/cuisine-et-reinsertion-j-ai-dejeune-a-la-prison-des-baumettes-7013292.php" },

    // ── Des Étoiles et des Femmes ──────────────────────────────────────
    { dispositif:"Des Étoiles et des Femmes", source:"Nice Matin", title:"Une seconde chance derrière les fourneaux", type:"Article", date:"2026-03-08", href:"https://www.nicematin.com/loisirs/gastronomie/c-est-une-belle-experience-a-cannes-des-femmes-en-insertion-professionnelle-en-masterclass-de-cuisine-au-martinez-10671453" },
    { dispositif:"Des Étoiles et des Femmes", source:"La Provence", title:"« Un échange gagnant-gagnant » : à Arles, 10 femmes éloignées de l'emploi obtiennent leur CAP cuisine", type:"Article", date:"2025-12-02", href:"https://www.laprovence.com/article/societe/32963667342845/un-echange-gagnant-gagnant-a-arles-10-femmes-eloignees-de-lemploi-obtiennent-leur-cap-cuisine" },
    { dispositif:"Des Étoiles et des Femmes", source:"Arles Info", title:"Des étoiles et des femmes : la recette de la réussite", type:"Article", date:"2025-12-02", href:"https://arles.fr/actualites/des-etoiles-et-des-femmes-la-recette-de-la-reussite/" },
    { dispositif:"Des Étoiles et des Femmes", source:"Podcast Des Étoiles et des Femmes", title:"Podcast Île-de-France", type:"Podcast", date:"2025-11-20", href:"https://podcasts.apple.com/fr/podcast/des-%C3%A9toiles-et-des-femmes/id1792208177" },
    { dispositif:"Des Étoiles et des Femmes", source:"TF1 — JT 20h", title:"Reportage insertion professionnelle par la cuisine", type:"Reportage TV", date:"2025-09-01", href:"https://www.tf1.fr/tf1/jt-20h/videos/le-jt-de-20-heures-de-tf1-du-dimanche-24-aout-2025-80434191.html" },
    { dispositif:"Des Étoiles et des Femmes", source:"France 2 — 13h15 le dimanche", title:"L'assiette française", type:"Reportage TV", date:"2024-05-13", href:"https://www.francetvinfo.fr/replay-magazine/france-2/13h15/13h15-le-dimanche-l-assiette-francaise-episode-4-partie-1_6505052.html" },
    { dispositif:"Des Étoiles et des Femmes", source:"Made in Marseille", title:"François Hollande à Marseille pour booster des projets à impact innovants", type:"Article", date:"2024-09-20", href:"https://madeinmarseille.net/167697-video-francois-hollande-a-marseille-pour-booster-des-projets-a-impact-innovants/" },
    { dispositif:"Des Étoiles et des Femmes", source:"Made In Marseille", title:"La recette de la cheffe Laëtitia Visse pour inspirer les talents culinaires féminins", type:"Article", date:"2024-02-28", href:"https://madeinmarseille.net/153708-laetitia-visse-marraine-des-etoiles-et-des-femmes/" },
    { dispositif:"Des Étoiles et des Femmes", source:"Le Progrès", title:"« Pensez à vous et vous réussirez » : le début de l'aventure pour ces femmes qui se forment auprès des grands chefs lyonnais", type:"Article", date:"2023-09-28", href:"https://www.leprogres.fr/education/2023/09/22/pensez-a-vous-et-vous-reussirez-le-debut-de-l-aventure-pour-ces-femmes-qui-vont-se-former-aupres-des-grands-chefs-lyonnais" },
    { dispositif:"Des Étoiles et des Femmes", source:"Sud-Ouest", title:"Gastronomie au Pays basque : les futures femmes cheffes ont des étoiles plein les yeux", type:"Article", date:"2023-03-18", href:"https://www.sudouest.fr/pyrenees-atlantiques/bayonne/gastronomie-au-pays-basque-les-futures-femmes-cheffes-ont-des-etoiles-plein-les-yeux-14466559.php" },
    { dispositif:"Des Étoiles et des Femmes", source:"Made In Marseille", title:"Ces concepts culinaires marseillais qui mettent l'insertion à la carte", type:"Article", date:"2023-09-01", href:"https://madeinmarseille.net/142947-la-cuisine-en-partage-ces-concepts-qui-mettent-linsertion-a-la-carte/" },

    // ── Restaure ──────────────────────────────────────────────────────
    { dispositif:"Restaure", source:"RCF Radio", title:"Vers une restauration plus éthique et inclusive avec le projet Restaure", type:"Sujet Radio", date:"2025-09-29", href:"https://www.rcf.fr/actualite/le-fil-eco?episode=620970" },
    { dispositif:"Restaure", source:"Le Progrès", title:"Violences en cuisine : ces initiatives qui tentent de « briser l'omerta » dans la restauration", type:"Article", date:"2025-07-04", href:"https://www.leprogres.fr/societe/2025/07/04/violences-en-cuisine-ces-initiatives-qui-tentent-de-briser-l-omerta-dans-la-restauration" },
    { dispositif:"Restaure", source:"L'Hôtellerie Restauration", title:"Le mouvement Restaure organise une journée engagée aux Halles de la Cartoucherie", type:"Article", date:"2025-05-22", href:"https://www.lhotellerie-restauration.fr/actualite/le-mouvement-restaure-organise-une-journee-engagee-aux-halles-de-la-cartoucherie-a-toulouse" },
    { dispositif:"Restaure", source:"Neo Restauration", title:"Restaure, pour une restauration plus juste, inclusive et durable", type:"Article", date:"2024-09-26", href:"https://www.neorestauration.com/article/restaure-pour-une-restauration-plus-juste-inclusive-et-durable,72483" },
    { dispositif:"Restaure", source:"Carenews", title:"« La restauration est un milieu malade » : avec le mouvement Restaure, Éloi Spinnler s'attaque aux violences en cuisine", type:"Article", date:"2025-11-20", href:"https://www.carenews.com/engagement-et-citoyennete/news/la-restauration-est-un-milieu-malade-avec-le-mouvement-restaure" },
  ],
};

// ============================================================
//  MEGA MENU — contenu (repris de Selector.jsx / maquette home-b)
//  Couleurs : charte uniquement (teal / or / corail / violet)
// ============================================================
// Don en ligne — formulaire HelloAsso de l'association
// Verbatims recueillis pour la campagne Restaure contre les violences en cuisine.
// Anonymes, repris mot pour mot. Ils disent le problème que la formation traite.
window.FESTIN_DATA.verbatimsViolences = [
  "Le rythme était tellement infernal qu'on ne mangeait pas, pas le droit de s'asseoir. Si on s'appuyait sur le comptoir, on se faisait engueuler.",
  "J'ai eu des patrons qui étaient tout le temps sur leurs caméras et qui m'appelaient toutes les cinq minutes dès que je prenais cinq secondes pour respirer.",
  "J'ai ce souvenir d'un apprenti : après une bêtise, le chef avait décidé de l'appeler par une insulte toute la journée.",
  "On s'est retrouvés de 1 h à 3 h du matin à cuisiner pour le repas d'anniversaire de sa petite-fille. Est-ce que c'est normal ?",
  "Les assiettes qui volent au-dessus de nos têtes.",
  "Soit tu te tais, soit tu dégages.",
];

window.FESTIN_DATA.donation = "https://www.helloasso.com/associations/association-festin/formulaires/3";

window.FESTIN_DATA.meganav = {
  title: "Explorez Festin",
  links: [
    { label: "L'association", href: "#/about" },
    { label: "Notre impact", href: "#/impact" },
    { label: "Actualités", href: "#/actualites" },
    { label: "Formations", href: "#/formations" },
    { label: "Nous contacter", href: "#/contact" }
  ],
  views: [
    {
      key: "theme", label: "Par thématique", icon: "sparkles",
      cards: [
        { t:"Régaler",     ic:"utensils",       c:"#1D6B78", d:"Nos restaurants, notre traiteur et nos espaces : la gastronomie inclusive qui se déguste.", tags:["Les Beaux Mets","La Table de Cana","Traiteur"], href:"#/projets/les-beaux-mets" },
        { t:"Former",      ic:"graduation-cap", c:"#E8A825", d:"L'Académie Festin : des parcours diplômants et des formations pour les pros.", tags:["Des Étoiles et des Femmes","Tournesol","Formations pros"], href:"#/formations" },
        { t:"Employer",    ic:"briefcase",      c:"#E4572E", d:"L'insertion par la cuisine et le suivi vers un emploi durable.", tags:["Parcours insertion","Club des Talents"], href:"#/accompagnement/insertion" },
        { t:"Transformer", ic:"megaphone",      c:"#9A5BA8", d:"Le programme Restaure : faire évoluer les pratiques de tout un secteur.", tags:["Manifeste","Plaidoyer"], href:"#/projets/restaure" }
      ]
    },
    {
      key: "lieu", label: "Par lieu", icon: "map-pin",
      cards: [
        { t:"Les Beaux Mets",    ic:"utensils",       c:"#1D6B78", d:"Le restaurant des Baumettes à Marseille, ouvert au public.", tags:["Marseille","Restaurant"], href:"#/projets/les-beaux-mets" },
        { t:"La Table de Cana",  ic:"chef-hat",       c:"#E8A825", d:"Traiteur événementiel et restauration collective — Mourepiane.", tags:["Mourepiane","Traiteur"], href:"#/projets/la-table-de-cana" },
                { t:"L'Académie Festin", ic:"graduation-cap", c:"#E4572E", d:"Le centre de formation certifié Qualiopi de l'association.", tags:["Marseille","Qualiopi"], href:"#/academie" }
      ]
    },
    {
      key: "projet", label: "Par projet", icon: "layout-grid",
      cards: [
        { t:"Des Étoiles et des Femmes", ic:"star",     c:"#E8A825", d:"L'insertion des femmes par la haute gastronomie — 13 antennes.", tags:["10 ans","13 antennes"], href:"#/projets/des-etoiles-et-des-femmes" },
        { t:"Tournesol",                 ic:"sun",      c:"#E4572E", d:"Le parcours diplômant pour personnes réfugiées et primo-arrivantes.", tags:["Refugee Food","5 mois"], href:"#/projets/tournesol" },
        { t:"Club des Talents",          ic:"users",    c:"#1D6B78", d:"Le réseau d'anciens salariés en insertion, façon alumni.", tags:["Réseau","Alumni"], href:"#/accompagnement/insertion" },
        { t:"Le programme Restaure",     ic:"megaphone",c:"#9A5BA8", d:"35 structures fédérées pour transformer la restauration.", tags:["700 signataires","Manifeste"], href:"#/projets/restaure" }
      ]
    }
  ]
};

// ============================================================
//  HOME — copy éditoriale (portée depuis maquettes/home-b.html)
// ============================================================
window.FESTIN_DATA.home = {
  hero: {
    eyebrow: "Association Festin",
    titleLines: ["Le goût", "d'avancer", "ensemble"],   // dernière ligne = accent
    sub: "Association à but non lucratif et d'intérêt général, agréée ESUS. Nous formons aux métiers de la cuisine. Nous accompagnons les restaurants qui veulent recruter et manager autrement. Depuis Marseille, dans 14 territoires.",
    ctas: [
      { label: "Découvrir nos projets", scroll: "eco", variant: "gold" },
      { label: "S'engager", scroll: "engage", variant: "ghost" }
    ],
    img: "images/photo-chapeau-cuisine.jpg"
  },
  marquee: [
    "CAP Cuisine", "Titre à finalité professionnelle de commis de cuisine", "DCL, diplôme de compétence en langue",
    "Prévention des violences en cuisine", "Management juste", "Accueil de la diversité",
    "L'insertion par la cuisine depuis 1987"
  ],
  approche: {
    eyebrow: "L'association Festin",
    titleLines: ["De la cuisine", "à l'emploi"],
    intro: "Viser haut n'exclut pas : cela élève. Nous formons aux métiers de la cuisine. Un diplôme reconnu, puis de 155 à 490 heures de stage en restaurant pour les apprenantes de Des Étoiles et des Femmes. Nous accompagnons aussi les restaurants qui veulent recruter et manager autrement.",
    steps: [
      { tab: "Accompagner", kicker: "01 · Insertion", title: "Accompagner",
        text: "Des femmes, des personnes réfugiées ou primo-arrivantes, des personnes détenues. Un parcours vers un métier de cuisine, et un suivi social de la première semaine jusqu'à l'emploi. 441 personnes accompagnées en 2025.",
        img: "images/photo-groupe-portrait.jpg", variant: "a" },
      { tab: "Former", kicker: "02 · Formation", title: "Former",
        text: "Un CAP cuisine ou un titre à finalité professionnelle de commis de cuisine, des stages en brigade. Pour les personnes en parcours comme pour les équipes déjà en poste. 83 % de sorties en emploi ou en formation.",
        img: "images/photo-patisserie.jpg", variant: "b" },
      { tab: "Transformer", kicker: "03 · Transformation", title: "Transformer",
        text: "Le programme Restaure réunit 35 structures et 700 signataires de son manifeste : prévenir les violences en cuisine, défendre un management juste.",
        img: "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg", variant: "c" }
    ]
  },
  logoband: { eyebrow: "Cinq projets, tous rattachés à Festin" },
  dual: {
    titleLines: ["Se former,", "ou former ses équipes"],   // 2e = accent
    lede: "Vous apprenez un métier, ou vous dirigez une équipe. Chaque entrée a son parcours.",
    cards: [
      { tag: "Vous cherchez un métier", kicker: "Parcours d'insertion",
        title: "Apprendre un métier de cuisine, gratuitement",
        pts: [
          "Un diplôme reconnu : CAP cuisine ou titre à finalité professionnelle",
          "Des stages en restaurant. Un accompagnement social complet. Un coaching vers l'emploi.",
          "Des parcours pour les femmes (Des Étoiles et des Femmes), et pour les personnes réfugiées ou primo-arrivantes (Tournesol)."
        ],
        cta: "Voir les parcours", href: "#/accompagnement/insertion",
        img: "images/photo-tabliers-violets.jpg" },
      { tag: "Vous dirigez un établissement", kicker: "Professionnels de la restauration",
        title: "Recruter, former et garder vos équipes",
        pts: [
          "Des formations courtes : violences en cuisine, management juste, accueil de la diversité.",
          "Des stagiaires en parcours d'insertion, dans votre brigade.",
          "Un partenariat avec Festin pour recruter autrement"
        ],
        cta: "Voir l'accompagnement des restaurateurs", href: "#/accompagnement/professionnels",
        img: "images/photo-cuisine-action.jpg" }
    ]
  },
  eco: {
    titlePre: "L'écosystème ", titleAccent: "Festin",
    lede: "Un restaurant en prison. Un traiteur d'insertion. Deux parcours diplômants. Un programme national. Cinq projets, tous rattachés à Festin.",
    // par projet.id : accroche + chiffre + image de carte (le reste vient de FESTIN_DATA.projets)
    cards: [
      { id:"des-etoiles-et-des-femmes", blurb:"Un diplôme de cuisine et des stages en restaurants gastronomiques, pour des femmes. 13 antennes en France.", stat:"91 % de réussite aux diplômes en 2025", img:"images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg" },
      { id:"les-beaux-mets",           blurb:"Le premier restaurant en prison ouvert au public en France. Aux Baumettes, à Marseille.", stat:"86 % de sorties dynamiques", img:"images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" },
      { id:"la-table-de-cana",         blurb:"Traiteur et restauration collective en insertion, à Marseille.", stat:"400 000+ convives régalés", img:"images/latable de cana/tabledecana_cdutrey_160124-4393.jpg" },
      { id:"restaure",                 blurb:"Un programme national. Il prévient les violences en cuisine et change les pratiques du secteur.", stat:"700 signataires du manifeste", img:"images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg" },
      { id:"tournesol",                blurb:"Cinq mois de formation diplômante pour des personnes réfugiées ou primo-arrivantes.", stat:"86 % d'insertion un an après", img:"images/photo-rouleaux.jpg" }
    ],
    explore: { title:"Explorer tout l'écosystème", text:"Un restaurant, un traiteur, deux parcours diplômants, un programme national. 14 territoires.", cta:"Voir les projets", href:"#/projets/des-etoiles-et-des-femmes" }
  },
  impact: {
    eyebrow: "L'impact 2025",
    // 5 photos réelles : Des Étoiles et des Femmes ×3, Les Beaux Mets ×1, La Table de Cana ×1
    photos: [
      "images/images-def/hero-promo-cuisine.jpg",
      "images/beauxmets-images/LBM_cdutrey_071122-7264.jpg",
      "images/images-def/HOTELERIE-035.jpg",
      "images/latable de cana/tabledecana_cdutrey_160124-4393.jpg",
      "images/images-def/chaudbouillon-045.jpg"
    ]
  },
  quotes: {
    eyebrow: "Témoignages",
    title: "Dans leurs mots",
    lede: "Des personnes formées, un chef qui recrute, un chef engagé. Leurs mots.",
    band: "images/photo-applaudissements.jpg",
    cards: [
      { av:"P", kind:"p", chip:"Personne accompagnée", name:"Hafida", role:"Des Étoiles et des Femmes, Lille",
        q:"Je suis fière, indépendante, heureuse d'avoir su franchir toutes ces étapes.", logo:"images/logo projets/logo-def.png" },
      { av:"R", kind:"r", chip:"Restaurateur", name:"Chef Davin", role:"Intercontinental Marseille",
        q:"Sami s'est très vite intégré à l'équipe. Il a été très bien formé aux Beaux Mets et avait l'attitude qui correspondait à une cuisine.", logo:"images/logo projets/logo-beauxmets.png" },
      { av:"P", kind:"p", chip:"Personne accompagnée", name:"Jason, 22 ans", role:"Cuisinier, Les Beaux Mets, 2025",
        q:"Je n'avais jamais travaillé avant. Aujourd'hui, j'ai ma première fiche de paie. Ça me donne de la fierté.", logo:"images/logo projets/logo-beauxmets.png" },
      { av:"E", kind:"r", chip:"Entreprise partenaire", name:"[Entreprise partenaire]", role:"[Fonction]",
        q:"[Témoignage à recueillir : entreprise mécène ou partenaire RH]", panelText:"L'écosystème Festin" },
      { av:"P", kind:"p", chip:"Personne accompagnée", name:"Oumar", role:"Ancien salarié en insertion, La Table de Cana",
        q:"Ça m'a vraiment aidé à avoir confiance en mes compétences. Aujourd'hui, j'ai un CDI. Je suis fier du chemin parcouru.", logo:"images/logo projets/logo-latbaledecana.png" },
      { av:"C", kind:"f", chip:"Secteur engagé", name:"Éloi Spinnler", role:"Chef engagé, programme Restaure",
        q:"Pour réussir à vraiment changer les choses, je suis persuadé qu'il faut avancer collectivement.", logo:"images/logo projets/logo- restaure.png" },
      { av:"F", kind:"f", chip:"Financeur / mécène", name:"[Financeur ou mécène]", role:"[Fonction]",
        q:"[Témoignage à recueillir]", panelText:"Soutenir Festin" }
    ]
  }
};

// ---------- PAGE ABOUT — contenus ----------
// Chiffres : source unique = FESTIN_DATA.stats ci-dessus (Rapport d'activité 2025 : 441 / 83 % / 14 ; création 1987).
// `photo: null` = portrait à fournir → cadre neutre « [XX] ». `avatar` = médaillon 240 px (petit avatar rond).
window.FESTIN_DATA.about = {
  poles: [
    { key: "direction", label: "Direction et gestion", color: "#1D6B78", members: [
      { name: "Armand Hurault", role: "Directeur général", photo: null },
      { name: "Marine Vever",   role: "Directrice adjointe", photo: null },
      { name: "Marie Plé",      role: "Assistante de gestion", photo: null },
    ]},
    { key: "com", label: "Communication et communauté", color: "#9A5BA8", members: [
      { name: "Iris Liberty",      role: "Chargée d'animation de communauté, programme Restaure", photo: null },
      { name: "Iris Hutin",        role: "Chargée de projet Communication", photo: null },
      { name: "Mattieu Donsimoni", role: "Chargé de communication en alternance", photo: null },
    ]},
    { key: "formation", label: "Formation et emploi", color: "#E8A825", members: [
      { name: "Florence Armitano", role: "Responsable du pôle Formation", photo: null },
      { name: "Mélanie Gambert",   role: "Coordinatrice réseau Des Étoiles et des Femmes", photo: null },
      { name: "Karima Hellou",     role: "Responsable Emploi et Inclusion, Des Étoiles et des Femmes", photo: null },
      { name: "Lucie Gueydon",     role: "Chargée de projet formation, Estello Formation", photo: null },
    ]},
    { key: "cuisine", label: "Les Beaux Mets", color: "#E4572E", members: [
      { name: "Camille Lafon",    role: "Direction du restaurant Les Beaux Mets", photo: null, avatar: "images/equipe/bm-lafon.png" },
      { name: "Valentin Majan",   role: "Chef de cuisine", photo: null, avatar: "images/equipe/bm-majan.png" },
      { name: "Boris Ruel",       role: "Second de cuisine", photo: null, avatar: "images/equipe/bm-ruel.png" },
      { name: "Marc Balthazard",  role: "Maître d'hôtel", photo: null },
      { name: "Nissa Boudhabhay", role: "Conseillère en insertion professionnelle", photo: null },
    ]},
  ],
  gouvernance: [
    { name: "Jérôme Schatzman", role: "Président", avatar: "images/equipe/ca-schatzman.png" },
    { name: "Guillaume Hermitte", role: "Trésorier", avatar: "images/equipe/ca-hermitte.png" },
    { name: "Virginie Leconte", role: "Secrétaire", avatar: null },
  ],
  jalons: [
    { year: "1993", title: "La Table de Cana", desc: "Le premier traiteur en insertion de Marseille. Le premier projet de l'association.", color: "#E8A825", dark: true, photo: "images/latable de cana/tabledecana_cdutrey_160124-5010.jpg" },
    { year: "2015", title: "Naissance de Des Étoiles et des Femmes", desc: "Un programme qui forme des femmes aux métiers de la cuisine, avec de grands chefs.", color: "#E4572E", dark: true, photo: "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg" },
    { year: "2022", title: "Ouverture des Beaux Mets", desc: "Le premier restaurant en prison ouvert au public en France. Aux Baumettes, à Marseille.", color: "#1D6B78", dark: false, photo: "images/beauxmets-images/LBM_cdutrey_071122-7922.jpg" },
    { year: "2024", title: "Le programme Restaure", desc: "Quatre structures au pilotage. 35 structures engagées. 700 signataires du manifeste.", color: "#9A5BA8", dark: false, photo: "images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg" },
    { year: "2025", title: "Tournesol", desc: "Festin porte la formation Tournesol avec Refugee Food. Cinq mois pour préparer un titre à finalité professionnelle de commis de cuisine.", color: "#0F3C44", dark: false, photo: "images/photo-rouleaux.jpg" },
    { year: "2026", title: "Académie Festin", desc: "Festin devient organisme de formation.", color: "#F5C84A", dark: true, photo: "images/photo-cuisine-formation.jpg" },
  ],
  valeurs: [
    { title: "Non-lucrativité", color: "#E8A825", dark: true,  desc: "Festin est une association loi 1901, à but non lucratif et d'intérêt général, agréée ESUS. Chaque euro sert le projet associatif." },
    { title: "Excellence",      color: "#E4572E", dark: true,  desc: "Aux Beaux Mets, le chef forme les commis à la cuisine bistronomique. Le maître d'hôtel forme l'équipe de salle. Viser haut rend les parcours solides." },
    { title: "Collectif",       color: "#9A5BA8", dark: false, desc: "Aucun projet Festin ne se fait seul. Chefs, restaurateurs, entreprises, fondations et pouvoirs publics avancent avec nous." },
  ],
  // Partenaires institutionnels affichés (logos dans images/partners/)
  partenaires: [
    { src: "images/partners/la-source.svg",           alt: "La Source" },
    { src: "images/partners/the-small-group.webp",    alt: "The Small Group" },
    { src: "images/partners/les-grandes-tables.jpeg", alt: "Les Grandes Tables" },
    { src: "images/partners/les-bords-de-mer.png",    alt: "Les Bords de Mer" },
    { src: "images/partners/sofitel.jpg",             alt: "Sofitel Hotels & Resorts" },
    { src: "images/partners/france-travail.png",      alt: "France Travail" },
    { src: "images/partners/yes-we-camp.png",         alt: "Yes We Camp" },
  ],
  // Réseau de chefs (deck financeurs) — accord confirmé par l'association
  chefs: [
    { name: "Martin Simolka",       place: "Le Scribe, Paris" },
    { name: "Valentina Giacobbe",   place: "Ginko, Lille" },
    { name: "Armand Arnal",         place: "La Chassagnette, Arles" },
    { name: "Jean-François Rouquette", place: "Park Hyatt, Paris" },
    { name: "Andrée Rosier",        place: "Les Rosiers, Biarritz" },
    { name: "Thomas Morel",         place: "Pavillon des Boulevards, Bordeaux" },
    { name: "Laëtitia Visse",       place: "La Femme du Boucher, Marseille" },
    { name: "Jérémy Galvan",        place: "Lyon" },
    { name: "Frédéric Jaunault",    place: "Meilleur ouvrier de France primeur" },
    { name: "Richard Juste",        place: "Le Mahé, Montpellier" },
    { name: "Sylvain Ruffenach",    place: "Le Cerf, Strasbourg" },
    { name: "Quentin Testart",      place: "Shangri-La, Paris" },
  ],
};

// Backward-compat alias so anything still referencing the old name keeps working
window.ACADEMIE_DATA = window.FESTIN_DATA;
