# Audit de l’architecture

Cette note regroupe les problèmes relevés dans l’application et les pistes d’amélioration associées. Elle distingue l’organisation du code, les duplications, le typage et la responsabilité des composants.

## Priorisation selon l’impact

1. **Priorité haute — fiabilité et erreurs d’exécution :** vérifier qu’un pays existe avant d’accéder à ses propriétés et coordonner la lecture de la route avec le chargement des données. Une erreur peut empêcher l’affichage d’une page pays.
2. **Priorité haute — accès aux données et logique métier :** centraliser les requêtes et les transformations réutilisables dans le service. Leur duplication complique les changements de source et peut entraîner des comportements incohérents entre pages.
3. **Priorité moyenne — migration de tous les composants vers standalone :** rendre chaque composant standalone, déclarer ses dépendances directement dans son tableau `imports`, puis remplacer les modules racine et de routage par `bootstrapApplication` et une configuration de routes adaptée. Cette migration modernise l’architecture et rend les dépendances plus explicites, sans corriger à elle seule un défaut fonctionnel immédiat.
4. **Priorité moyenne — typage et calculs :** remplacer `any` par des types adaptés et garder les valeurs numériques sous forme de nombres afin de détecter plus tôt des erreurs de structure ou de calcul.
5. **Priorité moyenne à faible — duplication de présentation :** extraire les en-têtes et les statistiques dans des composants réutilisables pour réduire le coût des changements visuels et les risques de divergence.
6. **Priorité faible — nettoyage :** retirer les dépendances inutilisées et les traces de diagnostic.

## 1. Structure

Les composants sont déclarés dans [`AppModule`](./src/app/app.module.ts) et les routes dans [`AppRoutingModule`](./src/app/app-routing.module.ts).

Les dépendances des composants sont centralisées dans des modules, plutôt qu’explicitées là où elles sont utilisées.

Envisager une migration vers des composants standalone, et une configuration de routes exportée.

Les pages sont regroupées sous `src/app/pages`, tandis que les composants réutilisables appartiennent à `src/app/components`.

Cette séparation distingue les pages routées des éléments d’interface réutilisables. Conserver cette organisation.

Ajouter des dossiers `models` et `services` lorsque les types et la logique métier en ont besoin.

## 2. Duplication

[`HomeComponent`](./src/app/pages/home/home.component.ts) et [`CountryComponent`](./src/app/pages/country/country.component.ts) chargent chacun directement le même fichier JSON. L’accès aux données, la gestion des erreurs et les changements futurs de source sont répétés dans les pages. Centraliser le chargement dans un service de données et exposer des méthodes typées sous forme d’Observables.

Les pages extraient et agrègent les données de participation pour leurs graphiques et statistiques. La logique de transformation risque de diverger si elle est modifiée séparément. Réutiliser des méthodes du service pour produire des données prêtes à afficher, en évitant de dupliquer les calculs.

### Captures des problèmes relevés

Chargement HTTP, traitement des données et calcul des statistiques et du graphique dans `HomeComponent` :

[HomeComponent : chargement HTTP, typage any et calculs](<./Capture d’écran 2026-11-03 à 15.10.41.png>)

Dans `CountryComponent`, on retrouve le chargement HTTP et les calculs, avec en plus des conversions de nombres en chaînes puis en nombres :

[CountryComponent : chargement HTTP, typage any et conversions redondantes](<./Capture d’écran 2026-11-03 à 15.12.53.png>)

### Duplication du HTML des en-têtes et statistiques

Les templates d’accueil et de pays construisent tous deux la même structure d’en-tête (`center`, titre) et de statistiques (`split`, libellé et valeur). Seuls le titre et les statistiques affichés diffèrent. Extraire cette présentation dans un composant `PageHeader`, puis un composant `Stat` réutilisable pour chaque paire libellé/valeur.

Template de la page pays : titre et trois blocs de statistiques écrits directement dans le HTML.

[Template pays : structure HTML répétée pour le titre et les statistiques](<./Capture d’écran 2026-11-03 à 15.19.25.png>)

Template de l’accueil : même structure d’en-tête et de statistiques, avec deux blocs.

[Template accueil : structure HTML similaire à extraire dans PageHeader et Stat](<./Capture d’écran 2026-11-03 à 15.19.40.png>)

## 3. Typage

Les réponses JSON sont typées avec `any[]` et plusieurs callbacks utilisent `any`. TypeScript ne peut pas vérifier les propriétés des pays et des participations ce qui pourrait impliquer que des erreurs de forme de données passent inaperçues. 

Définir des interfaces pour les pays, les participations, les statistiques et les chart



`totalEntries` et des accumulateurs de calcul sont déclarés avec `any`.
Les erreurs de type sont masquées même lorsque les valeurs attendues sont des nombres. Utiliser des types explicites, par exemple `number`, et typer les accumulateurs de `reduce`.

Les nombres de médailles sont convertis en chaînes avant d’être reconvertis pendant leur addition. Les données du graphique linéaire sont ainsi déclarées comme `string[]`. Les conversions sont inutiles et le type ne reflète pas la donnée numérique utilisée par le graphique.

## 4. Placement des responsabilités

Les appels HTTP, les transformations de données et les calculs de statistiques sont réalisés dans les composants de page. Les composants cumulent l’accès aux données, la logique métier et la présentation, ce qui complique leur évolution et leurs tests. Déplacer le chargement et les calculs réutilisables dans un service, laisser aux composants la composition de l’écran et les interactions utilisateur.

La création et la configuration de Chart.js sont faites dans les pages.  La logique des graphiques est couplée à la logique propre à chaque page. Confier la configuration et le cycle de vie des graphiques à des composants ou helpers dédiés.
Dans `CountryComponent`, le paramètre de route est lu dans une souscription distincte du chargement des données, le pays trouvé est utilisé sans vérifier qu’il existe. Le chargement peut utiliser une valeur de route non synchronisée, et un pays inconnu peut provoquer une erreur à l’exécution. Composer la lecture du paramètre et le chargement avec des opérateurs RxJS comme `switchMap`, puis traiter explicitement le cas d’un pays absent.
`Router` est injecté dans `CountryComponent` sans être utilisé, et `HomeComponent` contient des `console.log` de diagnostic. Des dépendances inutiles et des traces temporaires alourdissent le code. Retirer l’injection inutilisée et supprimer les logs de diagnostic, conserver une gestion d’erreur explicite adaptée à l’interface.


## Priorisation selon l’impact

1. **Impact élevé — fiabilité des données et erreurs d’exécution :** vérifier qu’un pays existe avant d’accéder à ses propriétés et coordonner la lecture de la route avec le chargement des données. Une erreur ici peut empêcher l’affichage d’une page pays.
2. **Impact élevé — accès aux données et logique métier dans les pages :** centraliser les requêtes et les transformations réutilisables dans le service. Leur duplication complique les changements de source et peut entraîner des comportements incohérents entre pages.
3. **Impact moyen — typage et calculs :** remplacer `any` par des types adaptés et garder les valeurs numériques sous forme de nombres. Cela permet de détecter plus tôt des erreurs de structure ou de calcul.
4. **Impact moyen à faible — duplication de présentation :** extraire les en-têtes et les statistiques dans des composants réutilisables. Cela réduit le coût des changements visuels et les risques de divergence entre pages.
5. **Impact faible — organisation et nettoyage :** retirer les dépendances inutilisées et les traces de diagnostic, puis envisager les évolutions structurelles qui n’améliorent pas directement le comportement fonctionnel.