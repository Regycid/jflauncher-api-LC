import dotenv from 'dotenv'; // Importation du module dotenv pour charger les variables d'environnement
import app from './app/index'; // Importation du module app depuis le dossier app/index


// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const PORT = process.env.PORT || 5000; // Définition du port d'écoute du serveur, en utilisant la variable d'environnement PORT ou en utilisant le port 5000 par défaut

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Affichage d'un message indiquant que le serveur est en cours d'exécution sur le port spécifié
});
