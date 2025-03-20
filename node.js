const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Vérifier et créer le fichier log s'il n'existe pas
const logFilePath = path.join(__dirname, 'visitors.log');
if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '', { flag: 'w' });
}

app.post('/api/save-visitor', (req, res) => {
    const visitorData = req.body;
    
    // Vérification des données reçues
    const ip = visitorData.ip || 'Inconnu';
    const country = visitorData.country || 'Inconnu';
    const city = visitorData.city || 'Inconnu';
    const region = visitorData.region || 'Inconnu';
    
    const logEntry = `${new Date().toISOString()} - IP: ${ip}, Pays: ${country}, Ville: ${city}, Région: ${region}\n`;
    
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture du fichier:", err);
            return res.status(500).send('Erreur serveur');
        }
        console.log('Visiteur enregistré:', visitorData);
        res.status(200).send('Données enregistrées');
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});