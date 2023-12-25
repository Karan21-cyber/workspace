import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from "../../migration/schema";
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({path:'.env'});

if(!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not found.');
}

const client = postgres(process.env.DATABASE_URL as string,{max:1});
const db = drizzle(client,{schema}); // this allow us to query our database
 
const migrateDb = async () => {
   try{
    console.log("Migrating client");
    await migrate(db,{migrationsFolder:'migrations'});
    console.log("Successfully Migrated client");
   }
   catch(err){
    console.log("Error migrating client",err);
   }
}

migrateDb();
export default db;

