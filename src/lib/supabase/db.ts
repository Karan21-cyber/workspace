import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "../../../migrations/schema";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("No database Url");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema }); // this allow us to query our database

const migrateDb = async () => {
  try {
    console.log("Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Successfully Migrated client");
  } catch (error) {
    console.log("Error migrating client: ");
  }
};

migrateDb();

export default db;
