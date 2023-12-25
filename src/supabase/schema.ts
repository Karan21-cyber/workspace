import { pgTable, uuid } from "drizzle-orm/pg-core";

export const workspace = pgTable('workspace',{
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
});