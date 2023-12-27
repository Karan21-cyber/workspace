import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "../../../migrations/schema";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.error("No database URL provided");
}
console.log("env ",process?.env?.DATABASE_URL);

const client = postgres(process?.env?.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema }); // this allows us to query our database

const migrateDb = async () => {
  try {
    console.log("Migrating database");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Successfully migrated database");
  } catch (error) {
    console.error("Error migrating database:", error);
    // process.exit(1); // Exit the process if migration fails
  }
};

migrateDb();

export default db;
