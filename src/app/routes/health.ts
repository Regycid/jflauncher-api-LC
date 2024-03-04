import express from 'express';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.sendStatus(200); // Envoie une réponse HTTP avec le code de statut 200 (OK)
    })

export default router;
