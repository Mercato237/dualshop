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

- Pages d’accueil, catalogue de 50 articles répartis en huit catégories, détail produit, panier, connexion, service client et avis.
- Identité visuelle DualShop avec illustrations SVG originales, cartes produits soignées et présentation éditoriale.
- Navigation par catégories, recherche dans l’en-tête et le catalogue, filtres par catégorie, tri et recherche insensible aux accents.
- Mise en page responsive, menu mobile, lien de saut au contenu et prise en charge de la réduction des animations.
- Fiches produits détaillées, visuels d’illustration Pexels, favoris et panier utilisant les mêmes données.
- Favoris et panier (quantités plafonnées à 10 par produit, suppression, progression vers la livraison offerte dès 80 €) conservés dans `localStorage` et synchronisés entre les onglets ouverts.
- Parcours de commande de démonstration avec validation des coordonnées, récapitulatif et confirmation. Aucun paiement n’est effectué ; les coordonnées ne sont pas envoyées ni stockées.
- Formulaire de connexion de démonstration sans création de compte ni enregistrement du mot de passe.
- Contact par formulaire ouvrant un brouillon d’e-mail vers `fronten31@gmail.com`.
- Avis enregistrés uniquement dans le navigateur qui les saisit ; ils ne sont pas transmis ni partagés entre les visiteurs.

> DualShop est un prototype frontend pour portfolio : il ne traite aucune commande commerciale et ne propose ni authentification ni paiement réels.

## Images et limites du prototype

Les photos du catalogue sont des visuels d’illustration chargés depuis le CDN de [Pexels](https://www.pexels.com/), conformément à sa [licence](https://www.pexels.com/license/). Elles ne sont pas intégrées au dépôt et ne représentent pas nécessairement les articles fictifs affichés. Leur affichage nécessite une connexion Internet.

Sans serveur, les avis restent propres au navigateur, et le formulaire de contact prépare seulement un e-mail que le visiteur doit envoyer lui-même. Pour recevoir et partager les avis ou traiter des demandes directement, il faudra connecter un backend ou un service tiers.

## Structure

- `css/` : styles globaux, composants et adaptation mobile.
- `js/` : navigation, logique des pages, produits, panier, favoris, commande, recherche, contact et avis.
- `data/` : données de démonstration des produits.
- `assets/` : illustrations SVG des produits, icônes et logo.
