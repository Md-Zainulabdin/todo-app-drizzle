import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";

export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }),
});

export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">; // insert type

export const db = drizzle(sql);
