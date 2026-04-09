const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connexion à ta base PostgreSQL sur Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());
app.use(express.static('public'));

// Route pour récupérer les impayés (ta vue v_impayes)
app.get('/api/impayes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM v_impayes LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(port, () => {
  console.log(`Providence Call tourne sur le port ${port}`);
});
