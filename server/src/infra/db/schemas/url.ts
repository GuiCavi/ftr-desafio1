import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const url = pgTable("url", {
  id: text("id").primaryKey().$defaultFn(() => uuidv7()),
  url: text("url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  accessCount: integer("access_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})