# Audit de l’application

## Architecture Angular

- **Adopter les composants standalone** : démarrer l’application sans `AppModule` et déclarer les dépendances au plus près des composants concernés.
- **Simplifier le routage** : retirer les références à `NgModule` dans la configuration du routage si elle n’est plus nécessaire après le passage aux composants standalone.
- **Ajouter un en-tête commun** : créer un composant `Header` et l’intégrer à `AppComponent` afin qu’il s’affiche sur toutes les pages.

## Organisation du code

- **Revoir l’arborescence de `app`** : supprimer le dossier parent `pages` si cette organisation n’est plus adaptée, puis regrouper chaque composant dans son propre dossier.
- **Créer des dossiers dédiés aux modèles et aux services** afin de séparer clairement les responsabilités.

## Données, Types et services

Tout les traitements sont fait dans le component.

- **Centraliser les accès aux données** : ils sont actuellement dupliqués. Créer un service dédié pour regrouper les interactions avec les données et leur gestion.
- **Définir des modèles de données** : créer les types nécessaires pour décrire les données attendues et les interactions associées.
- **Déplacer les traitements hors des composants** : les données et leurs transformations sont actuellement gérées dans les composants. Les confier au service dédié pour alléger les composants et faciliter la maintenance.
- **Conserver les nombres sous forme numérique** : les nombres de médailles sont convertis en chaînes, puis reconvertis pour calculer les totaux. Garder des valeurs numériques et effectuer les calculs dans le service.
- **Remplacer les `any` par des types explicites** : bien que le mode strict de TypeScript et le contrôle strict des templates soient activés, certains composants contournent le typage. Définir notamment des types pour les pays et leurs participations.

## Routage et gestion des erreurs
- **Supprimer les appels `HTTP` des composants** : présent dans `HomeComponent` et `CountryComponent`
- **Revoir la lecture du paramètre `countryName`** : dans `CountryComponent`, évaluer l’utilisation du snapshot de la route et récupérer les données via le service. Si le composant peut être réutilisé avec des paramètres différents, conserver une approche réactive plutôt que de lire le snapshot une seule fois.
- **Gérer les pays inconnus** : rediriger vers une page d’erreur lorsqu’un `countryName` ne correspond à aucun pays.
- **Supprimer les dépendances inutilisées** : `Router` n’est pas utilisé dans `CountryComponent`.

## Nettoyage

- **Supprimer les appels à `console.log`** : deux appels sont à retirer, dans `home.component.ts`. liste les données de l'app.
- **Vérifier la taille des fichiers** : aucun fichier ne semble actuellement trop volumineux.
