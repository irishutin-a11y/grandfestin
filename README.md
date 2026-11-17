# Site_Festin

Site officiel de l'association Festin — structure **plug & play** prête à recevoir vos assets finaux.

```
Site_Festin/
├── index.html              ← point d'entrée du site
├── components/             ← composants React (Nav, Hero, Pages, etc.)
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── Sections.jsx
│   ├── Pages.jsx
│   └── Formations.jsx
├── data/
│   └── data.js             ← toutes les données du site (FESTIN_DATA)
├── styles/
│   ├── styles.css          ← styles spécifiques aux composants
│   └── _tokens.css         ← tokens de design (couleurs, typo, espacements)
├── images/                 ← LOGOS & PHOTOS — dépose tes assets ici
│   ├── logo-festin.png
│   ├── logo-qualiopi.png
│   ├── photo-*.jpg
│   ├── totem-festin-*.png
│   └── partners/
└── typos/                  ← FONTS — déposer ici les .ttf/.otf
    ├── KoHo-Light.ttf
    ├── KoHo-Regular.otf
    ├── KoHo-Bold.ttf
    └── festin-display.ttf
```

## Plug & play

* **Logos / photos :** dépose tes fichiers dans `images/` en respectant les noms existants. Les composants pointent déjà vers ces chemins. Pour de nouveaux fichiers, édite uniquement `data/data.js` (champs `img`, `logo`, etc.).
* **Polices :** dépose un nouveau `.ttf` ou `.otf` dans `typos/` et déclare la face dans `styles/_tokens.css`.
* **Contenu textuel :** tout le copy (titres, descriptions, témoignages, statistiques) vit dans `data/data.js`. Aucune mise à jour de markup nécessaire pour changer le wording.

## Données factuelles — sources

Les chiffres clés actuels (203 personnes accompagnées en 2025, 83 % de sorties dynamiques, 14 territoires) proviennent de la **Plaquette Offre restaurateurs Festin 2025**. Les valeurs marquées « À compléter — source : rapport d'activité 2025 » dans le code attendent l'extraction des données du rapport d'activité (PDF actuellement non textuel).

À compléter dans `data/data.js` ou directement dans `components/Pages.jsx` :

* Noms et photos de l'équipe (composant `EquipeMarquee`)
* Témoignages réels (clé `testimonials` de `FESTIN_DATA`)
* Statistiques détaillées par projet (clé `stats` de chaque entrée `projets`)
* Prix, labels, retombées presse (composant `ImpactPage`)

## Lancer le site

Ouvre simplement `index.html` dans un navigateur, ou sers le dossier avec n'importe quel serveur statique :

```bash
cd Site_Festin
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Site non indexé avant validation (depuis le 17/11/2026)

Le site reste accessible par lien, mais les moteurs de recherche ne doivent pas l'indexer tant qu'il n'est pas validé. Trois réglages le garantissent. **Les retirer au lancement officiel :**

1. **Balise dans le `<head>`** : `<meta name="robots" content="noindex, nofollow" />` dans `index.html`, `mentions-legales.html`, `footer-maquettes.html`, `maquettes/home-b.html` et `maquettes/home-double-cible.html`. Les retirer de `index.html` et `mentions-legales.html` ; celles des maquettes peuvent rester. `sadi-carnot.html` avait déjà la sienne pour une autre raison (page de campagne en attente de validations) : ne la retirer que lorsque cette page est validée.
2. **En-tête HTTP** : la règle `"source": "/(.*)"` avec `X-Robots-Tag: noindex, nofollow`, en tête de `headers` dans `vercel.json`. Elle couvre toutes les adresses, images et PDF compris. La supprimer.
3. **robots.txt** : remettre la ligne `Sitemap: https://www.grandfestin.com/sitemap.xml` sous `Allow: /`. Ne jamais ajouter de `Disallow` : Google doit pouvoir relire les pages pour constater la levée du noindex. `sitemap.xml` est conservé tel quel.

Après le retrait : vérifier avec `curl -I https://www.grandfestin.com/` que l'en-tête `X-Robots-Tag` a disparu, puis soumettre le sitemap dans Google Search Console.
