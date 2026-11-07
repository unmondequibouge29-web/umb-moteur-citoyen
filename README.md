# UMB — Moteur Citoyen

IA UMB réellement exécutée dans le navigateur avec WebLLM/WebGPU.

## Avantage
- Gratuit côté serveur : aucun serveur IA obligatoire.
- Aucune clé API.
- Compatible avec GitHub Pages.
- Le modèle est téléchargé puis exécuté localement dans le navigateur.
- Les conversations ne sont pas envoyées à une API IA externe par cette application.

## Modèle
Qwen2.5 0.5B Instruct quantifié pour WebLLM. Un modèle plus puissant pourra être ajouté plus tard si le matériel des utilisateurs le permet.

## Déploiement GitHub Pages
Le workflow `.github/workflows/pages.yml` publie automatiquement le dépôt sur GitHub Pages.

URL attendue :
https://unmondequibouge29-web.github.io/umb-moteur-citoyen/

## Important
La première ouverture télécharge le modèle. La vitesse et la qualité dépendent du navigateur et du matériel de l'utilisateur. WebGPU est recommandé.

## Évolution UMB
L'architecture permet ensuite d'ajouter des profils Visiteur / Premium / Admin et, si nécessaire, un backend avec un modèle plus puissant.