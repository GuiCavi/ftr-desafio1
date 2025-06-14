import { randomUUID } from "node:crypto";
import { db } from "@/infra/db";
import type { URLTableModel } from "@/infra/db/schemas/url";
import { UnknownError } from "@/infra/http/errors/unknown-error";
import {
	type Error as EitherError,
	type Success,
	isError,
	isSuccess,
	unwrapEither,
} from "@/shared/either";
import { describe, expect, it, vi } from "vitest";
import { listUrls } from "../list-urls";
import { insertUrlRow } from "./helpers/test-helpers";

describe("list-urls", () => {
	it("should return all URLs from the database", async () => {
		const randomShortUrl1 = randomUUID();
		const randomShortUrl2 = randomUUID();
		const url1 = { url: "https://example1.com", shortUrl: randomShortUrl1 };
		const url2 = { url: "https://example2.com", shortUrl: randomShortUrl2 };
		await insertUrlRow(url1);
		await insertUrlRow(url2);

		const sut = await listUrls();

		expect(isSuccess(sut)).toBe(true);

		const urls = unwrapEither(sut) as Success<URLTableModel[]>["right"];
		expect(urls).toEqual(
			expect.arrayContaining([
				expect.objectContaining(url1),
				expect.objectContaining(url2),
			]),
		);
	});

	it("should return UnknownError if the database throws", async () => {
		const spy = vi.spyOn(db, "select").mockImplementationOnce(() => {
			throw new Error("db error");
		});

		const sut = await listUrls();

		expect(isError(sut)).toBe(true);

		const error = unwrapEither(sut) as EitherError<UnknownError>["left"];
		expect(error).toBeInstanceOf(UnknownError);

		spy.mockRestore();
	});
});
