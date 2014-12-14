NodeBox
=======

Auteurs :
* Célia Cacciatore
* Jérémy Bossut
* Jonathan Geoffroy

## NodeBox ##

_Attention : cette branche contient une version incomplète de l'application, pour un atelier. La version terminée se trouve sur la branche develop._

NodeBox est un serveur type "Dropbox" pour le stockage de fichiers, développé en NodeJS. 
Les fichiers sont stockés dans une architecture REST.
La partie front-end de NodeBox s'appuie sur le framework Express.js.

NodeBox peut être testé [ici](http://nodebox.cloudapp.net:1337).

## Architecture ##

* NodeBox.js: point d'entrée du serveur. Crée le mapping entre les url et les routes (voir dossier routes/), et lance le serveur.
* routes: contient les fichiers gérant les routes. Chaque route remplit une fonctionnalité:
  * createFolderRoute.js crée des répertoires,
  * downloadRoute.js  permet à l'utilisateur de télécharger un fichier ou un dossier depuis le serveur vers son disque,
  * listRoute.js permet de lister les fichiers et dossiers du répertoire courant,
  * tpRoute.js permet d'afficher cette page,
  * uploadRoute.js permet à l'utilisateur de télécharger un fichier depuis son disque vers le serveur;
* views:  contient les templates jade permettant d'afficher un contenu html à partir des données des routes.
  * layout.jade affiche le header de la page, notamment la navbar,
  * liste.jade affiche la liste du répertoire courant,
  * tp.jade affiche cette page.
* helpers: contient des modules NodeJS permettant de faire fonctionner l'application.
  * htmlizer.js crée la liste de fichiers à partir de l'url d'une requête.
  * locationHelper.js convertit l'url d'une requête en données exploitable (notamment trouver le chemin vers les fichiers sur le disque depuis l'url par exemple).
* tests: contient les tests unitaires de l'application.
* config.js: contient les données statiques utiles à l'applications, notamment la définition des routes pour chaque fonctionnalité.
* files:  dossier dans lequel vont être stockés les fichiers et dossiers envoyés par l'utilisateur.

## Liens utiles ##

* [NodeBox](http://nodebox.cloudapp.net:1337)
* [Fiche technique sur NodeJS](https://drive.google.com/file/d/0B9-RmOkIRcYOZzBfeG5WVjdlUXc/view)
* [Fiche technique minimisé sur NodeJS](https://drive.google.com/file/d/0B9-RmOkIRcYOUjZ0cDhhZ3dBZ3M/view)
* [Présentation de NodeJS](http://slides.com/jbossut/node#/)
* [Notice d'installation de NodeJS](https://drive.google.com/file/d/0BxpCmD2YUdl9RjVzODJGdDdkWUE/view) 
* [NodeJS](http://nodejs.org/)