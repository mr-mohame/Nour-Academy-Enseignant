# Nour Academy – Espace Enseignant

Application web de gestion pédagogique destinée aux enseignants de Nour Academy. Elle permet de gérer les élèves, suivre les absences, enregistrer les notes et organiser les groupes.

## 1. Présentation du projet

Nour Academy – Espace Enseignant est une application développée pour faciliter les tâches quotidiennes des enseignants.

**Objectifs principaux :**
- Consulter les élèves par groupe.
- Rechercher et filtrer les élèves.
- Gérer les absences.
- Ajouter et consulter les notes.
- Ajouter de nouveaux élèves pendant l'année scolaire.

## 2. Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure de l'application |
| Tailwind CSS | Design et responsive |
| JavaScript (ES6+) | Logique et fonctionnalités |
| DOM | Manipulation dynamique de l'interface |
| Git | Gestion des versions |
| GitHub | Hébergement du code source |

**Architecture :** application Front-End développée avec HTML, Tailwind CSS et JavaScript natif. Aucun framework JavaScript ni backend n'est utilisé.

## 3. Structure du projet

```text
Nour-Academy-Enseignant/
│
│
├── assets/
│   └── js/
│       ├── data.js
│       └── script.js
│
├── index.html
│
└── README.md
```

### Description des fichiers

**`index.html`**
- Structure HTML de l'application.
- Interface du tableau de bord.
- Formulaires et composants de gestion.

**`assets/js/data.js`**
- Données initiales des groupes.
- Données initiales des élèves.

**`assets/js/script.js`**
- Affichage dynamique des élèves.
- Recherche et filtrage.
- Gestion des absences.
- Gestion des notes.
- Validation des formulaires.
- Ajout d'un élève.

**`README.md`**
- Documentation et présentation du projet.

## 4. Fonctionnalités

### Gestion des élèves
- Afficher la liste des élèves.
- Rechercher un élève.
- Filtrer les élèves par groupe.
- Afficher le nombre d'élèves selon le filtre.

### Gestion des absences
- Enregistrer les absences.
- Actualiser le compteur d'absences.
- Suivre les absences de chaque élève.

### Gestion des notes
- Ajouter des notes.
- Calculer la moyenne des élèves.
- Afficher les résultats dans la liste.

### Ajout d'un élève
- Saisir le prénom et le nom.
- Sélectionner un groupe.
- Ajouter les coordonnées du parent.
- Valider les champs avec Regex.
- Vérifier les doublons.
- Vérifier la capacité maximale du groupe.

## 5. Installation et lancement

### Prérequis
- Visual Studio Code.
- Git.
- Un navigateur web.
- Extension Live Server pour VS Code.

### Cloner le dépôt

```bash
git clone https://github.com/mr-mohame/Nour-Academy-Enseignant.git
```

### Accéder au projet

```bash
cd Nour-Academy-Enseignant
```

### Ouvrir dans VS Code

```bash
code .
```

Lancer ensuite le fichier `index.html` avec Live Server.

### Chargement JavaScript

Les fichiers doivent être chargés dans cet ordre :

```html
<script src="./assets/js/data.js"></script>
<script src="./assets/js/script.js"></script>
```

`data.js` doit être chargé avant `script.js`, car les données sont utilisées dans le deuxième fichier.

## 6. Gestion des branches Git

Le projet utilise Git pour organiser le développement par User Story.

### Organisation

```text
main
  │
  └── develop
        │
        ├── branche-us-01
        │
        ├── branche-us-02
        │
        ├── branche-us-03
        │
        └── branche-us-04
```

### Rôle des branches

- **main :** version stable du projet.
- **develop :** branche principale de développement et d'intégration.
- **branche US :** branche dédiée à une User Story.

### Workflow de travail

Chaque nouvelle User Story suit les étapes suivantes :

**1. Se placer sur develop**

```bash
git checkout develop
```

**2. Récupérer les dernières modifications**

```bash
git pull origin develop
```

**3. Créer une branche pour la User Story**

```bash
git checkout -b numero-us-description
```

**4. Développer la fonctionnalité**

Effectuer les modifications et tester le travail sur cette branche.

**5. Ajouter et enregistrer les modifications**

```bash
git add .
git commit -m "feat: description de la fonctionnalité"
```

**6. Envoyer la branche sur GitHub**

```bash
git push -u origin numero-us-description
```

**7. Fusionner dans develop**

```bash
git checkout develop
git pull origin develop
git merge numero-us-description
git push origin develop
```

**8. Commencer la prochaine User Story**

Toujours créer la nouvelle branche depuis `develop`, après avoir récupéré ses dernières modifications.

### Convention des commits

Le projet utilise le préfixe `feat:` pour ses commits.

Exemples :

```bash
git commit -m "feat: afficher la liste des élèves"
git commit -m "feat: ajouter la recherche et le filtrage"
git commit -m "feat: gérer les absences et les notes"
git commit -m "feat: ajouter la validation du formulaire élève"
```
## 9. Auteur

**Mohamed Lamssiah**

Projet Front-End réalisé pour Nour Academy.

GitHub : https://github.com/mr-mohame

---

*Projet en cours de développement.*
