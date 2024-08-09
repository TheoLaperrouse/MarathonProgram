# MarathonProgram

Application de suivi de Programme pour Marathon déployé via Netlify ici : <a href='https://marathonprogram.thorigne-tt.net/'> Marathon Program</a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/f26f75e1-f52d-4d0b-ba29-50beb4867a6c/deploy-status)](https://app.netlify.com/sites/marathonprogram/deploys)

## Développement

Pour installer les dépendances et commencer à développer en local :

```sh
yarn
yarn start
```

## Docker

Pour déployer l'application avec docker :

```sh
docker build -t marathon-program .
docker run -p 8080:80 marathon-program
```
