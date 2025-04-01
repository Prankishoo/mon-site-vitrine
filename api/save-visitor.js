export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    const { ip, country, city, region } = req.body;

    // Vérification des données reçues
    const logEntry = `${new Date().toISOString()} - IP: ${ip || 'Inconnu'}, Pays: ${country || 'Inconnu'}, Ville: ${city || 'Inconnu'}, Région: ${region || 'Inconnu'}`;
    
    // Stockage temporaire (Vercel ne permet pas d'écrire sur le disque)
    console.log(logEntry);

    return res.status(200).json({ message: 'Données enregistrées (affichées dans la console)' });
}
