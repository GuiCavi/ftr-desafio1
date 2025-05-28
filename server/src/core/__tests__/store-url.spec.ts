import { isError, isSuccess } from "@/shared/either";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { storeUrl } from "../store-url";
import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";

describe('store-url', () => {
  it("should store an URL in database", async () => {
    const randomName = `random-name-${randomUUID()}`;

    const sut = await storeUrl({
      url: "https://example.com",
      shortUrl: randomName,
    });

    expect(isSuccess(sut)).toBe(true)

    const result = await db
      .select()
      .from(Schemas.url)
      .where(eq(Schemas.url.shortUrl, randomName));
    
    expect(result).toHaveLength(1);
  });

  it("should not store an URL in database if the shortUrl already exists", async () => {
    const randomName = `random-name-${randomUUID()}`;

    await storeUrl({
      url: "https://example.com",
      shortUrl: randomName,
    });

    const sut = await storeUrl({
      url: "https://example.com",
      shortUrl: randomName,
    });

    expect(isError(sut)).toBe(true);

    const result = await db
      .select()
      .from(Schemas.url)
      .where(eq(Schemas.url.shortUrl, randomName));
    
    expect(result).toHaveLength(1);
  });
});