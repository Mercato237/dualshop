# DualShop

Vitrine e-commerce de démonstration construite en HTML, CSS et JavaScript natifs.

> Ce projet est un prototype frontend : les comptes, favoris, paniers et commandes sont stockés localement dans le navigateur. Le paiement et la confirmation de commande sont simulés ; aucune commande commerciale ni aucun paiement réel ne sont traités.

## Lancer le projet

Ouvrez `index.html` dans un navigateur. Pour un environnement de développement plus proche d’un site web classique, servez le dossier avec un serveur HTTP local.

## Publier sur GitHub Pages

Le workflow **Deploy static content to Pages** publie automatiquement le site à chaque push sur `main`.

Dans le dépôt GitHub, **Settings > Pages** doit utiliser **GitHub Actions** comme source. L’adresse du site est [https://mercato237.github.io/dualshop/](https://mercato237.github.io/dualshop/).

Le site étant un prototype frontend, les comptes et les commandes restent simulés et les données sont stockées dans le navigateur.

## Fonctionnalités de démonstration

- Pages d’accueil, catalogue, détail produit, panier et connexion.
- Identité visuelle DualShop avec illustrations SVG originales, cartes produits soignées et présentation éditoriale.
- Mise en page responsive, menu mobile, lien de saut au contenu et prise en charge de la réduction des animations.
- Catalogue avec recherche insensible aux accents, filtres par catégorie, tri et réinitialisation des critères, alimenté par `data/products.js`.
- Fiches produits détaillées avec points forts et visuels dédiés ; favoris et panier utilisent les mêmes images.
- Favoris et panier (quantités plafonnées à 10 par produit, suppression, progression vers la livraison offerte dès 80 €) conservés dans `localStorage` et synchronisés entre les onglets ouverts.
- Parcours de commande de démonstration avec validation des coordonnées, récapitulatif et confirmation. Aucun paiement n’est effectué ; les coordonnées ne sont pas envoyées ni stockées.
- Formulaire de connexion de démonstration sans création de compte ni enregistrement du mot de passe.

> DualShop est un prototype frontend pour portfolio : il ne traite aucune commande commerciale et ne propose ni authentification ni paiement réels.

## Structure

- `css/` : styles globaux, composants et adaptation mobile.
- `js/` : logique des pages, produits, panier, favoris, commande, recherche et connexion.
- `data/` : données de démonstration des produits.
- `assets/` : illustrations SVG des produits, icônes et logo.
