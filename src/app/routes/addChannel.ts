import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';
import { createChannel, createVersion } from '../models/channel';

const storage = multer.diskStorage({ // Initialise le stockage des fichiers
    destination: function (req, file, cb) { // Définit le chemin de destination des fichiers
        if (fs.existsSync('uploads/') === false) fs.mkdirSync('uploads/')
        cb(null, 'uploads/') // Définit le chemin de destination des fichiers
    },
    filename: function (req, file, cb) { // Définit le nom des fichiers
        cb(null, file.originalname) // Définit le nom des fichiers
    }
})

dotenv.config()
const upload = multer({ storage: storage });
const router = express.Router();

router.route('/createchannel')
    .post(upload.array('files', 1), (req, res) => {
        if (req.headers['token'] === process.env.TOKEN) { // Vérifie le jeton d'authentification
            res.json(createChannel(req.body.name)); // Appelle la fonction createChannel avec le nom du canal
        }
        else {
            res.status(403).send('Forbidden'); // Renvoie une erreur 403 si le jeton est incorrect
        }
    })

router.route('/createversion')
    .post(upload.array('files', 1), (req, res) => {
        if (req.headers['token'] === process.env.TOKEN) { // Vérifie le jeton d'authentification
            res.json(createVersion(req.body.channel, req.body.name, req.body.changelog, req.files)); // Appelle la fonction createVersion avec les paramètres requis
        }
        else {
            res.status(403).send('Forbidden'); // Renvoie une erreur 403 si le jeton est incorrect
        }
    })

export default router;
