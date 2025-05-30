import { randomUUID } from "node:crypto";
import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import { isError, isSuccess } from "@/shared/either";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { deleteUrl } from "../delete-url";
import { insertUrlRow } from "./helpers/test-helpers";

describe("delete-url", () => {
	it("should delete a URL from the database", async () => {
		const insertedUrl = await insertUrlRow({
			url: "",
			shortUrl: "",
		});
		const sut = await deleteUrl({ id: insertedUrl.id });

		expect(isSuccess(sut)).toBe(true);

		const result = await db
			.select()
			.from(Schemas.url)
			.where(eq(Schemas.url.id, insertedUrl.id));

		expect(result).toHaveLength(0);
	});

	it("should return URLNotFoundError if the URL does not exist", async () => {
		const nonExistentId = randomUUID();

		const sut = await deleteUrl({ id: nonExistentId });

		expect(isError(sut)).toBe(true);

		const result = await db
			.select()
			.from(Schemas.url)
			.where(eq(Schemas.url.id, nonExistentId));

		expect(result).toHaveLength(0);
	});

	it("should return UnknownError on invalid input", async () => {
		// @ts-expect-error: purposely passing invalid id
		const sut = await deleteUrl({ id: 123 });

		expect(isError(sut)).toBe(true);
	});
});
