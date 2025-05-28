import { isSuccess } from "@/shared/either";
import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { storeUrl } from "../store-url";

describe('store-url', () => {
  it("should store an URL in database", async () => {
    const randomName = `random-name-${randomUUID()}`;

    const sut = await storeUrl({
      url: "https://example.com",
      shortUrl: randomName,
    });

    expect(isSuccess(sut)).toBe(true)
  })
});