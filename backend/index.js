// backend/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Database information
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "dvdrental"
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Used for the fetching of all films within the database.
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM film');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Used in both the delete and search pages, uses the ILIKE to search for any information that is similar
app.post('/api/search', async (req, res) => {
  const { title } = req.body;
  try {
    const result = await pool.query('SELECT * FROM film WHERE title ILIKE $1', [`%${title}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Used to add to the database based on the information provided from the user.
app.post('/api/add-film', async (req, res) => {
  const { title, desc, year, language, length } = req.body;
  try {
    await pool.query('INSERT INTO film (title, description, release_year, language_id, length) VALUES ($1, $2, $3, $4, $5)', [title, desc, year, language, length]);
    res.status(201).send('Film added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Used to delete data from the database using the selected film
app.delete('/api/delete/:id', async (req, res) => {
  const film_id = req.params.id;
  try {
    await pool.query('DELETE FROM film WHERE film_id = $1', [film_id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
