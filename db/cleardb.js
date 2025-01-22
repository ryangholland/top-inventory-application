#! /usr/bin/env node

const { Client } = require("pg");

async function clearDatabase() {
  const client = new Client({
    connectionString:
      "postgresql://ryan:password@localhost:5432/inventory_application",
  });

  await client.connect();

  try {
    await client.query(`
        DO $$ 
        BEGIN
          EXECUTE (
            SELECT string_agg('DROP TABLE IF EXISTS "' || tablename || '" CASCADE;', ' ')
            FROM pg_tables
            WHERE schemaname = 'public'
          );
        END $$;
      `);

    console.log("Database cleared successfully!");
  } catch (err) {
    console.error("Error clearing database:", err.message);
  } finally {
    await client.end();
  }
}

clearDatabase();
