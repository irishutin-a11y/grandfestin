# Maquette de la page Professionnels (30/09/2026)

Branche `maquette-pros`, adresse `#/accompagnement/professionnels`.
Code : `components/Accompagnement.jsx` (`AccompagnementProsPage`), styles : `styles/pros.css`.
Captures : `captures/pros-360.jpg`, `pros-768.jpg`, `pros-1440.jpg`, plus deux états dépliés (`pros-1440-accordeon-ouvert.jpg`, `pros-1440-poei-ouvert.jpg`).

## 1. Ce que je retiens des références

| Référence | Ce que je retiens | Ce que j'écarte, et pourquoi |
|---|---|---|
| **RIPE** | L'alternance de température (sombre, clair, coloré) : chaque changement de fond signale un changement de sujet. La variation de largeur : plein cadre, puis bloc encarté, puis carte étroite centrée. La bande défilante comme respiration. | La typo condensée d'affiche, les autocollants, le logo géant en pied de page, le carrousel Instagram. C'est une marque qui se met en scène ; un restaurateur ou un financeur y perd du temps. |
| **Butterfly** | Le split titre court à gauche / contenu à droite (Recruter, S'engager). Une seule bande saturée pleine largeur, comme ponctuation au milieu : ici la bande or. | Les mots soulignés en décor, les pictogrammes de « piliers », la grille de quatre cartes, les illustrations. C'est de la démonstration graphique sans information. |
| **One Good Thing** | La carte flottante sur fond contrasté (le témoignage). Les lignes de liste colorées : même structure, chaque ligne a sa teinte (les trois façons de recruter). | Le fond à motifs, le badge circulaire qui tourne, le dégradé, la typo ludique. Le ton est trop joueur pour des institutions. |
| **ACPAV** | Les micro-étiquettes qui typent chaque élément (Moment, Envoi, Financement, Contrat, Durée, Pour). Le titre surdimensionné qui chevauche le bloc voisin (S'engager, en fin de page). | Les titres en contour transparent sur photo (illisibles), la grille de cartes film. La seule grille autorisée par page n'est pas nécessaire ici. |
| **Blocs Services** | Le gros bloc coloré comme unité de contenu, avec un accordéon à l'intérieur (Former vos équipes). | « Package 1 / 2 » : numéroter des offres contredit la règle « une signalétique = un sens » et le ton de partenariat. Et une suite de blocs colorés identiques recrée la monotonie qu'on veut casser. |

## 2. Vocabulaire d'archétypes (8 au plus) et composition

Le vocabulaire est fixé pour tout le site. La page Pros en emploie six, jamais deux fois de suite.

| # | Archétype | Sur la page Pros | Fond | Largeur | En une colonne (mobile) |
|---|---|---|---|---|---|
| 1 | **Plein cadre** : photo, texte en surimpression | Hero | sombre (photo + voile) | pleine | Voile plus dense, boutons en pleine largeur l'un sous l'autre. |
| 2 | **Bloc encarté à accordéon** | Former vos équipes | bloc teal sur blanc | encartée, marges visibles | Titre, puis étiquettes en ligne, puis accordéon ; marges réduites à la gouttière. |
| 3 | **Bande défilante** | Les projets de Festin | aplat or | pleine | Même bande, texte plus petit ; en mouvement réduit, liste fixe centrée sur plusieurs lignes. |
| 4 | **Lignes typées** : couleur et micro-étiquettes par ligne, titre court à gauche | Recruter une personne formée | crème | normale (split 4/8) | Titre au-dessus ; chaque ligne empile titre, texte, étiquettes, action ; les étapes POEI s'empilent (numéro à gauche). |
| 5 | **Carte flottante** | Témoignage du chef Davin | teal profond | étroite, centrée | Image au-dessus (16/10), texte dessous. |
| 6 | **Titre en chevauchement** | S'engager | blanc (fin de page) | pleine | Le mot garde sa taille relative (15 vw) ; le texte passe sous le mot, avec plus d'écart. |
| 7 | Split asymétrique seul (titre / contenu long) | non utilisé ici | | | |
| 8 | Grille de cartes, une fois par page au plus | non utilisée ici | | | |

Température le long de la page : sombre · clair avec bloc teal · or · crème · sombre · blanc.

## 3. Le cas d'école : « Recruter une personne formée » / « Accueillir un candidat, étape par étape »

**Diagnostic** : je confirme vos sept constats. Le fond du problème : la POEI, qui est une option parmi trois, avait une section entière. Elle pesait autant que le reste du recrutement, sans que le lecteur sache que c'était le dépliage de la troisième carte.

**Option 1 : la seconde section reste sur la page, avec un traitement radicalement différent** (par exemple une frise pleine largeur sur fond sombre).
- Avantage : les étapes restent visibles sans clic.
- Contreparties : deux sections pour un seul sujet ; la POEI pèse toujours plus que les deux autres options ; il faut écrire la relation (« la POEI en détail ») dans un titre de plus. La page reste longue.

**Option 2 : elle descend d'un niveau.**
- **2a, page dédiée** : il y a de la place pour détailler (conditions, documents), c'est une adresse à partager. En contrepartie, cela fait une page de plus dans une arborescence qu'on veut simplifier, pour trois étapes seulement, et un clic qui fait sortir de la page.
- **2b, dépliage sous la ligne concernée** : la relation se voit, puisque la ligne s'ouvre sur ses propres étapes. En contrepartie, les étapes sont masquées par défaut.

**Recommandation, implémentée : 2b.** La ligne POEI porte un bouton « Voir les 3 étapes » (un vrai bouton, `aria-expanded`), et le contrat de 4 mois reste visible en micro-étiquette même replié. La page dédiée ne se justifiera que si la POEI prend plus de contenu (conditions, pièces à fournir).

**Correctifs associés** :
- Les options n'ont plus de numéros. Les seuls numéros de la page sont les trois étapes de la POEI, dans un ordre imposé.
- « 4 mois » n'est plus un chiffre-vedette isolé : c'est une micro-étiquette comme « 48 h ouvrées » ou « France Travail ». Le dispositif devient un motif.
- Chaque ligne a son action. Celle qui n'en avait pas (accueillir un stagiaire) a maintenant « Proposer un stage ».
- Les titres ne se construisent plus pareil : les sections gardent le titre en deux lignes, les options ont un titre simple sur une ligne.

## 4. Texte : 524 → 298 mots (−43 %)

Mesure : tout le texte du contenu, y compris les réponses repliées, hors menu et pied de page, comptée par script avant et après.

### Ce que j'ai supprimé ou modifié (à contester)

**Supprimé, dont je ne suis pas sûr :**
1. « construites à partir de situations réelles de cuisine et de salle » (bloc Former). C'est un argument de qualité, mais il ne porte ni fait ni chiffre.
2. Le lien « Télécharger le catalogue complet (PDF) ». Le catalogue reste accessible depuis les fiches et l'Académie. Je l'ai retiré parce que le PDF affiche des tarifs, que le brief exclut de cette page.
3. « Si la rencontre fonctionne, vous recrutez » (stagiaire). C'est implicite, mais c'était la promesse de l'option.
4. « individuelle » dans « préparation opérationnelle à l'emploi individuelle ». Le sigle POEI le contient, mais le nom complet est l'intitulé officiel.

**Supprimé, sans perte d'information :**
- La FAQ entière. Ses trois réponses étaient déjà sur la page : les étapes POEI, le porteur des formations (étiquettes du bloc Former) et l'accueil d'un stagiaire (sa ligne).
- La phrase d'introduction du hero, réduite de 34 à 12 mots.
- Le paragraphe de la frise POEI, qui répétait la carte.
- Le texte du bloc Book de l'emploi, qui répétait la carte.

**Reformulé, à vérifier :**
- Durées simplifiées : « Inter (3 h) ou Intra (3 h ou 1 jour / 7 h) » devient « 3 h ou 1 jour » ; « 1 journée (7 h) + 2 demi-journées (2 × 3 h) » devient « 1 jour et 2 demi-journées ». Le détail reste sur les fiches.
- Public de la formation sur les violences : « Tout professionnel de la restauration » devient « Toute l'équipe ».
- Management : « avec un cadre de travail clair » est retiré de la description courte.

**Ajouté :**
- La bande de l'écosystème (les six projets de Festin), pour le rattachement à Festin.
- La ligne S'engager, avec une formulation volontairement générale : « Soutenir un projet comme mécène, ou participer au prochain Grand Festin ».
- Les actions « Proposer un stage » et « Préparer une embauche », qui mènent au Contact.
- Un cadre `[PHOTO MANQUANTE : le chef Davin et Sami en cuisine, plan taille, vertical]` pour le témoignage.

### Vocabulaire
Pas de « devis », « tarif », « offre », « prestation », « client » ni « solution » sur la page. Le reste du site garde « devis » et les tarifs (votre décision, CLAUDE.md mis à jour).

## 5. Contrôles
- Aucun débordement horizontal à 360, 768, 1024, 1440 et 1920 px.
- axe (WCAG 2.1 AA) sans violation, après deux corrections : étiquettes du bloc teal et lien de la ligne corail.
- Accordéon et dépliage POEI : vrais boutons, `aria-expanded`, `aria-controls`, contenu `hidden` quand il est replié.
- Bande défilante : bouton Pause (WCAG 2.2.2) et liste fixe en `prefers-reduced-motion`. Les apparitions (`g-reveal`) sont coupées dans ce mode.
- Aucune erreur dans la console.
