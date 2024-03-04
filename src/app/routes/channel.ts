import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {init as channel, getChannels, getChannel, getVersion, getDownload} from '../models/channel';

channel(); // Appel de la fonction d'initialisation du modèle "channel"

dotenv.config(); // Chargement des variables d'environnement depuis le fichier .env
const router = express.Router(); // Création d'un routeur Express

router.route('/')
    .get((req, res) => {
        if (req.headers['token'] === process.env.TOKEN) { // Vérification du token dans l'en-tête de la requête
            res.json(getChannels()); // Renvoi des canaux disponibles au format JSON
        }
        else {
            res.status(403).send('Forbidden'); // Renvoi d'une erreur 403 si le token est incorrect ou manquant
        }
    })

router.route('/:channel')
    .get((req, res) => {
        if (req.headers['token'] === process.env.TOKEN) {
            res.json(getChannel(req.params.channel)); // Renvoi des informations sur un canal spécifique au format JSON
        }
        else {
            res.status(403).send('Forbidden');
        }
    })

router.route('/:channel/:version')
    .get((req, res) => {
        if (req.headers['token'] === process.env.TOKEN) {
            res.json(getVersion(req.params.channel, req.params.version)); // Renvoi des informations sur une version spécifique d'un canal au format JSON
        }
        else {
            res.status(403).send('Forbidden');
        }
    })

router.route('/:channel/:version/download')
    .get((req, res) => {
        if (req.headers['token'] === process.env.TOKEN) {
            res.download(path.join(getDownload(req.params.channel, req.params.version))); // Téléchargement d'un fichier à partir du chemin spécifié
        }
        else {
            res.status(403).send('Forbidden');
        }
    })

export default router; // Exportation du routeur Express par défaut
