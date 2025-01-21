#! /usr/bin/env node

const { Client } = require("pg");

async function populateDatabase() {
  const client = new Client({
    connectionString:
      "postgresql://ryan:password@localhost:5432/inventory_application",
  });

  await client.connect();

  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author_id INTEGER REFERENCES Authors(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES Genres(id) ON DELETE CASCADE,
        pages INTEGER
        );`
    );

    const authorsResult = await client.query(
      `INSERT INTO authors (first_name, last_name) 
         VALUES ('J.R.R.', 'Tolkien'), ('Fyodor', 'Dostoevsky'), ('Frank', 'Herbert')
         RETURNING id, first_name, last_name`
    );

    const genresResult = await client.query(
      `INSERT INTO genres (name) 
         VALUES ('Literary Fiction'), ('Fantasy'), ('Science Fiction')
         RETURNING id, name`
    );

    const [tolkienId, dostoevskyId, herbertId] = authorsResult.rows.map(
      (row) => row.id
    );
    const [litFicId, fantasyId, sciFicId] = genresResult.rows.map(
      (row) => row.id
    );

    // Insert books using the returned IDs
    await client.query(
      `INSERT INTO books (title, author_id, genre_id, pages) 
         VALUES 
         ('Lord of the Rings', $1, $5, 1216), 
         ('The Hobbit', $1, $5, 322),
         ('Crime and Punishment', $2, $4, 720),
         ('The Brothers Karamazov', $2, $4, 1056),
         ('Dune', $3, $6, 624)`,
      [tolkienId, dostoevskyId, herbertId, litFicId, fantasyId, sciFicId]
    );

    console.log("Database populated successfully!");
  } catch (err) {
    console.error("Error populating database:", err);
  } finally {
    await client.end();
  }
}

populateDatabase();
