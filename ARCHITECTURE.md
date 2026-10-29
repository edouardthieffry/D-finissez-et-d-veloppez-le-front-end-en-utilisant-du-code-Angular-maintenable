Architecture app

Application Angular 18 / refactoring en vue d'une implémentation de donnée provenant d'un Back-end Futur

Arborescence des fichiers

src/app/
├── app-routing.module.ts        # routes de l'application
├── app.component.ts             # template global de l'app
├── app.component.scss           # template global style
├── app.component.html           # template global html
│
├── models/
│  ├── olympic.ts                # interface Olympic
│  ├── participation.ts          # interface Participation
│  ├── pie-chart.ts              # interface PieChart
│  ├── line-chart.ts             # interface LineChart
│  └── stat.ts                   # interface StatItem (indicateur libellé/valeur)
├── services/
│  └── olympic.service.ts        # Accès centralisé aux données


├── components/                  # composants réutilisables
│   ├── app-header/              # header de l'app avec navigation 
│   ├── stat/                    # Stats item title + value 
│   ├── page-header/             # Title + liste Stats item title + value 
│   ├── pie-chart/               # Diagramme Chart + navigation
│   ├── line-chart/              # Diagramme courbe 
│   └── loading/                 # indicateur de chargement (spinner)
│
└── pages/                       # composants routés (un par écran)
    ├── home/                    # dashboard : pie chart + stats
    ├── country/                 # détail pays : line chart + stats
    └── not-found/               # page d'erreur : page ou pays inexistant


Modèles

on crée des modèles de données pour ne pas avoir a dupliquer le code partout, on pourra y associer plus tard des methodes qui feront le lien avec les données du services. on y type les données de manière strict.

Olympic : { id, country, participations: Participation[] }.
Participation : { id, year, city, medalsCount, athleteCount }.
Stat : { label, value } — indicateur générique affiché par le header.
PieChart : { title, canvasId, labels, data, chart }
LineChart : { title, canvasId, labels, data, chart }


Service

olympic.service.ts On y centralise les données en l'injectant à la racine du projet pour quelles soient disponible et modifiable partout, cela nous permettra d'implementer plus facilement la liaison avec le Back-end en ne modifiant que ce fichier pour le traitement des données, (Ajout, Suppression)

Pages

on differencie nos deux page qui appeleront chacun leurs composants nécessaire.
Elles heriteront de app.component, qui integrera le header (Titre + navigation) et le composant de gestion de route <router-outlet />

Components

Dans chaque dossier de composant, on à les trois fichiers relatif aux composants (.html, .scss, .ts)





