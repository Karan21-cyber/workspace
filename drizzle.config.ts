import {} from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({path:'.env'});

if(!process.env.DATABASE_URL) {
    console.log('DATABASE_URL must be set');
}

export default{
    schema:'./src/lib/superbase/schema.ts',
    out:'./migration',
    driver:'pg',
    dbCredentials:{
        connectionString :process.env.DATABASE_URL || '',
    },
}