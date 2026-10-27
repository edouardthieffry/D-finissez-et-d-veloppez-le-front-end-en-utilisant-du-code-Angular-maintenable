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
│  └── stat.ts                   # interface StatItem (indicateur libellé/valeur)
├── services/
│  └── olympic.service.ts        # Accès centralisé aux données


├── components/                  # composants réutilisables (UI)
│   ├── app-header/              # header de l'app avec navigation 
│   ├── stat/                    # Stats item title + value 
│   ├── page-header/             # Title + liste Stats item title + value 
│   ├── pie-chart/               # Diagramme Chart 
│   ├── line-chart/              # Diagramme courbe 
│   └── loading/                 # indicateur de chargement (spinner)
│
└── pages/                       # composants routés (un par écran)
    ├── home/                    # dashboard : pie chart + stats
    ├── country/                 # détail pays : line chart + stats
    └── not-found/               # page d'erreur : page ou pays inexistant


Modèles

Olympic : { id, country, participations: Participation[] }.
Participation : { id, year, city, medalsCount, athleteCount }.
Stat : { label, value } — indicateur générique affiché par le header.
