CREATE TABLE "url" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"short_url" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "url_short_url_unique" UNIQUE("short_url")
);
