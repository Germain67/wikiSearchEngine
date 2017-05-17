# wikiSearchEngine

- Installer elasticsearch et esbulk (/!\ fix necessaire sous 16.04, ref doc ubuntu)    
https://doc.ubuntu-fr.org/elasticsearch    
https://github.com/miku/esbulk/releases/download/v0.4.2/esbulk_0.4.2_amd64.deb
- Lancer elasticsearch (14.04 uniquement)    
elasticsearch
- Ajout du fichier obtenu après exécution de l'algo java à l’index ES    
`esbulk -index wiki -type page -verbose part-r-00000.json`
- Se mettre a la racine du projet git
- Installer les dépendances    
`npm install`
- Lancer le serveur nodejs (le service elasticsearch doit être lancé en arrière-plan)    
`node index.js`

- URL du site    
localhost:3000/
______________________
Commandes supplémentaires

Suppression de l’index ES    
curl -XDELETE 'http://localhost:9200/wiki/'
