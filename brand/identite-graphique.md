# Identité graphique — SmyleBreak

> Ce fichier est la seule source de vérité visuelle du projet.
> Les valeurs renseignées ici seront converties en variables Tailwind CSS (`theme.extend.colors`).

## Univers

SmyleBreak est un artiste vidéo indépendant. L'univers graphique s'appuie sur le vocabulaire
du cinéma et de la vidéo : timecode, REC, lecture, perforations de pellicule, regard caméra.
L'ambiance est **créative, directe et forte** : fonds sombres, aplats de couleur et
typographie imposante. Aucune photographie / background image sur la homepage : tout est
dessiné en couleur, dégradé et typographie.

## Couleurs

### Couleurs principales

| Rôle           | Nom CSS       | HEX        | Variable Tailwind prévue | Usage |
| -------------- | ------------- | ---------- | ------------------------ | ----- |
| Couleur primaire | `brand.primary` | `EBE406` | `primary` | Accents, mots-clés, logo (variante jaune), RTF, focus |
| Couleur secondaire | `brand.secondary` | `0091AD` | `secondary` | CTA principaux, liens actifs, halos de fond |
| Couleur d'accent | `brand.accent` | `CC2936` | `accent` | Signal urgent uniquement : REC, erreurs, soldes, dot caméra |

### Couleurs de fond

| Rôle           | Nom CSS       | HEX        | Variable Tailwind prévue |
| -------------- | ------------- | ---------- | ------------------------ |
| Fond clair     | `brand.bg-light` | `F5FOF6` | `bg-light` |
| Fond sombre    | `brand.bg-dark` | `222222` | `bg-dark` |
| Fond alternatif | `brand.bg-alt` | `1C1C1C` | `bg-alt` |

### Couleurs de texte

| Rôle           | Nom CSS       | HEX        | Variable Tailwind prévue |
| -------------- | ------------- | ---------- | ------------------------ |
| Texte principal | `brand.text` | `FFFFFF` | `text` |
| Texte secondaire | `brand.text-muted` | `B3B3B3` | `text-muted` |
| Texte sur fond sombre | `brand.text-inverse` | `222222` | `text-inverse` |

## Typographie

| Élément            | Police        | Poids | Taille / Règle |
| ------------------ | ------------- | ----- | -------------- |
| Titres (display)   | Anton         | 400   | `clamp(2.5rem, 6vw, 4.75rem)`, lettres capitales, `letter-spacing: -0.01em` |
| Sous-titres / blocs | Space Grotesk | 700   | `1.25rem–2rem` |
| Corps              | Space Grotesk | 400   | `1rem`, interligne `1.7` |
| UI / boutons       | Space Grotesk | 600   | `0.9–1rem` |
| Métadonnées (REC, timecode, tags, eyebrow) | Space Grotesk | 500 | `0.78–0.9rem`, `text-transform: uppercase`, `letter-spacing: 0.12–0.18em` |

Chargement : Google Fonts — familles `Anton` et `Space Grotesk` (fields `400;500;600;700`).

Contraste :

- Titre principal sur `bg-dark` : blanc, avec accent `primary`.
- Jamais de titres en `primary` sur grande surface (lisibilité) : le jaune est réservé aux
  mots-clés et aux métadonnées.

## Logo

- Fichier source officiel : `brand/logos/logo_mono.svg` (monochrome, recolorable via `currentColor`).
- Fichiers dérivés dans : `brand/logos/` / `brand/backgrounds/`.

### Règle impérative — un logo uniforme (monochrome)

> Le logo SmyleBreak est **monochrome et uniforme** : toutes ses parties
> (wordmark **et** smile) doivent être dans **une seule et même couleur**.
>
> **Interdiction :** mélanger deux couleurs dans un même usage du logo
> (ex. un wordmark blanc associé à un smile jaune / coloré). Cette combinaison est proscrite.
>
> Variantes autorisées :
>
> 1. **Blanc** — sur fond sombre (`bg-dark`, `bg-alt`).
> 2. **Primary (jaune)** — sur fond sombre, pour des usages accent/RTF.
> 3. **Text-inverse (noir)** — sur fond clair (`bg-light`).
>
> Le logo se recolore via la propriété CSS `color` (`fill: currentColor`).

### Espacement

- Espacement minimal autour du logo : égale à la hauteur du « x » de la wordmark.
- Ne jamais recadrer, étirer, réorienter ou refondre le logo.
- La smile seule : tolérée comme marque décorative, toujours monochrome et cohérente
  avec la couleur du contexte.

## Règles d'usage

- CTA principal : fond `secondary`, texte blanc, bouton pilule, ombre teal portée.
- CTA secondaire : contour blanc translucide, gagne `primary` au survol.
- **Ne pas combiner** `primary` (jaune) avec `bg-light` (fond clair) sans bordure/ombre :
  contraste insuffisant.
- `accent` (rouge) réservé au signal : dot REC, curseur caméra, alertes.
- Fonds de sections : `bg-dark` / `bg-alt` exclusivement pour la homepage, avec halos
  radiaux `primary`/`secondary` en très faible opacité (≤ 0.16).
- Métadonnées vidéo (REC, timecode, tags) en `text-muted`, exceptions en `primary`.
- Rayons de bordure : `999px` pour pilule (badges, boutons, tags) ; jamais de coins
  agressifs dans l'univers SmyleBreak.
- Animation : entrées en `power2.out`, micro-interactions ≤ 200ms.