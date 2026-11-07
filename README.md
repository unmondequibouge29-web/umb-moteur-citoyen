# UMB Moteur Citoyen

Interface officielle de l'IA UMB.

## Architecture

Frontend statique : GitHub Pages.
Moteur IA : endpoint serveur `POST /api/ia`.

Le navigateur ne contient aucune clé secrète. Le serveur doit appeler le modèle IA et renvoyer :

```json
{"reply":"..."}
```

## Déploiement

Le frontend peut être publié avec GitHub Pages. L'URL sera :
https://unmondequibouge29-web.github.io/umb-moteur-citoyen/

Pour une IA réellement intelligente, il faut connecter `/api/ia` à un modèle (local ou fournisseur d'API).