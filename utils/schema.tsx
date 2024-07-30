import { unique } from "drizzle-orm/mysql-core";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  real,
} from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
});

export const Purchase = pgTable("Purchase", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("userId").notNull(),
  credit: real("credit").notNull(),
  createAt: timestamp("createAt").defaultNow().notNull(),
});

export const StripeCustomer = pgTable("StripeCustomer", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("userId").unique().notNull(),
  stripeCustomerId: varchar("stripeCustomerId").unique().notNull(),
  createAt: timestamp("createAt").defaultNow().notNull(),
});

export const User = pgTable("User", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("userId").unique().notNull(),
  totalCredit: real("totalCredit").default(10000).notNull(),
});
