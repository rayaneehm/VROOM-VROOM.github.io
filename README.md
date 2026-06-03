# cars-project
# VROOM VROOM

## Description générale du projet

VROOM VROOM est un site web de présentation et d'achat de véhicules de luxe développé en HTML, CSS et JavaScript. Le projet a été réalisé dans le cadre du module de développement web afin de mettre en pratique la création d'interfaces modernes, la manipulation du DOM, le stockage local des données et la navigation entre plusieurs pages.

Le site permet aux visiteurs de découvrir différentes marques automobiles prestigieuses, consulter les véhicules disponibles, filtrer les résultats selon plusieurs critères, gérer un panier d'achat, créer un compte utilisateur et finaliser une commande.


# Structure du site

## 1. Page d'accueil (index.html)

La page d'accueil est la première interface visible par l'utilisateur.

### Hero Section

La section Hero utilise une vidéo en arrière-plan afin de créer un effet visuel immersif dès l'arrivée sur le site.

Le contenu principal est placé au-dessus de la vidéo grâce à un positionnement CSS adapté. Cette technique permet de conserver une bonne lisibilité du texte tout en profitant de l'effet dynamique de la vidéo.

Cette section contient :

* Le slogan principal du site.
* Une présentation rapide de VROOM VROOM.
* Des boutons de navigation vers les différentes sections.
* Une image de véhicule mise en avant.

L'objectif est de capter immédiatement l'attention du visiteur.

### Featured Cars

Cette section met en avant les principales marques automobiles disponibles sur le site :

* BMW
* Porsche
* Mercedes
* Audi

Chaque marque est représentée sous forme de carte contenant :

* un logo ou une vidéo ;
* une courte description ;
* un bouton « Voir plus ».

Des effets CSS ont été ajoutés :

* transition fluide ;
* agrandissement au survol ;
* modification de l'ombre ;
* amélioration visuelle de l'interactivité.

Les boutons redirigent automatiquement vers la page des voitures en appliquant un filtre correspondant à la marque sélectionnée.

### Cars Type

Cette section permet à l'utilisateur d'explorer les véhicules selon leur catégorie :

* Family Cars
* Sports Cars
* Electric Cars

Chaque catégorie est représentée par une carte illustrée.

Lorsque l'utilisateur clique sur « Explore », il est redirigé vers la page des voitures avec un filtre correspondant au type sélectionné.

Cette fonctionnalité facilite la navigation et la recherche des véhicules.

### Coming Soon

Cette section présente les futurs ajouts prévus pour le site.

Les cartes annoncent l'arrivée prochaine de nouvelles catégories et marques automobiles.

L'objectif est de montrer l'évolutivité du projet et les améliorations prévues dans les prochaines versions.

### Footer

Le pied de page contient :

* une présentation rapide du site ;
* les liens de navigation ;
* les informations de contact ;
* les liens vers les réseaux sociaux.


## 2. Page Marques (marques.html)

Cette page est dédiée à la présentation des constructeurs automobiles.

Les marques actuellement disponibles sont :

* BMW
* Porsche
* Mercedes
* Audi

Pour chaque marque, la page affiche :

* un logo animé ou une vidéo ;
* une description ;
* un bouton permettant d'accéder directement aux véhicules de cette marque.

Cette organisation permet aux utilisateurs de découvrir les caractéristiques générales de chaque constructeur avant de consulter les modèles disponibles.

Les cartes utilisent également des animations CSS et des effets hover afin de rendre l'interface plus attractive.


## 3. Page Voitures (voitures.html)

Cette page constitue le catalogue principal du site.

### Catalogue dynamique

Les véhicules sont générés dynamiquement grâce aux données stockées dans le fichier JavaScript.

Chaque carte véhicule contient :

* une image ;
* le nom du véhicule ;
* la marque ;
* le prix ;
* les caractéristiques principales ;
* un bouton d'ajout au panier.

### Système de filtrage

L'utilisateur peut filtrer les voitures selon plusieurs catégories :

* All
* Sport
* Family
* SUV
* Electric

Des filtres supplémentaires par marque sont également générés automatiquement.

### Bouton "Voir plus"

Afin d'améliorer la lisibilité, seules certaines voitures sont affichées au départ.

Le bouton « Voir plus » permet de charger progressivement davantage de véhicules.

### Effets visuels

Les cartes possèdent :

* des animations CSS ;
* des effets de survol ;
* des transitions fluides ;
* une mise en valeur des boutons d'action.


## 4. Page Connexion (connexion.html)

Cette page permet la gestion des utilisateurs.

### Connexion

L'utilisateur peut :

* saisir son identifiant ou son email ;
* entrer son mot de passe ;
* se connecter à son compte.

### Inscription

Un formulaire d'inscription permet :

* la création d'un compte ;
* l'enregistrement des informations utilisateur.

### Interface dynamique

La page utilise un système de panneaux coulissants permettant de basculer entre :

* connexion ;
* inscription.

Cette animation améliore l'expérience utilisateur et rend l'interface plus moderne.

### Local Storage

Les informations utilisateur sont enregistrées localement dans le navigateur grâce au Local Storage.

Cette solution permet de simuler un système d'authentification sans serveur ni base de données.


## 5. Page Acheter (acheter.html)

Cette page permet de finaliser la commande.

### Récapitulatif du panier

Les produits ajoutés au panier sont récupérés automatiquement et affichés dans :

* la liste des articles ;
* le montant total à payer.

### Informations personnelles

L'utilisateur doit renseigner :

* prénom ;
* nom ;
* email ;
* téléphone ;
* adresse de livraison.

### Paiement

Une interface de paiement simplifiée est proposée afin de reproduire le fonctionnement d'un processus d'achat réel.

### Validation

Après vérification des informations saisies, l'utilisateur peut confirmer sa commande.


# Technologies utilisées

* HTML5
* CSS3
* JavaScript
* Local Storage
* Boxicons
* Google Fonts

# Instructions d'utilisation

1. Ouvrir le fichier index.html ou accéder au site hébergé.
2. Parcourir les différentes pages via la barre de navigation.
3. Consulter les marques disponibles.
4. Explorer le catalogue des voitures.
5. Utiliser les filtres pour rechercher un véhicule.
6. Ajouter des véhicules au panier.
7. Créer un compte ou se connecter.
8. Accéder à la page Acheter.
9. Compléter les informations demandées.
10. Finaliser la commande.


# Membres du groupe

* ZOUAOI FERIEL
* HAMOUMA RAYANE
* BENAMARA YANIS
* SALAOUATCHI LYNA
