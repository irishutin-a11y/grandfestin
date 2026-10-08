// Centralized data for the Festin website.
window.FESTIN_DATA = {
  brand: {
    name: "Festin",
    tagline: "Le goût d'avancer ensemble",
    logo: "images/logo-festin-teal-sb.png", // sans la baseline (RETOURS-V3 §5.1)
    logoWhite: "images/logo-festin-blanc-sb.png",
    logoGold: "images/logo-festin-jaune-sb.png",
    qualiopi: "images/logo-qualiopi.png",
    site: "https://www.grandfestin.com",
  },
  catalogPdf: "https://drive.google.com/file/d/1c8ueQMkTpjb1KmjJPV3nQ9djTLOmN8yC/view?usp=sharing",
  contact: {
    email: "contact@grandfestin.com", // adresse générale (retour du 06/10/2026)
    altEmail: "armand.hurault@associationfestin.com",
    referent: "Armand Hurault",
    referentRole: "Directeur général, relations restaurateurs et engagement",
    address: "21 rue Grignan, 13006 Marseille",
    nda: "93132168513",
    siret: "379 756 026 00074",
    legalForm: "Association loi 1901",
    rna: "W133012740",
    legalMention: "Ce site est édité par Festin, groupe associatif à but non lucratif et d’intérêt général. N° RNA : W133012740. SIRET : 379 756 026 00074.",
  },
  // Stats (About, accueil) — chiffres 2025, source : Rapport d'activité Festin 2025 (version 441 / 83 %)
  stats: [
    { value: "441", unit: "",   label: "personnes accompagnées en 2025" },
    { value: "83",  unit: "%",  label: "de sorties en emploi ou en formation en 2025" },
    { value: "14",  unit: "",   label: "territoires d'intervention" },
    { value: "91",  unit: "%",  label: "de réussite aux diplômes en 2025 (Des Étoiles et des Femmes)" },
  ],
  // Ticker — defile bandeau sur la home
  ticker: [
    "441 personnes accompagnées en 2025",
    "83 % de sorties en emploi ou en formation",
    "14 territoires d'intervention",
    "L'insertion par la cuisine depuis 1987",
    "Académie Festin, portée par Estello Formation, organisme de formation certifié Qualiopi",
    "Le goût d'avancer ensemble",
  ],
  // 3 pillars on the home Festin section
  pillars: [
    {
      icon: "heart-handshake",
      title: "Insertion",
      desc: "Un métier de cuisine, un diplôme reconnu et un suivi social de l'entrée en formation jusqu'à l'emploi.",
    },
    {
      icon: "graduation-cap",
      title: "Formation",
      desc: "Des parcours diplômants pour les personnes en insertion, des formations courtes pour les équipes déjà en poste.",
    },
    {
      icon: "megaphone",
      title: "Transformation",
      desc: "Un programme national, piloté par Festin, pour transformer les pratiques de la restauration : conditions de travail, inclusion et impact écologique.",
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
      desc: "Des formations diplômantes pour les femmes (Des Étoiles et des Femmes) et pour les personnes réfugiées ou primo-arrivantes (Tournesol).",
      cta: "Voir les parcours d'insertion",
      img: "images/photo-tabliers-violets.jpg",
      formations: ["des-etoiles-et-des-femmes", "tournesol"],
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
      tagline: "Le dispositif national qui forme des femmes aux métiers de la cuisine",
      subtitle: "Un diplôme de cuisine, des stages dans des restaurants partenaires, un accompagnement social complet",
      short: "Des femmes suivent une formation diplômante en cuisine, font leurs stages dans des restaurants partenaires et sont suivies jusqu'à l'emploi. Le dispositif existe depuis 2015 et compte 13 antennes. En 2025, 91 % des candidates ont obtenu leur diplôme.",
      stats: [
        { value: "13",    label: "antennes partout en France" },
        { value: "336",   label: "femmes accompagnées en 2025" },
        { value: "91 %",  label: "de réussite aux diplômes en 2025" },
        { value: "1 200", unit: "+", label: "femmes accompagnées depuis 2015" },
      ],
      description: "Des Étoiles et des Femmes ouvre à Marseille en 2015. Le principe : former des femmes à la cuisine avec des chefs et des restaurants partenaires, au niveau d’exigence de ces maisons. Le dispositif compte aujourd’hui 13 antennes en France et plus de 1 200 femmes y ont été accompagnées. Chaque promotion suit une formation diplômante, fait ses stages en restaurant et bénéficie d’un suivi social. En 2025, la cheffe Julia Sedefdjian devient marraine nationale. Le 3 octobre, pour les dix ans du dispositif, le Grand Festin réunit 14 brigades, plus de 600 convives et plus de 100 bénévoles sur le Vieux-Port de Marseille.",
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
      presentationTitle: "Le dispositif national qui forme des femmes aux métiers de la cuisine",
      mediaType: "youtube",
      mediaId: "VhIdcTx6GYQ",
      projetPhrase: "Des femmes apprennent la cuisine avec des chefs, dans 13 villes. À la clé : un diplôme reconnu et un suivi jusqu’à l’emploi.",
      projetPoints: [
        "Une formation diplômante en cuisine, de 4 à 11 mois",
        "Accompagnement social global tout au long du parcours",
        "Des stages dans des restaurants partenaires",
      ],
      projetCtaLabel: "Découvrir les formations",
      projetCtaHref: "#/academie",
      implicationTitle: "Vous êtes restaurateur ?",
      implicationText: "Une stagiaire rejoint votre brigade pour 155 à 490 heures. Un membre de votre équipe la suit en binôme. Vous la voyez travailler sur votre carte avant de recruter.",
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
          ville: "Île-de-France, Antony",
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
          photo: "images/images-def/portrait-najat.jpg", objPos: "center 30%",
          variant: "violet",
          bw: false,
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
      godmother: { name: "Julia Sedefdjian", role: "Marraine nationale, depuis 2025" },
      parcours: [
        { tab: "Se former", title: "Une formation diplômante",
          text: "Une formation en cuisine avec un centre de formation partenaire dans chaque ville : techniques, remise à niveau et préparation à l’examen.",
          stat: "91 %", statL: "de réussite aux diplômes en 2025",
          img: "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg" },
        { tab: "Pratiquer", title: "Apprendre en brigade",
          text: "Les stages ont lieu dans des restaurants partenaires. Les stagiaires y apprennent le métier en brigade, sur un vrai service.",
          stat: "155 à 490 h", statL: "de stage en restaurant",
          img: "images/images-def/hero-promo-cuisine.jpg" },
        { tab: "Être accompagnée", title: "Garde d’enfants, logement, transport",
          text: "Ce qui empêche de suivre une formation est traité pendant le parcours : garde d’enfants, logement, transport, cours de français.",
          stat: "1 200+", statL: "femmes accompagnées depuis 2015",
          img: "images/images-def/chaudbouillon-045.jpg" },
        { tab: "Travailler", title: "Jusqu’à l’emploi",
          text: "Préparation aux entretiens, mise en relation avec les restaurants partenaires et suivi après la formation.",
          stat: "73 %", statL: "de sorties positives en 2025",
          img: "images/images-def/HOTELERIE-035.jpg" }
      ],
      // Vidéo de présentation du dispositif — bande pleine largeur (poster + lecture au clic)
      video: {
        eyebrow: "En vidéo",
        title: "Le dispositif en vidéo",
        poster: "images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg",
      },
      candidater: {
        pitch: "Vous êtes une femme en recherche d’emploi et vous voulez travailler en cuisine ? Le parcours est gratuit, il mène à un diplôme et vous êtes suivie jusqu’à l’emploi.",
        eligibility: "Le parcours s’adresse aux femmes en recherche d’emploi, de 18 ans ou plus, qui maîtrisent le français au niveau B1 ou B2 selon la formation et souhaitent entrer dans la cuisine.",
        sessions: "Recrutement à partir de septembre. La réunion d’information collective est obligatoire pour candidater. Prochaine session : du 9 novembre 2026 au 13 avril 2027.",
        cost: "Formation entièrement gratuite, financée par les pouvoirs publics et les mécènes. Une indemnisation est possible selon la situation.",
        antennes: "La liste ville par ville et les dates d’information collective sont sur desetoilesetdesfemmes.org.",
        applyLabel: "Déposer une candidature",
        applyHref: "https://www.desetoilesetdesfemmes.org",
      },
      accueil: {
        title: "Accueillir une stagiaire",
        text: "La stagiaire travaille dans votre brigade, suivie en binôme par un membre de l’équipe. Festin reste votre interlocuteur pendant tout le stage. À la fin, vous connaissez son travail : vous pouvez la recruter.",
        stat: "155 à 490 h", statL: "de stage par promotion",
        ctaLabel: "Devenir restaurant partenaire", ctaHref: "#/restauration",
        img: "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg"
      },
      grandFestin: {
        eyebrow: "Temps fort",
        title: "Le Grand Festin",
        text: "Le 3 octobre 2025, pour les dix ans du dispositif, 14 brigades venues de tout le réseau cuisinent sur le Vieux-Port de Marseille. Chacune réunit des anciennes stagiaires, des chefs du réseau et des chefs marseillais. Autour des grandes tablées, une exposition photo en plein air raconte les parcours.",
        stats: [
          { value: "14",   label: "brigades réunies" },
          { value: "600", unit: "+", label: "convives" },
          { value: "100", unit: "+", label: "bénévoles" }
        ],
        images: [
          "images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg",
          "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg"
        ]
      },
      soutenir: {
        title: "Soutenir une promotion",
        text: "Le parcours est gratuit pour les femmes qui le suivent : les pouvoirs publics et des mécènes financent chaque promotion. Votre don paie des heures de formation, des stages et le suivi social, jusqu’à l’emploi.",
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
      short: "Ouvert en 2022 dans la prison des Baumettes, à Marseille, Les Beaux Mets accompagne des personnes détenues ou récemment libérées vers l’emploi en restauration. En 2025, 86 % des personnes accompagnées ont eu une sortie dynamique. Plus de 12 000 convives depuis l’ouverture.",
      stats: [
        { value: "48",     label: "personnes accompagnées en 2025" },
        { value: "86 %",   label: "de sorties positives en 2025" },
        { value: "12 000", unit: "+", label: "convives depuis l’ouverture" },
        { value: "119",    label: "personnes employées depuis l’ouverture" },
      ],
      description: "Les Beaux Mets ouvre en novembre 2022 dans la prison des Baumettes, à Marseille. C’est le premier restaurant en prison ouvert au public en France. La brigade est composée de personnes détenues ou récemment libérées : elles cuisinent et servent une carte bistronomique, encadrées par des professionnels. Depuis l’ouverture, 119 personnes placées sous main de justice y ont travaillé. En 2025, M6 consacre un documentaire de 45 minutes au restaurant, six chefs viennent y animer une masterclass, trois Cafés Emploi réunissent des entreprises en prison et la brigade lance des biscuits à emporter.",
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
        "Une brigade encadrée par un chef, un second et un maître d’hôtel",
        "Un suivi individuel pendant la détention, puis six mois après la sortie",
      ],
      projetCtaLabel: "Réserver une table",
      projetCtaHref: "https://www.lesbeauxmets-marseille.fr",
      implicationTitle: "Soutenir Les Beaux Mets",
      implicationText: "Déjeuner aux Beaux Mets fait travailler la brigade sur un vrai service. Un don finance le suivi des commis, pendant la détention et après la sortie.",
      implicationCtaLabel: "Faire un don",
      implicationCtaHref: "https://www.helloasso.com/associations/association-festin/formulaires/3",
      temoignages: [
        { prenom: "Valentin Majan", role: "Chef de cuisine, Les Beaux Mets", photo: "images/beauxmets-images/valentin-majan.jpg", objPos: "center 25%", citation: "Ce n’est pas tous les jours évident. On doit apprendre à mélanger les temps de mise en place et d’accompagnement social. Même si ça fait perdre du temps de production, ça rend notre travail plus humain.", placeholder: false },
        { prenom: "Jason", role: "Cuisinier, 22 ans, promotion 2025", citation: "Je n’avais jamais travaillé avant. Aux Beaux Mets, j’ai appris à cuisiner, à dresser une assiette, à me tenir en cuisine. Aujourd’hui, j’ai ma première fiche de paie. Ça me donne de la fierté.", placeholder: false },
        { prenom: "Chef Davin", role: "Chef, Intercontinental Marseille", photo: "images/pros/davin-portrait.jpg", objPos: "center 20%", citation: "Sami s’est très vite intégré à l’équipe. Il a été très bien formé aux Beaux Mets et avait également l’attitude qui correspondait à une cuisine.", placeholder: false },
      ],
      presseFilter: ["Les Beaux Mets", "Beaux Mets", "Baumettes"],
      // --- Champs page projet dédiée (sourcés du dossier de présentation LBM, janv. 2026) ---
      parcours: [
        { tab: "La brigade", title: "Un service ouvert au public",
          text: "Des personnes détenues forment la brigade, encadrées par un chef, un second et un maître d’hôtel. Elles cuisinent et servent la carte du restaurant devant des convives.",
          stat: "16", statL: "commis en poste, répartis en 2 brigades" },
        { tab: "L’accompagnement", title: "Un suivi jusqu’à six mois après la sortie",
          text: "Chaque commis est suivi individuellement, du recrutement jusqu’à six mois après la sortie de détention : entretiens, stages, ateliers collectifs, projet professionnel.",
          stat: "6 mois", statL: "de suivi après la détention" },
        { tab: "La sortie", title: "Sortir de prison avec un métier",
          text: "Le but : sortir de détention avec un métier en main et un emploi, dans un secteur qui recrute.",
          stat: "40", statL: "personnes par an : l’objectif" },
        { tab: "Hors les murs", title: "Le restaurant sort de la prison",
          text: "Les commis montrent leur travail à l’extérieur, lors d’événements et de stages. Des rencontres pour l’emploi réunissent aussi des entreprises en détention.",
          stat: "16", statL: "stages à l’extérieur en 2025" },
        { tab: "Les masterclass", title: "Des chefs devant la brigade",
          text: "Des chefs invités viennent animer des masterclass en cuisine avec la brigade.",
          stat: "6", statL: "masterclass de chefs en 2025" },
      ],
      video: {
        poster: "images/beauxmets-images/lbm-masterclass-brigade-plating.jpg",
      },
    },
    {
      id: "la-table-de-cana",
      icon: "chef-hat",
      eyebrow: "Depuis 1992",
      title: "La Table de Cana",
      accent: "Marseille",
      shortTitle: "La Table de Cana Marseille",
      tagline: "Traiteur et restauration collective en insertion, depuis 1992",
      subtitle: "Traiteur et restauration collective en insertion à Marseille",
      short: "La Table de Cana Marseille est un traiteur et une cuisine collective. Ses salariés en insertion y apprennent un métier en travaillant. En 2025 : 45 salariés en insertion et 89 % de sorties positives.",
      stats: [
        { value: "45",      label: "salariés en insertion en 2025" },
        { value: "89 %",    label: "de sorties positives en 2025" },
        { value: "400 000", unit: "+", label: "convives servis" },
        { value: "15 000", unit: "+", label: "repas d’aide alimentaire en 2025" },
      ],
      description: "La Table de Cana Marseille est le premier projet de Festin. Elle naît en 1992. Ce traiteur et cette cuisine collective forment des salariés en insertion à un métier, dans les conditions réelles d’une entreprise de restauration. En 2025, elle obtient le label LUCIE Progress (848 sur 1 000) et renouvelle le label Empl’itude. Elle organise la deuxième édition du Club des Talents, qui réunit ses anciens salariés en insertion. Elle lance le collectif EPICES, un espace de coopération entre acteurs de l’insertion par la cuisine. Elle sert aussi plus de 15 000 repas d’aide alimentaire à des personnes hébergées en hôtel d’urgence à Marseille.",
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
      presentationTitle: "Traiteur et restauration collective en insertion, depuis 1992",
      mediaType: "youtube",
      mediaId: "RUpAD7u0Khs",
      projetPhrase: "Le premier projet de Festin, depuis 1992. Un traiteur marseillais où des salariés en insertion apprennent la cuisine en travaillant.",
      projetPoints: [
        "Traiteur professionnel et restauration collective avec des salariés en insertion",
        "Un suivi individuel pour chaque salarié en insertion : formation, coaching emploi, mise en relation avec des employeurs",
        "Labels LUCIE Progress (848 sur 1 000) et Empl’itude",
      ],
      projetCtaLabel: "Faire appel à notre traiteur",
      projetCtaHref: "https://www.latabledecana-marseille.com",
      implicationTitle: "Un repas pour votre événement",
      implicationText: "La Table de Cana Marseille cuisine pour vos événements et vos repas d’entreprise. Chaque commande fait travailler et former des salariés en insertion.",
      implicationCtaLabel: "Demander un devis traiteur",
      implicationCtaHref: "#/contact/devis-traiteur",
      temoignages: [
        { prenom: "Oumar", role: "Ancien salarié en insertion", photo: "images/latable de cana/temoignage-oumar.jpg", objPos: "center 40%", citation: "J’ai passé deux ans à La Table de Cana. Ça m’a vraiment aidé à savoir m’organiser et à avoir confiance en mes compétences. Aujourd’hui, j’ai un CDI chez Compass à la Tour CMA-CGM.", placeholder: false },
        { prenom: "Jean Claude", role: "Ancien commis de cuisine, La Table de Cana Marseille", citation: "J’ai pu prendre confiance en moi grâce aux différentes tâches.", placeholder: false },
        { prenom: "Pierre", role: "RRH insertion, La Table de Cana Marseille", photo: "images/equipe/tdc/pierre.jpg", objPos: "center 25%", citation: "Chaque sortie positive, c’est une victoire pour la personne et pour toute l’équipe. Ça montre que notre accompagnement fonctionne !", placeholder: false },
      ],
      presseFilter: ["La Table de Cana", "Table de Cana"],
      // --- Champs page projet dédiée (source : latabledecana-marseille.com/insertion-professionnelle) ---
      parcours: [
        { tab: "Se former", title: "Un métier appris en travaillant",
          text: "La Table de Cana Marseille embauche et forme des salariés en insertion. Ils apprennent un métier en cuisine, et un suivi social les aide à retrouver une situation stable.",
          stat: "40+", statL: "personnes formées chaque année" },
        { tab: "Trouver un emploi", title: "Un emploi chez un partenaire",
          text: "Une fois formés, les salariés sont orientés vers des entreprises partenaires de la restauration.",
          stat: "89 %", statL: "de sorties positives en 2025" },
        { tab: "Le Club des Talents", title: "Les anciens parrainent les nouveaux",
          text: "Le Club des Talents réunit anciens et actuels salariés. Les anciens parrainent les nouveaux arrivants et les mettent en relation avec les entreprises partenaires.",
          stat: "2ᵉ", statL: "édition organisée en 2025" },
        { tab: "Solidarité alimentaire", title: "Des repas pour l’hébergement d’urgence",
          text: "Plus de 15 000 repas d’aide alimentaire pour des personnes hébergées en hôtel d’urgence à Marseille.",
          stat: "15 000+", statL: "repas d’aide alimentaire" },
        { tab: "Préparer l’emploi", title: "Des outils pour préparer l’emploi",
          text: "Des vidéos pédagogiques et un accompagnement régulier pour préparer la recherche d’emploi.",
          stat: "45", statL: "salariés en insertion en 2025" },
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
      short: "Le programme Restaure, piloté par Festin, sensibilise et forme les professionnels de la restauration pour améliorer les conditions de travail et réduire l'impact écologique du secteur. Son manifeste compte 700 signataires.",
      stats: [
        { value: "35",  label: "structures engagées" },
        { value: "700", label: "signataires du manifeste" },
        { value: "2 M", unit: "+", label: "de vues des vidéos de prévention en 2025" },
        { value: "5",   label: "groupes de travail" },
      ],
      description: "Restaure est un programme national né en 2024 et piloté par Festin. Il vise à transformer durablement les pratiques de la restauration, en améliorant à la fois les conditions humaines et l'impact écologique, par la sensibilisation et la formation des professionnels.",
      ctaLabel: "Visiter mouvement-restaure.com",
      ctaUrl: "https://www.mouvement-restaure.com",
      quote: {
        text: "Pour réussir à vraiment changer les choses, je suis persuadé qu’il faut avancer collectivement.",
        author: "Éloi Spinnler",
        role: "chef, membre du programme Restaure",
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
      projetPhrase: "35 structures de la restauration travaillent ensemble contre les violences en cuisine et pour des équipes mieux managées.",
      projetPoints: [
        "Un manifeste pour une restauration juste et durable, signé par 700 professionnels et structures",
        "Tables rondes et groupes de travail thématiques organisés à Marseille, Toulouse, Lille et au-delà",
        "Deux formations pour les professionnels : Management juste et inclusif, Prévention des violences sexistes et sexuelles",
      ],
      projetCtaLabel: "Signer le manifeste",
      projetCtaHref: "https://www.mouvement-restaure.com",
      implicationTitle: "Rejoindre Restaure",
      implicationText: "Restaurateurs, chefs, responsables RH : signez le manifeste, rejoignez un groupe de travail ou venez à un Toast. 35 structures sont déjà membres.",
      implicationCtaLabel: "Nous rejoindre",
      implicationCtaHref: "#/contact",
      temoignages: [
        { prenom: "Éloi Spinnler", role: "Chef, membre du programme Restaure", citation: "Pour réussir à vraiment changer les choses, je suis persuadé qu’il faut avancer collectivement.", photo: "images/restaure : formation pro/eloi-spinnler.jpg", objPos: "center 30%", placeholder: false },
      ],
      presseFilter: ["Restaure", "Mouvement Restaure"],
      // --- Repositionnement stratégique Restaure (2026) : mission + 3 axes de transformation ---
      mission: "Le but : des cuisines, des salles et des établissements où l’on travaille en sécurité et avec respect et des restaurants qui réduisent leur impact écologique. Le programme y travaille en sensibilisant et en formant les professionnels.",
      transformation: [
        { title: "Ouvrir les cuisines à toutes et à tous",
          text: "Faire une place aux femmes, aux personnes réfugiées et aux personnes en insertion, à tous les postes de la cuisine et de la salle.",
          indicateurs: [
            "Accès aux postes pour les femmes, les personnes réfugiées et les personnes en insertion",
            "Un accueil des nouveaux salariés pensé pour chacun",
            "Des pratiques RH adaptées à toutes et à tous",
          ] },
        { title: "Des équipes qui ont envie de rester",
          text: "Faire de la restauration un lieu de travail sûr, où l’on progresse et que l’on ne quitte pas au bout de quelques mois.",
          indicateurs: [
            "Objectif : 70 % de satisfaction des équipes dans les restaurants signataires du manifeste",
            "Objectif : un turnover divisé par deux",
            "Des managers formés, une prévention des violences sexistes et sexuelles appliquée",
          ] },
        { title: "Réduire l’impact écologique des restaurants",
          subtitle: "Avec la Communauté Ecotable",
          text: "Aider les restaurants à acheter local, à moins jeter et à consommer moins d’énergie.",
          indicateurs: [
            "Objectif : 70 % des aliments achetés localement et durablement dans les restaurants signataires",
            "Moins de déchets, moins d’énergie consommée",
            "Des progrès vérifiés par un audit",
          ] },
      ],
      groupes: [
        { title: "Actions transformatrices", pilote: "La Communauté Ecotable" },
        { title: "Événements fédérateurs", pilote: "Yes We Camp" },
        { title: "Contre les violences en cuisine", pilote: "La Source et Éloi Spinnler" },
        { title: "Plaidoyer", pilote: "La Communauté Ecotable, Les Bouillonantes" },
        { title: "Formations", pilote: "Des Étoiles et des Femmes, Refugee Food" },
      ],
      gouvernance: ["Festin"], // seul pilote depuis le repositionnement stratégique (07/10/2026)
      toast: "Les Toast : des apéros entre restaurateurs, organisés par Restaure avec La Communauté Ecotable. Chacun y raconte ce qu’il a changé dans son établissement et ce qui a marché.",
      perspectives: [
        "Donner un lieu au programme : le futur lieu Sadi Carnot",
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
      short: "Tournesol prépare en cinq mois des personnes réfugiées ou primo-arrivantes au titre à finalité professionnelle de commis de cuisine et au DCL, un diplôme de français. La formation est gratuite. Un an après la formation, 86 % de la promotion marseillaise est en insertion.",
      stats: [
        { value: "5",     label: "mois de formation" },
        { value: "600",   label: "heures de formation, stage compris" },
        { value: "86 %",  label: "d’insertion un an après la formation, promotion [À COMPLÉTER : année]" },
        { value: "2",     label: "diplômes préparés : titre de commis de cuisine et DCL" },
      ],
      description: "Refugee Food a créé la formation Tournesol. Festin la porte depuis 2025, avec Estello Formation. Elle s’adresse aux personnes réfugiées ou primo-arrivantes autorisées à travailler en France. En cinq mois, elle prépare au titre à finalité professionnelle de commis de cuisine et au diplôme de compétence en langue (DCL). Les cours ont lieu à Marseille, avec un organisme partenaire pour la formation technique en cuisine. La formation est gratuite et France Travail rémunère les stagiaires. Chaque personne a un suivi individuel jusqu’à l’emploi. Un an après la formation, 86 % de la promotion marseillaise est en insertion.",
      ctaLabel: "En savoir plus sur refugee-food.org",
      ctaUrl: "https://refugee-food.org",
      quote: null,
      logo: "images/logo%20projets/logo-%20tournesol.png",
      siteUrl: "https://refugee-food.org",
      siteName: "refugee-food.org",
      heroImages: [
        "images/tournesol%3Aformation/tournesol-cuisine.jpg",
        "images/tournesol%3Aformation/Formation-Tournesol_RefugeeFood_%C2%A9Aglae-Bory-67.jpg",
        "images/photo-tabliers-violets.jpg",
        "images/photo-promo-groupe.jpg",
      ],
      presentationTitle: "Un parcours diplômant pour les personnes réfugiées et primo-arrivantes",
      mediaType: "carousel",
      carouselImages: [
        "images/tournesol%3Aformation/tournesol-cuisine.jpg",
        "images/tournesol%3Aformation/Formation-Tournesol_RefugeeFood_%C2%A9Aglae-Bory-67.jpg",
        "images/photo-tabliers-violets.jpg",
      ],
      projetPhrase: "Cinq mois pour apprendre le métier de commis de cuisine et le français, avec deux diplômes à la clé.",
      projetPoints: [
        "Une formation gratuite de 5 mois : titre à finalité professionnelle de commis de cuisine et DCL",
        "Destinée aux personnes réfugiées ou primo-arrivantes autorisées à travailler",
        "Un suivi individuel, de l’entrée en formation jusqu’à l’emploi",
      ],
      projetCtaLabel: "En savoir plus sur Refugee Food",
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
          text: "La langue est souvent le premier obstacle à l’embauche. Les cours portent sur le vocabulaire et les situations d’une cuisine." },
        { tab: "La formation technique", title: "Formation technique en cuisine",
          text: "Un organisme partenaire assure la formation technique : les gestes et l’organisation du métier de commis de cuisine." },
        { tab: "Le stage en entreprise", title: "Une mise en pratique en entreprise",
          text: "Un stage en restaurant pendant la formation. France Travail rémunère les stagiaires tout au long du parcours, stage compris." },
        { tab: "Le diplôme", title: "Examens et remise des diplômes",
          text: "Le parcours se termine par les examens du titre à finalité professionnelle et du DCL, puis par la remise des diplômes. Le suivi individuel continue jusqu’à l’emploi." },
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
          { value: "155 h", label: "de stage en restaurant" },
          { value: "86 %", label: "d’insertion globale un an après la formation, promotion [À COMPLÉTER : année]" },
        ],
      },
      partenaires: ["AFC Groupe", "Compass Group", "France Travail", "AKTO", "Ville de Marseille", "Préfecture des Bouches-du-Rhône", "Fondation RAJA-Danièle Marcovici"],
    },
  ],
  formations: [
    {
      id: "vss",
      dureeCourte: "3 h ou 1 jour",
      cat: "Professionnels",
      porteur: "Portée par le programme Restaure",
      audienceKey: "pros",
      title: "Prévention des violences sexistes et sexuelles en restauration",
      titreCourt: ["Prévention des violences", "en restauration"], // en-tête (07/10/2026) : titre complet repris en tête de fiche
      desc: "Reconnaître les violences sexistes et sexuelles en cuisine et en salle, les prévenir et savoir réagir à un signalement.",
      img: "images/photo-micro-temoignage.jpg", // photo demandée le 07/10/2026 (moins de photos des Beaux Mets)
      duration: "Inter (3 h) ou Intra (3 h ou 1 jour / 7 h)",
      format: "Présentiel, inter-restaurants ou intra-entreprise",
      price: "Inter 180 € HT/pers · Intra 800 € (3 h) ou 1 500 € (1 jour)",
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
      tariff: "Inter-restaurants (3 h) : 180 € HT / personne. Intra-entreprise : 800 € HT pour 3 h, ou 1 500 € HT pour 1 journée (7 h, jusqu'à 12 personnes).",
    },
    {
      id: "management",
      dureeCourte: "1 jour et 2 demi-journées",
      cat: "Professionnels",
      porteur: "Portée par le programme Restaure",
      audienceKey: "pros",
      title: "Management juste & inclusif",
      desc: "Recruter plus largement, garder son équipe et l'encadrer sans violence, avec un cadre de travail clair.",
      img: "images/beauxmets-images/lbm-maitre-hotel-commis.jpg", // proposition A validée le 07/10/2026
      duration: "1 journée (7 h) + 2 demi-journées (2 × 3 h)",
      format: "Présentiel, avec en option 3 h sur les violences sexistes et sexuelles",
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
      tariff: "600 € HT pour 1 salarié sur les 2 jours · 3 000 € HT pour une organisation (le groupe complet). Option : module complémentaire de 3 h dédiées à la prévention des violences sexistes et sexuelles..",
    },
    // Une seule fiche pour le dispositif (RETOURS-AUDIT, question 5) : on parle de
    // formation diplômante ; les diplômes ne sont nommés que dans le détail.
    {
      id: "des-etoiles-et-des-femmes",
      dureeCourte: "4 à 11 mois",
      ou: "13 villes en France",
      cat: "Insertion",
      audienceKey: "insertion",
      title: "Des Étoiles et des Femmes, formation diplômante",
      // fiche : titre sans « formation diplômante » (déjà au-dessus), pastilles des diplômes (retours V2 §9)
      titreFiche: "Des Étoiles et des Femmes",
      pastilles: ["CAP", "TFP"],
      desc: "Une formation diplômante en cuisine, de 4 à 11 mois selon le diplôme préparé, gratuite, pour des femmes.",
      img: "images/photo-tabliers-violets.jpg",
      duration: "4 à 11 mois selon le diplôme, dont 155 à 490 h de stage",
      format: "Présentiel, avec un centre de formation partenaire dans chaque ville",
      price: "Gratuit",
      publicLabel: "Femmes en recherche d’emploi, 18 ans ou plus, niveau de français B1 ou B2 selon le diplôme",
      objectives: [
        "Obtenir un diplôme de cuisine : le titre à finalité professionnelle de commis de cuisine, en 4 mois, ou le CAP cuisine, diplôme de l'Éducation nationale, en 11 mois",
        "Acquérir une expérience en restaurant partenaire : 155 à 490 h de stage",
        "Construire un projet professionnel viable et choisi",
        "Bénéficier d'un accompagnement social pendant tout le parcours",
      ],
      programme: [
        "Bases techniques de la cuisine : taillage, cuissons, sauces",
        "Remise à niveau et compétences transverses",
        "Stages en restaurant partenaire",
        "Coaching emploi, préparation aux entretiens et suivi après la formation",
      ],
      tariff: "Formation gratuite, prise en charge par France Travail et nos partenaires publics. Indemnisation pendant le parcours selon votre situation.",
    },
    {
      id: "tournesol",
      ou: "Marseille",
      cat: "Insertion",
      audienceKey: "insertion",
      title: "Tournesol",
      dureeCourte: "5 mois",
      projet: "tournesol",
      desc: "Cinq mois pour une formation diplômante en cuisine et un diplôme de français, pour des personnes réfugiées ou primo-arrivantes.",
      img: "images/tournesol:formation/tournesol-cuisine.jpg",
      duration: "5 mois, 600 h (252 h de cuisine, 155 h de stage, 154 h de français, 39 h de compétences transverses)",
      format: "Corot Formations (13014)",
      price: "Gratuit",
      publicLabel: "Personnes réfugiées ou primo-arrivantes, majeures, niveau A2 minimum",
      objectives: [
        "Obtenir le titre à finalité professionnelle de commis de cuisine et le DCL, diplôme de compétence en langue",
        "Acquérir les bases du métier de commis de cuisine (252 h)",
        "Progresser en français : 154 h de français langue étrangère",
        "Découvrir la diversité des métiers de la restauration en stage (155 h)",
        "Construire un projet d'insertion durable",
      ],
      programme: [
        "Cuisine : techniques, hygiène, organisation (252 h)",
        "Français langue étrangère (154 h)",
        "Stage en restaurant partenaire : 155 h",
        "Compétences transverses et accompagnement social (39 h)",
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
      role: "Cuisinier, Les Beaux Mets, 2025",
      tone: "light",
    },
    {
      quote: "J'ai passé deux ans à La Table de Cana. Ça m'a vraiment aidé à savoir m'organiser et à avoir confiance en mes compétences. Aujourd'hui, j'ai un CDI chez Compass à la Tour CMA-CGM. Je suis fier du chemin parcouru !",
      author: "Oumar",
      role: "Ancien salarié en insertion, La Table de Cana Marseille",
      tone: "dark",
    },
    {
      quote: "Pour réussir à vraiment changer les choses, je suis persuadé qu'il faut avancer collectivement.",
      author: "Éloi Spinnler",
      role: "Chef, membre du programme Restaure",
      tone: "dark",
    },
  ],
  // Temps forts — carrousel grand format de la page Actualités (textes factuels,
  // à reprendre par le chantier copywriting). img null → cadre « photo à venir ».
  tempsForts: [
    { date: "Juin 2026", lieu: "Lille, Lyon et Marseille", title: "Refugee Food", accent: "Festival 2026",
      text: "Des cuisinières et des cuisiniers réfugiés en cuisine avec les brigades de restaurants partenaires, à Lille, à Lyon et à Marseille.",
      img: "images/refugee-food-festival/rff-lyon-3.jpg", alt: "Soirée de clôture du Refugee Food Festival 2026 à Lyon", credit: "Agathe Waechter",
      href: "#/parcours/tournesol", cta: "La formation Tournesol" },
    { date: "Novembre 2025", lieu: "M6", title: "Les Beaux Mets", accent: "à la télévision",
      text: "« Un jour un doc » consacre 45 minutes au restaurant des Baumettes et à sa brigade.",
      img: "images/beauxmets-images/LBM_cdutrey_071122-7922.jpg", alt: "Une cliente sonne à l'entrée du restaurant Les Beaux Mets", credit: "Caroline Dutrey",
      href: "#/projets/les-beaux-mets", cta: "Les Beaux Mets" },
    { date: "3 octobre 2025", lieu: "Vieux-Port, Marseille", title: "Le Grand", accent: "Festin",
      text: "Les dix ans du dispositif Des Étoiles et des Femmes : 14 brigades, plus de 600 convives, plus de 100 bénévoles.",
      img: "images/images-def/grand-festin-2025-brigades.jpg", alt: "Les brigades du Grand Festin 2025 réunies sur les marches, près du Vieux-Port",
      href: "#/projets/des-etoiles-et-des-femmes", cta: "Des Étoiles et des Femmes" },
    { date: "2025", lieu: "Les Baumettes, Marseille", title: "Six masterclass", accent: "aux Beaux Mets",
      text: "Laëtitia Visse, Éloi Spinnler, Elsa Leblanc, Chloé Charles, Justine Audoin et Hyacinthe Lescoët devant la brigade.",
      img: "images/beauxmets-images/Copie de LBM_masterclass_chloeCharles_cdutrey_030325-7735.jpg", alt: "Masterclass de la cheffe Chloé Charles aux Beaux Mets", credit: "Caroline Dutrey",
      href: "#/projets/les-beaux-mets", cta: "Les Beaux Mets" },
    { date: "2025", lieu: "Marseille", title: "La Table de Cana Marseille", accent: "labellisée",
      text: "Label LUCIE Progress avec 848 points sur 1 000 et label Empl'itude renouvelé.",
      img: "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5158.jpg", alt: "Un salarié de La Table de Cana Marseille sert des bouchées lors d'un événement", credit: "Caroline Dutrey",
      href: "#/projets/la-table-de-cana", cta: "La Table de Cana Marseille" },
    { date: "2025", lieu: "Marseille", title: "Tournesol,", accent: "portée par Festin",
      text: "Cinq mois de formation au métier de commis, gratuits, avec Refugee Food et Estello Formation.",
      img: "images/tournesol:formation/tournesol-promotion.jpg", alt: "Une promotion Tournesol en tenue, dans la cuisine de formation",
      href: "#/parcours/tournesol", cta: "La formation Tournesol" },
    { date: "2025", lieu: "Marseille, Toulouse, Lille", title: "Les rencontres", accent: "de Restaure",
      text: "Cinq tables rondes enregistrées en podcast et les Toast, où des restaurateurs racontent ce qu'ils ont changé dans leur cuisine.",
      img: "images/restaure : formation pro/FESTIN_TOAST_12 FEVRIER_FEED-25.jpg", alt: "Un Toast du programme Restaure : une salle écoute des restaurateurs sur scène",
      href: "#/projets/restaure", cta: "Le programme Restaure" },
    { date: "13 octobre 2024", lieu: "Arles", title: "Le premier", accent: "Grand Festin",
      text: "La première édition, organisée par l'association Petit à Petit avec Festin, a réuni 450 personnes.",
      img: "images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg", alt: "Grandes tablées du premier Grand Festin, à Arles",
      href: "#/projets/des-etoiles-et-des-femmes", cta: "Des Étoiles et des Femmes" },
    { date: "2024", lieu: "Marseille", title: "Le lancement", accent: "de Restaure",
      text: "Quatre structures au pilotage, 35 structures engagées contre les violences en cuisine.",
      img: "images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg", alt: "Soirée de lancement du programme Restaure", credit: "Caroline Dutrey",
      href: "#/projets/restaure", cta: "Le programme Restaure" },
  ],

  presse: [
    // ── Les Beaux Mets ────────────────────────────────────────────────
    { dispositif:"Les Beaux Mets", source:"Impact Story", title:"On donne des couteaux aux détenues pour leur offrir une 2nde chance", type:"Reportage", date:"2026-05-13", href:"https://www.instagram.com/reel/DYSYQ77sfO1/" },
    { dispositif:"Les Beaux Mets", source:"Courrier International", title:"Les Beaux Mets à Marseille, restaurant de réinsertion", type:"Article", date:"2026-04-02", href:"https://www.courrierinternational.com/long-format/vu-d-espagne-au-restaurant-des-beaux-mets-a-marseille-des-detenus-mitonnent-leur-reinsertion_239702" },
    { dispositif:"Les Beaux Mets", source:"France 3 PACA", title:"En prison à Marseille, un restaurant bistronomique où l'on est servis par des détenus", type:"Reportage TV", date:"2026-03-25", href:"https://www.youtube.com/watch?v=6qyo6RXsqjI" },
    { dispositif:"Les Beaux Mets", source:"El País", title:"La prison la plus célèbre de Marseille ouvre ses portes à un restaurant unique en son genre", type:"Article", date:"2026-01-11", href:"https://elpais.com/eps/2026-01-09/la-carcel-mas-famosa-de-marsella-abre-sus-puertas-a-un-restaurante-unico.html" },
    { dispositif:"Les Beaux Mets", source:"M6 : Un jour, un doc", title:"Un restaurant dans une prison", type:"Reportage TV", date:"2025-11-10", href:"https://www.m6.fr/un-jour-un-doc-p_22196/un-restaurant-dans-une-prison-c_13151161" },
    { dispositif:"Les Beaux Mets", source:"Les Échos Weekend", title:"Les détenus s'en sortent par la cuisine", type:"Article", date:"2025-11-07", href:"https://www.lesechos.fr/weekend/business-story/les-clients-sont-sympas-ils-font-des-bons-retours-dans-la-prison-des-baumettes-les-detenus-sen-sortent-par-la-cuisine-2196595" },
    { dispositif:"Les Beaux Mets", source:"Revue du barreau", title:"Les Beaux Mets : pages 62-63 de la revue du Barreau", type:"Article Print", date:"2025-12-01", href:"https://drive.google.com/file/d/1jPCV9VGW6BKNubRWoh_FGg4hIs-Is7_u/view" },
    { dispositif:"Les Beaux Mets", source:"Le Monde", title:"Armand Hurault, directeur de Festin : « La restauration m'est apparue comme l'un des rares secteurs où l'origine étrangère peut être une valeur ajoutée »", type:"Article", date:"2025-02-14", href:"https://www.lemonde.fr/m-styles/article/2025/02/14/armand-hurault-directeur-de-festin-la-restauration-m-est-apparue-comme-l-un-des-rares-secteurs-d-activite-ou-l-origine-etrangere-peut-etre-une-valeur-ajoutee_6546308_4497319.html" },
    { dispositif:"Les Beaux Mets", source:"Le Figaro", title:"15 Marseillais de moins de 40 ans qui vont changer la ville", type:"Article", date:"2025-01-14", href:"https://www.lefigaro.fr/marseille/ils-ont-moins-de-40-ans-et-vont-changer-la-ville-decouvrez-notre-palmares-des-15-marseillais-les-plus-prometteurs-20250114" },
    { dispositif:"Les Beaux Mets", source:"France Inter : On va déguster", title:"Après la prison, la cuisine", type:"Sujet Radio", date:"2025-03-02", href:"https://www.radiofrance.fr/franceinter/podcasts/on-va-deguster/on-va-deguster-du-dimanche-02-mars-2025-7190244" },
    { dispositif:"Les Beaux Mets", source:"Zig Zag Paris", title:"À Marseille, ce restaurant insolite aux conditions d'accès sécurisées est le premier en France à se trouver dans une prison", type:"Article", date:"2025-02-20", href:"https://www.pariszigzag.fr/marseille/restaurant-prison-baumettes" },
    { dispositif:"Les Beaux Mets", source:"Made in Marseille", title:"Le restaurant en prison Les Beaux Mets décroche un macaron Écotable", type:"Article", date:"2024-09-20", href:"https://madeinmarseille.net/167722-le-restaurant-en-prison-les-beaux-mets-decroche-un-macaron-ecotable/" },
    { dispositif:"Les Beaux Mets", source:"France TV Info", title:"« Ça nous rapproche de la sortie, de la vie normale » : le restaurant des Baumettes rencontre un franc succès", type:"Article", date:"2024-03-12", href:"https://www.francetvinfo.fr/societe/prisons/reportage-ca-nous-rapproche-de-la-sortie-de-la-vie-normale-a-marseille-le-restaurant-de-la-prison-des-beaumettes-rencontre-un-franc-succes-depuis-un-an_6417697.html" },
    { dispositif:"Les Beaux Mets", source:"Le Monde : M le Mag", title:"À Marseille, un restaurant bistronomique derrière les barreaux", type:"Article", date:"2022-11-15", href:"https://www.lemonde.fr/m-le-mag/article/2022/11/15/a-marseille-un-restaurant-bistronomique-derriere-les-barreaux_6149880_4500055.html" },
    { dispositif:"Les Beaux Mets", source:"Libération", title:"Dans la prison des Baumettes, un restaurant met la réinsertion à la carte", type:"Article", date:"2022-11-12", href:"https://www.liberation.fr/lifestyle/gastronomie/dans-la-prison-des-baumettes-un-restaurant-met-la-reinsertion-a-la-carte-20221112_FBYPQVSQH5E5TFUJ7GMTINAEVY/" },
    { dispositif:"Les Beaux Mets", source:"Télérama", title:"Cuisine et réinsertion : j'ai déjeuné à la prison des Baumettes", type:"Article", date:"2022-12-04", href:"https://www.telerama.fr/sortir/cuisine-et-reinsertion-j-ai-dejeune-a-la-prison-des-baumettes-7013292.php" },

    // ── Des Étoiles et des Femmes ──────────────────────────────────────
    { dispositif:"Des Étoiles et des Femmes", source:"Nice Matin", title:"Une seconde chance derrière les fourneaux", type:"Article", date:"2026-03-08", href:"https://www.nicematin.com/loisirs/gastronomie/c-est-une-belle-experience-a-cannes-des-femmes-en-insertion-professionnelle-en-masterclass-de-cuisine-au-martinez-10671453" },
    { dispositif:"Des Étoiles et des Femmes", source:"La Provence", title:"« Un échange gagnant-gagnant » : à Arles, 10 femmes éloignées de l'emploi obtiennent leur CAP cuisine", type:"Article", date:"2025-12-02", href:"https://www.laprovence.com/article/societe/32963667342845/un-echange-gagnant-gagnant-a-arles-10-femmes-eloignees-de-lemploi-obtiennent-leur-cap-cuisine" },
    { dispositif:"Des Étoiles et des Femmes", source:"Arles Info", title:"Des étoiles et des femmes : la recette de la réussite", type:"Article", date:"2025-12-02", href:"https://arles.fr/actualites/des-etoiles-et-des-femmes-la-recette-de-la-reussite/" },
    { dispositif:"Des Étoiles et des Femmes", source:"Podcast Des Étoiles et des Femmes", title:"Podcast Île-de-France", type:"Podcast", date:"2025-11-20", href:"https://podcasts.apple.com/fr/podcast/des-%C3%A9toiles-et-des-femmes/id1792208177" },
    { dispositif:"Des Étoiles et des Femmes", source:"TF1 : JT 20h", title:"Reportage insertion professionnelle par la cuisine", type:"Reportage TV", date:"2025-09-01", href:"https://www.tf1.fr/tf1/jt-20h/videos/le-jt-de-20-heures-de-tf1-du-dimanche-24-aout-2025-80434191.html" },
    { dispositif:"Des Étoiles et des Femmes", source:"France 2 : 13h15 le dimanche", title:"L'assiette française", type:"Reportage TV", date:"2024-05-13", href:"https://www.francetvinfo.fr/replay-magazine/france-2/13h15/13h15-le-dimanche-l-assiette-francaise-episode-4-partie-1_6505052.html" },
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
    { dispositif:"Restaure", source:"Carenews", title:"« La restauration est un milieu malade » : avec le mouvement Restaure, Éloi Spinnler s'attaque aux violences en cuisine", type:"Article", date:"2025-11-20", href:"https://www.carenews.com/carenews-info/news/la-restauration-est-un-milieu-malade-avec-le-mouvement-restaure-eloi-spinnler-s" },
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

// Espace presse : « Festin en quelques mots » (demande du 06/10/2026), repris des textes
// validés (RETOURS-V3 §2) et des chiffres sourcés du rapport 2025
window.FESTIN_DATA.presseResume = "Festin utilise le levier de la cuisine comme outil d'insertion sociale et professionnelle. Né à Marseille en 1987, ce groupe associatif à but non lucratif imagine, teste, déploie et essaime des projets qui mobilisent le meilleur de la gastronomie française au service de l'égalité des chances : Des Étoiles et des Femmes, Les Beaux Mets, La Table de Cana Marseille, le programme Restaure et l'Académie Festin. En 2025, Festin a accompagné 441 personnes dans 14 territoires.";

window.FESTIN_DATA.donation = "https://www.helloasso.com/associations/association-festin/formulaires/3";

window.FESTIN_DATA.meganav = {
  title: "Explorez Festin",
  links: [
    { label: "Qui sommes-nous", href: "#/about" },
    { label: "Notre impact", href: "#/impact" },
    { label: "Actualités", href: "#/actualites" },
    { label: "Formations", href: "#/academie" },
    { label: "Nous contacter", href: "#/contact" }
  ],
  views: [
    {
      key: "theme", label: "Par thématique", icon: "sparkles",
      cards: [
        { t:"Nos tables",  ic:"utensils",       c:"#1D6B78", d:"Un restaurant en prison et un traiteur d'insertion, où l'on peut réserver ou commander.", tags:["Les Beaux Mets","La Table de Cana Marseille","Traiteur"], href:"#/projets/les-beaux-mets" },
        { t:"Formations",  ic:"graduation-cap", c:"#E8A825", d:"L'Académie Festin : des parcours diplômants et des formations courtes pour les équipes de restaurants.", tags:["Des Étoiles et des Femmes","Tournesol","Formations pros"], href:"#/academie" },
        { t:"Emploi",      ic:"briefcase",      c:"#E4572E", d:"Un suivi individuel jusqu'à l'emploi et le réseau d'anciens du Club des Talents.", tags:["Parcours insertion","Club des Talents"], href:"#/insertion" },
        { t:"Le secteur",  ic:"megaphone",      c:"#9A5BA8", d:"Le programme Restaure, contre les violences en cuisine et pour un management juste.", tags:["Manifeste","Plaidoyer"], href:"#/projets/restaure" }
      ]
    },
    {
      key: "lieu", label: "Par lieu", icon: "map-pin",
      cards: [
        { t:"Les Beaux Mets",    ic:"utensils",       c:"#1D6B78", d:"Le restaurant des Baumettes à Marseille, ouvert au public.", tags:["Marseille","Restaurant"], href:"#/projets/les-beaux-mets" },
        { t:"La Table de Cana Marseille",  ic:"chef-hat",       c:"#E8A825", d:"Traiteur événementiel et restauration collective, à Mourepiane.", tags:["Mourepiane","Traiteur"], href:"#/projets/la-table-de-cana" },
                { t:"L'Académie Festin", ic:"graduation-cap", c:"#E4572E", d:"Portée par Estello Formation, organisme de formation certifié Qualiopi.", tags:["Marseille","Qualiopi"], href:"#/academie" }
      ]
    },
    {
      key: "projet", label: "Par projet", icon: "layout-grid",
      cards: [
        { t:"Des Étoiles et des Femmes", ic:"star",     c:"#E8A825", d:"Des femmes formées à la cuisine avec des chefs, dans 13 villes.", tags:["Depuis 2015","13 antennes"], href:"#/projets/des-etoiles-et-des-femmes" },
        { t:"Tournesol",                 ic:"sun",      c:"#E4572E", d:"Le parcours diplômant pour personnes réfugiées et primo-arrivantes.", tags:["Refugee Food","5 mois"], href:"#/parcours/tournesol" },
        { t:"Club des Talents",          ic:"users",    c:"#1D6B78", d:"Les anciens salariés de La Table de Cana Marseille parrainent les nouveaux.", tags:["Réseau","La Table de Cana Marseille"], href:"#/projets/la-table-de-cana" },
        { t:"Le programme Restaure",     ic:"megaphone",c:"#9A5BA8", d:"35 structures contre les violences en cuisine.", tags:["700 signataires","Manifeste"], href:"#/projets/restaure" }
      ]
    }
  ]
};

// ============================================================
//  HOME — copy éditoriale (portée depuis maquettes/home-b.html)
// ============================================================
// ============================================================
//  PAGE IMPACT (reconstruite le 24/09/2026)
//  Sources : rapports d'activité Festin 2022, 2023, 2024 (Drive) et 2025
//  (rapport-activite-2025_v441-83_REFERENCE) ; étude d'impact Koreis,
//  décembre 2023 (Des Étoiles et des Femmes, 3 à 5 ans après la formation).
// ============================================================
window.FESTIN_DATA.impact = {
  hero: {
    kicker: "Notre impact",
    title: "Compter", titleAccent: "ce qui compte.",
    proof: "Quatre rapports d'activité publics, de 2022 à 2025. Les chiffres ci-dessous en viennent tous.",
    img: "images/photo-applaudissements.jpg", imgAlt: "Une promotion en tenue de cuisine applaudit, dans la cuisine de formation",
  },
  // Série annuelle, tous dispositifs Festin confondus
  annees: [
    { year: "2022", personnes: 349, sorties: 126, emploi: 116, taux: 92 },
    { year: "2023", personnes: 427, sorties: 172, emploi: 142, taux: 83 },
    { year: "2024", personnes: 421, sorties: 203, emploi: 151, taux: 74 },
    { year: "2025", personnes: 441, sorties: null, emploi: null, taux: 83 },
  ],
  serieNote: "Sorties : personnes sorties dans l'année après au moins trois mois dans un programme.",
  // Durée : l'étude Koreis suit les anciennes stagiaires 3 à 5 ans après
  duree: {
    title: "Trois à cinq ans après leur formation,", titleAccent: "elles travaillent.",
    lede: "Étude Koreis, 2023 : le cabinet a retrouvé les anciennes stagiaires du dispositif Des Étoiles et des Femmes, trois à cinq ans après leur formation.",
    faits: [
      { n: "73 %", t: "sont en emploi.", d: "Contre 40 % des femmes des quartiers prioritaires, au niveau national." },
      { n: "60 %", t: "de celles qui travaillent sont en CDI.", d: "Et 71 % sont à temps complet." },
      { n: "1 sur 4", t: "est devenue cheffe ou cheffe de partie.", d: "Des postes à responsabilité, en brigade." },
    ],
    source: "Source : mesure d'impact social du dispositif Des Étoiles et des Femmes, cabinet Koreis, décembre 2023.",
  },
  projets: [
    { id: "des-etoiles-et-des-femmes", n: "1 200", t: "femmes accompagnées depuis 2015", d: "13 antennes en France. 91 % de réussite aux diplômes en 2025." },
    { id: "les-beaux-mets", n: "119", t: "personnes détenues ont travaillé en brigade depuis 2022", d: "82 % de sorties positives en 2023, à la sortie de détention." },
    { id: "la-table-de-cana", n: "84 %", t: "de sorties positives en 2024", d: "Traiteur et restauration collective en insertion, premier projet de Festin, créé en 1992." },
    { id: "restaure", n: "700", t: "signataires du manifeste", d: "35 structures engagées contre les violences en cuisine." },
  ],
  annee2025: {
    title: "2025", titleAccent: "en quatre chiffres",
    lien: { label: "Les temps forts de l'année", href: "#/actualites" },
  },
  rapports: [
    { year: "2025", url: "https://drive.google.com/file/d/1dymsU5cV00adUDLBz7zLEQYWa_t_-70z/view?usp=sharing", resume: "441 personnes accompagnées, 83 % de sorties en emploi ou en formation, 14 territoires. Les dix ans du dispositif Des Étoiles et des Femmes." },
    { year: "2024", url: "https://drive.google.com/file/d/1SxibbIWJkudH9Yd21vz9synn5vjeMwep/view?usp=sharing", resume: "421 personnes accompagnées. Délégations de service public du ministère du Travail en Île-de-France et dans les Hauts-de-France." },
    { year: "2023", url: "https://drive.google.com/file/d/14rMQDaahmxp978Woh_dP8TwWL65Cu3Bc/view?usp=sharing", resume: "427 personnes accompagnées. Première année pleine des Beaux Mets, lancement de Tournesol, étude d'impact Koreis." },
    { year: "2022", url: "https://drive.google.com/file/d/1S3p13F2abtwOqXLHTto_TPeSeRzxZfya/view?usp=sharing", resume: "349 personnes accompagnées. L'association Départ devient Festin ; Les Beaux Mets ouvre le 15 novembre." },
  ],
  prix: [
    { year: "2025", title: "Label LUCIE Progress", org: "848 sur 1 000 pour La Table de Cana Marseille" },
    { year: "2025", title: "Label Empl'itude renouvelé", org: "La Table de Cana Marseille, label obtenu en 2019" },
    { year: "2023", title: "Acteurs clés de changement", org: "Lauréat, Fondation de France" },
    { year: "2023", title: "Prix Futur(e)s Food", org: "Les Beaux Mets, catégorie expérience, Sirha" },
    { year: "2023", title: "Pépites 2023", org: "Les Beaux Mets, Fondation de France" },
    { year: "2022", title: "Fondation des Femmes", org: "Distinction pour l'accompagnement des femmes vers l'autonomie" },
    { year: "2020", title: "Plan d'investissement dans les compétences", org: "Sélection au PIC, ministère du Travail" },
    { year: "2019", title: "La France s'engage", org: "Lauréat, Des Étoiles et des Femmes" },
  ],
  prixPhoto: { src: "images/images-def/la-france-s-engage-laureats.jpg", alt: "Les lauréats de La France s'engage réunis sur scène",
    cap: "Les lauréats de La France s'engage, réunis sur scène. Des Étoiles et des Femmes a été lauréat en 2019." },
};

// Photos d'antennes disponibles dans images/antennes/ (nom de ville en minuscules,
// sans accent, tirets). Vide tant que le formulaire Drive n'a rien fourni.
window.FESTIN_DATA.antennesPhotos = [];

// Logos des structures qui portent les antennes de Des Étoiles et des Femmes (08/10/2026),
// par nom de porteur tel qu'écrit dans projets[].antennes. Un logo générique pour les Tables de Cana
// (jamais « Marseille » : ce ne sont pas des projets de Festin). Sans logo : un repère neutre.
window.FESTIN_DATA.porteursLogos = {
  "Festin": "images/logo-festin-teal-sb.png",
  "La Table de Cana": "images/antennes/logos/la-table-de-cana.png",
  "Forum Jorge François": "images/antennes/logos/forum-jorge-francois.jpg",
  "Les Jardins de la Montagne Verte": "images/antennes/logos/jardins-montagne-verte.jpg",
  "Weavers": "images/antennes/logos/weavers.png",
  "À Table Citoyens": "images/antennes/logos/a-table-citoyens.png",
  "Égalitère et Sororitère": "images/antennes/logos/egalitere.png",
  "Petit à Petit": "images/antennes/logos/petit-a-petit.png",
};

// Bloc de clôture commun à toutes les pages (Sections.jsx, FinDePage)
window.FESTIN_DATA.fin = {
  title: "Vous avez un projet ?", accent: "Parlons-en.",
  links: [
    { who: "Vous accompagnez une personne", label: "Orienter", href: "#/insertion" },
    { who: "Vous dirigez une équipe", label: "Former et recruter", href: "#/restauration" },
    { who: "Vous voulez agir avec nous", label: "Nous écrire", href: "#/contact" },
  ],
};

window.FESTIN_DATA.home = {
  // Reprise 24/09/2026 (arbitrage 2B) : une phrase en titre, la baseline en signature.
  hero: {
    title: "Former en cuisine,", titleAccent: "jusqu'à l'emploi.",
    signature: "Le goût d'avancer ensemble",
    proof: "441 personnes accompagnées en 2025. 83 % sont sorties en emploi ou en formation.",
    proofNote: "Tous dispositifs confondus. Source : rapport d'activité Festin 2025.",
    ctaPrimary: { label: "Découvrir nos formations", href: "#/insertion" },
    ctaSecondary: { label: "Vous recrutez ? Travaillons ensemble", href: "#/restauration" },
    img: "images/photo-chapeau-cuisine.jpg",
    imgAlt: "Trois personnes en brigade versent une sauce au chinois, dans une cuisine professionnelle"
  },
  // Ligne de confiance sous le hero : la solidité par les statuts et l'ancienneté
  trust: ["Association loi 1901", "D'intérêt général", "Depuis 1987", "14 territoires", "Cinq projets"],
  promesse: {
    title: "Apprendre en brigade,", titleAccent: "jusqu'au contrat.",
    text: "Une stagiaire du dispositif Des Étoiles et des Femmes passe 155 à 490 heures en restaurant, en brigade, avant son examen. Le restaurant qui l'accueille recrute une personne qu'il a vue travailler. Pendant tout le parcours, une équipe l'aide aussi pour le logement, la garde des enfants, les papiers et la recherche de poste.",
    img: "images/photo-cuisine-formation.jpg",
    imgAlt: "Des apprenties en tenue de cuisine préparent leurs légumes sur un plan de travail"
  },
  marquee: [
    "CAP Cuisine", "Titre à finalité professionnelle de commis de cuisine", "DCL, diplôme de compétence en langue",
    "Prévention des violences en cuisine", "Management juste", "Accueil de la diversité",
    "L'insertion par la cuisine depuis 1987"
  ],
  approche: {
    eyebrow: "Festin",
    titleLines: ["Trois façons", "d'agir"],
    intro: "Une stagiaire du dispositif Des Étoiles et des Femmes passe 155 à 490 heures en restaurant, en brigade, avant son examen. Les restaurants qui l'accueillent recrutent une personne qu'ils ont vue travailler. C'est notre méthode : former là où le métier se fait.",
    steps: [
      { tab: "L'insertion", kicker: "01 · Insertion", title: "Accompagner jusqu'à l'emploi",
        text: "Des femmes, des personnes réfugiées ou primo-arrivantes, des personnes détenues suivent un parcours vers un métier de cuisine, avec un suivi social de la première semaine jusqu'à l'emploi.",
        img: "images/photo-groupe-portrait.jpg", variant: "a" },
      { tab: "La formation", kicker: "02 · Formation", title: "Former en cuisine",
        text: "Nos formations diplômantes en cuisine comprennent des stages en brigade. Pour les équipes déjà en poste, le programme Restaure propose des formations courtes.",
        img: "images/photo-patisserie.jpg", variant: "b" },
      { tab: "Le secteur", kicker: "03 · Secteur", title: "Changer les cuisines",
        text: "Le programme Restaure, piloté par Festin, sensibilise et forme les professionnels pour améliorer les conditions de travail et réduire l'impact écologique du secteur. Son manifeste compte 700 signataires.",
        img: "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg", variant: "c" }
    ]
  },
  logoband: { eyebrow: "Cinq projets, tous rattachés à Festin" },
  dual: {
    titleLines: ["Par où", "commencer"],   // 2e = accent
    soutien: { text: "Vous voulez financer une promotion ?", don: "Faire un don", mecenat: "Devenir mécène" },
    cards: [
      { tag: "Vous cherchez un métier", kicker: "Parcours d'insertion",
        title: "Apprendre un métier de cuisine, gratuitement",
        pts: [
          "Une formation diplômante en cuisine",
          "Des stages en restaurant et un suivi jusqu'à l'emploi : logement, garde d'enfants, recherche de poste.",
          "Des parcours pour les femmes (Des Étoiles et des Femmes) et pour les personnes réfugiées ou primo-arrivantes (Tournesol)."
        ],
        cta: "Voir les parcours", href: "#/insertion",
        img: "images/photo-tabliers-violets.jpg" },
      { tag: "Vous dirigez un établissement", kicker: "Professionnels de la restauration",
        title: "Recruter, former et garder vos équipes",
        pts: [
          "Des formations courtes : violences en cuisine, management juste, accueil de la diversité.",
          "Des stagiaires en parcours d'insertion, dans votre brigade.",
          "Des candidats présentés par Festin, avec une préparation à l'emploi financée par France Travail."
        ],
        cta: "Recruter avec Festin", href: "#/restauration",
        img: "images/beauxmets-images/lbm-masterclass-brigade-plating.jpg" }
    ]
  },
  eco: {
    titlePre: "L'écosystème ", titleAccent: "Festin",
    lede: "Un restaurant en prison, un traiteur d'insertion, deux formations diplômantes et un programme national contre les violences en cuisine.",
    // par projet.id : accroche + chiffre + image de carte (le reste vient de FESTIN_DATA.projets)
    cards: [
      { id:"des-etoiles-et-des-femmes", blurb:"Un diplôme de cuisine et des stages en restaurant, pour des femmes. 13 antennes en France.", insertion:"Des femmes suivent une formation diplômante en cuisine, avec des stages en restaurant.", secteur:"Des commis formées pour les brigades, dans 13 villes.", stat:"91 % de réussite aux diplômes en 2025", img:"images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg" },
      { id:"les-beaux-mets",           blurb:"Le premier restaurant en prison ouvert au public en France. Aux Baumettes, à Marseille.", insertion:"Des personnes détenues apprennent la cuisine et le service, en brigade, sur un vrai service.", secteur:"Un restaurant bistronomique ouvert au public, aux Baumettes.", stat:"119 personnes employées depuis 2022", img:"images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" },
      { id:"la-table-de-cana",         blurb:"Traiteur et restauration collective en insertion, à Marseille.", insertion:"Des salariés en insertion se forment au traiteur et à la restauration collective.", secteur:"Un traiteur et une cuisine collective pour les entreprises et les collectivités marseillaises.", stat:"89 % de sorties positives en 2025", img:"images/latable de cana/tabledecana_cdutrey_160124-4393.jpg" },
      { id:"restaure",                 blurb:"Un programme national, piloté par Festin, pour transformer les pratiques de la restauration : conditions de travail, inclusion et impact écologique.", insertion:"Des cuisines plus sûres pour celles et ceux qui y travaillent.", secteur:"Des formations et des outils pour prévenir les violences et former les managers.", stat:"700 signataires du manifeste", img:"images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg" },
      { id:"tournesol",                blurb:"Cinq mois de formation diplômante pour des personnes réfugiées ou primo-arrivantes.", insertion:"Des personnes réfugiées ou primo-arrivantes préparent en cinq mois le titre de commis de cuisine.", secteur:"Des commis formés, avec Refugee Food, pour les restaurants qui recrutent.", stat:"86 % d'insertion un an après", img:"images/tournesol:formation/tournesol-cuisine.jpg" }
    ],
    avenir: { title:"Sadi Carnot", eyebrow:"En préparation", text:"Un futur restaurant d'insertion à Marseille. Nous en présenterons le projet quand il sera acquis." },
    explore: { title:"Festin", text:"Créée en 1987. Cinq projets, 14 territoires, 441 personnes accompagnées en 2025.", cta:"Lire notre histoire", href:"#/about" }
  },
  impact: {
    title: "Ce que 2025", titleAccent: "a donné",
    source: "Source : rapport d'activité Festin 2025. Taux de sortie : tous dispositifs confondus ; taux de réussite : Des Étoiles et des Femmes.",
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
    lede: "Des personnes formées, un chef qui a recruté, un chef du programme Restaure, un mécène.",
    band: "images/photo-applaudissements.jpg",
    cards: [
      { av:"P", kind:"p", chip:"Personne accompagnée", name:"Hafida", role:"Des Étoiles et des Femmes, Lille",
        q:"Je suis fière, indépendante, heureuse d'avoir su franchir toutes ces étapes.", logo:"images/logo projets/logo-def.png" },
      { av:"R", kind:"r", chip:"Restaurateur", name:"Chef Davin", role:"Intercontinental Marseille",
        q:"Sami s'est très vite intégré à l'équipe. Il a été très bien formé aux Beaux Mets et avait l'attitude qui correspondait à une cuisine.", logo:"images/logo projets/logo-beauxmets.png" },
      { av:"P", kind:"p", chip:"Personne accompagnée", name:"Jason, 22 ans", role:"Cuisinier, Les Beaux Mets, 2025",
        q:"Je n'avais jamais travaillé avant. Aujourd'hui, j'ai ma première fiche de paie. Ça me donne de la fierté.", logo:"images/logo projets/logo-beauxmets.png" },
            { av:"P", kind:"p", chip:"Personne accompagnée", name:"Oumar", role:"Ancien salarié en insertion, La Table de Cana Marseille",
        q:"Ça m'a vraiment aidé à avoir confiance en mes compétences. Aujourd'hui, j'ai un CDI. Je suis fier du chemin parcouru.", logo:"images/logo projets/logo-latbaledecana.png" },
      { av:"C", kind:"f", chip:"Chef", name:"Éloi Spinnler", role:"Chef, membre du programme Restaure",
        q:"Pour réussir à vraiment changer les choses, je suis persuadé qu'il faut avancer collectivement.", logo:"images/logo projets/logo- restaure.png" },
      { av:"C", kind:"f", chip:"Mécène", name:"Christine de Longevialle", role:"Déléguée générale, Solidarity AccorHotels",
        q:"Les chefs de cuisine de Sofitel, Pullman ou Mama Shelter à Marseille ont accueilli dans leurs brigades ces femmes dont les horizons professionnels étaient inexistants. Quelle richesse, quels partages.", panelText:"Partenaire depuis 2015" }
    ]
  }
};

// ============================================================
//  ACCUEIL — refonte du 24/09/2026 (DIRECTION-ACCUEIL.md)
//  Un seul rangement : trois missions, deux projets chacune. Chiffres avec
//  périmètre, année et source. Les champs plus anciens de .home restent pour
//  les pages qui les lisent (Accompagnement lit .home.eco.cards).
// ============================================================
Object.assign(window.FESTIN_DATA.home, {
  hero: {
    kicker: "Depuis 1987, à Marseille et en France",
    // tagline (RETOURS-V3 §2, option 1) en sous-titre ; non-lucrativité au premier écran (§8, formulation 1b)
    title: "Mettre la restauration au service", titleAccent: "de l'égalité des chances.",
    signature: "Le goût d'avancer ensemble",
    // option C des propositions V4, avec « Insertion » et « Pour le secteur » en petite ligne (06/10/2026)
    ctaPrimary: { k: "Insertion", label: "Être accompagné jusqu'à l'emploi", href: "#/insertion" },
    ctaSecondary: { k: "Pour le secteur", label: "Recruter, former, s'engager", href: "#/restauration" },
    img: "images/beauxmets-images/LBM_masterclass_chloeCharles_cdutrey_030325-7893.jpg",
    imgAlt: "Une brigade en cuisine, de dos, bras dessus bras dessous",
  },
  // Ligne de confiance : les statuts (médias retirés de l'accueil, retours V2)
  confiance: {
    statuts: ["Groupe associatif à but non lucratif", "D'intérêt général", "Depuis 1987", "14 territoires"],
  },
  missions: {
    title: "Nos cinq projets servent", titleAccent: "trois missions.",
    lede: "Nous formons aux métiers de la cuisine des femmes, des personnes réfugiées et des personnes détenues et nous les suivons jusqu'au contrat. Avec les restaurants, nous agissons contre les violences en cuisine.",
    ledeProjets: "Festin porte chacun de ces projets, depuis Marseille jusqu'aux 13 antennes du dispositif Des Étoiles et des Femmes.",
    items: [
      { key: "former", title: "Former",
        text: "Des formations diplômantes et gratuites, avec des stages en brigade. Et des formations courtes pour les équipes déjà en poste.",
        fait: { n: "91 %", t: "de réussite aux diplômes en 2025", p: "Des Étoiles et des Femmes" },
        projets: [
          { id: "des-etoiles-et-des-femmes", line: "Des femmes formées avec des chefs, dans 13 villes.", img: "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg" },
          { id: "academie", href: "#/academie", name: "Académie Festin", line: "Notre organisme de formation, en partenariat avec Estello Formation.", img: "images/photo-cuisine-formation.jpg" },
        ] },
      { key: "accompagner", title: "Accompagner", titleAccent: "jusqu'à l'emploi",
        text: "Un suivi de la première semaine jusqu'au contrat : logement, garde d'enfants, papiers, recherche de poste. Et un premier emploi salarié, en brigade.",
        fait: { n: "83 %", t: "de sorties en emploi ou en formation en 2025", p: "tous projets confondus" },
        projets: [
          { id: "les-beaux-mets", line: "Un restaurant ouvert au public, dans la prison des Baumettes.", img: "images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" },
          { id: "la-table-de-cana", line: "Traiteur et restauration collective en insertion, depuis 1992.", img: "images/latable de cana/tabledecana_cdutrey_160124-4393.jpg" },
        ] },
      { key: "changer", title: "Changer", titleAccent: "les cuisines",
        text: "Prévenir les violences en cuisine et changer les pratiques de management, avec les restaurateurs, les chefs et les associations du secteur.",
        fait: { n: "700", t: "signataires du manifeste, 35 structures engagées", p: "le programme Restaure" },
        projets: [
          { id: "restaure", line: "Un programme national, piloté par Festin, pour transformer les pratiques de la restauration : conditions de travail, inclusion et impact écologique.", img: "images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg" },
        ] },
    ],
  },
  // Frise : le calendrier réel d'une promotion (dossier de passation, déjà publié
  // sur la page Insertion). Périmètre dit dans le chapeau.
  frise: {
    title: "Une année pour changer", titleAccent: "de métier.",
    lede: "Le calendrier d'une promotion du dispositif Des Étoiles et des Femmes ou de Tournesol, de la candidature au premier contrat.",
    steps: [
      { when: "Septembre", tab: "Candidater", title: "Entretiens et atelier de préparation",
        text: "Vous rencontrez l'équipe en entretien. Un atelier collectif vous prépare ensuite à rencontrer les restaurants.",
        stat: "Gratuit", statL: "pour les personnes formées", img: "images/photo-micro-temoignage.jpg" },
      { when: "Octobre", tab: "Rencontrer", title: "Une immersion en restaurant",
        text: "Une immersion courte valide votre projet. Nous vous présentons ensuite l'établissement qui vous accueillera en stage.",
        img: "images/images-def/HOTELERIE-035.jpg" },
      { when: "Novembre à mars", tab: "Se former", title: "Cours, stages en brigade et suivi",
        text: "Les cours alternent avec les stages en restaurant. Les promotions 2026 démarrent le 9 novembre (Des Étoiles et des Femmes) et le 30 novembre (Tournesol).",
        stat: "155 à 490 h", statL: "de stage en restaurant, Des Étoiles et des Femmes", img: "images/photo-patisserie.jpg" },
      { when: "Avril", tab: "Le diplôme", title: "Examens et fin de formation",
        text: "Vous passez l'examen de votre formation diplômante.",
        stat: "91 %", statL: "de réussite aux diplômes en 2025, Des Étoiles et des Femmes", img: "images/photo-applaudissements.jpg" },
      { when: "Mai et juin", tab: "Travailler", title: "La recherche de poste",
        text: "Nous cherchons le poste avec vous et nous vous présentons aux restaurants du réseau.",
        stat: "73 %", statL: "de sorties positives en 2025, Des Étoiles et des Femmes", img: "images/photo-service-restaurant.jpg" },
    ],
    rail: { tab: "Toute l'année", title: "Un suivi individuel",
      text: "Logement, garde d'enfants, papiers, transport, cours de français : une personne de l'équipe vous suit jusqu'à l'emploi." },
    cta: { label: "Le détail des parcours", href: "#/insertion" },
  },
  // Preuves : chaque phrase porte son chiffre ; <b> = chiffre mis en avant
  preuve: {
    title: "L'exigence,", titleAccent: "chiffres à l'appui.",
    lignes: [
      "En 2025, nous avons accompagné <b>441 personnes</b> dans <b>14 territoires</b>.",
      "<b>83 %</b> sont sorties en emploi ou en formation en 2025.",
      "Avec Des Étoiles et des Femmes, des femmes apprennent auprès de chefs, dans des restaurants partenaires : <b>91 %</b> ont obtenu leur diplôme en 2025.",
      "Trois à cinq ans après (étude de 2023), <b>73 %</b> des anciennes stagiaires travaillent et <b>une sur quatre</b> est devenue cheffe ou cheffe de partie.",
    ],
    sources: "Sources : rapport d'activité Festin 2025, tous projets confondus (phrases 1 et 2) ; Des Étoiles et des Femmes, 2025 (phrase 3) ; mesure d'impact social, cabinet Koreis, décembre 2023 (phrase 4).",
    citation: { text: "En cuisine comme ailleurs, viser haut n'exclut pas : cela élève.", auteur: "Armand Hurault", role: "Directeur général de Festin, rapport d'activité 2025" },
    chefsTitre: "Ils forment avec le réseau",
    marraine: { name: "Julia Sedefdjian", place: "Marraine nationale du dispositif Des Étoiles et des Femmes" },
    lien: { label: "Voir notre impact", href: "#/impact" },
  },
  portes: {
    title: "Choisir", titleAccent: "votre entrée.",
    cards: [
      { tag: "Insertion", title: "Être accompagné jusqu'à l'emploi",
        cta: "Voir nos parcours", href: "#/insertion", img: "images/photo-tabliers-violets.jpg" },
      { tag: "Pour le secteur", title: "Recruter, former, s'engager",
        cta: "Travailler avec Festin", href: "#/restauration", img: "images/beauxmets-images/lbm-masterclass-brigade-plating.jpg" },
    ],
    agir: {
      tag: "Vous voulez agir avec nous", title: "Soutenir,", titleAccent: "réserver, commander",
      text: "Votre don finance des heures de formation et le suivi, jusqu'à l'emploi. Vous pouvez aussi déjeuner aux Beaux Mets ou faire appel à La Table de Cana Marseille.",
      links: [
        { label: "Faire un don", href: "don", primary: true },
        { label: "Devenir mécène", href: "#/contact/mecenat" },
        { label: "Réserver aux Beaux Mets", href: "https://www.lesbeauxmets-marseille.fr", external: true },
        { label: "Demander un devis traiteur", href: "#/contact/devis-traiteur" },
      ],
    },
  },
});

// ============================================================
//  ARBORESCENCE UNIQUE (revue d'interface du 25/09/2026)
//  Une seule source pour la pastille, le menu, le pied de page et
//  l'état « page courante ». Une page = un nom, partout.
//  match : préfixes d'adresse qui allument la rubrique.
// ============================================================
// Arborescence V4 (06/10/2026, PROPOSITIONS-V4) : le méga menu porte seul l'arborescence, en quatre
// colonnes ; aucun lien n'y mène deux fois à la même page. La barre n'affiche que trois raccourcis
// vers le catalogue (FESTIN_DATA.barre). Partagée avec le pied de page.
window.FESTIN_DATA.arbo = [
  { key: "insertion", label: "L'insertion", href: "#/insertion",
    match: ["#/insertion", "#/accompagnement/insertion", "#/parcours", "#/formations/des-etoiles-et-des-femmes", "#/formations/tournesol", "#/projets/des-etoiles-et-des-femmes"],
    links: [
      { ic: "compass", c: "#7FC4CB", label: "Nos parcours", d: "Un accompagnement jusqu'à l'emploi", href: "#/insertion" },
      { ic: "list-checks", c: "#7FC4CB", label: "Vérifier mon éligibilité", d: "Quelques questions, rien n'est envoyé", href: "#/insertion/eligibilite" },
      { ic: "star", c: "#7FC4CB", label: "Des Étoiles et des Femmes", d: "Pour les femmes, dans 13 villes", href: "#/projets/des-etoiles-et-des-femmes" },
      // les formations ne sont pas listées une à une (retour du 07/10/2026) : un lien vers le catalogue filtré
      { ic: "graduation-cap", c: "#7FC4CB", label: "Toutes les formations d'insertion", href: "#/catalogue/insertion" },
    ] },
  { key: "pros", label: "Employeur", href: "#/restauration",
    match: ["#/restauration", "#/accompagnement/professionnels", "#/formations/vss", "#/formations/management", "#/projets/restaure"],
    links: [
      { ic: "briefcase", c: "#FFC100", label: "Recruter et former", d: "Des personnes formées, des formations pour vos équipes", href: "#/restauration" },
      { ic: "graduation-cap", c: "#FFC100", label: "Toutes les formations pro", href: "#/catalogue/pro" },
      { ic: "megaphone", c: "#FFC100", label: "Le programme Restaure", d: "Changer les pratiques du secteur", href: "#/projets/restaure" },
    ] },
  { key: "catalogue", label: "Projets et formations", href: "#/catalogue",
    match: ["#/catalogue", "#/tables", "#/projets", "#/academie", "#/formations", "#/projets/les-beaux-mets", "#/projets/la-table-de-cana"],
    links: [
      { ic: "layout-grid", c: "#EC8669", label: "Tout le catalogue", d: "Projets et formations", href: "#/catalogue" },
      { ic: "map-pin", c: "#EC8669", label: "Nos tables", d: "Déjeuner, commander un traiteur", href: "#/tables" },
      { ic: "utensils", c: "#EC8669", label: "Les Beaux Mets", d: "Réserver une table, privatiser", href: "#/projets/les-beaux-mets" },
      { ic: "chef-hat", c: "#EC8669", label: "La Table de Cana Marseille", d: "Le traiteur de vos événements", href: "#/projets/la-table-de-cana" },
      // Sadi Carnot : non acquis, grisé, sans lien (retour du 06/10/2026)
      { ic: "clock", c: "#B8B8B8", label: "Sadi Carnot", d: "À venir, près du Vieux-Port", avenir: true },
    ] },
  { key: "festin", label: "Festin", href: "#/about",
    match: ["#/about", "#/impact", "#/actualites", "#/presse", "#/contact"],
    links: [
      { ic: "heart-handshake", c: "#C099C9", label: "Qui sommes-nous", d: "Récit, gouvernance, équipe", href: "#/about" },
      { ic: "chart-column", c: "#C099C9", label: "Impact", d: "Compter ce qui compte", href: "#/impact" },
      { ic: "newspaper", c: "#C099C9", label: "Presse et actualités", d: "Kit presse, articles", href: "#/actualites" },
      { ic: "hand-heart", c: "#C099C9", label: "Soutenir Festin", d: "Financer, accueillir, porter une antenne", href: "#/impact/soutenir" },
      { ic: "mail", c: "#C099C9", label: "Contact", d: "contact@grandfestin.com", href: "#/contact" },
    ] },
];
// Barre (retour du 06/10/2026) : logo · Nos tables · Nos formations · [Menu] · Nos projets · Don
// Option C (07/10/2026) : un bouton par public, plus le catalogue ; chaque bouton mène à une page différente.
// c : code couleur (teal = insertion, or = secteur, corail = tables).
window.FESTIN_DATA.barre = [
  { label: "L'insertion", href: "#/insertion", c: "var(--teal)" },
  { label: "Employeur", href: "#/restauration", c: "var(--gold)" },
  { label: "Nos tables", href: "#/tables", c: "var(--coral-ink)" },
  { label: "Projets et formations", href: "#/catalogue", c: "var(--teal-deep)" },
];
// Logos de médias disponibles dans images/presse/<slug>.png (vide tant que les fichiers ne sont pas fournis)
window.FESTIN_DATA.presseLogos = ["courrier-international", "france-3-paca", "france-inter", "la-provence", "tf1", "le-progres", "m6", "made-in-marseille", "le-figaro", "nice-matin",
  "telerama", "zig-zag-paris", "rcf-radio", "les-echos-weekend", "le-monde", "arles-info", "liberation", "impact-story", "l-hotellerie-restauration",
  "neo-restauration", "sud-ouest", "france-2", "revue-du-barreau", "carenews", "el-pais", "france-tv-info", "podcast-des-etoiles-et-des-femmes"];

// Nos lieux (retours du 01/10/2026) : navigation par lieu, sur la page Nos projets (#/projets).
// Lieux ouverts au public seulement (retours V2 §5 : les antennes n'y figurent pas).
// Sadi Carnot n'est pas acquis : toujours au futur, sans action, en dernier.
window.FESTIN_DATA.lieux = [
  { key: "mourepiane", lieu: "Mourepiane", ville: "Marseille", projet: "la-table-de-cana",
    text: "La Table de Cana Marseille : traiteur et restauration collective en insertion, depuis 1992.",
    img: "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5158.jpg",
    actions: [{ label: "Demander un devis traiteur", href: "#/contact/devis-traiteur" }, { label: "La page du projet", href: "#/projets/la-table-de-cana" }] },
  { key: "baumettes", lieu: "Prison des Baumettes", ville: "Marseille", projet: "les-beaux-mets",
    text: "Les Beaux Mets : un restaurant ouvert au public, dans la prison, cuisiné et servi par des personnes détenues.",
    img: "images/beauxmets-images/LBM_carte-ete24_caroline_dutrey-3385.jpg",
    actions: [{ label: "Privatiser le restaurant", href: "#/contact/privatisation" }, { label: "Réserver une table", href: "https://www.lesbeauxmets-marseille.fr" }] },
  // Teaser (présentation « Totem », 07/10/2026) : au futur, sans chiffres, tarifs ni financeurs
  { key: "sadi-carnot", lieu: "Sadi Carnot", ville: "Marseille, à la croisée de Belsunce, du Vieux-Port, du Panier et de la Joliette", futur: true, sous: "À venir",
    text: "Festin veut réinventer un lieu emblématique du centre-ville en moteur d'insertion, de formation et d'alimentation durable. Le projet est ouvert à vos soutiens dès maintenant.",
    ambition: "Nourrir la ville. Former les talents. Réinventer la restauration populaire.",
    reunira: [
      "Un restaurant de cuisine populaire, de saison et méditerranéenne",
      "Un restaurant-école pour former en cuisine et en salle",
      "Un pôle de travail partagé autour de l'alimentation durable",
      "Une cuisine pour l'aide alimentaire en centre-ville",
    ],
    actions: [] },
];

// Catalogue « Projets et formations » (#/catalogue, PROPOSITIONS-V4 validées le 06/10/2026) :
// une carte par élément, sans doublon. types : projet | formation | tables ; public : insertion | pro.
// Une formation rattachée à un projet déjà présent (« dans ») ne s'affiche que sous le filtre Formations.
window.FESTIN_DATA.catalogue = [
  { id: "des-etoiles-et-des-femmes", types: ["projet"], public: "insertion", titre: "Des Étoiles et des Femmes", ou: "13 villes en France",
    ligne: "Un dispositif pour les femmes en recherche d'emploi : une formation diplômante, des stages, un suivi jusqu'à l'emploi.",
    href: "#/projets/des-etoiles-et-des-femmes", img: "images/images-def/HOTELERIE-035.jpg" },
  { id: "les-beaux-mets", types: ["projet", "tables"], public: "insertion", titre: "Les Beaux Mets", ou: "Prison des Baumettes, Marseille",
    ligne: "Un restaurant ouvert au public, dans la prison : réserver une table, privatiser, recruter un ancien commis.",
    href: "#/projets/les-beaux-mets", img: "images/beauxmets-images/LBM_cdutrey_cartehiver23_181223-2616.jpg" },
  { id: "la-table-de-cana", types: ["projet", "tables"], public: "insertion", titre: "La Table de Cana Marseille", ou: "Mourepiane, Marseille",
    ligne: "Un traiteur en insertion depuis 1992 : faire appel au traiteur, ou y postuler pour un emploi en insertion.",
    href: "#/projets/la-table-de-cana", img: "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5011.jpg" },
  { id: "restaure", types: ["projet"], public: "pro", titre: "Le programme Restaure", ou: "En France",
    ligne: "Un programme national, piloté par Festin, pour transformer les pratiques de la restauration : conditions de travail, inclusion et impact écologique.",
    href: "#/projets/restaure", img: "images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg" },
  { id: "academie", types: ["projet"], public: "insertion", titre: "Académie Festin", ou: "Marseille",
    ligne: "Académie Festin, portée par Estello Formation, organisme de formation certifié Qualiopi.",
    href: "#/catalogue/formations", ancre: "formation", img: "images/photo-cuisine-formation.jpg" },
  { id: "f-des-etoiles-et-des-femmes", dans: "des-etoiles-et-des-femmes", types: ["formation"], public: "insertion", titre: "Des Étoiles et des Femmes", ou: "13 villes en France",
    ligne: "Une formation diplômante en cuisine, de 4 à 11 mois, gratuite.", href: "#/parcours/des-etoiles-et-des-femmes", img: "images/photo-tabliers-violets.jpg" },
  { id: "tournesol", types: ["formation"], public: "insertion", titre: "Tournesol", ou: "Marseille",
    ligne: "Cinq mois de formation au métier de commis et un diplôme de français, pour les personnes réfugiées ou primo-arrivantes. Gratuite.",
    href: "#/parcours/tournesol", img: "images/tournesol:formation/tournesol-cuisine.jpg" },
  { id: "vss", types: ["formation"], public: "pro", titre: "Prévention des violences sexistes et sexuelles", ou: "Dans vos murs ou en inter",
    ligne: "Reconnaître les violences en cuisine et en salle, les prévenir, réagir à un signalement. Proposée par le programme Restaure.",
    href: "#/formations/vss", img: "images/photo-micro-temoignage.jpg" },
  { id: "management", types: ["formation"], public: "pro", titre: "Management juste et inclusif", ou: "Dans vos murs ou en inter",
    ligne: "Recruter plus largement, garder son équipe, l'encadrer sans violence. Proposée par le programme Restaure.",
    href: "#/formations/management", img: "images/beauxmets-images/lbm-maitre-hotel-commis.jpg" },
  { id: "sadi-carnot", types: ["tables"], public: "insertion", titre: "Sadi Carnot", ou: "Marseille, centre-ville", avenir: true,
    ligne: "Un futur lieu de Festin au cœur de Marseille : un restaurant, de la formation et l'alimentation durable. Ouvert à vos soutiens.", href: "#/catalogue/tables", ancre: "developpement", img: null },
];

// Bande or des projets, cliquable (procédé de la page Pros diffusé sur Restaure et
// l'Académie, RETOURS-AUDIT §3.1 réponse B)
window.FESTIN_DATA.bandeProjets = [
  { label: "le programme Restaure", href: "#/projets/restaure" },
  { label: "Des Étoiles et des Femmes", href: "#/projets/des-etoiles-et-des-femmes" },
  { label: "Les Beaux Mets", href: "#/projets/les-beaux-mets" },
  { label: "La Table de Cana Marseille", href: "#/projets/la-table-de-cana" },
  { label: "l'Académie Festin", href: "#/academie" },
];

// Rubrique allumée pour une adresse donnée
window.FESTIN_DATA.rubriqueDe = function (hash) {
  const h = hash || "#/", A = window.FESTIN_DATA.arbo;
  const exact = A.find((r) => r.match.includes(h));
  return (exact || A.find((r) => r.match.some((m) => h.indexOf(m + "/") === 0)) || {}).key || null;
};

// ============================================================
//  PAGES PROJET — gabarit unique (ProjetPage.jsx), 24/09/2026.
//  Voir AUDIT-DEPLOIEMENT.md §4. Faits repris de .projets (rapport
//  d'activité 2025) ; aucun chiffre nouveau. <b> = chiffre mis en avant.
//  La mission (Former / Accompagner / Changer) vient de .home.missions.
// ============================================================
window.FESTIN_DATA.projetPages = {
  "des-etoiles-et-des-femmes": {
    kicker: "Depuis 2015 · 13 antennes en France",
    // en-tête : photo de groupe d'une promotion (08/10/2026), cadrée en bas pour que le cartouche ne cache pas les visages
    heroImg: "images/images-def/def-promotion-groupe.jpg", heroImgPos: "50% 100%", heroAlt: "Une promotion du dispositif Des Étoiles et des Femmes, en vestes de cuisine",
    nature: "formation", heroCta: { label: "Plus d'informations", href: "https://www.desetoilesetdesfemmes.org", external: true }, heroLien: { label: "Accueillir une stagiaire", to: "portes" },
    bref: { title: "Former des femmes", accent: "avec des chefs.",
      text: "Des Étoiles et des Femmes forme des femmes à la cuisine avec des chefs et des restaurants partenaires. Chaque promotion prépare un diplôme, fait ses stages en restaurant et bénéficie d'un suivi social jusqu'à l'emploi." },
    video: { drive: "https://drive.google.com/file/d/1X3er9EQUpu61_yXR3KceY1sV4RgfygEK5hNzUFaaHEY/preview", poster: "images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg", credit: "Vidéo réalisée par l'agence Les Fabricants" },
    preuves: [
      "En 2025, <b>336 femmes</b> ont suivi le dispositif, dans <b>13 antennes</b>.",
      "<b>91 %</b> ont obtenu leur diplôme en 2025 et le dispositif compte <b>73 %</b> de sorties positives en 2025.",
      "Depuis 2015, Des Étoiles et des Femmes a accompagné plus de <b>1 200 femmes</b>.",
    ],
    source: "Source : rapport d'activité Festin 2025, Des Étoiles et des Femmes seul.",
    frise: { title: "De la candidature", accent: "à l'emploi.",
      lede: "Chaque antenne suit le même parcours, avec son centre de formation et ses restaurants partenaires.",
      steps: [
        { tab: "Candidater", title: "Une réunion d'information, puis un entretien",
          text: "Le parcours s'adresse aux femmes éloignées de l'emploi, de 18 ans ou plus. Chaque candidature commence par une réunion d'information collective, suivie d'un entretien.",
          stat: "Gratuit", statL: "pour les femmes formées", img: "images/images-def/reunion-information-collective.jpg", alt: "Une réunion d'information collective du dispositif Des Étoiles et des Femmes, dans une salle de restaurant" },
        { from: "Se former" }, { from: "Pratiquer" }, { from: "Travailler" },
      ], },
    blocs: ["reseau", "chefs"],
    temoignages: { title: "Elles racontent", accent: "leur parcours." },
    portesTitre: { title: "Se former", accent: "ou accueillir une stagiaire." },
    portes: [
      { tag: "Vous cherchez un métier", title: "Rejoindre une promotion",
        cta: "Plus d'informations", href: "https://www.desetoilesetdesfemmes.org", external: true, img: "images/photo-tabliers-violets.jpg" },
      { tag: "Vous dirigez une cuisine", title: "Accueillir une stagiaire",
        cta: "Devenir restaurant partenaire", href: "#/restauration", img: "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg" },
    ],
    soutien: { title: "Soutenir", accent: "une promotion",
      text: "Le parcours est gratuit pour les femmes qui le suivent : les pouvoirs publics et des mécènes financent chaque promotion. Votre don paie des heures de formation, des stages et le suivi social, jusqu'à l'emploi.",
      sphere: true },
    galerie: ["images/images-def/def-remise-cap.jpg", "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg", "images/images-def/chaudbouillon-045.jpg", "images/images-def/chaudbouillon-046.jpg", "images/images-def/HOTELERIE-097.jpg", "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg", "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg", "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-40.jpg"],
  },
  "les-beaux-mets": {
    kicker: "Depuis 2022 · prison des Baumettes, Marseille",
    heroImg: "images/beauxmets-images/LBM_cdutrey_cartehiver23_181223-2616.jpg", heroAlt: "Des convives à table dans la salle des Beaux Mets", heroCredit: "Photo : Caroline Dutrey",
    nature: "lieu", heroCta: { label: "Réserver une table", href: "https://www.lesbeauxmets-marseille.fr", external: true }, heroLien: { label: "Privatiser le restaurant", href: "#/contact/privatisation" },
    table: { title: "Venir déjeuner", accent: "aux Beaux Mets.",
      text: ["Le restaurant est ouvert au public. La brigade cuisine et sert une carte bistronomique, encadrée par un chef, un second et un maître d'hôtel.",
        "Plus de 12 000 convives y ont déjà déjeuné. Le restaurant se privatise aussi : écrivez-nous pour en parler."],
      photos: [
        { src: "images/beauxmets-images/lbm-bar-salle.jpg", alt: "Le comptoir des Beaux Mets, avec la cuisine ouverte en arrière-plan" },
        { src: "images/beauxmets-images/LBM_carte printemps25_cdutrey_080425-1661.jpg", alt: "Des assiettes de la carte des Beaux Mets, vues de dessus" },
        { src: "images/beauxmets-images/lbm-gallery-plat.jpg", alt: "Une assiette dressée aux Beaux Mets" },
      ],
      infos: [
        // modalités : formulaire de réservation des Beaux Mets (relevé le 06/10/2026)
        { dt: "Où", dd: "Prison des Baumettes, Marseille" },
        { dt: "Horaires", dd: "Du lundi au vendredi, de 12 h à 15 h. Fermé le week-end." },
        { dt: "Pour entrer", dd: "Chaque convive a besoin d'une autorisation d'accès à la prison. La réservation demande son identité complète, comme sur sa pièce d'identité, pour les contrôles de l'administration pénitentiaire." },
        { dt: "Réserver", dd: "En ligne, par le formulaire du restaurant. Mobilité réduite, allergies : à signaler dans la réservation." },
        { dt: "Groupes", dd: "Plus de 10 personnes : écrivez à ", lien: { label: "reservation@lesbeauxmets-marseille.fr", href: "mailto:reservation@lesbeauxmets-marseille.fr" } },
      ],
      ctas: [
        { label: "Réserver une table", href: "https://www.lesbeauxmets-marseille.fr", external: true },
        { label: "Privatiser le restaurant", href: "#/contact/privatisation" },
      ] },
    bref: { title: "Un restaurant ouvert au public,", accent: "dans la prison.",
      text: "Aux Baumettes, à Marseille, des personnes détenues cuisinent et servent une carte bistronomique, encadrées par un chef, un second et un maître d'hôtel. C'est le premier restaurant en prison ouvert au public en France." },
    video: { youtube: "PxuhWFzpmII", poster: "images/beauxmets-images/lbm-masterclass-brigade-plating.jpg" },
    preuves: [
      "En 2025, Les Beaux Mets a accompagné <b>48 personnes</b>, avec <b>86 %</b> de sorties positives en 2025.",
      "Depuis l'ouverture, <b>119 personnes</b> placées sous main de justice y ont travaillé.",
      "Plus de <b>12 000 convives</b> y ont déjeuné.",
    ],
    source: "Source : rapport d'activité Festin 2025.",
    genese: { title: "Une idée venue", accent: "de Londres et de Milan.",
      text: "The Clink à Londres, In Galera à Milan : deux restaurants installés dans une prison. En 2016, Festin les découvre par Marseille Solutions et la direction interrégionale des services pénitentiaires lors d'un voyage en Italie. Les deux se rencontrent ensuite. Les Beaux Mets ouvre au public le 15 novembre 2022, aux Baumettes." },
    frise: { title: "Le parcours", accent: "d'un commis.",
      lede: "De la brigade à la sortie de détention, avec un suivi qui continue six mois après.",
      steps: [
        { from: "La brigade", img: "images/beauxmets-images/lbm-gallery-service.jpg" },
        { from: "Les masterclass", img: "images/beauxmets-images/lbm-masterclass-brigade-plating.jpg" },
        { from: "Hors les murs", img: "images/beauxmets-images/lbm-gallery-cocktail.jpg" },
        { from: "L’accompagnement", img: "images/beauxmets-images/lbm-maitre-hotel-commis.jpg" },
        { from: "La sortie" },
      ] },
    blocs: [],
    temoignages: { title: "Ce qu'ils", accent: "en disent." },
    portesTitre: { title: "Déjeuner", accent: "ou recruter un commis." },
    portes: [
      { tag: "Vous voulez déjeuner", title: "Réserver une table aux Beaux Mets",
        pts: ["Une carte bistronomique, cuisinée et servie par la brigade.", "Chaque service fait travailler la brigade devant de vrais convives."],
        cta: "Réserver", href: "https://www.lesbeauxmets-marseille.fr", external: true, img: "images/beauxmets-images/LBM_carte-ete24_caroline_dutrey-3385.jpg" },
      { tag: "Vous dirigez une cuisine", title: "Recruter un commis formé",
        pts: ["Des commis formés en brigade par un chef et un second.", "Un suivi jusqu'à six mois après la sortie de détention."],
        cta: "Recruter avec Festin", href: "#/restauration", img: "images/beauxmets-images/lbm-gallery-masterclass.jpg" },
    ],
    soutien: { title: "Soutenir", accent: "Les Beaux Mets",
      text: "Un don finance le suivi des commis, pendant la détention et après la sortie.",
      don: "https://www.helloasso.com/associations/association-festin/formulaires/3" },
    galerie: ["images/beauxmets-images/lbm-gallery-convives.jpg", "images/beauxmets-images/lbm-gallery-salle.jpg", "images/beauxmets-images/lbm-gallery-service.jpg", "images/beauxmets-images/lbm-gallery-masterclass.jpg", "images/beauxmets-images/lbm-gallery-plat.jpg", "images/beauxmets-images/lbm-gallery-cocktail.jpg", "images/beauxmets-images/lbm-gallery-accueil-ap.jpg"],
  },
  "la-table-de-cana": {
    kicker: "Depuis 1992 · Marseille",
    heroImg: "images/latable de cana/tabledecana_cdutrey_160124-4393.jpg", heroAlt: "En cuisine à La Table de Cana Marseille", heroCredit: "Photo : Caroline Dutrey",
    nature: "lieu", orientable: true, heroCta: { label: "Demander un devis traiteur", href: "#/contact/devis-traiteur" },
    table: { title: "Le traiteur", accent: "de vos événements.",
      text: ["La Table de Cana Marseille prépare les repas de vos événements et de vos repas d'entreprise. Chaque commande fait travailler et former des salariés en insertion.",
        "Elle cuisine aussi en restauration collective : plus de 400 000 convives ont mangé sa cuisine."],
      photos: [
        { src: "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5011.jpg", alt: "Des bouchées sur focaccia préparées par le traiteur La Table de Cana Marseille" },
        { src: "images/latable de cana/tabledecana_cdutrey_170124-6293-B-2048x1365.jpg", alt: "Un événement servi par La Table de Cana Marseille" },
        { src: "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5158.jpg", alt: "Un salarié de La Table de Cana Marseille sert des bouchées pendant un événement" },
      ],
      infos: [
        { dt: "Où", dd: "Mourepiane, Marseille" },
        { dt: "Prestations", manque: "types de prestations traiteur" },
        { dt: "Capacité", manque: "nombre de convives possible" },
        { dt: "Délai", manque: "délai de commande" },
        { dt: "Livraison", manque: "zone de livraison" },
      ],
      ctas: [
        { label: "Demander un devis traiteur", href: "#/contact/devis-traiteur" },
      ] },
    bref: { title: "Apprendre la cuisine", accent: "en travaillant.",
      text: "Né en 1992, c'est le premier projet de Festin : un traiteur et une cuisine collective où des salariés en insertion apprennent un métier, dans les conditions réelles d'une entreprise de restauration. Depuis 2020, elle a aussi distribué plus de 80 000 repas d'aide alimentaire avec les associations marseillaises." },
    video: { youtube: "RUpAD7u0Khs", poster: "images/latable de cana/tabledecana_cdutrey_170124-6293-B-2048x1365.jpg" },
    preuves: [
      "En 2025, La Table de Cana Marseille a employé <b>45 salariés</b> en insertion, avec <b>89 %</b> de sorties positives en 2025.",
      "Elle a servi plus de <b>15 000 repas</b> d'aide alimentaire à des personnes hébergées en hôtel d'urgence.",
      "Au total, plus de <b>400 000 convives</b> ont mangé sa cuisine.",
    ],
    // 80 000 repas : présentation « Totem » (avril 2026), retenu par l'utilisatrice le 08/10/2026
    source: "Sources : rapport d'activité Festin 2025 ; Festin, avril 2026 (aide alimentaire depuis 2020).",
    frise: { title: "Le parcours", accent: "d'un salarié.",
      lede: "Un emploi salarié, une formation en cuisine, puis un poste chez un partenaire.",
      steps: [
        { from: "Se former", img: "images/latable de cana/tabledecana_cdutrey_230124-7705.jpg" },
        { from: "Préparer l’emploi", img: "images/latable de cana/tabledecana_cdutrey_160124-5010.jpg" },
        { from: "Trouver un emploi", img: "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5158.jpg" },
        { from: "Le Club des Talents" },
      ] },
    blocs: [],
    temoignages: { title: "Salariés et encadrants", accent: "racontent." },
    portesTitre: { title: "Faire appel au traiteur", accent: "ou recruter un salarié." },
    portes: [
      { tag: "Vous organisez un événement", title: "Un repas pour votre événement",
        pts: ["Traiteur pour vos événements et vos repas d'entreprise.", "Chaque commande fait travailler et former des salariés en insertion."],
        cta: "Demander un devis traiteur", href: "#/contact/devis-traiteur", img: "images/latable de cana/tabledecana_cdutrey_170124-6293-B-2048x1365.jpg" },
      { tag: "Vous dirigez une cuisine", title: "Recruter un salarié formé",
        pts: ["Des salariés formés au traiteur et à la restauration collective.", "Une fois formés, ils sont orientés vers des entreprises partenaires de la restauration."],
        cta: "Recruter avec Festin", href: "#/restauration", img: "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5158.jpg" },
    ],
    soutien: { title: "Soutenir", accent: "La Table de Cana Marseille",
      text: "Votre don finance l'encadrement et le suivi des salariés en insertion." },
    galerie: ["images/latable de cana/tabledecana_cdutrey_160124-4393.jpg", "images/latable de cana/tabledecana_cdutrey_160124-5010.jpg", "images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5158.jpg", "images/latable de cana/tabledecana_cdutrey_230124-7705.jpg", "images/latable de cana/tabledecana_cdutrey_170124-6293-B-2048x1365.jpg"],
  },
  "restaure": {
    bandeProjets: true, // fin de page : la bande or des projets, comme sur Pros et l'Académie
    kicker: "Depuis 2024 · programme national",
    heroImg: "images/restaure : formation pro/FESTIN_TOAST_12 FEVRIER_FEED-25.jpg", heroAlt: "Un Toast du programme Restaure : une salle écoute des restaurateurs sur scène", // photo changée le 07/10/2026 (l'affiche était cachée par le cartouche)
    nature: "programme", heroCta: { label: "Nos formations pro", href: "#/restauration/former" }, heroLien: { label: "Le site du programme", href: "https://www.mouvement-restaure.com", external: true },
    bref: { title: "Transformer les pratiques", accent: "du secteur.",
      text: "Un programme national né en 2024 et piloté par Festin. Il sensibilise et forme les professionnels de la restauration pour transformer durablement les pratiques du secteur : prendre soin des équipes, prévenir les violences sexistes et sexuelles, ouvrir les cuisines aux femmes, aux personnes réfugiées et aux personnes en insertion, réduire l'impact écologique des restaurants avec la Communauté Ecotable. Il porte aussi les formations pro de Festin." }, // repositionnement stratégique (07/10/2026)
    video: { link: "https://www.instagram.com/reel/DJ9kq6iIb5j/", linkLabel: "Voir la vidéo sur Instagram", poster: "images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg" },
    preuves: [
      "<b>35 structures</b> de la restauration sont engagées et le manifeste compte <b>700 signataires</b>.",
      "En 2025, les vidéos de prévention des violences en cuisine ont dépassé <b>2 millions</b> de vues.",
      "En 2025, <b>5 groupes de travail</b> ont démarré avec les structures membres.",
    ],
    source: "Source : rapport d'activité Festin 2025.",
    blocs: ["verbatims"],
    temoignages: { title: "Pourquoi un chef", accent: "s'y engage." },
    portesTitre: { title: "Agir", accent: "avec le programme." },
    portes: [
      { tag: "Vous dirigez une cuisine", title: "Former vos équipes",
        cta: "Voir les formations", href: "#/restauration/former", img: "images/restaure : formation pro/IMG_2950.JPG" },
      { tag: "Vous voulez en savoir plus", title: "Le programme Restaure",
        cta: "Le site du programme", href: "https://www.mouvement-restaure.com", external: true, img: "images/restaure : formation pro/TASTING_RFF_CLOSING-FEED-34 (1).JPG" },
    ],
    soutien: { title: "Soutenir", accent: "Restaure",
      text: "Festin pilote le programme. Votre don finance la sensibilisation et la formation des professionnels de la restauration." }, // 07/10/2026 : Festin seul pilote (repositionnement stratégique de Restaure)
    galerie: ["images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg", "images/restaure : formation pro/FESTIN_TOAST_12 FEVRIER_FEED-25.jpg", "images/restaure : formation pro/IMG_2950.JPG", "images/restaure : formation pro/TASTING_RFF_CLOSING-FEED-34 (1).JPG", "images/restaure : formation pro/WhatsApp Image 2025-12-09 at 08.53.58.jpg", "images/restaure : formation pro/toast-affiche-restaure.jpg", "images/restaure : formation pro/toast-regie.jpg"],
  },
};

// ---------- PAGE ABOUT — contenus ----------
// Chiffres : source unique = FESTIN_DATA.stats ci-dessus (Rapport d'activité 2025 : 441 / 83 % / 14 ; création 1987).
// `photo: null` = portrait à fournir → cadre neutre « [XX] ». `avatar` = médaillon 240 px (petit avatar rond).
window.FESTIN_DATA.about = {
  // Équipe par projet (RETOURS-V3 §5.8, réponse B du 06/10/2026) : filtre par projet
  poles: [
    { key: "festin", label: "Festin", color: "#1D6B78", members: [
      { name: "Armand Hurault", role: "Directeur général", photo: "images/equipe/armand-hurault.jpg" },
      { name: "Marine Vever",   role: "Directrice adjointe", photo: "images/equipe/marine-vever.jpg" },
      { name: "Marie Plé",      role: "Assistante de gestion", photo: null },
      { name: "Iris Hutin",        role: "Chargée de projet Communication", photo: "images/equipe/iris-hutin.jpg" },
      { name: "Matthieu Donsimoni", role: "Chargé de communication en alternance", photo: null },
    ]},
    { key: "def", label: "Des Étoiles et des Femmes", color: "#C2421C", members: [
      { name: "Mélanie Gambert",   role: "Coordinatrice réseau Des Étoiles et des Femmes", photo: "images/equipe/melanie.jpg" },
      { name: "Bénédicte Solera", role: "Responsable Emploi et Inclusion, Des Étoiles et des Femmes", photo: null },
    ]},
    { key: "academie", label: "Académie Festin", color: "#9A5B0E", members: [
      { name: "Florence Armitano", role: "Responsable du pôle Formation", photo: "images/equipe/florence.jpg" },
      { name: "Lucie Gueydon",     role: "Chargée de projet formation, Estello Formation", photo: "images/equipe/lucie-gueydon.jpg" },
    ]},
    { key: "restaure", label: "Restaure", color: "#4F6019", members: [
      { name: "Iris Liberty",      role: "Chargée d'animation de communauté, programme Restaure", photo: "images/equipe/iris-liberty.jpg" },
    ]},
    { key: "lbm", label: "Les Beaux Mets", color: "#A3543D", members: [
      { name: "Camille Lafon",    role: "Direction du restaurant Les Beaux Mets", photo: "images/equipe/camille-lafon.jpg" },
      { name: "Marion Binachon",  role: "Chargée de commercialisation et de marketing, Les Beaux Mets", photo: "images/equipe/marion.jpg" },
      { name: "Valentin Majan",   role: "Chef de cuisine", photo: "images/beauxmets-images/valentin-majan.jpg" },
      { name: "Boris Ruel",       role: "Second de cuisine", photo: null },
      { name: "Marc Balthazard",  role: "Maître d'hôtel", photo: "images/equipe/marc-balthazard-portrait.jpg" },
      { name: "Laura Sacher",     role: "Conseillère en insertion professionnelle", photo: null },
    ]},
    // La Table de Cana Marseille : équipe relevée sur latabledecana-marseille.com (06/10/2026),
    // prénoms seuls comme sur ce site ; direction : Tom Louis Teboul (retour du 06/10/2026)
    { key: "tdc", label: "La Table de Cana Marseille", color: "#7A2E3A", members: [
      { name: "Tom Louis Teboul", role: "Directeur", photo: null },
      { name: "Elodie",   role: "Responsable commerciale événementiel", photo: "images/equipe/tdc/elodie.jpg" },
      { name: "Orasimi",  role: "Responsable restauration et partenariats", photo: "images/equipe/tdc/orasimi.jpg" },
      { name: "Pierre",   role: "Responsable RH d'insertion", photo: "images/equipe/tdc/pierre.jpg" },
      { name: "Marion",   role: "Responsable RSE et compétences", photo: "images/equipe/tdc/marion.jpg" },
      { name: "Habib",    role: "Responsable logistique", photo: "images/equipe/tdc/habib.jpg" },
      { name: "Ali",      role: "Responsable magasinier", photo: "images/equipe/tdc/ali-magasinier.jpg" },
      { name: "Jean-Claude", role: "Maître d'hôtel", photo: "images/equipe/tdc/jean-claude.jpg" },
      { name: "Souhila",  role: "Commerciale", photo: "images/equipe/tdc/souhila.jpg" },
      { name: "Bettina",  role: "Commerciale événementielle", photo: "images/equipe/tdc/bettina.jpg" },
      { name: "Margaux",  role: "Chargée de communication", photo: "images/equipe/tdc/margaux.jpg" },
      { name: "Marc",     role: "Économe", photo: "images/equipe/tdc/marc.jpg" },
      { name: "Ali",      role: "Comptable", photo: "images/equipe/tdc/ali-comptable.jpg" },
    ]},
  ],
  gouvernance: [
    { name: "Jérôme Schatzman", role: "Président du groupe associatif", avatar: "images/equipe/ca-schatzman.png" },
    { name: "Guillaume Hermitte", role: "Trésorier", avatar: "images/equipe/ca-hermitte.png" },
    { name: "Gaëlle de Carmantrand", role: "Secrétaire", avatar: "images/equipe/ca-carmantrand.jpg" },
    // orthographe : celle du site latabledecana-marseille.com
    { name: "Hugues Bonnetain", role: "Président de La Table de Cana Marseille", avatar: "images/equipe/tdc/hugues-bonnetain.jpg" },
  ],
  // Frise de la page Association, recentrée sur l'association (29/09/2026) ;
  // la frise des projets est sur l'accueil. Distinctions : voir .about distinctions ci-dessous.
  // Frise de Qui sommes-nous (retours du 02/10/2026) : deux familles distinctes,
  // les créations de projet (type "projet") et les reconnaissances (type "reco").
  jalons: [
    { year: "1987", type: "projet", title: "Naissance de Festin", desc: "À Marseille, pour l'insertion par la cuisine.", photo: null },
    { year: "1992", type: "projet", title: "La Table de Cana Marseille", desc: "Le premier projet : un traiteur où des salariés en insertion apprennent le métier.", photo: "images/latable de cana/tabledecana_cdutrey_160124-4393.jpg", href: "#/projets/la-table-de-cana" },
    { year: "2015", type: "projet", title: "Des Étoiles et des Femmes", desc: "Des femmes formées avec des chefs, aujourd'hui dans 13 antennes.", photo: "images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg", href: "#/projets/des-etoiles-et-des-femmes" },
    { year: "2019", type: "reco", title: "La France s'engage", desc: "Lauréat, pour le dispositif Des Étoiles et des Femmes." },
    { year: "2020", type: "reco", title: "Plan d'investissement dans les compétences", desc: "Sélection au PIC, ministère du Travail." },
    { year: "2022", type: "projet", title: "Les Beaux Mets", desc: "Un restaurant ouvert au public, dans la prison des Baumettes.", photo: "images/beauxmets-images/LBM_cdutrey_071122-7922.jpg", href: "#/projets/les-beaux-mets" },
    { year: "2022", type: "reco", title: "Fondation des Femmes", desc: "Distinction pour l'accompagnement des femmes vers l'autonomie." },
    { year: "2023", type: "reco", title: "Acteurs clés de changement", desc: "Lauréat, Fondation de France." },
    { year: "2023", type: "reco", title: "Prix Futur(e)s Food", desc: "Les Beaux Mets, au Sirha." },
    { year: "2024", type: "projet", title: "Le programme Restaure", desc: "Un programme national, piloté par Festin, pour transformer les pratiques de la restauration : conditions de travail, inclusion et impact écologique.", photo: "images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg", href: "#/projets/restaure" },
    { year: "2025", type: "projet", label: "Temps fort", title: "Dix ans du dispositif Des Étoiles et des Femmes", desc: "Plus de 600 convives au Grand Festin, sur le Vieux-Port.", photo: "images/images-def/grand-festin-2025-brigades.jpg" },
    { year: "2025", type: "reco", title: "Label LUCIE Progress", desc: "848 sur 1 000 pour La Table de Cana Marseille." },
    { year: "2026", type: "projet", title: "L'Académie Festin", desc: "Festin devient organisme de formation en partenariat avec Estello Formation, organisme certifié Qualiopi.", photo: "images/photo-cuisine-formation.jpg", href: "#/academie" },
  ],

  // Trois marqueurs (RETOURS-V3 §2, texte validé par la direction)
  marqueurs: [
    { title: "L'exigence", desc: "Dans la qualité des projets, des parcours et des partenariats que nous construisons." },
    { title: "L'audace", accent: "et l'innovation", desc: "Un esprit pionnier qui nous a conduits à ouvrir des voies nouvelles dans la restauration, la formation et l'insertion." },
    { title: "La convivialité", desc: "Nous considérons l'hospitalité, la qualité de la relation et le collectif comme des dimensions centrales de notre manière d'agir." },
  ],
  valeurs: [
    { title: "Excellence",      color: "#E4572E", dark: true,  desc: "Des stages chez des chefs, des diplômes reconnus et de vrais services : l'exigence de la cuisine est au cœur de nos parcours." },
    { title: "Collectif",       color: "#9A5BA8", dark: false, desc: "Aucun projet Festin ne se pense ou ne se fait seul. Chefs, restaurateurs, entreprises, fondations et pouvoirs publics avancent avec nous." },
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
    { src: "images/partners/intercontinental.png",    alt: "InterContinental Marseille" },
    // planche de logos partenaires fournie le 08/10/2026, découpée en neuf fichiers
    { src: "images/partners/accor-heartist-solidarity.png", alt: "Accor Heartist Solidarity" },
    { src: "images/partners/fondation-de-france.png",       alt: "Fondation de France" },
    { src: "images/partners/metro-fonds-de-dotation.png",   alt: "Fonds de dotation METRO" },
    { src: "images/partners/fondation-carrefour.png",       alt: "Fondation Carrefour" },
    { src: "images/partners/fonds-dotation-peugeot.png",    alt: "Fonds de dotation familial Peugeot" },
    { src: "images/partners/bruneau.png",                   alt: "Bruneau" },
    { src: "images/partners/fondation-m6.png",              alt: "Fondation Groupe M6" },
    { src: "images/partners/fondation-carasso.png",         alt: "Fondation Daniel et Nina Carasso" },
    { src: "images/partners/ville-de-marseille.png",        alt: "Ville de Marseille" },
    // planches de logos partenaires de Festin (08/10/2026), sans L'Oréal ni Randstad
    { src: "images/partners/metropole-aix-marseille-provence.png", alt: "La Métropole Aix-Marseille-Provence" },
    { src: "images/partners/departement-bouches-du-rhone.png",     alt: "Département des Bouches-du-Rhône" },
    { src: "images/partners/prefet-region-paca.png",               alt: "Préfet de la région Provence-Alpes-Côte d'Azur" },
    { src: "images/partners/ministere-de-la-justice.png",          alt: "Ministère de la Justice" },
    { src: "images/partners/cipdr.png",                            alt: "Comité interministériel de prévention de la délinquance" },
    { src: "images/partners/sodexo.png",                           alt: "Sodexo" },
    { src: "images/partners/umih.png",                             alt: "UMIH, Union des métiers de l'hôtellerie restauration" },
    { src: "images/partners/media-performances.png",               alt: "Média Performances" },
    { src: "images/partners/compagnie-fruitiere-foundation.png",   alt: "Compagnie Fruitière Foundation" },
    { src: "images/partners/fondation-roi-baudouin.png",           alt: "Fondation Roi Baudouin" },
    { src: "images/partners/fonds-dotation-brichaux-tardy.png",    alt: "Fonds de dotation Brichaux-Tardy" },
    { src: "images/partners/credit-agricole-alpes-provence.png",   alt: "Crédit Agricole Alpes Provence Capital & Innovation" },
    { src: "images/partners/groupe-bertrand.png",                  alt: "Groupe Bertrand" },
    { src: "images/partners/telos-impact.png",                     alt: "Telos Impact" },
    { src: "images/partners/mieux-manger-pour-tous.png",           alt: "Mieux Manger pour Tous" },
  ],
  // Partenaires du réseau Des Étoiles et des Femmes (dossier Drive « Partenaires », 30/09/2026).
  // Affichés dans la sphère seulement quand le logo est dans images/partners/ ; Randstad et L'Oréal retirés (08/10/2026).
  partenairesDEF: ["Accor Heartist Solidarity", "METRO", "Fondation Masalina", "Pink Lady", "Ministère du Travail", "Banque des Territoires"],
  // Logos partenaires disponibles, par nom tel qu'écrit dans projets[].partenaires.
  // Sans logo : carte au nom du partenaire (logo à fournir).
  logosPartenaires: {
    "France Travail": "images/partners/france-travail.png",
    "Yes We Camp": "images/partners/yes-we-camp.png",
  },
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

// Adresses de contact, une ligne par usage (RETOURS-AUDIT, question 3, 05/10/2026).
// Une seule adresse fournie pour l'instant ; l'association donnera les autres.
// Pour en changer une : modifier sa ligne ici, tous les liens du site suivent
// (formulaire Contact, coordonnées, pied de page, espace presse, « Devenir mécène »).
window.FESTIN_DATA.emails = {
  general:       "contact@grandfestin.com",
  candidature:   "contact@grandfestin.com", // se former, vérifier son éligibilité
  prescription:  "contact@grandfestin.com", // orienter une personne
  recrutement:   "contact@grandfestin.com", // stage, Book de l'emploi, POEI
  formationsPro: "contact@grandfestin.com", // formations du programme Restaure
  traiteur:      "contact@grandfestin.com", // devis, La Table de Cana Marseille
  privatisation: "contact@grandfestin.com", // Les Beaux Mets
  mecenat:       "partenariat@grandfestin.com", // dons, mécénat
  partenariat:   "partenariat@grandfestin.com", // antennes, partenaires opérationnels
  presse:        "contact@grandfestin.com",
  handicap:      "contact@grandfestin.com", // accessibilité, référente handicap
};

// Backward-compat alias so anything still referencing the old name keeps working
window.ACADEMIE_DATA = window.FESTIN_DATA;

// ============================================================
//  ACCUEIL — double public (maquette validée le 29/09/2026,
//  maquettes/home-double-cible.html). Faits repris du site.
// ============================================================
Object.assign(window.FESTIN_DATA.home, {
  publics: {
    title: "Deux publics,", titleAccent: "un même métier.",
    // la non-lucrativité, déplacée de l'en-tête vers ce texte (retour du 06/10/2026)
    lede: "Festin est un groupe associatif à but non lucratif : toutes ses activités sont d'intérêt général. Nous accompagnons des personnes jusqu'à l'emploi en cuisine, et nous travaillons avec les restaurants qui recrutent et font évoluer leurs équipes.",
    cols: [
      { key: "ins", tag: "Vous cherchez un emploi", title: "Un métier,", titleAccent: "et quelqu'un à vos côtés.",
        text: "Des parcours gratuits pour entrer dans la cuisine : une formation ou un premier emploi, avec un suivi jusqu'au contrat.",
        img: "images/photo-tabliers-violets.jpg", imgAlt: "Des stagiaires en cuisine",
        lignes: [
          { dt: "Se former", dd: "Une formation diplômante, avec Des Étoiles et des Femmes (13 villes) ou Tournesol (Marseille)." },
          { dt: "Travailler", dd: "Un emploi en insertion à La Table de Cana Marseille, traiteur." },
          { dt: "Être accompagné", dd: "Logement, papiers, garde d'enfants, recherche de poste : une personne vous suit." },
        ],
        preuve: "Des formations <b>gratuites</b>, prises en charge par France Travail et nos partenaires publics.",
        cta: { label: "Découvrir nos parcours", href: "#/insertion" } },
      { key: "pro", tag: "Vous êtes du secteur", title: "Recruter, former,", titleAccent: "faire évoluer vos équipes.",
        text: "Restaurateurs, cheffes et chefs, responsables RH : recrutez des personnes formées et formez vos équipes, avec des gens de cuisine.",
        img: "images/beauxmets-images/lbm-jobdating-pain.jpg", imgAlt: "Valentin Majan, des Beaux Mets, montre la découpe du pain à des candidats lors d'un job dating",
        lignes: [
          { dt: "Former", dd: "Prévention des violences sexistes et sexuelles, management juste et inclusif." },
          { dt: "Recruter", dd: "Stagiaires, Book de l'emploi, préparation à l'emploi financée par France Travail (POEI)." },
        ],
        preuve: "Des formations proposées par le programme Restaure.",
        cta: { label: "Travailler avec Festin", href: "#/restauration" } },
    ],
  },
  // Frise des projets : cartes cliquables vers chaque page
  jalons: {
    title: "Près de quarante ans", titleAccent: "dans les cuisines.",
    lede: "Festin est né dans une cuisine, en 1987. Depuis, chaque projet est né d'un besoin rencontré sur le terrain, aux côtés des chefs et des restaurants.",
    items: [
      { year: "1992", title: "La Table de Cana Marseille", desc: "Le premier projet : un traiteur où des salariés en insertion apprennent la cuisine en travaillant.", color: "#E8A825", dark: true, photo: "images/latable de cana/tabledecana_cdutrey_160124-4393.jpg", href: "#/projets/la-table-de-cana" },
      { year: "2015", title: "Des Étoiles et des Femmes", desc: "Des femmes se forment à la cuisine avec des chefs. Le dispositif compte aujourd'hui 13 antennes.", color: "#C2421C", dark: false, photo: "images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg", href: "#/projets/des-etoiles-et-des-femmes" },
      { year: "2022", title: "Les Beaux Mets", desc: "Un restaurant ouvert au public dans la prison des Baumettes, à Marseille.", color: "#217078", dark: false, photo: "images/beauxmets-images/LBM_cdutrey_071122-7264.jpg", href: "#/projets/les-beaux-mets" },
      { year: "2024", title: "Le programme Restaure", desc: "Transformer les pratiques de la restauration : conditions de travail, inclusion, impact écologique.", color: "#7E4590", dark: false, photo: "images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg", href: "#/projets/restaure" },
      { year: "2026", title: "L'Académie Festin", desc: "Festin devient organisme de formation en partenariat avec Estello Formation, organisme certifié Qualiopi.", color: "#FEFCF8", dark: true, photo: "images/photo-cuisine-formation.jpg", href: "#/academie" },
    ],
  },
  // Paroles de personnes accompagnées, mot pour mot, déjà publiées sur les pages
  // projet (RETOURS-AUDIT §2.1 et §2.12, question 7 : réponse A)
  voix: {
    title: "Ils et elles", titleAccent: "racontent.",
    items: [
      { name: "Hafida", meta: "Promotion lilloise 2023-2024, Des Étoiles et des Femmes", photo: "images/images-def/portrait-hafida.jpg",
        quote: "Aujourd’hui, je travaille au restaurant L’Annexe à Lille, où j’ai effectué mes stages grâce au programme. Je suis fière de mon parcours, indépendante et heureuse d’avoir su franchir toutes ces étapes.",
        href: "#/projets/des-etoiles-et-des-femmes", lien: "Des Étoiles et des Femmes" },
      { name: "Oumar", meta: "Ancien salarié en insertion, La Table de Cana Marseille",
        quote: "J’ai passé deux ans à La Table de Cana. Ça m’a vraiment aidé à savoir m’organiser et à avoir confiance en mes compétences. Aujourd’hui, j’ai un CDI chez Compass à la Tour CMA-CGM.",
        href: "#/projets/la-table-de-cana", lien: "La Table de Cana Marseille" },
      { name: "Chef Davin", meta: "InterContinental Marseille, a recruté Sami, un commis formé aux Beaux Mets", photo: "images/pros/davin-sami.jpg",
        quote: "Sami s'est très vite intégré à l'équipe.",
        href: "#/projets/les-beaux-mets", lien: "Les Beaux Mets" },
      { name: "Ancien apprenant", meta: "Promotion Tournesol",
        quote: "Merci de m’avoir donné l’opportunité d’apprendre la langue et de me former pour entrer dans le monde du travail.",
        href: "#/parcours/tournesol", lien: "La formation Tournesol" },
    ],
  },
  citationEdito: {
    text: "L'excellence et la solidarité ne sont pas des mondes séparés.",
    auteur: "Jérôme Schatzman, Armand Hurault, Marine Vever",
    role: "Président, directeur général et directrice adjointe de Festin, édito du rapport d'activité 2025",
  },
});

// ============================================================
//  INSERTION — bloc pour les prescripteurs (29/09/2026).
//  Conditions tirées de FESTIN_DATA.formations ; contact : null
//  = [À COMPLÉTER] (adresse par projet à fournir par l'association).
// ============================================================
window.FESTIN_DATA.orienter = [
  { id: "des-etoiles-et-des-femmes", tags: [["Pour", "femmes en recherche d’emploi"], ["Où", "13 villes en France"], ["Durée", "4 à 11 mois"], ["Coût", "gratuit"]], pour: "Des femmes en recherche d’emploi, de 18 ans ou plus", quoi: "Une formation diplômante en cuisine, de 4 à 11 mois, avec des stages en restaurant, dans 13 villes.", conditions: "Être majeure ; parler le français au niveau B1 ou B2 selon le diplôme." },
  { id: "tournesol", tags: [["Pour", "personnes réfugiées ou primo-arrivantes"], ["Où", "Marseille"], ["Durée", "5 mois"], ["Coût", "gratuit"]], img: "images/tournesol:formation/Formation-Tournesol_RefugeeFood_©Aglae-Bory-67.jpg", pour: "Des personnes réfugiées ou primo-arrivantes, majeures, autorisées à travailler en France", quoi: "Cinq mois pour le titre de commis de cuisine et le DCL, un diplôme de français, à Marseille.", conditions: "Être autorisé à travailler en France ; parler le français au niveau A2 au moins. France Travail rémunère les stagiaires." },
  { id: "la-table-de-cana", tags: [["Pour", "salariés en insertion"], ["Statut", "emploi salarié"], ["Où", "Marseille"]], pour: "Des salariés en insertion, à Marseille", quoi: "Un emploi au traiteur, avec une formation en cuisine, puis un poste chez un partenaire.", conditions: null },
];
