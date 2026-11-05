# DualShop

Maquette de boutique en ligne réalisée en HTML, CSS et JavaScript natifs.

> Ce projet est un prototype frontend : les comptes, favoris, paniers et commandes sont stockés localement dans le navigateur. Le paiement et la confirmation de commande sont simulés ; aucune commande commerciale ni aucun paiement réel ne sont traités.

## Lancer le projet

Ouvrez `index.html` dans un navigateur. Pour un environnement de développement plus proche d’un site web classique, servez le dossier avec un serveur HTTP local.

## Publier sur GitHub Pages

Le workflow GitHub Actions du projet publie automatiquement le site à chaque push sur `main` ou `master`.

1. Créez un dépôt GitHub et poussez-y les fichiers du projet, en conservant le dossier `.github/workflows/`.
2. Dans le dépôt, ouvrez **Settings > Pages** et sélectionnez **GitHub Actions** comme source de déploiement.
3. Après la fin du workflow **Deploy static site to GitHub Pages**, ouvrez l’URL affichée dans le résumé du déploiement.

Le site étant un prototype frontend, les comptes et les commandes restent simulés et les données sont stockées dans le navigateur.

## Fonctionnalités de démonstration

- Pages d’accueil, catalogue, détail produit, panier et connexion.
- Identité DualShop avec logo SVG, accueil aux accents violets, cartes produits animées au survol et menu mobile accessible.
- Mise en page adaptée à tous les écrans.
- Catalogue avec recherche, filtres par catégorie et tri alimentés par `data/products.js`.
- Favoris et panier (quantités, suppression, livraison offerte dès 80 €) conservés dans `localStorage` et synchronisés entre les onglets ouverts.
- Parcours de commande de démonstration avec validation des coordonnées, récapitulatif et confirmation. Aucun paiement n’est effectué et les coordonnées ne quittent pas le navigateur.
- Formulaire de connexion simulé côté navigateur (aucune authentification réelle).

## Structure

- `css/` : styles globaux, composants et adaptation mobile.
- `js/` : logique des pages, produits, panier, favoris, commande, recherche et connexion.
- `data/` : données de démonstration des produits.
- `assets/` : emplacements pour les images, icônes et logos.
