# JFLauncher api

<p align="center">
  <img src=https://livecampus.fr/wp-content/uploads/2020/09/logo_transparent_background.png width="300" title="hover text">

## JFLauncher API
L'API JFLauncher est un outil puissant qui permet de partager les versions du modpack Jimmu's Factory sur différents canaux (alpha, beta, release,...). Cette API est conçue pour être simple à utiliser, tout en offrant une grande flexibilité pour gérer les versions de votre modpack.

## Utilisation
Routes
/channel
GET : Cette route retourne les noms des différents canaux disponibles. Chaque canal représente un niveau de stabilité différent pour votre modpack.

/channel/:name
GET : Cette route retourne les noms des différentes versions disponibles pour un canal spécifique. Remplacez :name par le nom du canal pour obtenir les versions correspondantes.

/channel/:name/:version
GET : Cette route retourne les journaux de modifications pour une version spécifique d'un canal. Remplacez :name par le nom du canal et :version par le numéro de version pour obtenir le journal des modifications correspondant.

/channel/:name/:version/download
GET : Cette route permet de télécharger une version spécifique d'un canal. Remplacez :name par le nom du canal et :version par le numéro de version pour télécharger le modpack correspondant.

## En-tête
token : type string : Un token généré manuellement et partagé entre le client et le serveur. Ce token est stocké dans un fichier .env.
name : type string : Le nom du canal, obtenu via la route /channel.
version : type string : Le nom de la version, obtenu via la route /channel/:name.
