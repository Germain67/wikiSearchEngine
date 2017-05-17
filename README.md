# wikiSearchEngine

- Lancer elasticsearch
- Ajout du fichier obtenu après exécution de l'algo java à l’index ES
esbulk -index wiki -type page -verbose part-r-00000.json
- Se mettre a la racine du projet git
- Installer les dépendances :
npm install
- Lancer le serveur nodejs (le service elasticsearch doit être lancé en arrière-plan) :
node index.js

-URL du site
localhost:3000/
______________________
Commandes supplémentaires

Suppression de l’index ES
curl -XDELETE 'http://localhost:9200/wiki/'
