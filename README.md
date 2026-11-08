# Pêche

Un jeu de pêche : lance ta ligne, attends la touche, ferre au bon moment et fatigue le poisson pour le remonter. 153 espèces réparties sur 7 lieux, chacune avec ses heures, sa météo et ses appâts préférés, une boutique de cannes et d'appâts, une collection, des défis du jour et un niveau de pêcheur.

*English version: [README.en.md](README.en.md)*

## Pêcher, étape par étape

1. **Lancer** : maintiens le clic ou **Espace** pour doser la force, relâche pour lancer. Un lancer plus loin donne plus de chances de prendre un poisson rare, mais il faudra le ramener de plus loin.
2. **Attendre** : le bouchon frémit parfois sans raison. Attends la **vraie touche**.
3. **Ferrer** : clique vite à la touche. Un **ferrage parfait** (en moins d'un quart de seconde) fatigue déjà le poisson et le rapproche.
4. **Combattre** :
   - **maintiens** le clic ou Espace pour remonter la ligne ;
   - **relâche** quand le poisson tire fort, sinon la tension monte et la ligne casse ;
   - quand il part à gauche ou à droite, **contre** avec ← → (ou la souris) dans l'autre sens : tu remontes plus vite, avec moins de tension, et il se fatigue ;
   - les gros poissons sportifs **sautent** : relâche pendant le saut pour le fatiguer d'un coup ;
   - un poisson épuisé se laisse ramener vite. Si la ligne reste trop longtemps détendue, ou s'il s'éloigne trop, il s'échappe.

On peut aussi remonter une vieille botte ou un **coffre au trésor** (des pièces et 5 appâts).

## Les lieux

| Lieu | Prix |
|---|---|
| Étang des saules | gratuit |
| Rivière claire | 600 pièces |
| Lac de montagne | 1 800 pièces |
| Côte rocheuse | 3 500 pièces |
| Lagon tropical | 8 000 pièces |
| Banquise | 14 000 pièces |
| Abysses | 30 000 pièces |

Plus le lieu est lointain, plus ses poissons valent cher. Le temps passe dans le jeu (une seconde réelle vaut une minute) : aube, jour, crépuscule et nuit, avec une météo qui change selon le lieu (ciel clair, nuageux, pluie, orage, brouillard, neige).

## Les poissons

Chaque espèce a une rareté (commun, peu commun, rare, épique, légendaire), une taille minimale et maximale, des lieux, des heures (le jour, à l'aube et au crépuscule, la nuit, ou à toute heure), parfois une météo (sous la pluie, par beau temps, quand il neige) et des appâts préférés, qui la font mordre bien plus souvent.

Un poisson se vend selon sa rareté, sa taille par rapport à son espèce et le lieu. Une **série** de prises sans en rater augmente le gain, jusqu'à +50 %.

## La boutique

- **Cannes** : bambou (de départ), fibre (400), carbone (1 800), compétition (6 000) et stellaire (18 000). Une meilleure canne tient plus de tension, remonte plus vite et attire davantage les poissons rares.
- **Appâts** : pain (gratuit et illimité), vers de terre, asticots, crevettes, leurre, calamar et appât lumineux, vendus par lots de 10 à 25 lancers. Certains font aussi mordre plus vite.
- **Lieux** : à débloquer avec tes pièces.

## Collection, défis et niveau

- **Collection** : chaque espèce découverte, avec sa fiche (lieux, heures, météo, appâts) et ta plus grosse prise ; les autres restent cachées.
- **Défis** : trois défis par jour, à récompense en pièces (pêcher un nombre de poissons, un poisson rare, réussir des ferrages parfaits, une prise presque à la taille maximale, une nouvelle espèce, une série, des poissons la nuit, un coffre).
- **Niveau de pêcheur** : chaque prise donne de l'expérience (plus pour un poisson rare, une nouvelle espèce ou un ferrage parfait). Chaque niveau remonte un peu plus vite et attire un peu plus les poissons rares.

## Données et synchronisation

Toute la partie (pièces, matériel, lieux, collection, défis, niveau et heure du jeu) est enregistrée par NeoDex, sauvegardée et synchronisée entre tes PC si la synchro est activée. Au premier lancement, le plugin reprend ce que tu avais déjà dans NeoDex.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Pêche → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
