# JFLauncher api

<p align="center">
  <img src=https://livecampus.fr/wp-content/uploads/2020/09/logo_transparent_background.png width="300" title="hover text">

  
##Description
L'API JFLauncher est utilisée pour partager les versions du modpack Jimmu's Factory sur tous les différents canaux (alpha, beta, release,...)

##Comment utiliser
Routes
/channel
GET : Fournit les noms des différents canaux.

/channel/:name
GET : Fournit les noms des différentes versions du canal.

/channel/:name/:version
GET : Fournit les journaux de modifications de la version.

/channel/:name/:version/download
GET : Télécharge la version du canal.

##En-tête
token : type string : token généré manuellement et donné aux deux côtés dans un fichier .env.
name : type string : nom du canal donné par la route /channel.
version : type string : nom de la version donné par la route /channel/:name.
