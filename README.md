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

## Conteneurisation

### Docker run

Pour déployer l'API JFLauncher, vous pouvez utiliser Docker. Pour ce faire, exécutez la commande suivante dans le répertoire racine du projet :

```bash
docker run -d -p 3000:3000 --name jflauncher-api dragonir/jflauncher-api
```

### Docker-compose (recommandé)

Vous pouvez également utiliser Docker-compose pour déployer l'API JFLauncher. Un fichier docker-compose.yml vous est fourni pour faciliter le déploiement. Pour ce faire, exécutez la commande suivante dans le répertoire racine du projet :

```bash
docker-compose up -d
```

Si vous souhaitez suivre les logs de l'API JFLauncher, exécutez la commande suivante :

```bash
docker-compose logs -f
```

### Docker swarm

Pour déployer l'API JFLauncher sur un cluster Docker Swarm, vous pouvez utiliser le fichier docker-swarm.yml fourni. Pour ce faire, exécutez la commande suivante :

```bash
docker stack deploy -c docker-swarm.yml jflauncher
```

#### Auto scale

Un script python est fourni pour mettre en place un auto scale de l'API JFLauncher. Pour ce faire, assurez vous d'avoir la librarie docker :

```bash
pip3 install docker
```

et exécutez la commande suivante :

```bash
python3 autoscale.py
```

Il exécutera une vérification toutes les minutes.
Vous pouvez le configurer pour vérifier la charge de vos services via cette commande :
  
```bash
python3 autoscale.py -t 30 #nombre en secondes
```

## Lien utiles

- [Documentation](https://github.com/Regycid/jflauncher-api-LC/wiki)
- [Docker Hub](https://hub.docker.com/r/dragonir/jfl-api)

## Crédits

[Script d'auto scale](https://github.com/Romainlg29/docker-auto-scaling)